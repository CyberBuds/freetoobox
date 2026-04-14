import React, { useState } from 'react';
import { Download, Loader2, Eraser, Info } from 'lucide-react';
import { removeBackground } from '@imgly/background-removal';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function BackgroundRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.startsWith('image/')) return;
      
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setProgress(0);
    }
  };

  const handleRemoveBackground = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);

    try {
      const blob = await removeBackground(file, {
        progress: (key, current, total) => {
          const p = Math.round((current / total) * 100);
          setProgress(p);
        }
      });
      
      const url = URL.createObjectURL(blob);
      setResult(url);
    } catch (error) {
      console.error('Error removing background:', error);
      alert('An error occurred while removing the background. This tool requires a modern browser and may take a moment to initialize.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadResult = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result;
    link.download = `no_bg_${file?.name || 'image.png'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ToolPageLayout
      toolId="background-remover"
      title="Background Remover"
      description="Remove image backgrounds automatically in your browser with AI."
      category="Image Tools"
      seoContent={
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            Privacy & Performance
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>• <strong>100% Private:</strong> Processing happens entirely in your browser. Your images are never uploaded.</li>
            <li>• <strong>AI Powered:</strong> We use advanced machine learning models to detect and remove backgrounds.</li>
            <li>• <strong>First Run:</strong> The tool may take a few seconds to download the AI model on the first use.</li>
          </ul>
        </div>
      }
    >
      <div className="max-w-3xl mx-auto">
        {!file ? (
          <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors text-center relative group">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                <Eraser className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Upload Image</h3>
              <p className="text-sm text-gray-500 mt-2">Select an image to remove background</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-10 text-center">
              <div className="relative max-w-md mx-auto mb-10">
                <img 
                  src={result || preview!} 
                  alt="preview" 
                  className={`max-h-80 mx-auto rounded-xl shadow-lg transition-all ${result ? 'bg-[url("https://www.transparenttextures.com/patterns/checkerboard.png")]' : ''}`}
                  referrerPolicy="no-referrer"
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center rounded-xl border border-blue-100">
                    <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                    <p className="text-sm font-black text-gray-900 uppercase tracking-widest">Removing Background... {progress}%</p>
                    <div className="w-64 h-2.5 bg-gray-100 rounded-full mt-4 overflow-hidden border border-gray-200">
                      <div 
                        className="h-full bg-blue-600 transition-all duration-300 shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {!result ? (
                  <button
                    onClick={handleRemoveBackground}
                    disabled={isProcessing}
                    className="w-full max-w-xs py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
                  >
                    <Eraser className="h-5 w-5" />
                    Remove Background
                  </button>
                ) : (
                  <button
                    onClick={downloadResult}
                    className="w-full max-w-xs py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-100"
                  >
                    <Download className="h-5 w-5" />
                    Download PNG
                  </button>
                )}
              </div>

              <button 
                onClick={() => { setFile(null); setPreview(null); setResult(null); }}
                className="mt-6 text-sm text-gray-400 hover:text-red-500 font-black uppercase tracking-widest transition-colors"
              >
                Choose a different file
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
