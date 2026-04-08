/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Blog from './pages/Blog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Contact from './pages/Contact';
import About from './pages/About';

// Tool Pages
import GSTCalculator from './pages/tools/GSTCalculator';
import EMICalculator from './pages/tools/EMICalculator';
import AgeCalculator from './pages/tools/AgeCalculator';
import ImageCompressor from './pages/tools/ImageCompressor';
import WordCounter from './pages/tools/WordCounter';

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-gray-50 font-sans antialiased">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            
            {/* Tools */}
            <Route path="/tools/gst-calculator" element={<GSTCalculator />} />
            <Route path="/tools/emi-calculator" element={<EMICalculator />} />
            <Route path="/tools/age-calculator" element={<AgeCalculator />} />
            <Route path="/tools/image-compressor" element={<ImageCompressor />} />
            <Route path="/tools/word-counter" element={<WordCounter />} />
          </Routes>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </Router>
  );
}

