import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, MessageSquare, X, Send, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { TOOLS } from '@/constants';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  links?: { title: string; href: string }[];
}

const KEYWORD_MAP: { keywords: string[]; toolIds: string[]; specialHref?: { title: string; href: string } }[] = [
  { keywords: ['app', 'android', 'apk', 'download', 'mobile'], toolIds: [], specialHref: { title: 'Download Android App', href: '/download-app' } },
  { keywords: ['gst', 'tax', 'goods'], toolIds: ['gst-calculator'] },
  { keywords: ['emi', 'loan', 'mortgage', 'repayment'], toolIds: ['emi-calculator', 'loan-calculator'] },
  { keywords: ['age', 'dob', 'birthday', 'calculate age'], toolIds: ['age-calculator'] },
  { keywords: ['pdf', 'merge', 'split', 'compress pdf', 'word to pdf', 'pdf to word'], toolIds: ['merge-pdf', 'split-pdf', 'compress-pdf', 'word-to-pdf', 'pdf-to-word'] },
  { keywords: ['image', 'resize', 'compress', 'jpg', 'png', 'background', 'remove bg'], toolIds: ['image-compressor', 'image-resizer', 'background-remover', 'jpg-to-png', 'png-to-jpg'] },
  { keywords: ['sip', 'investment', 'mutual fund'], toolIds: ['sip-calculator'] },
  { keywords: ['profit', 'loss', 'business'], toolIds: ['profit-loss-calculator'] },
  { keywords: ['bmi', 'health', 'weight'], toolIds: ['bmi-calculator'] },
  { keywords: ['salary', 'pay', 'income'], toolIds: ['salary-calculator'] },
  { keywords: ['fd', 'fixed deposit', 'savings'], toolIds: ['fd-calculator'] },
  { keywords: ['word', 'count', 'characters'], toolIds: ['word-counter'] },
];

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I am your Tool Assistant. How can I help you find a tool today?',
      sender: 'bot'
    }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isChatOpen && suggestionsRef.current) {
      const el = suggestionsRef.current;
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: 'auto'
        });
      };
      el.addEventListener('wheel', onWheel, { passive: false });
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, [isChatOpen]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Logic for bot response
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let matchedToolIds: string[] = [];
      let specialLinks: { title: string; href: string }[] = [];

      for (const entry of KEYWORD_MAP) {
        if (entry.keywords.some(k => lowerText.includes(k))) {
          matchedToolIds = [...matchedToolIds, ...entry.toolIds];
          if (entry.specialHref) {
            specialLinks.push(entry.specialHref);
          }
        }
      }

      // Remove duplicates
      matchedToolIds = Array.from(new Set(matchedToolIds));

      const matchedTools = TOOLS.filter(t => matchedToolIds.includes(t.id));
      const finalLinks = [...specialLinks, ...matchedTools.map(t => ({ title: t.title, href: t.href }))];

      if (finalLinks.length > 0) {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: `I found ${finalLinks.length} result(s) for you:`,
          sender: 'bot',
          links: finalLinks
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: "I couldn't find a specific tool for that. Try keywords like 'GST', 'EMI', 'PDF', or 'Image'.",
          sender: 'bot'
        };
        setMessages(prev => [...prev, botMsg]);
      }
    }, 600);
  };

  const suggestions = ['Download App', 'GST Calculator', 'EMI Calculator', 'PDF Tools', 'Image Compressor', 'Age Calculator'];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="p-3 bg-white text-gray-900 rounded-full shadow-xl border border-gray-100 hover:bg-gray-50 transition-colors pointer-events-auto group"
            title="Scroll to top"
          >
            <ArrowUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Container */}
      <div className="relative flex flex-col items-end pointer-events-auto">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="mb-4 w-[350px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-120px)] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
            >
              {/* Chat Header */}
              <div className="bg-blue-600 p-4 text-white flex justify-between items-center flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Tool Assistant</h3>
                    <p className="text-[10px] text-blue-100">Always here to help</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 scroll-smooth">
                {messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                    }`}>
                      {msg.text}
                      {msg.links && (
                        <div className="mt-3 space-y-2">
                          {msg.links.map((link, i) => (
                            <Link
                              key={i}
                              to={link.href}
                              onClick={() => setIsChatOpen(false)}
                              className="block p-2 bg-blue-50 text-blue-700 rounded-lg font-bold text-xs hover:bg-blue-100 transition-colors border border-blue-100"
                            >
                              {link.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Suggestions */}
              <div 
                ref={suggestionsRef}
                className="px-4 py-2 flex gap-2 overflow-x-auto thin-scrollbar border-t border-gray-50 bg-white scroll-smooth flex-shrink-0"
              >
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="flex-shrink-0 whitespace-nowrap px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search for a tool..."
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 transition-colors shadow-lg shadow-blue-100"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 pointer-events-auto ${
            isChatOpen ? 'bg-gray-900 text-white' : 'bg-blue-600 text-white'
          }`}
        >
          {isChatOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </motion.button>
      </div>
    </div>
  );
}
