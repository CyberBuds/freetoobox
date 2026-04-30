import { useState } from 'react';
import { Copy, Check, Instagram } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

const IG_FONT_MAPS = {
  '𝒞𝓊𝓇𝓈𝒾𝓋𝑒 (𝒮𝓁𝑒𝑒𝓀)': {
    A: '𝒜', B: '𝐵', C: '𝒞', D: '𝒟', E: '𝐸', F: '𝐹', G: '', H: '𝐻', I: '𝐼', J: '𝒥', K: '𝒦', L: '𝐿', M: '𝑀', N: '𝒩', O: '𝒪', P: '𝒫', Q: '𝒬', R: '𝑅', S: '𝒮', T: '𝒯', U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳', Y: '𝒴', Z: '𝒵',
    a: '𝒶', b: '𝒷', c: '𝒸', d: '𝒹', e: '𝑒', f: '𝒻', g: '𝑔', h: '𝒽', i: '𝒾', j: '𝒿', k: '𝓀', l: '𝓁', m: '𝓂', n: '𝓃', o: '𝑜', p: '𝓅', q: '𝓆', r: '𝓇', s: '𝓈', t: '𝓉', u: '𝓊', v: '𝓋', w: '𝓌', x: '𝓍', y: '𝓎', z: '𝓏'
  },
  '𝖡𝗈𝗅𝖽 (𝖲𝖺𝗇𝗌)': {
    A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚', H: '𝗛', I: '𝗜', J: '𝗝', K: '𝗞', L: '𝗟', M: '𝗠', N: '𝗡', O: '𝗢', P: '𝗣', Q: '𝗤', R: '𝗥', S: '𝗦', T: '𝗧', U: '𝗨', V: '𝗩', W: '𝗪', X: '𝗫', Y: '𝗬', Z: '𝗭',
    a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴', h: '𝗵', i: '𝗶', j: '𝗷', k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻', o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', s: '𝘀', t: '𝘁', u: '𝘂', v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇'
  },
  '𝘽𝙤𝙡𝙙 (𝙄𝙩𝙖𝙡𝙞𝙘)': {
    A: '𝘼', B: '𝘽', C: '𝘾', D: '𝘿', E: '𝙀', F: '𝙁', G: '𝙂', H: '𝙃', I: '𝙄', J: '𝙅', K: '𝙆', L: '𝙇', M: '𝙈', N: '𝙉', O: '𝙊', P: '𝙋', Q: '𝙌', R: '𝙍', S: '𝙎', T: '𝙏', U: '𝙐', V: '𝙑', W: '𝙒', X: '𝙓', Y: '𝙔', Z: '𝙕',
    a: '𝙖', b: '𝙗', c: '𝙘', d: '𝙙', e: '𝙚', f: '𝙛', g: '𝙜', h: '𝙝', i: '𝙞', j: '𝙟', k: '𝙠', l: '𝙡', m: '𝙢', n: '𝙣', o: '𝙤', p: '𝙥', q: '𝙦', r: '𝙧', s: '𝙨', t: '𝙩', u: '𝙪', v: '𝙫', w: '𝙬', x: '𝙭', y: '𝙮', z: '𝙯'
  },
  'S T R E T C H': {
    A: 'Ａ', B: 'Ｂ', C: 'Ｃ', D: 'Ｄ', E: 'Ｅ', F: 'Ｆ', G: 'Ｇ', H: 'Ｈ', I: 'Ｉ', J: 'Ｊ', K: 'Ｋ', L: 'Ｌ', M: 'Ｍ', N: 'Ｎ', O: 'Ｏ', P: 'Ｐ', Q: 'Ｑ', R: 'Ｒ', S: 'Ｓ', T: 'Ｔ', U: 'Ｕ', V: 'Ｖ', W: 'Ｗ', X: 'Ｘ', Y: 'Ｙ', Z: 'Ｚ',
    a: 'ａ', b: 'ｂ', c: 'ｃ', d: 'ｄ', e: 'ｅ', f: 'ｆ', g: 'ｇ', h: 'ｈ', i: 'ｉ', j: 'ｊ', k: 'ｋ', l: 'ｌ', m: 'ｍ', n: 'ｎ', o: 'ｏ', p: 'ｐ', q: 'ｑ', r: 'ｒ', s: 'ｓ', t: 'ｔ', u: 'ｕ', v: 'ｖ', w: 'ｗ', x: 'ｘ', y: 'ｙ', z: 'ｚ'
  },
  'Ｂｕｂｂｌｅ': {
    A: 'Ⓐ', B: 'Ⓑ', C: 'Ⓒ', D: 'Ⓓ', E: 'Ⓔ', F: 'Ⓕ', G: 'Ⓖ', H: 'Ⓗ', I: 'Ⓘ', J: 'Ⓙ', K: 'Ⓚ', L: 'Ⓛ', M: 'Ⓜ', N: 'Ⓝ', O: 'Ⓞ', P: 'Ⓟ', Q: 'Ⓠ', R: 'Ⓡ', S: 'Ⓢ', T: 'Ⓣ', U: 'Ⓤ', V: 'Ⓥ', W: 'Ⓦ', X: 'Ⓧ', Y: 'Ⓨ', Z: 'Ⓩ',
    a: 'ⓐ', b: 'ⓑ', c: 'ⓒ', d: 'ⓓ', e: 'ⓔ', f: 'ⓕ', g: 'ⓖ', h: 'ⓗ', i: 'ⓘ', j: 'ⓙ', k: 'ⓚ', l: 'ⓛ', m: 'ⓜ', n: 'ⓝ', o: 'ⓞ', p: 'ⓟ', q: 'ⓠ', r: 'ⓡ', s: 'ⓢ', t: 'ⓣ', u: 'ⓤ', v: 'ⓥ', w: 'ⓦ', x: 'ⓧ', y: 'ⓨ', z: 'ⓩ'
  },
  'Sqυαяє': {
    A: '🄰', B: '🄱', C: '🄲', D: '🄳', E: '🄴', F: '🄵', G: '🄶', H: '🄷', I: '🄸', J: '🄹', K: '🄺', L: '🄻', M: '🄼', N: '🄽', O: '🄾', P: '🄿', Q: '🅀', R: '🅁', S: '🅂', T: '🅃', U: '🅄', V: '🅅', W: '🅆', X: '🅇', Y: '🅈', Z: '🅉',
    a: '🄰', b: '🄱', c: '🄲', d: '🄳', e: '🄴', f: '🄵', g: '🄶', h: '🄷', i: '🄸', j: '🄹', k: '🄺', l: '🄻', m: '🄼', n: '🄽', o: '🄾', p: '🄿', q: '🅀', r: '🅁', s: '🅂', t: '🅃', u: '🅄', v: '🅅', w: '🅆', x: '🅇', y: '🅈', z: '🅉'
  }
};

