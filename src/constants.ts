import { Calculator, Image, FileText, Search, Percent, Clock, Hash, TrendingUp, Landmark, Activity, Wallet, FileCode, FileStack, Scissors, Minimize, Maximize, RefreshCw, Eraser } from 'lucide-react';

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
    id: 'image-resizer',
    title: 'Image Resizer',
    description: 'Resize your images to custom dimensions while maintaining quality.',
    icon: Maximize,
    category: 'Image Tools',
    href: '/tools/image-resizer',
  },
  {
    id: 'jpg-to-png',
    title: 'JPG to PNG',
    description: 'Convert your JPG images to PNG format with transparency support.',
    icon: RefreshCw,
    category: 'Image Tools',
    href: '/tools/jpg-to-png',
  },
  {
    id: 'png-to-jpg',
    title: 'PNG to JPG',
    description: 'Convert your PNG images to JPG format quickly and easily.',
    icon: RefreshCw,
    category: 'Image Tools',
    href: '/tools/png-to-jpg',
  },
  {
    id: 'word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, and paragraphs in your text instantly.',
    icon: Hash,
    category: 'SEO Tools',
    href: '/tools/word-counter',
  },
  {
    id: 'percentage-calculator',
    title: 'Percentage Calculator',
    description: 'Calculate percentages, percentage increases, and decreases instantly.',
    icon: Percent,
    category: 'Calculators',
    href: '/tools/percentage-calculator',
  },
  {
    id: 'sip-calculator',
    title: 'SIP Calculator',
    description: 'Calculate the future value of your Systematic Investment Plan (SIP) investments.',
    icon: TrendingUp,
    category: 'Calculators',
    href: '/tools/sip-calculator',
  },
  {
    id: 'loan-calculator',
    title: 'Loan Calculator',
    description: 'Calculate monthly EMI, total interest, and total repayment for any loan.',
    icon: Landmark,
    category: 'Calculators',
    href: '/tools/loan-calculator',
  },
  {
    id: 'profit-loss-calculator',
    title: 'Profit & Loss Calculator',
    description: 'Calculate profit or loss amount and percentage for your business.',
    icon: TrendingUp,
    category: 'Calculators',
    href: '/tools/profit-loss-calculator',
  },
  {
    id: 'bmi-calculator',
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI) to check your health status.',
    icon: Activity,
    category: 'Calculators',
    href: '/tools/bmi-calculator',
  },
  {
    id: 'salary-calculator',
    title: 'Salary Calculator',
    description: 'Convert your salary between hourly, daily, weekly, monthly, and annual rates.',
    icon: Wallet,
    category: 'Calculators',
    href: '/tools/salary-calculator',
  },
  {
    id: 'fd-calculator',
    title: 'FD Calculator',
    description: 'Calculate the maturity amount and interest earned on your Fixed Deposit (FD).',
    icon: Landmark,
    category: 'Calculators',
    href: '/tools/fd-calculator',
  },
  {
    id: 'word-to-pdf',
    title: 'Word to PDF',
    description: 'Convert your Word documents (.docx) to PDF format instantly.',
    icon: FileCode,
    category: 'PDF Tools',
    href: '/tools/word-to-pdf',
  },
  {
    id: 'merge-pdf',
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into a single document in seconds.',
    icon: FileStack,
    category: 'PDF Tools',
    href: '/tools/merge-pdf',
  },
  {
    id: 'split-pdf',
    title: 'Split PDF',
    description: 'Extract specific pages from your PDF document easily.',
    icon: Scissors,
    category: 'PDF Tools',
    href: '/tools/split-pdf',
  },
  {
    id: 'compress-pdf',
    title: 'Compress PDF',
    description: 'Reduce the file size of your PDF while maintaining quality.',
    icon: Minimize,
    category: 'PDF Tools',
    href: '/tools/compress-pdf',
  },
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    description: 'Extract text from your PDF and convert it into an editable Word document (.docx).',
    icon: FileCode,
    category: 'PDF Tools',
    href: '/tools/pdf-to-word',
  },
  {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG',
    description: 'Convert each page of your PDF into high-quality JPG images.',
    icon: Image,
    category: 'PDF Tools',
    href: '/tools/pdf-to-jpg',
  },
  {
    id: 'jpg-to-pdf',
    title: 'JPG to PDF',
    description: 'Convert your images (JPG, PNG) to a single PDF document.',
    icon: FileText,
    category: 'PDF Tools',
    href: '/tools/jpg-to-pdf',
  },
];

