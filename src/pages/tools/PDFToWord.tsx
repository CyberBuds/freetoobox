import React, { useState } from 'react';
import { FileUp, FileText, Download, Loader2, FileCode, Info } from 'lucide-react';
import * as pdfjs from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import ToolPageLayout from '@/components/ToolPageLayout';

// Set up worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') return;
      setFile(selectedFile);
    }
  };

  const convertToWord = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const paragraphs: Paragraph[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const textItems = textContent.items as any[];
        
        // Group text items by their vertical position (y-coordinate) to maintain some structure
        const lines: { [key: number]: string[] } = {};
        textItems.forEach(item => {
          const y = Math.round(item.transform[5]);
          if (!lines[y]) lines[y] = [];
          lines[y].push(item.str);
        });

        // Sort lines by y descending (top to bottom)
        const sortedY = Object.keys(lines).map(Number).sort((a, b) => b - a);
        
        sortedY.forEach(y => {
          const lineText = lines[y].join(' ');
          if (lineText.trim()) {
            paragraphs.push(new Paragraph({
              children: [new TextRun(lineText)],
            }));
          }
        });
        
        // Add a page break after each PDF page except the last one
        if (i < pdf.numPages) {
          paragraphs.push(new Paragraph({ children: [new TextRun({ text: "", break: 1 })] }));
        }
      }

      const doc = new Document({
        sections: [{
          properties: {},
          children: paragraphs,
        }],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace('.pdf', '.docx')}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error converting PDF to Word:', error);
      alert('An error occurred during conversion. Note: This tool extracts text and may not preserve complex layouts.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      toolId="pdf-to-word"
      title="PDF to Word"
      description="Extract text from your PDF and convert it into an editable Word document (.docx)."
      category="PDF Tools"
      seoContent={
        <>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            About PDF to Word Conversion
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>• This tool extracts <strong>text</strong> from your PDF document.</li>
            <li>• Images, complex formatting, and tables may not be perfectly preserved.</li>
            <li>• Scanned PDFs (images of text) cannot be converted as this is not an OCR tool.</li>
            <li>• Your privacy is guaranteed: conversion happens 100% in your browser.</li>
          </ul>
        </>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-8">
          {!file ? (
            <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors text-center relative">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <FileUp className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Upload PDF</h3>
                <p className="text-sm text-gray-500 mt-1">Select a PDF file to convert to Word</p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <FileText className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-1">{file.name}</h3>
              <p className="text-sm text-gray-500 mb-8">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              
              <button
                onClick={convertToWord}
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
                    <FileCode className="h-5 w-5" />
                    Convert to Word
                  </>
                )}
              </button>

              <button 
                onClick={() => setFile(null)}
                className="mt-4 text-sm text-gray-400 hover:text-red-500 font-medium block mx-auto"
              >
                Choose a different file
              </button>
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
