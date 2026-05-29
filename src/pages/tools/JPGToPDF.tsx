import React, { useState } from 'react';
import { Image as ImageIcon, Download, Loader2, X, FileText, FileUp } from 'lucide-react';
import { jsPDF } from 'jspdf';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function JPGToPDF() {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter((file: any) => 
        file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      );
      
      const newImages = newFiles.map((file: any) => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const convertToPDF = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);

    try {
      const doc = new jsPDF();
      
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const imgData = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(img.file);
        });

        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (i > 0) doc.addPage();
        doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }

      doc.save('images_to_pdf.pdf');
    } catch (error) {
      console.error('Error converting images to PDF:', error);
      alert('An error occurred during conversion.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      toolId="jpg-to-pdf"
      title="JPG to PDF"
      description="Convert your images (JPG, PNG) to a single PDF document."
      category="PDF Tools"
    >
      <div className="space-y-6">
        <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors text-center relative group">
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
              <ImageIcon className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Upload Images</h3>
            <p className="text-sm text-gray-500 mt-2">Select JPG or PNG files to convert</p>
          </div>
        </div>

        {images.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">{images.length} Images Selected</span>
              <button 
                onClick={() => setImages([])}
                className="text-xs text-red-600 font-black hover:underline uppercase tracking-widest"
              >
                Clear All
              </button>
            </div>
            <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {images.map((img, index) => (
                <div key={index} className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <img 
                    src={img.preview} 
                    alt="preview" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => removeImage(index)}
                      className="p-2 bg-white rounded-full text-red-500 hover:scale-110 transition-transform shadow-lg"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-black/60 text-white text-[10px] font-bold text-center">
                    IMAGE {index + 1}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-8 bg-gray-50 border-t border-gray-200">
              <button
                onClick={convertToPDF}
                disabled={isProcessing}
                className="w-full max-w-md mx-auto py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5" />
                    Convert to PDF
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
