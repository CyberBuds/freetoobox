import AdPlaceholder from '@/components/AdPlaceholder';

export default function Blog() {
  const posts = [
    {
      title: "How to Optimize Your Website Images for Better Performance",
      excerpt: "Learn the best practices for image compression and how it can significantly improve your site's loading speed and SEO ranking.",
      date: "Oct 12, 2023",
      category: "Optimization"
    },
    {
      title: "Understanding GST: A Comprehensive Guide for Indian Businesses",
      excerpt: "Everything you need to know about Goods and Services Tax in India, from registration to filing returns and calculating tax correctly.",
      date: "Oct 10, 2023",
      category: "Finance"
    },
    {
      title: "Top 10 SEO Tools Every Content Creator Should Use",
      excerpt: "Boost your search engine visibility with these essential free tools designed to help you rank higher and reach more people.",
      date: "Oct 05, 2023",
      category: "SEO"
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog & Guides</h1>
        <p className="text-lg text-gray-500">Expert tips and tutorials on how to use our tools effectively.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {posts.map((post, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-sm text-gray-400">{post.date}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-4">
                {post.title}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <div className="flex items-center text-blue-600 font-semibold">
                Read More
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </article>
          ))}
        </div>

        <aside className="space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Subscribe to Newsletter</h3>
            <p className="text-sm text-gray-500 mb-6">Get the latest tools and guides delivered straight to your inbox.</p>
            <div className="space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          <AdPlaceholder className="h-[400px]" label="Sidebar Ad" />
        </aside>
      </div>
    </div>
  );
}
