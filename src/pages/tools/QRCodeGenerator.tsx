import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2, Trash2, QrCode as QRIcon } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function QRCodeGenerator() {
  const [text, setText] = useState('https://freetoolsbox.in');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx?.drawImage(img, 0, 0);
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.png';
      a.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <ToolPageLayout
      toolId="qr-code-generator"
      title="Free QR Code Generator"
      description="Create custom QR codes for URLs, Wi-Fi, Text, and Contact info instantly with high-quality PNG output."
      category="Developer Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Evolution of QR Codes</h2>
            <p className="text-gray-600">
              <strong>QR (Quick Response) Codes</strong> have become an essential bridge between the physical and digital worlds. Whether you are a business owner promoting your menu, a freelancer sharing your portfolio, or a host providing Wi-Fi access, a custom QR code makes the connection seamless.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Best Practices for QR Codes</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 text-sm">
              <li><strong>High Contrast:</strong> Always use a dark foreground on a light background. Light colors can make the code unreadable for some scanners.</li>
              <li><strong>Quiet Zone:</strong> Maintain a margin around the code to ensure it's not "crowded" by other design elements.</li>
              <li><strong>Test Before Printing:</strong> Always scan your generated code with multiple different devices and apps before finalizing your print materials.</li>
              <li><strong>Short URLs:</strong> Use a URL shortener if your link is very long; shorter links produce less complex (and easier to scan) QR codes.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy & Customization</h3>
            <p className="text-gray-600">
              Our generator works locally in your browser. Unlike many "Premium" QR generators, we don't track your scans or store the data you input. You can customize the colors to match your brand and download high-resolution PNG images for free, without any watermarks.
            </p>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Target URL or Content</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-700"
                placeholder="Enter URL, Wi-Fi details, or text..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">QR Code Color</label>
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-full h-12 rounded-lg cursor-pointer bg-transparent"
                  />
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Background Color</label>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full h-12 rounded-lg cursor-pointer bg-transparent"
                  />
               </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase">Resolution: {size}px</label>
              <input
                type="range"
                min="128"
                max="1024"
                step="32"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center space-y-6 border border-gray-100">
            <div ref={qrRef} className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all hover:scale-105 duration-300">
                <QRCodeSVG
                  value={text || ' '}
                  size={200}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  marginSize={1}
                />
            </div>

            <div className="flex gap-4 w-full max-w-[300px]">
               <button
                onClick={downloadQR}
                className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
              >
                <Download className="h-5 w-5" /> PNG
              </button>
               <button
                onClick={() => { setText(''); setFgColor('#000000'); setBgColor('#ffffff'); }}
                className="p-4 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 transition-all shadow-sm"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest flex items-center gap-1">
              <Share2 className="h-3 w-3" /> Professional QR Code Engine
            </p>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
