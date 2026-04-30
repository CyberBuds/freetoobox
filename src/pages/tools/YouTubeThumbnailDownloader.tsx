import { useState } from 'react';
import { Youtube, Download, Link as LinkIcon, AlertCircle, Check } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function YouTubeThumbnailDownloader() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    if (match && match[1]) {
      setVideoId(match[1]);
      setError(null);
    } else {
      setVideoId(null);
      setError('Please enter a valid YouTube URL');
    }
  };

  const handleInputChange = (value: string) => {
    setUrl(value);
    if (value) {
      extractVideoId(value);
    } else {
      setVideoId(null);
      setError(null);
    }
  };

  const thumbnails = videoId ? [
    { label: 'HD Quality (1280x720)', url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, size: 'maxres' },
    { label: 'High Quality (480x360)', url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, size: 'hq' },
    { label: 'Medium Quality (320x180)', url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, size: 'mq' },
    { label: 'Standard Quality (120x90)', url: `https://img.youtube.com/vi/${videoId}/default.jpg`, size: 'sd' },
  ] : [];

  return (
    <ToolPageLayout
      toolId="youtube-thumbnail-downloader"
      title="YouTube Thumbnail Downloader"
      description="Download YouTube video thumbnails in all available resolutions (HD, HQ, Medium, SD) easily."
      category="Social Media"
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fast & Free YouTube Thumbnail Fetcher</h2>
          <p className="text-gray-600 mb-4">
            Need a high-quality thumbnail for a reaction video, blog post, or inspiration? Our tool allows you to grab any YouTube thumbnail in seconds. Simply paste the link, and we'll fetch all available resolutions provided by YouTube's servers.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">How to download?</h3>
          <p className="text-gray-600 mb-4">
            1. Copy the URL of the YouTube video.<br />
            2. Paste it in the input field above.<br />
            3. Choose the resolution you need and click "Download Image".<br />
            4. The image will open in a new tab or save depending on your browser settings.
          </p>
        </>
      }
    >
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-50 p-3 rounded-xl">
              <Youtube className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Enter YouTube Video Link</h3>
              <p className="text-sm text-gray-500">Paste the URL from your browser address bar</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <LinkIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              className={`w-full pl-12 pr-4 py-4 rounded-xl border ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'} focus:ring-2 focus:border-transparent outline-none transition-all shadow-inner bg-gray-50 text-gray-800 font-medium`}
            />
          </div>
          
          {error && (
            <div className="mt-4 flex items-center gap-2 text-red-600 text-sm font-medium animate-pulse">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
        </div>

        {videoId && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {thumbnails.map((thumb) => (
              <div key={thumb.size} className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col group hover:border-blue-200 transition-all">
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  <img 
                    src={thumb.url} 
                    alt={thumb.label} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1280x720?text=Thumbnail+Not+Found';
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest border border-white/10">
                    {thumb.label.split(' ')[0]}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-gray-800 mb-1">{thumb.label}</h4>
                  <p className="text-sm text-gray-500 mb-6 font-medium">Original YouTube CDN Link</p>
                  <a 
                    href={thumb.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100"
                  >
                    <Download className="h-4 w-4" />
                    Download Image
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {!videoId && !error && (
          <div className="bg-blue-50 border border-blue-100 p-8 rounded-3xl text-center">
            <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <LinkIcon className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to fetch?</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Once you paste a valid YouTube link, your high-resolution thumbnails will appear here automatically.
            </p>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
