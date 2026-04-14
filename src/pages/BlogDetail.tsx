import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import AdPlaceholder from '@/components/AdPlaceholder';
import { BLOG_POSTS } from '@/constants';

export default function BlogDetail() {
  const { id } = useParams();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-blue-600 hover:underline flex items-center justify-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>

      <article>
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-600">
              <Tag className="h-3 w-3" />
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-gray-400">
              <User className="h-4 w-4" />
              {post.author}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8">
            {post.title}
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed italic border-l-4 border-blue-200 pl-6">
            {post.excerpt}
          </p>
        </header>

        <AdPlaceholder className="h-24 mb-12" label="Top Banner Ad" />

        <div 
          className="prose prose-lg prose-blue max-w-none text-gray-600 leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <AdPlaceholder className="h-64 mt-12" label="Bottom Content Ad" />
      </article>

      <div className="mt-16 pt-8 border-t border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Related Posts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map(related => (
            <Link key={related.id} to={`/blog/${related.id}`} className="group">
              <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                {related.title}
              </h4>
              <p className="text-sm text-gray-500 line-clamp-2">{related.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
