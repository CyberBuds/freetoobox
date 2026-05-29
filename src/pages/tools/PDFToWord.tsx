import React, { useState } from 'react';
import { FileUp, FileText, Download, Loader2, FileCode, Info } from 'lucide-react';
import * as pdfjs from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import ToolPageLayout from '@/components/ToolPageLayout';

// Set up worker - using the bundled worker for reliability in Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export default function PDFToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setError('Please select a valid PDF file.');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const convertToWord = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ 
        data: arrayBuffer,
        useWorkerFetch: true,
        isEvalSupported: false
      });
      
      const pdf = await loadingTask.promise;
      const paragraphs: Paragraph[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const textItems = textContent.items as any[];
        
        // Group text items by their vertical position (y-coordinate) to maintain some structure
        const lines: { [key: number]: any[] } = {};
        textItems.forEach(item => {
          // The y-coordinate is in the 5th index of the transform matrix
          const y = Math.round(item.transform[5]);
          if (!lines[y]) lines[y] = [];
          lines[y].push(item);
        });

        // Sort lines by y descending (top to bottom)
        const sortedY = Object.keys(lines).map(Number).sort((a, b) => b - a);
        
        sortedY.forEach(y => {
          // Sort items within the same line by x ascending (left to right)
          const lineItems = lines[y].sort((a, b) => a.transform[4] - b.transform[4]);
          const lineText = lineItems.map(item => item.str).join(' ');
          
          if (lineText.trim()) {
            paragraphs.push(new Paragraph({
              children: [new TextRun({
                text: lineText,
                size: 24, // 12pt
              })],
              spacing: { after: 200 },
            }));
          }
        });
        
        // Add a page break after each PDF page except the last one
        if (i < pdf.numPages) {
          paragraphs.push(new Paragraph({ 
            children: [new TextRun({ text: "", break: 1 })] 
          }));
        }
      }

      if (paragraphs.length === 0) {
        throw new Error('No text content found in the PDF. It might be a scanned image.');
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
      link.download = `${file.name.replace(/\.[^/.]+$/, "")}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (err: any) {
      console.error('Error converting PDF to Word:', err);
      setError(err.message || 'An error occurred during conversion. Note: Scanned PDFs or complex layouts may not convert correctly.');
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
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 text-sm">
              <Info className="h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

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
