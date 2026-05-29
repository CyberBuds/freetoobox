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
            <Wrench className="h-6 w-6 text-blue-600" /> Our Mission & Vision
          </h2>
          <p className="mt-4 text-lg leading-relaxed">
            At <strong>FreeToolsBox.in</strong>, we believe that the internet should be a place where powerful digital utilities are democratized. Our mission is to provide a comprehensive, high-quality suite of online tools that empower individuals, professionals, and students to accomplish their daily tasks without the barrier of expensive subscriptions or complex software installations.
          </p>
          <p>
            We envision a world where every digital worker has a reliable toolkit at their fingertips—one that is always fast, always accessible, and always free.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Technical Excellence</h3>
            <p>Our tools are built using cutting-edge web technologies like React and TypeScript. We optimize every algorithm for client-side performance, ensuring that calculations and file processing happen right in your browser for near-instant results.</p>
          </div>
          <div className="space-y-4">
            <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Privacy by Design</h3>
            <p>We take your privacy seriously. Unlike many online platforms, FreeToolsBox processes your sensitive data (like images and PDF content) locally. Your files never touch our servers, providing you with a zero-trust environment for your sensitive documents.</p>
          </div>
          <div className="space-y-4">
            <div className="h-12 w-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
              <Wrench className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Expertise in Utilities</h3>
            <p>Our team consists of developers and finance enthusiasts who understand the pain points of daily digital tasks. From accurate GST tax logic to complex PDF manipulation, we bring domain expertise to every tool we build.</p>
          </div>
          <div className="space-y-4">
            <div className="h-12 w-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">User-Centric Growth</h3>
            <p>We don't believe in cluttered interfaces. Our design philosophy is focused on "Utility First"—clean layouts, clear instructions, and zero distractions. We grow based on your feedback and feature requests.</p>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500" /> The Story Behind FreeToolsBox
          </h2>
          <p className="mt-4 text-blue-800">
            FreeToolsBox was born out of frustration. As digital creators, we found ourselves constantly jumping between multiple sites to compress an image, calculate a loan EMI, or merge PDFs. Most of these sites were laden with slow load times, intrusive pop-up ads, or required us to create yet another account just to download a file.
          </p>
          <p className="text-blue-800">
            We decided to fix that. We built FreeToolsBox.in to be the "Swiss Army Knife" of the internet—a platform that just works, respects your time, and stays free forever.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900">Transparency and Quality</h2>
          <p className="mt-4">
            To maintain our high standard of "Zero Thin Content," we ensure that every tool page is accompanied by educational guides, FAQs, and detailed explanations. We want you not only to solve a problem with our tools but also to understand the logic behind the solution.
          </p>
          <p>
            Whether it's understanding the <strong>GST tax brackets in India</strong> or the difference between <strong>JPEG and PNG compression</strong>, our goal is to provide value that goes beyond the tool itself.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900">Contact and Feedback</h2>
          <p className="mt-4">
            We are a community-driven project. If you have a suggestion for a new feature, have found a bug, or want to partner with us, please reach out. We read every email and take your feedback into account for our weekly updates.
          </p>
          <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <p className="font-bold text-gray-900">Email us at:</p>
            <a href="mailto:pingus@cyberbuds.in" className="text-blue-600 hover:underline font-medium">pingus@cyberbuds.in</a>
          </div>
        </section>
      </div>

      <AdPlaceholder className="h-32" />
    </div>
  );
}
