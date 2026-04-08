import { Wrench, Zap, Shield, Heart } from 'lucide-react';
import AdPlaceholder from '@/components/AdPlaceholder';

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About FreeToolsBox</h1>
        <p className="text-lg text-gray-500">Empowering users with free, high-quality digital utilities.</p>
      </div>

      <div className="prose prose-blue max-w-none bg-white p-10 rounded-2xl border border-gray-100 shadow-sm space-y-12 text-gray-600 mb-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Wrench className="h-6 w-6 text-blue-600" /> Our Mission
          </h2>
          <p className="mt-4 text-lg leading-relaxed">
            At FreeToolsBox, we believe that powerful digital tools should be accessible to everyone, regardless of their budget. Our mission is to provide a comprehensive suite of online utilities that are fast, secure, and completely free to use.
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Performance</h3>
            <p>We optimize every tool to ensure it runs smoothly in your browser, providing instant results without the wait.</p>
          </div>
          <div className="space-y-4">
            <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Privacy</h3>
            <p>Your data security is our priority. Most of our tools process data locally, meaning your files never leave your device.</p>
          </div>
        </div>

        <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500" /> Why FreeToolsBox?
          </h2>
          <p className="mt-4 text-blue-800">
            We started FreeToolsBox because we were tired of "free" tools that were cluttered with intrusive ads, required account registration, or had hidden paywalls. We've built a platform that puts the user first, offering a clean, modern interface and tools that just work.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
          <p className="mt-4">
            We are constantly adding new tools and improving existing ones based on user feedback. If you have a suggestion for a new tool or have encountered an issue, please reach out to us at <strong>pingus@cyberbuds.in</strong>.
          </p>
        </section>
      </div>

      <AdPlaceholder className="h-32" />
    </div>
  );
}
