import React, { useState } from 'react';
import { Plane, Mail, Phone, MapPin, Shield, CheckCircle2, Heart, Play } from 'lucide-react';

interface FooterProps {
  onSelectDestination: (id: string) => void;
  onNavigateTab: (tab: string) => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectDestination,
  onNavigateTab
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-[#10233F] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter & Replay Intro Strip */}
        <div className="pb-12 border-b border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sky-400 mb-2">
              <span>SkyVoyage Dispatch</span>
            </div>
            <h3 className="text-2xl font-bold font-display text-white">
              Receive Curated Seasonal Itineraries & Private Offers
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-lg">
              No spam. Receive bespoke quarterly travel dossiers, seasonal flight deals, and exclusive access to new resort launches.
            </p>
          </div>

          <div>
            {subscribed ? (
              <div className="p-4 bg-emerald-950/60 border border-emerald-600 rounded-2xl flex items-center gap-3 text-emerald-300 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>You are subscribed! Look out for our welcome travel dossier.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 shadow-sm"
                >
                  Join Dispatch
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Multi-Column Sitemap & Contact */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs sm:text-sm">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Plane className="w-5 h-5 -rotate-45" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                SkyVoyage
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              An international luxury travel platform and concierge service. Curating world-class journeys across 48 countries with 100% verified 5-star accommodations, panoramic rail journeys, and consular visa assistance.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>IATA & ASTA Accredited</span>
              </span>
              <span>·</span>
              <span>24/7 Concierge Hotline</span>
            </div>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="font-bold text-white font-display mb-4 text-sm tracking-wide">
              Destinations
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <button onClick={() => onSelectDestination('switzerland')} className="hover:text-white transition-colors">
                  Switzerland Alps
                </button>
              </li>
              <li>
                <button onClick={() => onSelectDestination('turkey')} className="hover:text-white transition-colors">
                  Turkey & Cappadocia
                </button>
              </li>
              <li>
                <button onClick={() => onSelectDestination('japan')} className="hover:text-white transition-colors">
                  Japan (Tokyo & Kyoto)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectDestination('maldives')} className="hover:text-white transition-colors">
                  Maldives Atolls
                </button>
              </li>
              <li>
                <button onClick={() => onSelectDestination('bali')} className="hover:text-white transition-colors">
                  Bali (Ubud & Uluwatu)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectDestination('skardu')} className="hover:text-white transition-colors">
                  Skardu & Hunza (Pakistan)
                </button>
              </li>
            </ul>
          </div>

          {/* Travel Concierge Services */}
          <div>
            <h4 className="font-bold text-white font-display mb-4 text-sm tracking-wide">
              Travel Services
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <button onClick={() => onNavigateTab('packages')} className="hover:text-white transition-colors">
                  Curated Tour Packages
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('hotels')} className="hover:text-white transition-colors">
                  Luxury Overwater & Cave Stays
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('visa')} className="hover:text-white transition-colors">
                  Consular Visa Assistance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('dining')} className="hover:text-white transition-colors">
                  Gastronomy & Culinary Feasts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('attractions')} className="hover:text-white transition-colors">
                  Tourist Attractions & Passes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('planner')} className="hover:text-white transition-colors">
                  Personalized Trip Planner
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="font-bold text-white font-display mb-4 text-sm tracking-wide">
              Trust & Support
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <span className="text-white block font-medium">Concierge Assistance</span>
                <span className="text-slate-500">concierge@skyvoyage.travel</span>
              </li>
              <li>
                <span className="text-white block font-medium">Hotline</span>
                <span className="text-slate-500">+1 (800) 892-7489</span>
              </li>
              <li className="pt-2">
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  100% Transparent Pricing Policy
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  Free 14-Day Cancellation Terms
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  Privacy & Data Encryption
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} SkyVoyage International Travel Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Terms of Service</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
