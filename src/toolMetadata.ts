export interface FAQ {
  question: string;
  answer: string;
}

export const TOOL_METADATA: Record<string, { faqs: FAQ[] }> = {
  'gst-calculator': {
    faqs: [
      {
        question: "What exactly is GST in the Indian context?",
        answer: "Goods and Services Tax (GST) is a comprehensive indirect tax destination-based tax that replaced various indirect taxes in India such as VAT, service tax, and excise duty. It was implemented on July 1, 2017, to create a 'One Nation, One Tax' system."
      },
      {
        question: "What are the different GST slabs in India?",
        answer: "The Indian government has categorized goods and services into four primary tax slabs: 5%, 12%, 18%, and 28%. Some essential items like unbranded food grains are exempted (0%), while certain luxury items attract an additional cess."
      },
      {
        question: "How do I calculate GST Inclusive vs. Exclusive ?",
        answer: "For Exclusive: GST Amount = (Original Price * GST Rate) / 100. For Inclusive: GST Amount = Price - (Price * (100 / (100 + GST Rate))). Our calculator handles both methods instantly."
      },
      {
        question: "What is the difference between CGST, SGST, and IGST ?",
        answer: "CGST and SGST are collected for intra-state transactions (within the same state) and are shared between Central and State governments. IGST is collected for inter-state transactions and is collected by the Center."
      },
      {
        question: "Who needs to register for GST?",
        answer: "Generally, businesses with an annual turnover exceeding ₹40 lakhs (₹20 lakhs for services) are required to register. However, requirements can vary based on the state and nature of the business."
      },
      {
        question: "Is this GST calculator useful for filing returns?",
        answer: "Yes, it helps you verify the tax components on your invoices, which is the first step toward accurate GSTR-1 and GSTR-3B filings."
      }
    ]
  },
  'emi-calculator': {
    faqs: [
      {
        question: "What does EMI stand for?",
        answer: "EMI stands for Equated Monthly Installment. It is the fixed amount you pay back to a lender every month until your loan is fully repaid."
      },
      {
        question: "How is the monthly interest calculated in an EMI?",
        answer: "Most banks use the 'Reducing Balance Method,' where interest is calculated on the outstanding principal at the end of each month. As you pay off more of the principal, the interest component decreases."
      },
      {
        question: "What factors affect my EMI amount?",
        answer: "Three main factors: the Loan Amount (Principal), the Interest Rate (Annual), and the Loan Tenure (Duration). Increasing the tenure reduces the EMI but increases the total interest paid."
      },
      {
        question: "Can I use this for Home Loans and Car Loans?",
        answer: "Absolutely. The mathematical formula for EMI remains the same whether it's a personal loan, home loan, or car loan."
      },
      {
        question: "How does a moratorium affect my EMI?",
        answer: "A moratorium is a temporary holiday from payments. However, interest usually continues to accrue during this period, which might lead to an increased EMI or longer tenure later."
      }
    ]
  },
  'image-compressor': {
    faqs: [
      {
        question: "How does image compression work without losing quality?",
        answer: "We use 'Lossy' and 'Lossless' techniques. Our tool intelligently identifies and removes metadata and subtle color variations that the human eye cannot see, drastically reducing file size while keeping the image looking sharp."
      },
      {
        question: "Does compression affect my website's SEO?",
        answer: "Yes, positively! Faster-loading images lead to faster page speeds, which is a significant ranking factor for Google Search and improves Core Web Vitals (LCP)."
      },
      {
        question: "What is the maximum file size I can upload?",
        answer: "Currently, we support images up to 20MB. Since processing happens in your browser, the limit depends partly on your device's memory."
      },
      {
        question: "Will my images be stored on your servers?",
        answer: "Never. We value your privacy. The 'FreeToolsBox' philosophy is client-side only. Your images stay on your computer or phone throughout the entire process."
      }
    ]
  },
  'pdf-to-word': {
    faqs: [
      {
        question: "How accurate is the PDF to Word conversion?",
        answer: "Our converter identifies text structures, tables, and layouts to recreate them in Word. It works best with 'Digital' PDFs (files created from documents). Scanned PDFs are currently not supported in this version."
      },
      {
        question: "Is there a limit on the number of pages?",
        answer: "You can convert documents up to 50 pages for free. For larger files, we recommend splitting the PDF and converting sections."
      },
      {
        question: "Can I convert protected or encrypted PDFs?",
        answer: "For security reasons, we do not support the conversion of password-protected files. You must unlock the PDF before uploading."
      }
    ]
  },
  'age-calculator': {
    faqs: [
      {
        question: "How does the calculator handle leap years?",
        answer: "Our algorithm accurately calculates the extra day in February for leap years, ensuring your age is correct down to the exact day."
      },
      {
        question: "Can I calculate the age difference between two people?",
        answer: "Yes, simply enter the two birthdates and the tool will show you the exact gap in years, months, and days."
      },
      {
        question: "Why is my age occasionally different on different calculators?",
        answer: "Some simple calculators use 365 days for every year. Ours calculates based on the actual calendar days, which is the most precise method used universally."
      }
    ]
  },
  'bmi-calculator': {
    faqs: [
      {
        question: "What is a 'Healthy' BMI range?",
        answer: "For adults, a healthy BMI typically falls between 18.5 and 24.9. Below 18.5 is considered underweight, while 25 and above is considered overweight."
      },
      {
        question: "Is BMI an accurate measure of health?",
        answer: "BMI is a useful screening tool but has limitations. It doesn't account for muscle mass vs. fat mass. For example, athletes may have a high BMI despite having low body fat."
      },
      {
        question: "Does BMI vary for children and teens?",
        answer: "Yes. While the formula is the same, children and teens are assessed using BMI-for-age percentiles because their body composition changes as they grow."
      }
    ]
  },
  'sip-calculator': {
    faqs: [
      {
        question: "What is the primary benefit of SIP?",
        answer: "The primary benefit is Rupee Cost Averaging. By investing a fixed amount regularly, you buy more units when prices are low and fewer units when prices are high, lowering your average cost over time."
      },
      {
        question: "Is the interest rate in SIP guaranteed?",
        answer: "No, SIP returns in mutual funds are subject to market risks. Our calculator uses 'expected returns' to help you model potential growth based on historical data."
      },
      {
        question: "How does compounding work in a long-term SIP?",
        answer: "Compounding is when you earn returns on your previous returns. Over 10-20 years, the 'wealth gained' component often becomes significantly larger than your total 'invested amount'."
      }
    ]
  },
  'character-counter': {
    faqs: [
      {
        question: "Why do I need a character counter?",
        answer: "Many platforms have strict character limits for titles, meta descriptions, and social media posts. Our tool helps you stay within those limits to avoid truncation."
      },
      {
        question: "Does it count spaces as characters?",
        answer: "Yes, our counter includes spaces and special characters, as most platform limits (like Twitter or Google Meta) are based on the total string length including spaces."
      }
    ]
  },
  'case-converter': {
    faqs: [
      {
        question: "What is CamelCase and when should I use it?",
        answer: "In camelCase, the first letter is lowercase and each subsequent word starts with an uppercase letter (e.g., myVariableName). It is commonly used in programming languages like JavaScript and Java."
      },
      {
        question: "Can I convert text back from Title Case?",
        answer: "Yes, you can paste text in any case and instantly transform it into lowercase, uppercase, or sentence case with one click."
      }
    ]
  },
  'password-generator': {
    faqs: [
      {
        question: "What makes a password 'Strong'?",
        answer: "A strong password is at least 12 characters long and uses a mix of uppercase letters, lowercase letters, numbers, and symbols. Unpredictability is the key to security."
      },
      {
        question: "Is it safe to generate passwords online?",
        answer: "Our tool generates passwords entirely in your browser using local JavaScript. Your new password is never transmitted over the internet to our servers."
      }
    ]
  },
  'income-tax-calculator': {
    faqs: [
      {
        question: "Which tax regime is better for me?",
        answer: "It depends on your deductions. If you have high investments in 80C, HRA, and home loans, the Old Regime might save more. For those with few deductions, the New Regime's lower rates are usually better."
      },
      {
        question: "What is the standard deduction for FY 2024-25?",
        answer: "The standard deduction has been increased to ₹75,000 for salaried employees and pensioners under both the New and Old tax regimes in the latest budget."
      }
    ]
  },
  'hra-calculator': {
    faqs: [
      {
        question: "Can I claim HRA if I live in my own house?",
        answer: "No, HRA exemption is only applicable if you are living in a rented house and actually paying rent to a landlord."
      },
      {
        question: "Is HRA exemption part of the New Tax Regime?",
        answer: "No, HRA exemption is only available under the Old Tax Regime. The New Regime does not allow for HRA deductions."
      }
    ]
  },
  'epf-calculator': {
    faqs: [
      {
        question: "What is the current interest rate for EPF?",
        answer: "The EPFO has recommended an interest rate of 8.25% for the financial year 2023-24, which is one of the highest among comparable debt instruments."
      },
      {
        question: "When can I withdraw my full EPF amount?",
        answer: "You can withdraw the full amount upon retirement after 58 years of age or if you are unemployed for more than two months."
      }
    ]
  },
  'meta-tag-generator': {
    faqs: [
      {
        question: "What are OG tags?",
        answer: "Open Graph (OG) tags are meta tags that control how a URL is displayed when shared on social media platforms like Facebook, LinkedIn, and Twitter."
      },
      {
        question: "How long should a meta description be?",
        answer: "For optimal display in Google search results, keep your meta descriptions between 150-160 characters. Descriptions longer than this are often truncated."
      }
    ]
  },
  'robots-txt-generator': {
    faqs: [
      {
        question: "Where should I place the robots.txt file?",
        answer: "The robots.txt file must be placed in the root directory of your website (e.g., domain.com/robots.txt). It will not work if placed in a subdirectory."
      },
      {
        question: "Can robots.txt hide my pages from users?",
        answer: "No, robots.txt only stops bots from crawling. It does not prevent manual access by users. To hide content from users, you need password protection."
      }
    ]
  },
  'sitemap-generator': {
    faqs: [
      {
        question: "Why do I need a sitemap?",
        answer: "A sitemap helps search engine crawlers find all the pages on your site, even those that might not be internally linked, ensuring better indexing."
      },
      {
        question: "How many URLs can a single sitemap hold?",
        answer: "A single sitemap file can contain up to 50,000 URLs and must not exceed 50MB in size. For larger sites, you can use a sitemap index file."
      }
    ]
  },
  'qr-code-generator': {
    faqs: [
      {
        question: "Do these QR codes expire?",
        answer: "No, the QR codes generated are 'Static', meaning the information is encoded directly into the pattern. They will work forever as long as the content (like your URL) is active."
      },
      {
        question: "What is the best color for a QR code?",
        answer: "Black on a white background is the most reliable. Always ensure high contrast. If using colors, keep the foreground dark and the background light."
      }
    ]
  },
  'area-converter': {
    faqs: [
      {
        question: "How many square feet are in an acre?",
        answer: "There are exactly 43,560 square feet in one acre. This is a common standard in real estate and land measurement."
      },
      {
        question: "What is a hectare?",
        answer: "A hectare is a metric unit of area equal to 10,000 square meters, primarily used for measuring large plots of land and agricultural fields."
      }
    ]
  },
  'currency-converter': {
    faqs: [
      {
        question: "How often are the rates updated?",
        answer: "Our tool uses periodically updated representative exchange rates for estimation. For critical financial transactions, always check with your bank for live interbank rates."
      },
      {
        question: "Is there a conversion fee?",
        answer: "FreeToolsBox does not charge any fees. However, when you actually exchange money, banks and bureaus usually include a 1-5% markup on the rate."
      }
    ]
  },
  'land-unit-converter': {
    faqs: [
      {
        question: "How much is 1 Bigha in square meters?",
        answer: "The size of a Bigha varies by state in India. In Uttar Pradesh and parts of North India, it is commonly standardized at 2,529.3 square meters."
      },
      {
        question: "What is a Guntha?",
        answer: "Guntha is a traditional land measurement unit used in West and South India (Maharashtra, Karnataka, Gujarat). 1 Guntha is equal to 1,089 square feet."
      }
    ]
  },
  'petrol-cost-calculator': {
    faqs: [
      {
        question: "How can I improve my car's mileage?",
        answer: "Maintain proper tire pressure, avoid sudden braking/acceleration, and keep your vehicle serviced regularly to ensure optimal fuel efficiency."
      },
      {
        question: "How is the fuel needed calculated?",
        answer: "Fuel Needed = Distance / Mileage. For example, if you travel 500km with a mileage of 20km/l, you will need 25 liters of fuel."
      }
    ]
  },
  'text-to-slug': {
    faqs: [
      {
        question: "Why are slugs important for SEO?",
        answer: "A clean, descriptive slug helps search engines understand the topic of the page and improves the user experience by making URLs easy to read and share."
      },
      {
        question: "Should I include 'stop words' in my slug?",
        answer: "Generally, no. Removing stop words like 'a', 'the', 'is', and 'and' makes your URL shorter and more focused on the primary keywords."
      }
    ]
  },
  'json-formatter': {
    faqs: [
      {
        question: "Is it safe to paste private JSON here?",
        answer: "Yes, our formatter runs strictly client-side. Your JSON data never leaves your browser, ensuring your API results or config data stays private."
      },
      {
        question: "Can it fix invalid JSON?",
        answer: "Our tool highlights syntax errors to help you fix them manually. It follows strict JSON standards (e.g., double quotes for keys)."
      }
    ]
  },
  'html-minifier': {
    faqs: [
      {
        question: "Does minification break my website?",
        answer: "Standard minification only removes safe whitespace and comments. However, always test your site after minification to ensure no preformatted text (like within <pre> tags) is affected."
      },
      {
        question: "What characters are removed?",
        answer: "It removes multiple spaces, tabs, newlines, and HTML comments, which are not needed by the browser to render your page correctly."
      }
    ]
  },
  'css-minifier': {
    faqs: [
      {
        question: "How much speed gain can I expect?",
        answer: "Minifying CSS can reduce file size by 15-30%. For sites with large stylesheets, this can significantly improve the First Contentful Paint (FCP) time."
      },
      {
        question: "Should I minify my CSS every time?",
        answer: "It is a best practice to automate minification as part of your deployment process. For small edits, using an online tool like ours is efficient."
      }
    ]
  },
  'base64-tool': {
    faqs: [
      {
        question: "Is Base64 a form of encryption?",
        answer: "No, Base64 is an encoding format, not encryption. It can be easily decoded by anyone and should not be used to hide sensitive credentials."
      },
      {
        question: "Can I encode images into Base64?",
        answer: "Yes, Base64 is frequently used to embed small images directly into CSS or HTML to reduce the number of HTTP requests made by the browser."
      }
    ]
  },
  'gratuity-calculator': {
    faqs: [
      {
        question: "What is the 5-year rule for gratuity?",
        answer: "Under the Payment of Gratuity Act, an employee is typically eligible for gratuity only after completing 5 years of continuous service with the same employer."
      },
      {
        question: "Is gratuity taxable in India?",
        answer: "Gratuity received by government employees is fully tax-exempt. For private employees, it is exempt up to a lifetime limit of ₹20 Lakh."
      }
    ]
  }
};

export const getToolFaqs = (id: string): FAQ[] => {
  return TOOL_METADATA[id]?.faqs || [
    {
      question: "Is this tool free to use?",
      answer: "Yes, all tools on FreeToolsBox are 100% free and require no registration."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. All processing happens locally in your browser. We never upload your files or data to our servers."
    }
  ];
};
