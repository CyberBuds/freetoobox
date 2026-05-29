import React, { useState } from 'react';
import { FileText, Download, Loader2, Scissors, Info, FileUp } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function SplitPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitRange, setSplitRange] = useState<string>('');
  const [pageCount, setPageCount] = useState<number>(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') return;
      
      setFile(selectedFile);
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        setPageCount(pdf.getPageCount());
      } catch (err) {
        console.error('Error loading PDF:', err);
      }
    }
  };

  const splitPDF = async () => {
    if (!file || !splitRange) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      
      // Parse range (e.g., "1-3, 5, 7-9")
      const ranges = splitRange.split(',').map(r => r.trim());
      const pagesToExtract: number[] = [];

      ranges.forEach(range => {
        if (range.includes('-')) {
          const [start, end] = range.split('-').map(Number);
          for (let i = start; i <= end; i++) {
            if (i > 0 && i <= pageCount) pagesToExtract.push(i - 1);
          }
        } else {
          const page = Number(range);
          if (page > 0 && page <= pageCount) pagesToExtract.push(page - 1);
        }
      });

      if (pagesToExtract.length === 0) {
        alert('Invalid page range.');
        return;
      }

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdf, pagesToExtract);
      copiedPages.forEach(page => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `split_${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error splitting PDF:', error);
      alert('An error occurred while splitting the PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      toolId="split-pdf"
      title="Split PDF"
      description="Extract specific pages from your PDF document easily."
      category="PDF Tools"
      seoContent={
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Split PDF Guide</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>• <strong>Single Pages:</strong> Enter "1, 3, 5" to extract only those pages.</li>
            <li>• <strong>Page Ranges:</strong> Enter "1-10" to extract all pages from 1 to 10.</li>
            <li>• <strong>Combined:</strong> Enter "1-5, 10, 15-20" for a custom selection.</li>
          </ul>
        </div>
      }
    >
      <div className="max-w-2xl mx-auto">
        {!file ? (
          <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors text-center relative group">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                <FileUp className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Upload PDF to split</h3>
              <p className="text-sm text-gray-500 mt-2">Select a PDF file from your device</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-3">
                <FileText className="h-10 w-10 text-red-500" />
                <div>
                  <h3 className="font-bold text-gray-900 truncate max-w-[250px]">{file.name}</h3>
                  <p className="text-xs text-gray-500 font-medium">{pageCount} Pages • {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button 
                onClick={() => setFile(null)}
                className="text-xs text-gray-400 hover:text-red-500 font-black uppercase tracking-widest transition-colors"
              >
                Change File
              </button>
            </div>
            
            <div className="p-10 space-y-8">
              <div>
                <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Enter Page Range</label>
                <input
                  type="text"
                  value={splitRange}
                  onChange={(e) => setSplitRange(e.target.value)}
                  placeholder="e.g. 1-5, 8, 11-13"
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-lg font-medium"
                />
                <p className="mt-3 text-xs text-gray-400 flex items-center gap-2 font-medium">
                  <Info className="h-4 w-4 text-blue-500" />
                  Use commas for separate pages and hyphens for ranges.
                </p>
              </div>

              <button
                onClick={splitPDF}
                disabled={!splitRange || isProcessing}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Scissors className="h-5 w-5" />
                    Split and Download PDF
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
