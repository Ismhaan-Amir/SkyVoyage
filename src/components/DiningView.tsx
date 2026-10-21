import React, { useState } from 'react';
import { Utensils, Clock, MapPin, Check, Heart, Shield, Plus, CheckCircle2 } from 'lucide-react';
import { DINING_EXPERIENCES, DiningExperience, BookingRecord } from '../data/travelData';

interface DiningViewProps {
  onAddToPlanner?: (experience: DiningExperience) => void;
  onBookingConfirmed?: (booking: BookingRecord) => void;
}

export const DiningView: React.FC<DiningViewProps> = ({
  onAddToPlanner,
  onBookingConfirmed
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'Halal' | 'Vegetarian' | 'Fine Dining'>('all');
  const [selectedExp, setSelectedExp] = useState<DiningExperience | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const filtered = DINING_EXPERIENCES.filter((exp) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'Fine Dining') return exp.category === 'Fine Dining';
    return exp.dietary.includes(activeFilter as any);
  });

  const handleBookDining = (exp: DiningExperience) => {
    const generatedId = `SV-DINE-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking: BookingRecord = {
      id: generatedId,
      type: 'itinerary',
      title: exp.name,
      destination: exp.country,
      bookingDate: new Date().toISOString().split('T')[0],
      travelDate: '2026-11-22',
      travelersCount: 2,
      totalAmount: exp.pricePerPerson * 2,
      status: 'Confirmed',
      customerName: 'Elena Rostova',
      customerEmail: 'elena.rostova@voyage.demo',
      details: {
        location: exp.location,
        duration: exp.duration,
        category: exp.category,
        dietary: exp.dietary.join(', ')
      }
    };

    if (onBookingConfirmed) {
      onBookingConfirmed(newBooking);
    }
    setBookingSuccess(`Reserved "${exp.name}" for 2 guests! Saved to your dashboard.`);
    setTimeout(() => setBookingSuccess(null), 4000);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <Utensils className="w-3.5 h-3.5" />
          <span>Gastronomic Journeys</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
          Local Food & Dining Experiences
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          From Ottoman clay-pot lamb feasts to Kyoto Kaiseki tea banquets and Jimbaran beachfront seafood, taste the authentic heritage of each destination.
        </p>
      </div>

      {bookingSuccess && (
        <div className="max-w-xl mx-auto mb-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{bookingSuccess}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === 'all'
              ? 'bg-[#10233F] text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
        >
          All Experiences
        </button>
        <button
          onClick={() => setActiveFilter('Halal')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === 'Halal'
              ? 'bg-[#10233F] text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
        >
          Halal Certified
        </button>
        <button
          onClick={() => setActiveFilter('Vegetarian')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === 'Vegetarian'
              ? 'bg-[#10233F] text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
        >
          Vegetarian Friendly
        </button>
        <button
          onClick={() => setActiveFilter('Fine Dining')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === 'Fine Dining'
              ? 'bg-[#10233F] text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
        >
          Michelin & Fine Dining
        </button>
      </div>

      {/* Experience Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                  {item.dietary.map((d) => (
                    <span key={d} className="px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md text-white text-[11px] font-medium border border-white/20">
                      {d}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="font-bold text-base leading-snug line-clamp-1 font-display">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {/* Featured Dishes List */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Signature Tasting Courses
                  </span>
                  <div className="space-y-1.5">
                    {item.featuredDishes.slice(0, 3).map((dish, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{dish}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
              <div>
                <span className="text-[11px] text-slate-500 block">Experience Duration: {item.duration}</span>
                <span className="text-lg font-bold text-slate-900 font-mono">
                  ${item.pricePerPerson} <span className="text-xs font-normal text-slate-500">/ guest</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                {onAddToPlanner && (
                  <button
                    onClick={() => onAddToPlanner(item)}
                    title="Add to Custom Itinerary"
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleBookDining(item)}
                  className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  Reserve Table
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
