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
        question: "How do I calculate GST Inclusive vs. Exclusive?",
        answer: "For Exclusive: GST Amount = (Original Price * GST Rate) / 100. For Inclusive: GST Amount = Price - (Price * (100 / (100 + GST Rate))). Our calculator handles both methods instantly."
      },
      {
        question: "What is the difference between CGST, SGST, and IGST?",
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
