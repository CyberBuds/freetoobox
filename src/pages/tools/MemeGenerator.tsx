import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Image as ImageIcon, Download, Type, Upload, Scissors, RefreshCw } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

const MEME_TEMPLATES = [
  { name: 'Bernie Sanders', url: 'https://i.imgflip.com/3si44u.jpg' },
  { name: 'Disaster Girl', url: 'https://i.imgflip.com/23ls.jpg' },
  { name: 'Drake Hotline Bling', url: 'https://i.imgflip.com/1otk96.jpg' },
  { name: 'One Does Not Simply', url: 'https://i.imgflip.com/1bij.jpg' },
  { name: 'Distracted Boyfriend', url: 'https://i.imgflip.com/1ur9b0.jpg' },
  { name: 'Changes Mind', url: 'https://i.imgflip.com/261o3j.jpg' },
];

export default function MemeGenerator() {
  const [template, setTemplate] = useState(MEME_TEMPLATES[0].url);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentImage = customImage || template;

  const drawMeme = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = currentImage;

    img.onload = () => {
      // Scale canvas to image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw Image
      ctx.drawImage(img, 0, 0);

      // Text Styles
      const fontSize = Math.floor(canvas.width / 10);
      ctx.font = `bold ${fontSize}px Impact, sans-serif`;
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = fontSize / 15;
      ctx.textAlign = 'center';

      // Draw Top Text
      if (topText) {
        ctx.textBaseline = 'top';
        ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 20);
        ctx.fillText(topText.toUpperCase(), canvas.width / 2, 20);
      }

      // Draw Bottom Text
      if (bottomText) {
        ctx.textBaseline = 'bottom';
        ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
        ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
      }
    };
  };

  useEffect(() => {
    drawMeme();
  }, [currentImage, topText, bottomText]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ToolPageLayout
      toolId="meme-generator"
      title="Meme Generator"
      description="Create hilarious memes instantly. Choose from popular templates or upload your own image and add captions."
      category="Image Tools"
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The Universal Language of Memes</h2>
          <p className="text-gray-600 mb-4">
            Memes are the backbone of internet culture. Whether you're sharing an inside joke with friends or trying to go viral on social media, a well-crafted meme can convey more than just words.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">How to create a viral meme?</h3>
          <p className="text-gray-600 mb-4">
            Start with a relatable image or a trending template. Keep your text short and punchy. Bold, white text with a black outline (Impact font) is the classic "meme look" that users immediately recognize.
          </p>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Type className="h-5 w-5 text-blue-600" />
              Add Captions
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Top Text</label>
                <input 
                  type="text" 
                  value={topText} 
                  onChange={(e) => setTopText(e.target.value)}
                  className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none uppercase font-bold"
                  placeholder="E.G. ME WHEN..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Bottom Text</label>
                <input 
                  type="text" 
                  value={bottomText} 
                  onChange={(e) => setBottomText(e.target.value)}
                  className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none uppercase font-bold"
                  placeholder="E.G. BOTTOM TEXT"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-purple-600" />
              Choose Template
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {MEME_TEMPLATES.map((t) => (
                <button 
                  key={t.name}
                  onClick={() => {
                    setTemplate(t.url);
                    setCustomImage(null);
                  }}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${template === t.url && !customImage ? 'border-blue-500 scale-95 shadow-lg' : 'border-transparent'}`}
                >
                  <img src={t.url} alt={t.name} className="w-full h-full object-cover" />
                </button>
              ))}
              <label className="relative aspect-square rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload className="h-6 w-6 text-gray-400" />
                <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Upload</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
            <button 
              onClick={() => {
                setTopText('');
                setBottomText('');
              }}
              className="w-full py-3 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reset All Text
            </button>
          </div>

          <button 
            onClick={handleDownload}
            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl"
          >
            <Download className="h-5 w-5" />
            Download My Meme
          </button>
        </div>

        <div className="flex flex-col items-center justify-start h-full">
           <div className="sticky top-24 w-full">
            <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              <canvas 
                ref={canvasRef} 
                className="w-full h-auto rounded-xl shadow-inner max-h-[600px] object-contain bg-gray-50"
              />
            </div>
            <p className="mt-4 text-center text-sm text-gray-400 font-medium italic">
              Tip: Download as PNG for best quality!
            </p>
           </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
