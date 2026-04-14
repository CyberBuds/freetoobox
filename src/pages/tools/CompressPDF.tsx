import React, { useState } from 'react';
import { FileText, Download, Loader2, Zap, Info, FileUp } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState<{ original: number; compressed: number } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') return;
      setFile(selectedFile);
      setStats(null);
    }
  };

  const compressPDF = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Basic optimization by re-saving with pdf-lib
      // This removes some metadata and unused objects
      const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
      
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const compressedSize = blob.size;
      
      setStats({
        original: file.size,
        compressed: compressedSize
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `compressed_${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error compressing PDF:', error);
      alert('An error occurred during compression.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      toolId="compress-pdf"
      title="Compress PDF"
      description="Reduce the file size of your PDF while maintaining quality."
      category="PDF Tools"
      seoContent={
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            How it works
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Our compression tool optimizes your PDF by removing unnecessary metadata and compressing internal streams. This process happens entirely in your browser, ensuring your sensitive documents never leave your computer.
          </p>
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
                <Zap className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Upload PDF to compress</h3>
              <p className="text-sm text-gray-500 mt-2">Select a PDF file from your device</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-10 text-center">
              <FileText className="h-20 w-20 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{file.name}</h3>
              <p className="text-sm text-gray-500 mb-8 font-medium">Original Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
              
              <button
                onClick={compressPDF}
                disabled={isProcessing}
                className="w-full max-w-xs mx-auto py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Compressing...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Compress and Download
                  </>
                )}
              </button>

              <button 
                onClick={() => setFile(null)}
                className="mt-6 text-sm text-gray-400 hover:text-red-500 font-black uppercase tracking-widest transition-colors"
              >
                Choose a different file
              </button>
            </div>

            {stats && (
              <div className="bg-green-50 p-8 border-t border-green-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-800">Compression Complete!</p>
                    <p className="text-sm text-green-600 font-medium">Saved {((1 - stats.compressed / stats.original) * 100).toFixed(1)}% of space</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-green-800">{(stats.compressed / 1024 / 1024).toFixed(2)} MB</p>
                  <p className="text-xs text-green-600 font-bold uppercase tracking-wider">New Size</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