const DECORATIONS = [
  '꧁ $INPUT ꧂', 'ミ★ $INPUT ★彡', '『 $INPUT 』', '【 $INPUT 】', '『$INPUT』', 'ツ $INPUT ツ', 'ღ $INPUT ღ', '⋆ $INPUT ⋆', '✦ $INPUT ✦', '❁ $INPUT ❁'
];

export default function InstagramFontGenerator() {
  const [inputText, setInputText] = useState('Insta Style');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const generateFont = (text: string, map: Record<string, string>) => {
    return text.split('').map(char => map[char] || char).join('');
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(id);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  return (
    <ToolPageLayout
      toolId="instagram-font-generator"
      title="Instagram Font Generator"
      description="Create stylish fonts for your Instagram bio, captions, and comments to attract more followers."
      category="Social Media"
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Level Up Your Instagram Profile</h2>
          <p className="text-gray-600 mb-4">
            Instagram is all about aesthetics. While the app limits you to a single default font, our generator unlocks hundreds of creative possibilities to help your profile stand out.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">How to use customized fonts on Instagram?</h3>
          <p className="text-gray-600 mb-4">
            Simply type your text above, pick a style that fits your aesthetic, click copy, and paste it directly into your Instagram bio or caption. Since these are Unicode characters, they will display correctly for anyone viewing your profile.
          </p>
        </>
      }
    >
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Instagram className="h-6 w-6 text-pink-600" />
            <h3 className="text-lg font-bold text-gray-900">Your Instagram Text</h3>
          </div>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-4 text-xl rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all shadow-inner bg-gray-50 font-medium"
            placeholder="Write your bio here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(IG_FONT_MAPS).map(([fontName, map]) => {
            const fontText = generateFont(inputText, map);
            return (
              <div 
                key={fontName}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:border-pink-200 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">{fontName}</div>
                  <div className="text-2xl text-gray-800 break-words mb-4 whitespace-pre-wrap">{fontText}</div>
                </div>
                <button
                  onClick={() => handleCopy(fontText, fontName)}
                  className={`mt-auto flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                    copySuccess === fontName
                      ? 'bg-green-500 text-white shadow-green-100 shadow-lg'
                      : 'bg-gray-50 text-gray-600 hover:bg-pink-600 hover:text-white group-hover:bg-pink-500 group-hover:text-white'
                  }`}
                >
                  {copySuccess === fontName ? <><Check className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy Style</>}
                </button>
              </div>
            );
          })}

          {DECORATIONS.map((dec, idx) => {
            const decText = dec.replace('$INPUT', inputText);
            const id = `dec-${idx}`;
            return (
              <div 
                key={id}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:border-pink-200 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Decorated {idx + 1}</div>
                  <div className="text-2xl text-gray-800 break-words mb-4 whitespace-pre-wrap">{decText}</div>
                </div>
                <button
                  onClick={() => handleCopy(decText, id)}
                  className={`mt-auto flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                    copySuccess === id
                      ? 'bg-green-500 text-white shadow-green-100 shadow-lg'
                      : 'bg-gray-50 text-gray-600 hover:bg-pink-600 hover:text-white group-hover:bg-pink-500 group-hover:text-white'
                  }`}
                >
                  {copySuccess === id ? <><Check className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy Style</>}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </ToolPageLayout>
  );
}
