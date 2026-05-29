import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterHandle?: string;
  canonicalUrl?: string;
}

const SEO = ({
  title = 'FreeToolsBox - 100% Free Online Tools for Everyone',
  description = 'Access a suite of professional-grade tools for calculators, image processing, and SEO. Simple, fast, and completely free online tools at FreeToolsBox.in',
  keywords = 'free online tools, GST calculator India, EMI calculator, age calculator, image compressor, word counter, SEO tools, web utilities, FreeToolsBox',
  ogTitle,
  ogDescription,
  ogImage = 'https://www.freetoolsbox.in/og-image.png?v=51',
  ogType = 'website',
  twitterHandle = '@FreeToolsBox',
  canonicalUrl,
}: SEOProps) => {
  const location = useLocation();
  const siteUrl = 'https://www.freetoolsbox.in';
  
  // Format canonical URL: remove trailing slash for consistency, unless it's the root
  const currentPath = location.pathname;
  const formattedPath = currentPath.endsWith('/') && currentPath !== '/' 
    ? currentPath.slice(0, -1) 
    : currentPath;
    
  const selfReferencingCanonical = `${siteUrl}${formattedPath}`;
  const finalCanonical = canonicalUrl || selfReferencingCanonical;

  const displayOgTitle = ogTitle || title;
  const displayOgDescription = ogDescription || description;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={finalCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:title" content={displayOgTitle} />
      <meta property="og:description" content={displayOgDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="FreeToolsBox" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={displayOgTitle} />
      <meta name="twitter:description" content={displayOgDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
