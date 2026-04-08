import { Calculator, Image, FileText, Search, Percent, Clock, Hash } from 'lucide-react';

export const TOOLS = [
  {
    id: 'gst-calculator',
    title: 'GST Calculator',
    description: 'Quickly calculate GST (Goods and Services Tax) for your business transactions in India.',
    icon: Percent,
    category: 'Calculators',
    href: '/tools/gst-calculator',
  },
  {
    id: 'emi-calculator',
    title: 'EMI Calculator',
    description: 'Calculate your monthly loan repayments easily with our professional EMI calculator.',
    icon: Calculator,
    category: 'Calculators',
    href: '/tools/emi-calculator',
  },
  {
    id: 'age-calculator',
    title: 'Age Calculator',
    description: 'Find out exactly how old you are in years, months, and days with a single click.',
    icon: Clock,
    category: 'Calculators',
    href: '/tools/age-calculator',
  },
  {
    id: 'image-compressor',
    title: 'Image Compressor',
    description: 'Reduce image file size without losing quality. Perfect for web optimization.',
    icon: Image,
    category: 'Image Tools',
    href: '/tools/image-compressor',
  },
  {
    id: 'word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, and paragraphs in your text instantly.',
    icon: Hash,
    category: 'SEO Tools',
    href: '/tools/word-counter',
  },
];

export const CATEGORIES = [
  { name: 'Calculators', icon: Calculator },
  { name: 'Image Tools', icon: Image },
  { name: 'PDF Tools', icon: FileText },
  { name: 'SEO Tools', icon: Search },
];
