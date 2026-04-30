import { Link } from 'react-router-dom';
import AdPlaceholder from '@/components/AdPlaceholder';
import { BLOG_POSTS } from '@/constants';

export default function Blog() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog & Guides</h1>
        <p className="text-lg text-gray-500">Expert tips and tutorials on how to use our tools effectively.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {BLOG_POSTS.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group block mb-12 last:mb-0">
              <article className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 aspect-[16/9] md:aspect-square rounded-2xl overflow-hidden shadow-lg border border-gray-100 shrink-0">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-400">{post.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-4 line-clamp-2 md:line-clamp-none">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
                    Read Full Story
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
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
