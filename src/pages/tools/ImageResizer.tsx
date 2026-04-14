import React, { useState, useRef } from 'react';
import { FileUp, Image as ImageIcon, Download, Loader2, Maximize, Info } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [originalDimensions, setOriginalDimensions] = useState<{ w: number; h: number } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.startsWith('image/')) return;
      
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);

      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        setOriginalDimensions({ w: img.width, h: img.height });
      };
      img.src = url;
    }
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (maintainAspectRatio && originalDimensions) {
      setHeight(Math.round((newWidth / originalDimensions.w) * originalDimensions.h));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (maintainAspectRatio && originalDimensions) {
      setWidth(Math.round((newHeight / originalDimensions.h) * originalDimensions.w));
    }
  };

  const resizeImage = async () => {
    if (!preview || !width || !height) return;
    setIsProcessing(true);

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.src = preview;
      await new Promise((resolve) => (img.onload = resolve));

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, file?.type || 'image/jpeg', 0.9));
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `resized_${file?.name || 'image.jpg'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error resizing image:', error);
      alert('An error occurred while resizing the image.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      toolId="image-resizer"
      title="Image Resizer"
      description="Resize your images to custom dimensions while maintaining quality."
      category="Image Tools"
      seoContent={
        <>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            Pro Tip
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Maintaining the aspect ratio ensures your image doesn't look stretched or squashed. If you need specific dimensions, uncheck the box, but be aware it might distort the image.
          </p>
        </>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {!file ? (
          <div className="p-12 border-2 border-dashed border-gray-200 m-8 rounded-2xl hover:border-blue-400 transition-colors text-center relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <Maximize className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Upload Image</h3>
              <p className="text-sm text-gray-500 mt-1">Select an image to resize</p>
            </div>
          </div>
        ) : (
          <div className="p-8 space-y-8">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <ImageIcon className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="font-bold text-gray-900 truncate max-w-[200px]">{file.name}</h3>
                  <p className="text-xs text-gray-500">
                    Original: {originalDimensions?.w}x{originalDimensions?.h}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => { setFile(null); setPreview(null); }}
                className="text-xs text-gray-400 hover:text-red-500 font-bold"
              >
                Change Image
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Width (px)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Height (px)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="aspectRatio"
                checked={maintainAspectRatio}
                onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="aspectRatio" className="text-sm text-gray-600 font-medium">
                Maintain Aspect Ratio
              </label>
            </div>

            <button
              onClick={resizeImage}
              disabled={isProcessing || !width || !height}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Resizing...
                </>
              ) : (
                <>
                  <Download className="h-5 w-5" />
                  Resize and Download
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
