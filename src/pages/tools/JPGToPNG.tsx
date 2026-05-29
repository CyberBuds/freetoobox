import React, { useState } from 'react';
import { FileUp, Image as ImageIcon, Download, Loader2, RefreshCw, Info } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function JPGToPNG() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.includes('jpeg') && !selectedFile.type.includes('jpg')) {
        alert('Please upload a JPG image.');
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const convertToPNG = async () => {
    if (!preview) return;
    setIsProcessing(true);

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.src = preview;
      await new Promise((resolve) => (img.onload = resolve));

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${file?.name.split('.')[0] || 'image'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error converting to PNG:', error);
      alert('An error occurred during conversion.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      toolId="jpg-to-png"
      title="JPG to PNG"
      description="Convert your JPG images to PNG format with transparency support."
      category="Image Tools"
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {!file ? (
          <div className="p-12 border-2 border-dashed border-gray-200 m-8 rounded-2xl hover:border-blue-400 transition-colors text-center relative">
            <input
              type="file"
              accept="image/jpeg,image/jpg"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <RefreshCw className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Upload JPG</h3>
              <p className="text-sm text-gray-500 mt-1">Select a JPG file to convert to PNG</p>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <img 
              src={preview!} 
              alt="preview" 
              className="max-h-64 mx-auto rounded-xl mb-6 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <h3 className="text-xl font-bold text-gray-900 mb-1">{file.name}</h3>
            <p className="text-sm text-gray-500 mb-8">{(file.size / 1024).toFixed(2)} KB</p>
            
            <button
              onClick={convertToPNG}
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
                  Convert to PNG
                </>
              )}
            </button>

            <button 
              onClick={() => { setFile(null); setPreview(null); }}
              className="mt-4 text-sm text-gray-400 hover:text-red-500 font-medium"
            >
              Choose a different file
            </button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
