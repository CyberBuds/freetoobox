import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, MessageSquare, Send, CheckCircle } from 'lucide-react';
import AdPlaceholder from '@/components/AdPlaceholder';
import SEO from '@/components/SEO';
import { getBlogByIdOrSlug, getBlogs, getComments, createComment, BlogPost, BlogComment } from '@/lib/blogService';

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Comment Form State
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentStatus, setCommentStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Detect if current post has a valid UUID
  const isUuid = (str: string): boolean => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
  };

  useEffect(() => {
    if (!id) return;
    
    let active = true;
    setLoading(true);
    setCommentStatus(null);
    
    // Fetch individual post detail
    getBlogByIdOrSlug(id).then(async (blogData) => {
      if (!active) return;
      
      if (blogData) {
        setPost(blogData);
        
        // Load related posts from API or fallback
        const allBlogs = await getBlogs();
        if (active) {
          const filtered = allBlogs.filter(p => p.id !== blogData.id).slice(0, 2);
          setRelatedPosts(filtered);
        }

        // If it's a UUID-based API blog, load real comments
        if (isUuid(blogData.id)) {
          const commentsData = await getComments(blogData.id);
          if (active) {
            setComments(commentsData);
          }
        } else {
          setComments([]);
        }
      } else {
        setPost(null);
      }
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [id]);

  // Comment submit handler
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !isUuid(post.id) || !authorName.trim() || !commentContent.trim()) return;

    setSubmittingComment(true);
    setCommentStatus(null);

    const success = await createComment({
      blogId: post.id,
      authorName: authorName.trim(),
      authorEmail: authorEmail.trim() || 'anonymous@freetoolsbox.in',
      content: commentContent.trim(),
    });

    if (success) {
      setCommentStatus({
        success: true,
        message: 'Your comment has been posted successfully!',
      });
      setCommentContent('');
      // Reload comments to show the new comment
      const updatedComments = await getComments(post.id);
      setComments(updatedComments);
    } else {
      setCommentStatus({
        success: false,
        message: 'Failed to post comment. Please try again later.',
      });
    }
    setSubmittingComment(false);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center">
        <SEO title="Loading Post - FreeToolsBox" description="Loading the requested blog article..." />
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          <p className="text-gray-500 font-medium">Fetching article data...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <SEO title="Post Not Found - FreeToolsBox" description="The blog post you're looking for doesn't exist." />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-blue-600 hover:underline flex items-center justify-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  const showCommentsSection = isUuid(post.id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <SEO 
        title={`${post.title} - FreeToolsBox Blog`}
        description={post.excerpt}
        ogTitle={post.title}
        ogDescription={post.excerpt}
        ogImage={post.image}
        ogType="article"
      />
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

        <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 aspect-[21/9]">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <AdPlaceholder className="h-24 mb-12" label="Top Banner Ad" />

        <div 
          className="prose prose-lg prose-blue max-w-none text-gray-600 leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <AdPlaceholder className="h-64 mt-12" label="Bottom Content Ad" />
      </article>

      {/* Real Interactive Comments Section for API-sourced Blogs */}
      {showCommentsSection && (
        <section className="mt-16 pt-12 border-t border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            Comments ({comments.length})
          </h3>

          {/* Comment List */}
          <div className="space-y-6 mb-12">
            {comments.length === 0 ? (
              <p className="text-gray-500 italic bg-gray-50 p-6 rounded-2xl text-center">
                No comments yet. Be the first to share your thoughts!
              </p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-gray-900">{comment.authorName}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-gray-600 whitespace-pre-line leading-relaxed">{comment.content}</p>
                </div>
              ))
            )}
          </div>

          {/* Comment Submission Form */}
          <div className="bg-gray-50 p-6 sm:p-8 rounded-3xl border border-gray-100">
            <h4 className="text-lg font-bold text-gray-900 mb-6">Leave a Comment</h4>
            
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email (private)</label>
                  <input
                    type="email"
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Comment *</label>
                <textarea
                  required
                  rows={4}
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Share your thoughts on this guide..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 resize-none"
                ></textarea>
              </div>

              {commentStatus && (
                <div className={`p-4 rounded-xl flex items-start gap-3 ${
                  commentStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  {commentStatus.success && <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />}
                  <span className="text-sm font-medium">{commentStatus.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submittingComment}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-sm hover:shadow disabled:opacity-50"
              >
                {submittingComment ? 'Posting...' : 'Post Comment'}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="mt-16 pt-8 border-t border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Related Posts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {relatedPosts.map(related => (
              <Link key={related.id} to={`/blog/${related.id}`} className="group flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm shrink-0 border border-gray-100">
                  <img 
                    src={related.image} 
                    alt={related.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                    {related.title}
                  </h4>
                  <p className="text-sm text-gray-500 line-clamp-2">{related.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
