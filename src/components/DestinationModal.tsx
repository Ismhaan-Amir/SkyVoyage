import React, { useState } from 'react';
import { X, Star, Calendar, Sun, DollarSign, Globe, Check, ArrowRight, Compass, Shield } from 'lucide-react';
import { Destination } from '../data/travelData';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onBookPackage: (destinationId: string) => void;
  onPlanTrip: (destinationId: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onBookPackage,
  onPlanTrip
}) => {
  if (!destination) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-100 relative my-8">
        {/* Close & Explore More Cross Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs font-semibold backdrop-blur-md transition-all active:scale-95 shadow-lg group border border-white/20"
          aria-label="Close and explore more"
          title="Close and explore more"
        >
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          <span>Close & Explore More</span>
        </button>

        {/* Hero Gallery Header */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src={destination.gallery[activeImageIndex] || destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-all duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Destination Header Title */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sky-300 mb-1">
              <span>{destination.country}</span>
              <span>·</span>
              <span>{destination.region}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display mb-2">
              {destination.name}
            </h2>
            <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-200">
              <span className="flex items-center gap-1 text-amber-300 font-semibold">
                <Star className="w-4 h-4 fill-current" />
                <span>{destination.rating}</span>
                <span className="text-slate-300 font-normal">({destination.reviewsCount} verified reviews)</span>
              </span>
              <span>·</span>
              <span>From ${destination.startingPrice.toLocaleString()} / person</span>
            </div>
          </div>

          {/* Thumbnail Selector */}
          {destination.gallery.length > 1 && (
            <div className="absolute top-4 left-6 flex gap-2 z-10">
              {destination.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-9 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx ? 'border-white scale-105 shadow-md' : 'border-white/50 opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
          {/* Key Facts Pill-free Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-slate-100 text-xs sm:text-sm">
            <div>
              <span className="block text-slate-400 font-medium mb-1">Best Season</span>
              <span className="font-semibold text-slate-800">{destination.bestSeason}</span>
            </div>
            <div>
              <span className="block text-slate-400 font-medium mb-1">Climate</span>
              <span className="font-semibold text-slate-800">{destination.climate}</span>
            </div>
            <div>
              <span className="block text-slate-400 font-medium mb-1">Currency</span>
              <span className="font-semibold text-slate-800">{destination.currency}</span>
            </div>
            <div>
              <span className="block text-slate-400 font-medium mb-1">Visa Guidance</span>
              <span className="font-semibold text-slate-800">{destination.visaPolicy}</span>
            </div>
          </div>

          {/* Overview Prose */}
          <div className="py-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Destination Overview</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {destination.description}
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              {destination.tagline}
            </p>
          </div>

          {/* Highlights */}
          <div className="py-4">
            <h3 className="text-lg font-bold text-slate-900 mb-3 font-display">Top Signature Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destination.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Guarantee */}
          <div className="mt-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center gap-3 text-xs text-blue-900">
            <Shield className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <span className="font-semibold">SkyVoyage Peace of Mind Guarantee:</span> All hotel stays and tour packages for {destination.name} include 100% verified 4/5-star accommodation, private arrival transfers, and 24/7 dedicated destination support.
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-500">Starting package price</div>
            <div className="text-2xl font-extrabold text-slate-900 font-display">
              ${destination.startingPrice.toLocaleString()}{' '}
              <span className="text-xs font-normal text-slate-500">/ person (7 days)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onPlanTrip(destination.id);
              }}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
            >
              Plan Custom Itinerary
            </button>
            <button
              onClick={() => {
                onClose();
                onBookPackage(destination.id);
              }}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Tour Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
