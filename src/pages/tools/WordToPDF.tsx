import React, { useState, useRef } from 'react';
import { FileText, Download, Loader2, Info, FileCode } from 'lucide-react';
import mammoth from 'mammoth';
import html2pdf from 'html2pdf.js';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function WordToPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.name.endsWith('.docx') && !selectedFile.name.endsWith('.doc')) {
        alert('Please upload a Word document (.docx)');
        return;
      }
      setFile(selectedFile);
      
      // Generate preview
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setPreviewHtml(result.value);
      } catch (err) {
        console.error("Preview generation failed", err);
      }
    }
  };

  const convertToPDF = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const htmlContent = result.value;

      // Create a temporary container for rendering with styles
      const container = document.createElement('div');
      container.innerHTML = `
        <div class="mammoth-pdf-content" style="padding: 40px; font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <style>
            table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            img { max-width: 100%; height: auto; }
            h1, h2, h3 { color: #1a1a1a; margin-top: 24px; margin-bottom: 12px; }
            p { margin-bottom: 12px; }
          </style>
          ${htmlContent}
        </div>
      `;
      document.body.appendChild(container);

      const opt = {
        margin: [40, 40, 40, 40] as [number, number, number, number],
        filename: `${file.name.split('.')[0]}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { unit: 'pt' as const, format: 'a4' as const, orientation: 'portrait' as const }
      };

      // Use html2pdf to convert the container
      await html2pdf().set(opt).from(container).save();
      
      document.body.removeChild(container);

    } catch (error) {
      console.error('Error converting Word to PDF:', error);
      alert('An error occurred during conversion. Please ensure it is a valid .docx file.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      toolId="word-to-pdf"
      title="Word to PDF"
      description="Convert your Word documents (.docx) to PDF format instantly."
      category="PDF Tools"
      seoContent={
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            Important Information
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>• Supports <strong>.docx</strong> files using semantic conversion.</li>
            <li>• Optimized for text, tables, and basic document structures.</li>
            <li>• Your privacy is guaranteed: conversion happens 100% in your browser.</li>
          </ul>
        </div>
      }
    >
      <div className="max-w-2xl mx-auto">
        {!file ? (
          <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors text-center relative group">
            <input
              type="file"
              accept=".docx"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                <FileCode className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Upload Word document</h3>
              <p className="text-sm text-gray-500 mt-2">Select a .docx file from your device</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-10 text-center">
              <FileText className="h-20 w-20 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{file.name}</h3>
              <p className="text-sm text-gray-500 mb-8 font-medium">{(file.size / 1024).toFixed(2)} KB</p>
              
              <button
                onClick={convertToPDF}
                disabled={isProcessing}
                className="w-full max-w-xs mx-auto py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Convert to PDF
                  </>
                )}
              </button>

              <button 
                onClick={() => { setFile(null); setPreviewHtml(''); }}
                className="mt-6 text-sm text-gray-400 hover:text-red-500 font-bold uppercase tracking-wider transition-colors"
              >
                Choose a different file
              </button>

              {previewHtml && (
                <div className="mt-12 text-left border-t border-gray-100 pt-8">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Document Preview</h4>
                  <div 
                    className="bg-gray-50 rounded-xl p-8 overflow-auto max-h-[400px] border border-gray-100 docx-preview"
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
