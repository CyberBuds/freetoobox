import { Mail, MapPin, Phone } from 'lucide-react';
import AdPlaceholder from '@/components/AdPlaceholder';

export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-500">Have a question or feedback? We'd love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
          <div className="mx-auto h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
            <Mail className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
          <p className="text-blue-600 font-medium">pingus@cyberbuds.in</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
          <div className="mx-auto h-12 w-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-4">
            <MapPin className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Location</h3>
          <p className="text-gray-500">Indore, Madhya Pradesh, India</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
          <div className="mx-auto h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-4">
            <Phone className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Support</h3>
          <p className="text-gray-500">Mon-Fri, 9am-6pm</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-8">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="How can we help?" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Your message here..."></textarea>
            </div>
            <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <AdPlaceholder className="mt-12 h-24" />
    </div>
  );
}
