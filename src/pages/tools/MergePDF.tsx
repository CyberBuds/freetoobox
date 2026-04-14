import React, { useState } from 'react';
import { FilePlus, FileText, X, Download, Loader2, Shield } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function MergePDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter((file: any) => file.type === 'application/pdf');
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const mergePDFs = async () => {
    if (files.length < 2) return;
    setIsMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged_document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert('An error occurred while merging the PDFs. Please try again.');
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <ToolPageLayout
      toolId="merge-pdf"
      title="Merge PDF"
      description="Combine multiple PDF files into a single document in seconds."
      category="PDF Tools"
      seoContent={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">How to merge PDFs</h3>
            <ol className="space-y-3 text-sm text-gray-600 list-decimal pl-4">
              <li>Upload the PDF files you want to combine.</li>
              <li>The files will be merged in the order they appear in the list.</li>
              <li>Click "Merge and Download PDF" to process your files.</li>
              <li>Your merged PDF will be downloaded automatically.</li>
            </ol>
          </div>
          <div className="bg-blue-600 p-6 rounded-2xl text-white">
            <h3 className="font-bold mb-2 flex items-center gap-2 text-white">
              <Shield className="h-5 w-5" />
              100% Secure
            </h3>
            <p className="text-sm text-blue-50">
              Your files are processed entirely in your browser. They are never uploaded to our servers, ensuring complete privacy and security of your documents.
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors text-center relative group">
          <input
            type="file"
            multiple
            accept=".pdf"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
              <FilePlus className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Click or drag PDFs here</h3>
            <p className="text-sm text-gray-500 mt-2">Select 2 or more PDF files to merge</p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">{files.length} Files Selected</span>
              <button 
                onClick={() => setFiles([])}
                className="text-xs text-red-600 font-black hover:underline uppercase tracking-widest"
              >
                Clear All
              </button>
            </div>
            <ul className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
              {files.map((file, index) => (
                <li key={index} className="p-4 flex items-center justify-between group hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileText className="h-5 w-5 text-red-500 shrink-0" />
                    <span className="text-sm text-gray-700 truncate font-medium">{file.name}</span>
                    <span className="text-xs text-gray-400 font-mono">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                  <button 
                    onClick={() => removeFile(index)}
                    className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="p-8 bg-gray-50 border-t border-gray-200">
              <button
                onClick={mergePDFs}
                disabled={files.length < 2 || isMerging}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
              >
                {isMerging ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Merging PDFs...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Merge and Download PDF
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
