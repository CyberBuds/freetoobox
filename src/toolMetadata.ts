export interface FAQ {
  question: string;
  answer: string;
}

export const TOOL_METADATA: Record<string, { faqs: FAQ[] }> = {
  'gst-calculator': {
    faqs: [
      {
        question: "What is GST?",
        answer: "GST stands for Goods and Services Tax. It's an indirect tax used in India on the supply of goods and services."
      },
      {
        question: "How is GST calculated?",
        answer: "GST is calculated by multiplying the original price by the GST rate (e.g., 5%, 12%, 18%, or 28%) and then adding that amount to the original price."
      },
      {
        question: "Is this GST calculator free to use?",
        answer: "Yes, our GST calculator is completely free and works entirely in your browser."
      }
    ]
  },
  'emi-calculator': {
    faqs: [
      {
        question: "What is an EMI?",
        answer: "EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month."
      },
      {
        question: "How does the EMI calculator work?",
        answer: "It uses the principal amount, interest rate, and loan tenure to calculate the monthly payment using the standard reducing balance formula."
      }
    ]
  },
  'image-compressor': {
    faqs: [
      {
        question: "Will I lose quality when compressing images?",
        answer: "Our tool uses smart compression algorithms to reduce file size while maintaining as much visual quality as possible."
      },
      {
        question: "Are my images uploaded to a server?",
        answer: "No, all image processing happens locally in your browser. Your privacy is our priority."
      }
    ]
  },
  'pdf-to-word': {
    faqs: [
      {
        question: "Can I edit the Word document after conversion?",
        answer: "Yes, the resulting .docx file is fully editable in Microsoft Word, Google Docs, or any other word processor."
      },
      {
        question: "Does it support scanned PDFs?",
        answer: "This tool extracts text data. Scanned PDFs (which are essentially images) require OCR technology which is not currently supported."
      }
    ]
  },
  'age-calculator': {
    faqs: [
      {
        question: "How accurate is the age calculation?",
        answer: "Our calculator is 100% accurate as it accounts for leap years and the specific number of days in each month."
      },
      {
        question: "Can I calculate the age of someone born in a leap year?",
        answer: "Yes, the tool correctly handles February 29th birthdates and leap year intervals."
      }
    ]
  },
  'image-resizer': {
    faqs: [
      {
        question: "Will resizing my image reduce its quality?",
        answer: "Upscaling an image (making it larger) may result in some pixelation, but downscaling (making it smaller) usually maintains excellent clarity."
      },
      {
        question: "Can I maintain the aspect ratio?",
        answer: "Yes, our tool has an 'Aspect Ratio' lock feature to ensure your images don't look stretched or squashed."
      }
    ]
  },
  'jpg-to-png': {
    faqs: [
      {
        question: "What is the difference between JPG and PNG?",
        answer: "JPG is best for photographs and uses lossy compression. PNG is better for graphics with fewer colors and supports transparency."
      },
      {
        question: "Will the background become transparent?",
        answer: "Converting JPG to PNG won't automatically make the background transparent, but it allows you to add transparency later using an editor."
      }
    ]
  },
  'percentage-calculator': {
    faqs: [
      {
        question: "What types of percentage calculations can I do?",
        answer: "You can calculate basic percentages, percentage increases, decreases, and what percentage one number is of another."
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
