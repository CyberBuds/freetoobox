import { useState } from 'react';
import { Instagram, Copy, Check, Sparkles, RefreshCw } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

const BIO_TEMPLATES = [
  {
    category: 'Minimal & Cool',
    templates: [
      "Simplicity is the key to happiness. ✨",
      "Living my life in my own way. 🚀",
      "Just another dreamer. 💭",
      "Making every moment count. ⏳",
      "Stay humble, hustle hard. 💪"
    ]
  },
  {
    category: 'Professional & Business',
    templates: [
      "Help businesses grow with strategy. 📈",
      "Helping you build a better brand. 💼",
      "Passionate about innovation and design. 🎨",
      "Founder of @Company | Content Creator",
      "DM for collaborations ✉️"
    ]
  },
  {
    category: 'Creative & Artist',
    templates: [
      "Capturing moments through my lens. 📸",
      "I don't make mistakes, I make art. 🎨",
      "Music is my escape. 🎧",
      "Words are my power. ✍️",
      "Design is thinking made visual. ✨"
    ]
  },
  {
    category: 'Travel & Lifestyle',
    templates: [
      "Wanderlust and city dust. 🌍",
      "Exploring the world, one city at a time. ✈️",
      "Beach lover & sunset chaser. 🌅",
      "Collecting moments, not things. 🎒",
      "Life is short, travel often. 🗺️"
    ]
  }
];

export default function InstagramBioGenerator() {
  const [name, setName] = useState('');
  const [hobby, setHobby] = useState('');
  const [location, setLocation] = useState('');
  const [generatedBio, setGeneratedBio] = useState('');
  const [copied, setCopied] = useState(false);

  const generateBio = () => {
    const intros = ["Hi, I'm", "Welcome to the world of", "Living life as"];
    const intro = intros[Math.floor(Math.random() * intros.length)];
    
    let bio = `${intro} ${name || '[Your Name]'}\n`;
    if (hobby) bio += `${hobby} enthusiast 🌟\n`;
    if (location) bio += `📍 ${location}\n`;
    bio += "Believer in dreams and hard work. ✨";
    
    setGeneratedBio(bio);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      toolId="instagram-bio-generator"
      title="Instagram Bio Generator"
      description="Create catchy, professional, and stylish Instagram bios with emojis to make your profile stand out."
      category="Social Media"
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">First Impressions Matter</h2>
          <p className="text-gray-600 mb-4">
            Your Instagram bio is the first thing people see when they visit your profile. It needs to be concise, clear, and reflect your personality or brand. Our tool gives you a head start with professional templates and a custom generator.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">What makes a good bio?</h3>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li><strong>Clear Identity:</strong> Tell people who you are and what you do.</li>
            <li><strong>Emojis:</strong> Add personality and visual breaks.</li>
            <li><strong>Call to Action:</strong> Direct users to your link or DMs.</li>
            <li><strong>Line Breaks:</strong> Keep it readable and organized.</li>
          </ul>
        </>
      }
    >
      <div className="space-y-12">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Instagram className="h-32 w-32" />
          </div>
          <div className="relative z-10 space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-pink-500" />
              Custom Bio Builder
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Display Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Your Passion/Hobby</label>
                <input 
                  type="text" 
                  value={hobby} 
                  onChange={(e) => setHobby(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
                  placeholder="e.g. Foodie, Techie"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Location</label>
                <input 
                  type="text" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
                  placeholder="e.g. New York, USA"
                />
              </div>
            </div>
            <button 
              onClick={generateBio}
              className="w-full py-4 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-100"
            >
              <RefreshCw className="h-5 w-5" />
              Generate My Bio
            </button>
            
            {generatedBio && (
              <div className="mt-6 p-6 bg-pink-50 rounded-2xl border border-pink-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="text-gray-800 font-medium whitespace-pre-wrap flex-grow text-center sm:text-left">
                  {generatedBio}
                </div>
                <button 
                  onClick={() => handleCopy(generatedBio)}
                  className={`shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white text-pink-600 border border-pink-200 hover:bg-pink-50'}`}
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BIO_TEMPLATES.map((cat) => (
            <div key={cat.category} className="space-y-4">
              <h4 className="font-bold text-gray-400 text-xs uppercase tracking-[0.2em] px-2">{cat.category}</h4>
              <div className="space-y-3">
                {cat.templates.map((bio, idx) => (
                  <div 
                    key={idx}
                    className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between group hover:border-pink-200 transition-all"
                  >
                    <span className="text-gray-700 font-medium">{bio}</span>
                    <button 
                      onClick={() => handleCopy(bio)}
                      className="p-2 text-gray-400 hover:text-pink-600 transition-colors"
                      title="Copy"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolPageLayout>
  );
}
