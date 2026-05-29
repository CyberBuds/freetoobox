import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Smartphone, Search, TrendingUp, Download, CheckCircle2, Calculator, FileText, Image as ImageIcon, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
import ToolCard from '@/components/ToolCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import SEO from '@/components/SEO';
import { TOOLS, CATEGORIES, BLOG_POSTS } from '@/constants';
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tools?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="flex flex-col gap-10 sm:gap-16 pb-16">
      <SEO 
        title="FreeToolsBox - 100% Free Online Tools for Everyone"
        description="Access a suite of professional-grade tools for calculators, image processing, and SEO. Simple, fast, and completely free online tools at FreeToolsBox.in"
        keywords="free online tools, GST calculator India, EMI calculator, age calculator, image compressor, word counter, SEO tools, web utilities, FreeToolsBox"
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-20 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl"
            >
              Free Online Tools for <span className="text-blue-600">Everyone</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-gray-500"
            >
              Access a suite of professional-grade tools for calculators, image processing, and SEO. Simple, fast, and completely free.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-10 max-w-xl"
            >
              <form onSubmit={handleSearch} className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What tool are you looking for? (e.g., PDF, Calculator)"
                  className="block w-full pl-14 pr-4 py-5 text-lg rounded-2xl border-2 border-gray-100 focus:border-blue-500 outline-none shadow-xl shadow-blue-500/5 transition-all bg-gray-50/50"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  Search
                </button>
              </form>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex items-center justify-center gap-x-6"
            >
              <Link
                to="/tools"
                className="rounded-full bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
              >
                Explore All Tools
              </Link>
              <Link to="/blog" className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-1">
                Read our blog <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
      </section>

      {/* Ad Placeholder Top */}
      <div className="mx-auto max-w-7xl px-4 w-full">
        <AdPlaceholder className="h-24" label="Top Banner Ad" />
      </div>

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
          <p className="mt-4 text-gray-500">Find the right tool for your specific needs</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/tools?category=${cat.name.toLowerCase().replace(' ', '-')}`}
              className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group"
            >
              <div className="mb-4 p-3 rounded-full bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <cat.icon className="h-8 w-8" />
              </div>
              <span className="font-semibold text-gray-900">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Tools Section - Bento Grid Style */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">Top Rated</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Popular Tools</h2>
            <p className="mt-2 text-gray-500 max-w-lg text-sm sm:text-base">Hand-picked by our community for their reliability and ease of use.</p>
          </div>
          <Link to="/tools" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
            View all tools <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {/* Tool 1 - Large Featured */}
          <div className="md:col-span-2 lg:col-span-3 row-span-2">
            <ToolCard 
              {...TOOLS.find(t => t.id === 'gst-calculator')!} 
              className="h-full border-2 border-blue-100/50 shadow-blue-500/10 hover:border-blue-500/50"
            />
          </div>
          {/* Tool 2 */}
          <div className="md:col-span-2 lg:col-span-3">
            <ToolCard {...TOOLS.find(t => t.id === 'emi-calculator')!} />
          </div>
          {/* Tool 3 */}
          <div className="md:col-span-2 lg:col-span-3">
            <ToolCard {...TOOLS.find(t => t.id === 'image-compressor')!} />
          </div>
          {/* Smaller ones */}
          <div className="md:col-span-2 lg:col-span-2">
            <ToolCard {...TOOLS.find(t => t.id === 'word-counter')!} />
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <ToolCard {...TOOLS.find(t => t.id === 'pdf-to-word')!} />
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <ToolCard {...TOOLS.find(t => t.id === 'merge-pdf')!} />
          </div>
        </div>
      </section>

      {/* Trending / Viral Tools Section */}
      <section className="bg-gray-900 py-16 sm:py-24 sm:mx-4 lg:mx-8 sm:rounded-[3rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px]"></div>
        
        <div className="mx-auto max-w-7xl px-6 sm:px-10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                <span className="text-blue-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">Live Trends</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Viral & Trending</h2>
              <p className="mt-3 text-gray-400 max-w-md text-sm sm:text-base leading-relaxed">What everyone is using right now across social media and creative projects.</p>
            </div>
            <Link to="/tools?category=social-media" className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-2xl font-bold hover:bg-white/20 transition-all text-sm sm:text-base">
              See more <Zap className="h-4 w-4 text-yellow-400" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              'instagram-font-generator',
              'youtube-thumbnail-downloader',
              'meme-generator',
              'qr-code-generator'
            ].map((id) => {
              const tool = TOOLS.find(t => t.id === id)!;
              return (
                <Link 
                  key={id}
                  to={tool.href}
                  className="group relative bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500"
                >
                  <div className="mb-4 sm:mb-6 p-4 rounded-2xl bg-white/5 text-blue-400 group-hover:scale-110 transition-transform duration-500 inline-block">
                    <tool.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{tool.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{tool.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recently Added Tools */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Recently Added</h2>
            <p className="mt-2 text-gray-500 text-sm sm:text-base">Fresh tools added to our collection this week.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            'sql-formatter',
            'regex-tester',
            'jwt-decoder',
            'uuid-generator',
            'timestamp-converter',
            'curl-converter',
            'yaml-formatter',
            'markdown-previewer'
          ].slice(0, 4).map((id) => {
            const tool = TOOLS.find(t => t.id === id)!;
            return (
              <Link 
                key={id}
                to={tool.href}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all group"
              >
                <div className="p-3 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <tool.icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 truncate">{tool.title}</h3>
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">New Tool</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Ad Placeholder Middle */}
      <div className="mx-auto max-w-7xl px-4 w-full">
        <AdPlaceholder className="h-32" label="Middle Content Ad" />
      </div>

      {/* Latest from the Blog */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Blog & Guides</h2>
            <p className="mt-2 text-gray-500 max-w-lg text-sm sm:text-base">Expert tips on how to get the most out of our tools.</p>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
            Visit our blog <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider px-2 py-1 bg-blue-50 rounded-lg">{post.category}</span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="mt-auto flex items-center text-blue-600 text-sm font-bold group-hover:underline">
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* App Download CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-8 sm:p-16 text-center relative overflow-hidden group shadow-2xl shadow-blue-500/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32 group-hover:bg-white/20 transition-all duration-700"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl translate-y-32 -translate-x-32 group-hover:bg-indigo-500/30 transition-all duration-700"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-6">
              <Download className="h-4 w-4" />
              Available for Android
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 tracking-tight">Get the FreeToolsBox App</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience our tools with native performance, offline support, and system integration. 
              The ultimate toolkit for your Android device, 100% free.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/download-app"
                className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                Download Now
              </Link>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle2 className="h-5 w-5 text-blue-300" />
                No registration required
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl px-2">Why Use FreeToolsBox.in?</h2>
            <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-3xl mx-auto px-4">
              Our mission is to provide high-quality, professional utilities for everyone without the need for expensive subscriptions or account registration. Here is why thousands of users trust us every day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast & Reliable</h3>
              <p className="text-gray-500">All tools are optimized for speed, ensuring you get results in milliseconds. We use modern web technologies to process data instantly.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">100% Secure & Private</h3>
              <p className="text-gray-500">Your data never leaves your browser. We process everything locally (client-side) for maximum privacy. We don't store your sensitive information.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <Smartphone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Completely Free, Always</h3>
              <p className="text-gray-500">No hidden costs, no premium tiers, and no registration required. Every tool is accessible to everyone at FreeToolsBox.in.</p>
            </div>
          </div>

          <div className="mt-24 bg-blue-50/50 rounded-[3rem] p-8 sm:p-16 border border-blue-100">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Your Multi-Purpose Digital Toolkit</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  In today's digital landscape, the need for quick, reliable, and secure tools is greater than ever. Whether you're a business owner calculating GST, a student managing PDF assignments, or a developer optimizing images for the web, <span className="text-blue-600 font-bold">FreeToolsBox.in</span> is your one-stop destination.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                {[
                  {
                    icon: Calculator,
                    title: "Financial Calculators",
                    desc: "From EMI and SIP calculators to complex GST and Profit-Loss tools, we help you make informed financial decisions."
                  },
                  {
                    icon: FileText,
                    title: "PDF Management",
                    desc: "Merge, split, compress, and convert PDF documents directly in your browser without software installations."
                  },
                  {
                    icon: ImageIcon,
                    title: "Image Optimization",
                    desc: "Resize and compress images to improve your website's performance and SEO ranking."
                  },
                  {
                    icon: Wrench,
                    title: "Professional Utilities",
                    desc: "Word counters, percentage calculators, and more to streamline your daily tasks."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-5 group">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-sm border border-blue-100 group-hover:scale-110 transition-transform">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center p-6 bg-white rounded-2xl border border-blue-100/50 shadow-sm">
                <p className="text-sm font-medium text-gray-600 flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Our commitment to user experience means no annoying pop-ups, no tracking, and a clean interface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placeholder Bottom */}
      <div className="mx-auto max-w-7xl px-4 w-full">
        <AdPlaceholder className="h-24" label="Bottom Banner Ad" />
      </div>
    </div>
  );
}
