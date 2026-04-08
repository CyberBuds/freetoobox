import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('freetoolsbox_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('freetoolsbox_consent', 'accepted');
    setIsVisible(false);
    // Here you would typically initialize AdSense or other tracking
    if (window.adsbygoogle) {
      (window.adsbygoogle as any).pauseAdRequests = 0;
    }
  };

  const handleDecline = () => {
    localStorage.setItem('freetoolsbox_consent', 'declined');
    setIsVisible(false);
    // Here you would typically disable tracking
    if (window.adsbygoogle) {
      (window.adsbygoogle as any).pauseAdRequests = 1;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="mx-auto max-w-7xl">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">We value your privacy</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    We use cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> for more details.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <button
                  onClick={handleDecline}
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="w-full sm:w-auto px-8 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  Accept All
                </button>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 md:hidden"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
