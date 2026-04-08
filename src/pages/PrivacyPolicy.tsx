import AdPlaceholder from '@/components/AdPlaceholder';

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-500">Last updated: April 08, 2026</p>
      </div>

      <div className="prose prose-blue max-w-none bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-bold text-gray-900">1. Introduction</h2>
          <p>
            Welcome to FreeToolsBox. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at pingus@cyberbuds.in.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">2. Information We Collect</h2>
          <p>
            <strong>Local Processing:</strong> Most of our tools (like Image Compressor, Word Counter, etc.) process data entirely within your browser. We do not upload your files or text to our servers.
          </p>
          <p>
            <strong>Log Data:</strong> Like most websites, we collect information that your browser sends whenever you visit our website. This may include your IP address, browser type, and pages visited.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">3. Cookies and Tracking</h2>
          <p>
            We use cookies to enhance your experience and for Google AdSense to serve personalized ads. You can choose to disable cookies through your individual browser options.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">4. Third-Party Services</h2>
          <p>
            We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to our website or other websites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">5. Contact Us</h2>
          <p>
            If you have questions or comments about this policy, you may email us at <strong>pingus@cyberbuds.in</strong>.
          </p>
        </section>
      </div>

      <AdPlaceholder className="mt-12 h-24" />
    </div>
  );
}
