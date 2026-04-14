/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import ScrollToTop from './components/ScrollToTop';
import FloatingActions from './components/FloatingActions';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
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
import PercentageCalculator from './pages/tools/PercentageCalculator';
import SIPCalculator from './pages/tools/SIPCalculator';
import LoanCalculator from './pages/tools/LoanCalculator';
import ProfitLossCalculator from './pages/tools/ProfitLossCalculator';
import BMICalculator from './pages/tools/BMICalculator';
import SalaryCalculator from './pages/tools/SalaryCalculator';
import FDCalculator from './pages/tools/FDCalculator';
import WordToPDF from './pages/tools/WordToPDF';
import MergePDF from './pages/tools/MergePDF';
import SplitPDF from './pages/tools/SplitPDF';
import CompressPDF from './pages/tools/CompressPDF';
import PDFToWord from './pages/tools/PDFToWord';
import PDFToJPG from './pages/tools/PDFToJPG';
import JPGToPDF from './pages/tools/JPGToPDF';
import ImageResizer from './pages/tools/ImageResizer';
import JPGToPNG from './pages/tools/JPGToPNG';
import PNGToJPG from './pages/tools/PNGToJPG';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-gray-50 font-sans antialiased">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
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
            <Route path="/tools/percentage-calculator" element={<PercentageCalculator />} />
            <Route path="/tools/sip-calculator" element={<SIPCalculator />} />
            <Route path="/tools/loan-calculator" element={<LoanCalculator />} />
            <Route path="/tools/profit-loss-calculator" element={<ProfitLossCalculator />} />
            <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
            <Route path="/tools/salary-calculator" element={<SalaryCalculator />} />
            <Route path="/tools/fd-calculator" element={<FDCalculator />} />
            <Route path="/tools/word-to-pdf" element={<WordToPDF />} />
            <Route path="/tools/merge-pdf" element={<MergePDF />} />
            <Route path="/tools/split-pdf" element={<SplitPDF />} />
            <Route path="/tools/compress-pdf" element={<CompressPDF />} />
            <Route path="/tools/pdf-to-word" element={<PDFToWord />} />
            <Route path="/tools/pdf-to-jpg" element={<PDFToJPG />} />
            <Route path="/tools/jpg-to-pdf" element={<JPGToPDF />} />
            <Route path="/tools/image-resizer" element={<ImageResizer />} />
            <Route path="/tools/jpg-to-png" element={<JPGToPNG />} />
            <Route path="/tools/png-to-jpg" element={<PNGToJPG />} />
          </Routes>
        </main>
        <Footer />
        <CookieConsent />
        <FloatingActions />
      </div>
    </Router>
  );
}

