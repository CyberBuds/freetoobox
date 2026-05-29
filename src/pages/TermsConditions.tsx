import AdPlaceholder from '@/components/AdPlaceholder';

export default function TermsConditions() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
        <p className="text-gray-500">Last updated: April 08, 2026</p>
      </div>

      <div className="prose prose-blue max-w-none bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-bold text-gray-900">1. Agreement to Terms</h2>
          <p>
            By accessing FreeToolsBox.in, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">2. Use License</h2>
          <p>
            Permission is granted to use the tools on FreeToolsBox for personal or commercial use. This is the grant of a license, not a transfer of title.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">3. Disclaimer</h2>
          <p>
            The tools on FreeToolsBox are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties of merchantability or fitness for a particular purpose.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">4. Limitations</h2>
          <p>
            In no event shall FreeToolsBox or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the tools on our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">5. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India.
          </p>
        </section>
      </div>

      <AdPlaceholder className="mt-12 h-24" />
    </div>
  );
}
