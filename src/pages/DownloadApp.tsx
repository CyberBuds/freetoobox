import { Smartphone, Download, Zap, Shield, Star, CheckCircle2, X, Heart, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AdPlaceholder from '@/components/AdPlaceholder';
import { useState } from 'react';

export default function DownloadApp() {
  const [showThankYou, setShowThankYou] = useState(false);

  const handleDownload = () => {
    setShowThankYou(true);
    // The actual download is handled by the anchor tag's href and download attribute
  };
  return (
    <div className="min-h-screen pt-20 pb-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider mb-6"
              >
                <Smartphone className="h-4 w-4" />
                Now on Android
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6"
              >
                Tools you love, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  now in your pocket.
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Experience the full power of FreeToolsBox.in with our official Android app. 
                Fast, offline-ready, and 100% free forever. No ads, no tracking.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              >
                <a
                  href="https://github.com/CyberBuds/freetoobox/releases/latest/download/freetoolsbox.apk"
                  download
                  onClick={handleDownload}
                  className="flex items-center gap-3 bg-gray-900 border-2 border-gray-800 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gray-900/10"
                >
                  <Download className="h-6 w-6" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold text-gray-400 leading-none">Download for</div>
                    <div className="text-lg leading-tight font-extrabold items-center flex gap-1">Android <span>(APK)</span></div>
                  </div>
                </a>
                <div className="flex items-center gap-4 px-6 md:px-0">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-bold text-gray-900">5k+</span> active users
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="flex-1 relative">
              <motion.div
                initial={{ opacity: 0, rotate: 5, x: 50 }}
                animate={{ opacity: 1, rotate: 0, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                {/* Visual Phone Mockup */}
                <div className="relative mx-auto w-[280px] h-[580px] bg-gray-900 rounded-[3rem] p-3 shadow-[0_0_80px_rgba(37,99,235,0.15)] border-[8px] border-gray-800">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl"></div>
                  <div className="w-full h-full bg-blue-600 rounded-[2.5rem] overflow-hidden p-6 flex flex-col items-center justify-center text-center text-white relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-600 via-blue-500 to-indigo-700 opacity-90"></div>
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                        <Zap className="h-10 w-10 text-white fill-white" />
                      </div>
                      <h3 className="text-2xl font-black mb-2 tracking-tight">FreeToolsBox</h3>
                      <p className="text-sm text-blue-100 font-medium">Ultimate Utility Toolkit</p>
                      
                      <div className="mt-12 space-y-3">
                        {[
                          "All Tools Integrated",
                          "Offline Access",
                          "Night Mode Support",
                          "Ultra Fast Performance"
                        ].map((feat) => (
                          <div key={feat} className="flex items-center gap-2 py-2 px-4 bg-white/10 rounded-xl text-left text-xs whitespace-nowrap overflow-hidden">
                            <CheckCircle2 className="h-3 w-3 text-blue-300 shrink-0" />
                            {feat}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Decorative Floating Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-20"
              >
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold text-gray-900">4.9/5 Rating</span>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute top-1/2 -left-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-20"
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-bold text-gray-900">Privacy First</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20 text-center">
         <AdPlaceholder label="App Page Header Ad" className="h-32 mb-16" />
      </div>

      {/* Features Grid */}
      <section className="bg-gray-50 py-24 border-y border-gray-200/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Everything you need, everywhere you go.</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">The FreeToolsBox app brings our entire collection of 100+ tools to your Android device with exclusive features.</p>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Optimized Performance",
                description: "Built for speed. The native app loads 2x faster than the web version even on slower 3G connections."
              },
              {
                icon: Shield,
                title: "Local Execution",
                description: "Most tools process data entirely on your device. Your sensitive data never leaves your phone."
              },
              {
                icon: Smartphone,
                title: "System Integration",
                description: "Share files directly from your gallery or file manager to our PDF and Image tools for instant processing."
              },
              {
                icon: CheckCircle2,
                title: "Dark Mode Native",
                description: "Beautifully designed dark mode that follows your system settings to reduce eye strain at night."
              },
              {
                icon: Star,
                title: "Quick Access",
                description: "Pin your most used tools to your home screen with App Shortcuts for one-tap utility access."
              },
              {
                icon: Download,
                title: "Small Build Size",
                description: "At under 10MB, FreeToolsBox is one of the most efficient utility apps available on Android."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Install Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-[3rem] p-10 sm:p-20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 tracking-tight">How to install</h2>
                <div className="space-y-8">
                  {[
                    {
                      step: "01",
                      title: "Download the APK",
                      desc: "Click the download button above to save the FreeToolsBox APK file to your device."
                    },
                    {
                      step: "02",
                      title: "Allow Unknown Sources",
                      desc: "If prompted, enable 'Install from Unknown Sources' in your browser or file manager settings."
                    },
                    {
                      step: "03",
                      title: "Open and Install",
                      desc: "Locate the file in your Downloads folder and tap it to complete the installation."
                    }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-6">
                      <div className="text-4xl font-black text-blue-500/30 shrink-0 tabular-nums leading-none">{item.step}</div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="inline-block p-1 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2.5rem] shadow-2xl">
                  <div className="bg-white rounded-[2.4rem] p-8 max-w-sm">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6">
                      <Download className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to start?</h3>
                    <p className="text-gray-500 text-sm mb-8">Join thousands of users who have already switched to the FreeToolsBox app for their daily tasks.</p>
                    <a
                      href="https://github.com/CyberBuds/freetoobox/releases/latest/download/freetoolsbox.apk"
                      download
                      onClick={handleDownload}
                      className="block w-full text-center bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                    >
                      Download APK Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center pb-8">
        <AdPlaceholder label="Download Page Bottom Ad" className="h-24" />
      </div>

      {/* Thank You Modal */}
      <AnimatePresence>
        {showThankYou && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowThankYou(false)}
              className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setShowThankYou(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-900"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="p-8 sm:p-12 text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <Download className="h-10 w-10 text-blue-600 animate-bounce" />
                </div>
                
                <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Thanks for downloading!</h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  Your download has started. If it hasn't, 
                  <a href="https://github.com/CyberBuds/freetoobox/releases/latest/download/freetoolsbox.apk" className="text-blue-600 font-bold hover:underline ml-1">click here to retry</a>.
                </p>

                <div className="bg-gray-50 rounded-3xl p-6 text-left border border-gray-100 mb-8">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    Next Steps:
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex gap-3">
                      <span className="font-bold text-blue-600">1.</span>
                      Open the APK file once downloaded
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-blue-600">2.</span>
                      Allow 'Install from Unknown Sources' if prompted
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-blue-600">3.</span>
                      Enjoy the full FreeToolsBox experience!
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => setShowThankYou(false)}
                    className="flex-1 bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-colors"
                  >
                    Got it, thanks!
                  </button>
                  <a 
                    href="https://github.com/CyberBuds/freetoobox"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border-2 border-gray-100 font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    Star on GitHub
                  </a>
                </div>
              </div>
              
              <div className="bg-blue-600 py-4 px-8 text-center">
                <p className="text-white text-xs font-medium flex items-center justify-center gap-2">
                  Built with <Heart className="h-3 w-3 fill-red-400 text-red-400" /> for the community
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
