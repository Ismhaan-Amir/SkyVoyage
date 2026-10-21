import React from 'react';
import { Compass, Sparkles, Star, ShieldCheck, Headphones, MapPin, Play } from 'lucide-react';
import heroSwissImg from '../assets/images/hero_swiss_alps_1792611749491.jpg';

interface HeroSectionProps {
  onExploreDestinations: () => void;
  onPlanTrip: () => void;
  onReplayIntro?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreDestinations,
  onPlanTrip
}) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-20 overflow-hidden">
      {/* Background Image with Deep Cinematic Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroSwissImg}
          alt="Scenic panoramic mountain railway train winding through pristine Swiss Alps"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:transition-transform motion-safe:duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Measured scrim according to frontend-design specs */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#10233F] via-black/45 to-black/60" />
        <div className="absolute inset-0 bg-radial-[circle_at_20%_30%]_from-blue-900/30_via-transparent_to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Subtle trust kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white/95 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Curated International Travel Concierge</span>
          </div>

          {/* Headline - strictly styled with clamp display scale & text-wrap balance */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] font-display text-balance mb-6">
            Discover the World. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-blue-100 to-amber-200">
              Your Way.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-2xl font-normal leading-relaxed mb-8">
            Explore extraordinary destinations, simplify your travel plans, and turn your dream vacation into reality with bespoke holiday packages, verified 5-star stays, and seamless visa assistance.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreDestinations}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Destinations</span>
            </button>

            <button
              onClick={onPlanTrip}
              className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-sm font-semibold tracking-wide backdrop-blur-md border border-white/30 transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Plan Your Trip</span>
            </button>
          </div>
        </div>

        {/* Hero Trust Strip */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300 shrink-0">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="text-lg font-bold font-display tabular-nums">4.96 / 5.0</div>
              <div className="text-xs text-slate-300">Over 18,000 Travelers</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-sky-300 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold font-display tabular-nums">48+ Countries</div>
              <div className="text-xs text-slate-300">Curated Destinations</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold font-display tabular-nums">100% Verified</div>
              <div className="text-xs text-slate-300">Handpicked Stays & Tours</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-blue-300 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold font-display tabular-nums">24/7 Concierge</div>
              <div className="text-xs text-slate-300">Dedicated Travel Specialist</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
