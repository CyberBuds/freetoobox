import React from 'react';
import RelatedTools from './RelatedTools';
import ToolFAQ from './ToolFAQ';
import AdPlaceholder from './AdPlaceholder';
import SEO from './SEO';
import { getToolFaqs } from '@/toolMetadata';

interface ToolPageLayoutProps {
  toolId: string;
  title: string;
  description: string;
  category: string;
  children: React.ReactNode;
  seoContent?: React.ReactNode;
}

export default function ToolPageLayout({ 
  toolId, 
  title, 
  description, 
  category, 
  children, 
  seoContent 
}: ToolPageLayoutProps) {
  const faqs = getToolFaqs(toolId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <SEO 
        title={`${title} - FreeToolsBox`}
        description={description}
        ogTitle={`${title} - 100% Free Online Tool`}
        ogDescription={description}
      />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-500">{description}</p>
      </div>

      <AdPlaceholder className="mb-8 h-24" label="Top Banner Ad" />

      {children}

      <AdPlaceholder className="my-12 h-32" label="Middle Content Ad" />

      {seoContent && (
        <article className="prose prose-blue max-w-none bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          {seoContent}
        </article>
      )}

      <ToolFAQ faqs={faqs} />

      <section className="mt-16 border-t border-gray-100 pt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Useful Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href="https://www.google.com/search?q=how+to+use+online+tools" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center justify-between group">
            <span className="text-gray-700 font-medium group-hover:text-blue-600">How to use online tools</span>
            <svg className="h-4 w-4 text-gray-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <a href="/blog" className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center justify-between group">
            <span className="text-gray-700 font-medium group-hover:text-blue-600">Latest Blog Posts</span>
            <svg className="h-4 w-4 text-gray-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>

      <RelatedTools currentToolId={toolId} category={category} />

      <AdPlaceholder className="mt-12 h-24" label="Bottom Banner Ad" />
    </div>
  );
}