export const CATEGORIES = [
  { name: 'Calculators', icon: Calculator },
  { name: 'Image Tools', icon: Image },
  { name: 'PDF Tools', icon: FileText },
  { name: 'SEO Tools', icon: Search },
];

export const BLOG_POSTS = [
  {
    id: 'optimize-website-images',
    title: "How to Optimize Your Website Images for Better Performance",
    excerpt: "Learn the best practices for image compression and how it can significantly improve your site's loading speed and SEO ranking.",
    content: `
      <p>In today's fast-paced digital world, website performance is more critical than ever. One of the most significant factors affecting page load speed is the size of your images. Large, unoptimized images can slow down your site, leading to a poor user experience and lower search engine rankings.</p>
      
      <h3>Why Image Optimization Matters</h3>
      <p>When a user visits your website, their browser has to download all the assets on the page, including images. If your images are several megabytes in size, it will take a long time to download, especially on mobile devices or slow internet connections.</p>
      
      <h3>Best Practices for Image Optimization</h3>
      <ul>
        <li><strong>Choose the Right Format:</strong> Use JPEG for photographs, PNG for images with transparency, and WebP for the best balance of quality and file size.</li>
        <li><strong>Resize Before Uploading:</strong> Don't upload a 4000px wide image if it's only going to be displayed at 800px.</li>
        <li><strong>Use Compression:</strong> Use tools like our Image Compressor to reduce file size without noticeably affecting quality.</li>
        <li><strong>Implement Lazy Loading:</strong> Only load images as they come into the user's viewport.</li>
      </ul>
      
      <p>By following these simple steps, you can ensure your website remains fast, efficient, and user-friendly.</p>
    `,
    date: "Oct 12, 2023",
    category: "Optimization",
    author: "Admin"
  },
  {
    id: 'understanding-gst',
    title: "Understanding GST: A Comprehensive Guide for Indian Businesses",
    excerpt: "Everything you need to know about Goods and Services Tax in India, from registration to filing returns and calculating tax correctly.",
    content: `
      <p>Goods and Services Tax (GST) has revolutionized the indirect tax structure in India. For businesses, understanding the nuances of GST is essential for compliance and smooth operations.</p>
      
      <h3>What is GST?</h3>
      <p>GST is a destination-based tax on the consumption of goods and services. It is levied at all stages right from manufacture up to final consumption with credit of taxes paid at previous stages available as setoff.</p>
      
      <h3>Key Components of GST</h3>
      <ul>
        <li><strong>CGST:</strong> Central GST, collected by the Central Government on intra-state sales.</li>
        <li><strong>SGST:</strong> State GST, collected by the State Government on intra-state sales.</li>
        <li><strong>IGST:</strong> Integrated GST, collected by the Central Government for inter-state sales and imports.</li>
      </ul>
      
      <h3>How to Calculate GST</h3>
      <p>Calculating GST is straightforward if you know the tax rate applicable to your product or service. You can use our GST Calculator to quickly find the tax amount and the total price including GST.</p>
    `,
    date: "Oct 10, 2023",
    category: "Finance",
    author: "Admin"
  },
  {
    id: 'top-10-seo-tools',
    title: "Top 10 SEO Tools Every Content Creator Should Use",
    excerpt: "Boost your search engine visibility with these essential free tools designed to help you rank higher and reach more people.",
    content: `
      <p>Search Engine Optimization (SEO) is the key to getting your content seen by the right audience. While there are many paid tools available, there are also several powerful free tools that can help you optimize your content.</p>
      
      <h3>Essential Free SEO Tools</h3>
      <ol>
        <li><strong>Google Search Console:</strong> Monitor your site's presence in Google Search results.</li>
        <li><strong>Google Analytics:</strong> Understand how users interact with your website.</li>
        <li><strong>Word Counter:</strong> Ensure your content meets the recommended length for SEO.</li>
        <li><strong>PageSpeed Insights:</strong> Analyze and improve your website's performance.</li>
      </ol>
      
      <p>Using these tools in combination will give you a comprehensive view of your SEO performance and help you make data-driven decisions to improve your rankings.</p>
    `,
    date: "Oct 05, 2023",
    category: "SEO",
    author: "Admin"
  },
  {
    id: 'managing-pdf-documents',
    title: "The Ultimate Guide to Managing PDF Documents Efficiently",
    excerpt: "Discover how to merge, split, and compress PDF files to streamline your workflow and save storage space.",
    content: `
      <p>PDFs are the standard for document sharing, but they can be tricky to manage without the right tools. Whether you're a student, a professional, or a business owner, knowing how to handle PDFs efficiently can save you hours of work.</p>
      
      <h3>Common PDF Challenges</h3>
      <p>Many users struggle with large PDF files that are too big to email, or need to combine multiple reports into a single document. Others might need to extract just a few pages from a long manual.</p>
      
      <h3>Essential PDF Operations</h3>
      <ul>
        <li><strong>Merging PDFs:</strong> Combine multiple documents into one for easier sharing and organization.</li>
        <li><strong>Splitting PDFs:</strong> Extract specific pages or sections from a larger file.</li>
        <li><strong>Compressing PDFs:</strong> Reduce file size for faster uploads and downloads without sacrificing readability.</li>
        <li><strong>Converting Formats:</strong> Switch between Word, JPG, and PDF depending on your needs.</li>
      </ul>
      
      <p>Our suite of <a href="/#pdf-tools">PDF Tools</a> is designed to handle all these tasks directly in your browser, ensuring your data stays private and secure.</p>
    `,
    date: "Nov 15, 2023",
    category: "Productivity",
    author: "Admin"
  },
  {
    id: 'sip-investment-benefits',
    title: "Why You Should Use a SIP Calculator for Your Investments",
    excerpt: "Learn how Systematic Investment Plans (SIP) can help you build wealth over time and how to project your returns accurately.",
    content: `
      <p>Investing in the stock market or mutual funds can be intimidating. However, Systematic Investment Plans (SIPs) offer a disciplined way to invest small amounts regularly, making wealth creation accessible to everyone.</p>
      
      <h3>The Power of Compounding</h3>
      <p>The secret to SIP success is compounding. By reinvesting your earnings, you earn returns on your returns. Over a long period, even small monthly investments can grow into a substantial corpus.</p>
      
      <h3>Why Use a SIP Calculator?</h3>
      <p>A SIP calculator helps you visualize your financial future. By inputting your monthly investment, expected return rate, and time horizon, you can see exactly how much your money could grow.</p>
      
      <p>Ready to plan your financial goals? Try our <a href="/tools/sip-calculator">SIP Calculator</a> today and take the first step towards financial independence.</p>
    `,
    date: "Nov 20, 2023",
    category: "Finance",
    author: "Admin"
  },
  {
    id: 'bmi-health-tracking',
    title: "The Importance of BMI in Tracking Your Health Journey",
    excerpt: "Understand what Body Mass Index (BMI) is, why it matters, and how to use it as a starting point for a healthier lifestyle.",
    content: `
      <p>Body Mass Index (BMI) is a simple calculation using a person's height and weight. While it doesn't measure body fat directly, it is a reliable indicator of body fatness for most people.</p>
      
      <h3>What Your BMI Score Means</h3>
      <p>BMI categories help identify if you are underweight, at a healthy weight, overweight, or obese. This information is crucial for assessing potential health risks like heart disease, type 2 diabetes, and high blood pressure.</p>
      
      <h3>Using BMI as a Tool</h3>
      <p>BMI should be seen as a screening tool, not a diagnostic one. It's a great starting point for conversations with your doctor about your health and fitness goals.</p>
      
      <p>Calculate your score in seconds with our <a href="/tools/bmi-calculator">BMI Calculator</a> and stay informed about your health status.</p>
    `,
    date: "Dec 01, 2023",
    category: "Health",
    author: "Admin"
  },
  {
    id: 'word-to-pdf-formatting',
    title: "How to Convert Word to PDF Without Losing Formatting",
    excerpt: "A step-by-step guide to ensuring your documents look exactly the same after conversion, regardless of the device they are viewed on.",
    content: `
      <p>We've all been there: you spend hours perfecting a Word document, only for the fonts and layout to break when someone else opens it. Converting to PDF is the best way to preserve your hard work.</p>
      
      <h3>Why Formatting Breaks</h3>
      <p>Different versions of Word, missing fonts, and varying screen sizes can all cause a .docx file to look different on different devices. PDFs lock the layout in place.</p>
      
      <h3>Tips for Perfect Conversion</h3>
      <ul>
        <li><strong>Use Standard Fonts:</strong> Stick to widely available fonts like Arial or Times New Roman.</li>
        <li><strong>Check Your Margins:</strong> Ensure your layout isn't too close to the edges.</li>
        <li><strong>Use a Reliable Converter:</strong> Not all converters are created equal.</li>
      </ul>
      
      <p>Our <a href="/tools/word-to-pdf">Word to PDF converter</a> uses high-fidelity rendering to ensure your document's layout, images, and fonts remain exactly as you intended.</p>
    `,
    date: "Dec 05, 2023",
    category: "Productivity",
    author: "Admin"
  }
];
