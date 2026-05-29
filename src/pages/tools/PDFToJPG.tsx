import React, { useState } from 'react';
import { FileText, Download, Loader2, Image as ImageIcon, FileUp } from 'lucide-react';
import * as pdfjs from 'pdfjs-dist';
import ToolPageLayout from '@/components/ToolPageLayout';

// Set up worker - using the bundled worker for reliability in Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export default function PDFToJPG() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') return;
      setFile(selectedFile);
      setPreviews([]);
    }
  };

  const convertToJPG = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const images: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) continue;
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport, canvas }).promise;
        images.push(canvas.toDataURL('image/jpeg', 0.8));
      }

      setPreviews(images);
      
      // Download the first page automatically or provide a zip (for now just provide individual downloads)
      images.forEach((dataUrl, index) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `page_${index + 1}_${file.name.replace('.pdf', '.jpg')}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });

    } catch (error) {
      console.error('Error converting PDF to JPG:', error);
      alert('An error occurred during conversion.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      toolId="pdf-to-jpg"
      title="PDF to JPG"
      description="Convert each page of your PDF into high-quality JPG images."
      category="PDF Tools"
    >
      <div className="max-w-3xl mx-auto">
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
              <h3 className="text-xl font-bold text-gray-900">Upload PDF</h3>
              <p className="text-sm text-gray-500 mt-2">Select a PDF file to convert to images</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-10 text-center">
              <FileText className="h-20 w-20 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{file.name}</h3>
              <p className="text-sm text-gray-500 mb-8 font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              
              <button
                onClick={convertToJPG}
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
                    <ImageIcon className="h-5 w-5" />
                    Convert to JPG
                  </>
                )}
              </button>

              <button 
                onClick={() => setFile(null)}
                className="mt-6 text-sm text-gray-400 hover:text-red-500 font-bold uppercase tracking-wider transition-colors"
              >
                Choose a different file
              </button>
            </div>

            {previews.length > 0 && (
              <div className="p-8 bg-gray-50 border-t border-gray-100">
                <h4 className="text-sm font-black text-gray-700 mb-6 uppercase tracking-widest">Generated Images</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {previews.map((src, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all">
                      <img src={src} alt={`Page ${idx + 1}`} className="w-full h-auto" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <a href={src} download={`page_${idx + 1}.jpg`} className="p-3 bg-white rounded-full text-blue-600 hover:scale-110 transition-transform shadow-lg">
                          <Download className="h-5 w-5" />
                        </a>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 text-white text-[10px] font-bold text-center">
                        PAGE {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
