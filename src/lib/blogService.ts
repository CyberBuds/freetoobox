import { BLOG_POSTS } from '@/constants';

export interface BlogPost {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
  slug?: string;
}

export interface BlogComment {
  id: string;
  blogId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

// Check if string is a valid UUID
const isUuid = (str: string): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
};

// Map any variation of API blog post fields to our standard local UI structure
export function mapApiPostToLocal(post: any): BlogPost {
  if (!post) return post;
  
  const findValue = (keys: string[], defaultVal: any) => {
    for (const key of keys) {
      if (post[key] !== undefined && post[key] !== null) {
        return post[key];
      }
    }
    return defaultVal;
  };

  // 1. Extract content/body
  const content = findValue(['content', 'body', 'text', 'htmlContent'], '');

  // 2. Format published/created date gracefully
  let dateStr = findValue(['date', 'createdAt', 'publishedAt', 'updatedAt'], '');
  if (dateStr) {
    try {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        dateStr = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
      }
    } catch {
      // Keep original string if parsing fails
    }
  } else {
    dateStr = 'Oct 12, 2023';
  }

  // 3. Extract and normalize category
  let category = 'General';
  if (post.category) {
    if (typeof post.category === 'string') {
      category = post.category;
    } else if (typeof post.category === 'object' && post.category.name) {
      category = post.category.name;
    }
  } else if (post.categoryName) {
    category = post.categoryName;
  } else if (post.tags && Array.isArray(post.tags) && post.tags.length > 0) {
    category = typeof post.tags[0] === 'string' ? post.tags[0] : (post.tags[0].name || 'General');
  }

  // 4. Extract and normalize author
  let author = 'Admin';
  if (post.author) {
    if (typeof post.author === 'string') {
      author = post.author;
    } else if (typeof post.author === 'object' && post.author.name) {
      author = post.author.name;
    }
  } else if (post.authorName) {
    author = post.authorName;
  }

  // 5. Extract cover image with a reliable fallback
  const image = findValue(
    ['image', 'imageUrl', 'coverImage', 'thumbnail', 'mediaUrl'], 
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60'
  );

  return {
    id: String(post.id || post.blogId || post._id || ''),
    title: findValue(['title'], 'Untitled Post'),
    image: image,
    excerpt: findValue(['excerpt', 'summary', 'shortDescription'], ''),
    content: content,
    date: dateStr,
    category: category,
    author: author,
    slug: post.slug || '',
  };
}

// 1. Fetch list of all blogs
export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const res = await fetch('/api/blog-api/api/v1/Blogs');
    if (!res.ok) {
      throw new Error(`API returned status ${res.status}`);
    }
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data.map(mapApiPostToLocal);
    }
    // If empty array, fallback to static posts
    return BLOG_POSTS;
  } catch (error) {
    console.warn('[Blog Service] Error fetching blogs from API. Using local fallback:', error);
    return BLOG_POSTS;
  }
}

// 2. Fetch a single blog post by ID or Slug
export async function getBlogByIdOrSlug(idOrSlug: string): Promise<BlogPost | null> {
  if (!idOrSlug) return null;

  try {
    let endpoint = `/api/blog-api/api/v1/Blogs/${idOrSlug}`;
    
    // If it's not a standard UUID, call the slug endpoint
    if (!isUuid(idOrSlug)) {
      endpoint = `/api/blog-api/api/v1/Blogs/slug/${idOrSlug}`;
    }

    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`API returned status ${res.status}`);
    }
    
    const data = await res.json();
    if (data) {
      return mapApiPostToLocal(data);
    }
  } catch (error) {
    console.warn(`[Blog Service] Error fetching blog detail for "${idOrSlug}". Trying local fallback:`, error);
  }

  // Fallback: search in static blog posts
  const localPost = BLOG_POSTS.find(p => p.id === idOrSlug);
  return localPost || null;
}

// 3. Fetch comments for a blog post
export async function getComments(blogId: string): Promise<BlogComment[]> {
  if (!blogId || !isUuid(blogId)) {
    return []; // Only valid UUID blogIds can have comments in the API
  }

  try {
    const res = await fetch(`/api/blog-api/api/v1/comments/blog/${blogId}`);
    if (!res.ok) {
      throw new Error(`API returned status ${res.status}`);
    }
    const data = await res.json();
    if (Array.isArray(data)) {
      return data.map((c: any) => ({
        id: String(c.id || c._id || ''),
        blogId: String(c.blogId || ''),
        authorName: String(c.authorName || 'Anonymous'),
        content: String(c.content || ''),
        createdAt: c.createdAt || new Date().toISOString(),
      }));
    }
  } catch (error) {
    console.warn(`[Blog Service] Error fetching comments for blog ${blogId}:`, error);
  }
  return [];
}

// 4. Submit a new comment
export async function createComment(comment: {
  blogId: string;
  authorName: string;
  authorEmail: string;
  content: string;
}): Promise<boolean> {
  if (!comment.blogId || !isUuid(comment.blogId)) {
    console.error('[Blog Service] Cannot submit comment: blogId must be a valid UUID');
    return false;
  }

  try {
    const res = await fetch('/api/blog-api/api/v1/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
    
    return res.ok;
  } catch (error) {
    console.error('[Blog Service] Error submitting comment:', error);
    return false;
  }
}
