import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';
import ToolCard from '@/components/ToolCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import { TOOLS, CATEGORIES } from '@/constants';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
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
              className="mt-10 flex items-center justify-center gap-x-6"
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

      {/* Featured Tools Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Popular Tools</h2>
            <p className="mt-2 text-gray-500">Our most used tools by the community</p>
          </div>
          <Link to="/tools" className="hidden sm:flex items-center gap-1 text-blue-600 font-semibold hover:underline">
            View all tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOOLS.map((tool) => (
            <ToolCard 
              key={tool.id}
              id={tool.id}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              href={tool.href}
              category={tool.category}
            />
          ))}
        </div>
      </section>

      {/* Ad Placeholder Middle */}
      <div className="mx-auto max-w-7xl px-4 w-full">
        <AdPlaceholder className="h-32" label="Middle Content Ad" />
      </div>

      {/* Features Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-500">All tools are optimized for speed, ensuring you get results in milliseconds.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-500">Your data never leaves your browser. We process everything locally for maximum privacy.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <Smartphone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile Ready</h3>
              <p className="text-gray-500">Fully responsive design that works perfectly on your phone, tablet, or desktop.</p>
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
