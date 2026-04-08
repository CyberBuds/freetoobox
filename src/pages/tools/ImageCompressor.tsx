import React, { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon, Trash2 } from 'lucide-react';
import AdPlaceholder from '@/components/AdPlaceholder';

export default function ImageCompressor() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(0.7);
  const [isCompressing, setIsCompressing] = useState(false);
  const [stats, setStats] = useState<{ original: number; compressed: number } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setCompressedUrl(null);
      setStats(null);
    }
  };

  const compressImage = () => {
    if (!selectedImage) return;
    setIsCompressing(true);

    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx?.drawImage(img, 0, 0);
        
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        setCompressedUrl(dataUrl);
        
        // Calculate size
        const head = 'data:image/jpeg;base64,';
        const size = Math.round((dataUrl.length - head.length) * 3 / 4);
        
        setStats({
          original: selectedImage.size,
          compressed: size
        });
        setIsCompressing(false);
      };
    };
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Image Compressor</h1>
        <p className="text-gray-500">Reduce image file size instantly without losing visible quality.</p>
      </div>

      <AdPlaceholder className="mb-8 h-24" />

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-12">
        <div className="p-8">
          {!selectedImage ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group"
            >
              <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 group-hover:text-blue-600" />
              </div>
              <p className="text-lg font-semibold text-gray-900">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500 mt-2">PNG, JPG, or WEBP (Max 10MB)</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" /> Original Preview
                  </h3>
                  <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center border border-gray-200">
                    <img src={previewUrl!} alt="Original" className="max-h-full object-contain" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Size: {formatSize(selectedImage.size)}</span>
                    <button 
                      onClick={() => setSelectedImage(null)}
                      className="text-red-500 hover:text-red-600 flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-blue-600" /> Compressed Preview
                  </h3>
                  <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center border border-gray-200">
                    {compressedUrl ? (
                      <img src={compressedUrl} alt="Compressed" className="max-h-full object-contain" />
                    ) : (
                      <div className="text-gray-400 text-sm italic">Click compress to see result</div>
                    )}
                  </div>
                  {stats && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Size: {formatSize(stats.compressed)}</span>
                      <span className="text-green-600 font-bold">
                        Saved {Math.round((1 - stats.compressed / stats.original) * 100)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-700">Compression Quality</label>
                    <span className="text-sm font-bold text-blue-600">{Math.round(quality * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={compressImage}
                    disabled={isCompressing}
                    className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 disabled:opacity-50"
                  >
                    {isCompressing ? 'Compressing...' : 'Compress Image'}
                  </button>
                  {compressedUrl && (
                    <a
                      href={compressedUrl}
                      download={`compressed-${selectedImage.name}`}
                      className="flex items-center justify-center px-8 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-100"
                    >
                      <Download className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AdPlaceholder className="mb-12 h-32" />

      <article className="prose prose-blue max-w-none bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Compress Your Images?</h2>
        <p className="text-gray-600 mb-4">
          In today's fast-paced digital world, website speed is more important than ever. Large image files are often the primary reason for slow-loading pages. By compressing your images, you can significantly reduce their file size while maintaining a high level of visual quality.
        </p>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">Benefits of Image Compression</h3>
        <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
          <li><strong>Improved SEO:</strong> Search engines like Google consider page load speed as a ranking factor. Faster sites rank higher.</li>
          <li><strong>Better User Experience:</strong> Users are less likely to leave a site that loads quickly.</li>
          <li><strong>Reduced Storage Costs:</strong> Smaller files take up less space on your server or cloud storage.</li>
          <li><strong>Lower Bandwidth Usage:</strong> Especially important for mobile users with limited data plans.</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mb-2">How our Image Compressor works</h3>
        <p className="text-gray-600 mb-4">
          Our tool uses "Lossy Compression" for JPEG images. This technique works by removing some of the data that the human eye is less likely to notice. By adjusting the quality slider, you can find the perfect balance between file size and image clarity.
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Privacy First:</strong> Unlike other online tools, our compressor works entirely within your browser. Your images are never uploaded to any server. This means your private photos stay private, and the process is incredibly fast since there's no upload or download time involved.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mb-2">Tips for best results</h3>
        <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
          <li>For most web uses, a quality setting of 70-80% is ideal.</li>
          <li>If you're using images for social media, you can often go as low as 60% without noticeable loss.</li>
          <li>Always check the "Saved" percentage to see how much space you're actually saving.</li>
        </ul>

        <p className="text-gray-600">
          Start optimizing your digital assets today with our free, secure, and lightning-fast image compression tool.
        </p>
      </article>

      <AdPlaceholder className="mt-12 h-24" />
    </div>
  );
}
