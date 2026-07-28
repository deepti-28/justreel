import { BLOGS, FAQS } from '@/constants';
import { ArrowRight } from 'lucide-react';

export function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text-primary mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>JustReel Blog</h1>
        <p className="text-text-secondary text-lg">Tips, guides and inspiration for your events</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {BLOGS.concat(BLOGS).map((blog, i) => (
          <div key={i} className="card overflow-hidden group cursor-pointer">
            <div className="h-56 overflow-hidden">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <span className="badge-primary mb-2">{blog.category}</span>
              <h3 className="font-bold text-text-primary line-clamp-2 group-hover:text-primary transition-colors">{blog.title}</h3>
              <p className="text-sm text-text-secondary mt-2 line-clamp-3">{blog.excerpt}</p>
              <div className="flex items-center justify-between mt-4 text-xs text-text-secondary">
                <span>{blog.author}</span>
                <span>{blog.readTime} read</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text-primary mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>About JustReel</h1>
        <p className="text-text-secondary text-lg">India's premier creator marketplace for events</p>
      </div>
      <div className="prose prose-lg max-w-none">
        <p className="text-text-secondary leading-relaxed mb-6">
          JustReel is India's leading marketplace connecting clients with verified filmmakers and drone operators. We've built a platform that makes it easy to discover creators, watch their work, compare packages, and book with confidence.
        </p>
        <p className="text-text-secondary leading-relaxed mb-6">
          With over 5,200 verified creators across 120+ cities, we've helped capture 48,000+ events and served 32,000+ happy clients. Our AI-powered tools help you plan, budget and book the perfect creator for your special day.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        {[
          { value: '5,200+', label: 'Verified Creators' },
          { value: '48,000+', label: 'Events Covered' },
          { value: '120+', label: 'Cities' },
          { value: '32,000+', label: 'Happy Clients' },
        ].map(s => (
          <div key={s.label} className="text-center bg-white rounded-2xl p-6 border border-border">
            <p className="text-3xl font-bold text-primary">{s.value}</p>
            <p className="text-sm text-text-secondary">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text-primary mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Help Center</h1>
        <p className="text-text-secondary text-lg">Frequently asked questions and support</p>
      </div>
      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <details key={i} className="group card overflow-hidden">
            <summary className="flex items-center justify-between cursor-pointer px-5 py-4 list-none">
              <span className="font-semibold text-text-primary">{faq.q}</span>
              <svg className="w-5 h-5 text-text-secondary transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <div className="px-5 pb-4 text-text-secondary text-sm">{faq.a}</div>
          </details>
        ))}
      </div>
    </div>
  );
}

export function SupportPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text-primary mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Support</h1>
        <p className="text-text-secondary text-lg">We're here to help. Reach out and we'll respond within 24 hours.</p>
      </div>
      <div className="bg-white rounded-2xl p-6 border border-border space-y-4">
        <div>
          <label className="label">Subject</label>
          <input className="input-field" placeholder="What do you need help with?" />
        </div>
        <div>
          <label className="label">Message</label>
          <textarea className="input-field resize-none" rows={5} placeholder="Describe your issue..." />
        </div>
        <button className="btn-primary w-full">Submit Ticket</button>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {[
          { label: 'Email', value: 'hello@justreel.com' },
          { label: 'Phone', value: '+91 98765 43210' },
          { label: 'WhatsApp', value: '+91 98765 43210' },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-xl p-4 border border-border text-center">
            <p className="text-xs text-text-secondary">{c.label}</p>
            <p className="font-semibold text-sm text-text-primary">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
