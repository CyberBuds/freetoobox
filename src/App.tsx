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
import CharacterCounter from './pages/tools/CharacterCounter';
import CaseConverter from './pages/tools/CaseConverter';
import PasswordGenerator from './pages/tools/PasswordGenerator';
import PetrolCostCalculator from './pages/tools/PetrolCostCalculator';
import TextToSlug from './pages/tools/TextToSlug';
import IncomeTaxCalculator from './pages/tools/IncomeTaxCalculator';
import HRACalculator from './pages/tools/HRACalculator';
import GratuityCalculator from './pages/tools/GratuityCalculator';
import EPFCalculator from './pages/tools/EPFCalculator';
import JSONFormatter from './pages/tools/JSONFormatter';
import Base64Tool from './pages/tools/Base64Tool';
import HTMLMinifier from './pages/tools/HTMLMinifier';
import CSSMinifier from './pages/tools/CSSMinifier';
import MetaTagGenerator from './pages/tools/MetaTagGenerator';
import RobotsTxtGenerator from './pages/tools/RobotsTxtGenerator';
import SitemapGenerator from './pages/tools/SitemapGenerator';
import KeywordDensityChecker from './pages/tools/KeywordDensityChecker';
import QRCodeGenerator from './pages/tools/QRCodeGenerator';
import AreaConverter from './pages/tools/AreaConverter';
import LandUnitConverter from './pages/tools/LandUnitConverter';
import CurrencyConverter from './pages/tools/CurrencyConverter';

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
            <Route path="/tools/character-counter" element={<CharacterCounter />} />
            <Route path="/tools/case-converter" element={<CaseConverter />} />
            <Route path="/tools/password-generator" element={<PasswordGenerator />} />
            <Route path="/tools/petrol-cost-calculator" element={<PetrolCostCalculator />} />
            <Route path="/tools/text-to-slug" element={<TextToSlug />} />
            <Route path="/tools/income-tax-calculator" element={<IncomeTaxCalculator />} />
            <Route path="/tools/hra-calculator" element={<HRACalculator />} />
            <Route path="/tools/gratuity-calculator" element={<GratuityCalculator />} />
            <Route path="/tools/epf-calculator" element={<EPFCalculator />} />
            <Route path="/tools/json-formatter" element={<JSONFormatter />} />
            <Route path="/tools/base64-tool" element={<Base64Tool />} />
            <Route path="/tools/html-minifier" element={<HTMLMinifier />} />
            <Route path="/tools/css-minifier" element={<CSSMinifier />} />
            <Route path="/tools/meta-tag-generator" element={<MetaTagGenerator />} />
            <Route path="/tools/robots-txt-generator" element={<RobotsTxtGenerator />} />
            <Route path="/tools/sitemap-generator" element={<SitemapGenerator />} />
            <Route path="/tools/keyword-density-checker" element={<KeywordDensityChecker />} />
            <Route path="/tools/qr-code-generator" element={<QRCodeGenerator />} />
            <Route path="/tools/area-converter" element={<AreaConverter />} />
            <Route path="/tools/land-unit-converter" element={<LandUnitConverter />} />
            <Route path="/tools/currency-converter" element={<CurrencyConverter />} />
          </Routes>
        </main>
        <Footer />
        <CookieConsent />
        <FloatingActions />
      </div>
    </Router>
  );
}

