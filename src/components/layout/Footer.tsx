import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { APP_CONFIG, FOOTER_LINKS } from '@/constants';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={APP_CONFIG.logo} alt="JustReel" className="h-10 w-10 rounded-lg object-cover" />
              <span className="text-xl font-bold text-text-primary">
                JustReel
              </span>
            </Link>
            <p className="text-sm text-text-secondary max-w-xs mb-4">{APP_CONFIG.description}</p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, url: APP_CONFIG.social.instagram },
                { icon: Youtube, url: APP_CONFIG.social.youtube },
                { icon: Facebook, url: APP_CONFIG.social.facebook },
                { icon: Twitter, url: APP_CONFIG.social.twitter },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map(section => (
            <div key={section.title}>
              <h4 className="font-semibold text-text-primary mb-3 text-sm">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-text-secondary hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-semibold text-text-primary mb-3 text-sm">Contact</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> {APP_CONFIG.email}</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> {APP_CONFIG.phone}</li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-primary mt-0.5" /> {APP_CONFIG.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">© 2024 JustReel. All rights reserved.</p>
          <div className="flex gap-4 text-sm">
            <Link to="/privacy" className="text-text-secondary hover:text-primary">Privacy</Link>
            <Link to="/terms" className="text-text-secondary hover:text-primary">Terms</Link>
            <Link to="/support" className="text-text-secondary hover:text-primary">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
