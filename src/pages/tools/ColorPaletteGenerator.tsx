import { useState, useCallback } from 'react';
import { Copy, Check, RefreshCw, Palette, Download } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

const generateRandomColor = () => {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
};

const generatePalette = () => {
  return Array.from({ length: 5 }, () => generateRandomColor());
};

const getContrastColor = (hexcolor: string) => {
  const r = parseInt(hexcolor.substring(1,3),16);
  const g = parseInt(hexcolor.substring(3,5),16);
  const b = parseInt(hexcolor.substring(5,7),16);
  const yiq = ((r*299)+(g*587)+(b*114))/1000;
  return (yiq >= 128) ? 'black' : 'white';
};

export default function ColorPaletteGenerator() {
  const [colors, setColors] = useState<string[]>(generatePalette());
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleRefresh = () => {
    setColors(generatePalette());
  };

  const handleCopy = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadAsJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(colors, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "color_palette.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <ToolPageLayout
      toolId="color-palette-generator"
      title="Color Palette Generator"
      description="Create stunning color schemes and professional palettes for your web design, brand identity, or art projects."
      category="Design Tools"
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Discover the Perfect Color Scheme</h2>
          <p className="text-gray-600 mb-4">
            A great color palette is the foundation of any visual design. It sets the mood, communicates brand personality, and ensures visual hierarchy. Our Color Palette Generator helps you explore infinite combinations with a single click.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">How to choose a palette?</h3>
          <p className="text-gray-600 mb-4">
            Look for balance. Most successful palettes include a mix of primary, secondary, and accent colors, along with neutral tones for backgrounds and text. Use our "Randomize" feature until you find a color that speaks to your brand, then build around it.
          </p>
        </>
      }
    >
      <div className="space-y-8">
        <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <Palette className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Palette Editor</h3>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              onClick={handleRefresh}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              <RefreshCw className="h-4 w-4" />
              Generate New
            </button>
            <button 
              onClick={downloadAsJson}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-100 transition-all"
            >
              <Download className="h-4 w-4" />
              Download JSON
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-[500px] md:h-96">
          {colors.map((color, index) => (
            <div 
              key={index}
              className="relative group rounded-3xl overflow-hidden shadow-lg border-4 border-white transition-all transform hover:scale-[1.02] cursor-pointer"
              style={{ backgroundColor: color }}
              onClick={() => handleCopy(color, index)}
            >
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10"
                style={{ color: getContrastColor(color) }}
              >
                {copiedIndex === index ? (
                  <Check className="h-10 w-10 mb-2 animate-bounce" />
                ) : (
                  <Copy className="h-10 w-10 mb-2" />
                )}
                <span className="font-mono font-bold text-xl">{color}</span>
                <span className="text-xs font-bold uppercase tracking-widest mt-2">{copiedIndex === index ? 'Copied!' : 'Click to Copy'}</span>
              </div>
              <div 
                className="absolute bottom-6 left-0 right-0 text-center font-mono font-bold text-lg pointer-events-none group-hover:hidden"
                style={{ color: getContrastColor(color) }}
              >
                {color}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
            Palette Details
          </h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((color, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                <div className="w-6 h-6 rounded-md shadow-sm" style={{ backgroundColor: color }}></div>
                <span className="font-mono text-sm font-bold text-gray-700">{color}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
