import { Link } from 'react-router-dom';
import { Wrench, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600 mb-4">
              <Wrench className="h-6 w-6" />
              <span>FreeToolsHub</span>
            </Link>
            <p className="text-gray-500 max-w-xs">
              Your one-stop destination for free, high-quality online tools. From calculators to image utilities, we've got you covered.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-500 hover:text-blue-600">Home</Link></li>
              <li><Link to="/tools" className="text-gray-500 hover:text-blue-600">Tools</Link></li>
              <li><Link to="/blog" className="text-gray-500 hover:text-blue-600">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600">Terms of Service</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} FreeToolsHub. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="text-gray-400 hover:text-gray-500"><Github className="h-5 w-5" /></a>
            <a href="#" className="text-gray-400 hover:text-gray-500"><Mail className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
