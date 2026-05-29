import React, { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon, Trash2 } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

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
    <ToolPageLayout
      toolId="image-compressor"
      title="Online Image Compressor"
      description="Reduce image file size instantly without compromising visual quality. 100% secure, browser-based compression."
      category="Image Tools"
      seoContent={
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Importance of Image Compression in 2026</h2>
            <p className="text-gray-600 mb-4">
              In a digital landscape where attention spans are measured in seconds, page load speed is the difference between a bounce and a conversion. High-resolution images, while beautiful, are often the primary cause of slow loading times. Our <strong>Online Image Compressor</strong> allows you to strike the perfect balance between crisp visuals and lightning-fast performance.
            </p>
            <p className="text-gray-600">
              Whether you're a web developer aiming for a perfect 100 on Google PageSpeed Insights, a photographer sharing galleries on social media, or a student uploading assignments, we provide the tools you need to optimize your media effortlessly.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Lossy vs. Lossless Compression</h3>
            <p className="text-gray-600 mb-4">Understanding how your images are being processed helps you choose the right quality setting:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                <h4 className="font-bold text-blue-600">Lossy Compression</h4>
                <p className="text-sm text-gray-500 italic">Used for JPEGs & WebP</p>
                <p className="text-xs text-gray-600 mt-2">Removes "unnoticeable" color data to achieve 70-90% reduction in file size. Ideal for web graphics and photos.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                <h4 className="font-bold text-blue-600">Lossless Compression</h4>
                <p className="text-sm text-gray-500 italic">Used for PNGs</p>
                <p className="text-xs text-gray-600 mt-2">Removes redundant metadata and internal coding inefficiencies. Zero quality loss, but results in smaller size reductions (10-30%).</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">How Compression Benefits Your SEO</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-3">
              <li><strong>Core Web Vitals:</strong> Faster images improve your <strong>Largest Contentful Paint (LCP)</strong>, a critical metric in Google's ranking algorithm.</li>
              <li><strong>Mobile Friendliness:</strong> Smaller images load faster on 3G/4G networks, providing a better experience for the billions of mobile users.</li>
              <li><strong>Reduced Server Load:</strong> If you're a developer, optimized images consume less bandwidth and storage, lowering your infrastructure costs.</li>
            </ul>
          </section>

          <section className="bg-green-50 p-6 rounded-xl border border-green-100">
            <h3 className="text-lg font-bold text-green-900 mb-2">Maximum Privacy Guaranteed</h3>
            <p className="text-green-800">
              Unlike many "free" online compressors, <strong>FreeToolsBox.in</strong> uses a strictly client-side architecture. This means your images are processed within your browser's memory using standard JavaScript APIs. They are never transmitted to our servers and are destroyed as soon as you close your browser tab. Your privacy isn't just a promise; it's hard-coded into our tools.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Recommended Quality Settings</h3>
            <p className="text-gray-600 mb-4">Finding the "Sweet Spot" for your images:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
              <li className="p-2 border border-gray-100 rounded bg-gray-50"><strong>80-90%:</strong> High quality, best for hero images and product photos.</li>
              <li className="p-2 border border-gray-100 rounded bg-gray-50"><strong>60-70%:</strong> Standard web quality, great for blog posts.</li>
              <li className="p-2 border border-gray-100 rounded bg-gray-50"><strong>Below 50%:</strong> Maximum compression, best for thumbnails.</li>
            </ul>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
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
    </ToolPageLayout>
  );
}
