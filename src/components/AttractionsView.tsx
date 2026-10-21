import React, { useState } from 'react';
import { Compass, Clock, MapPin, Plus, CheckCircle2, Star, Check, Sparkles, Users } from 'lucide-react';
import { ATTRACTIONS, Attraction } from '../data/travelData';

interface AttractionsViewProps {
  onAddToPlanner: (attraction: Attraction) => void;
}

export const AttractionsView: React.FC<AttractionsViewProps> = ({ onAddToPlanner }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories = ['all', 'Natural Wonder', 'Adventure', 'Historical Landmark', 'Cultural', 'Scenic Viewpoint'];

  const filtered = ATTRACTIONS.filter((attr) => {
    if (activeCategory === 'all') return true;
    return attr.category === activeCategory;
  });

  const handleAdd = (attr: Attraction) => {
    onAddToPlanner(attr);
    setAddedNotice(`Added "${attr.name}" to your Trip Itinerary!`);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <Compass className="w-3.5 h-3.5" />
          <span>Must-See Wonders</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
          Tourist Attractions & Things to Do
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Curated iconic landmarks, alpine cable car summits, desert balloon flights, and ancient temple pathways. Add any activity directly into your personal trip planner.
        </p>
      </div>

      {addedNotice && (
        <div className="max-w-xl mx-auto mb-8 p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-2xl flex items-center gap-3 text-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{addedNotice}</span>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            {cat === 'all' ? 'All Attractions' : cat}
          </button>
        ))}
      </div>

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between text-xs text-slate-200 mb-1">
                    <span className="flex items-center gap-1 text-amber-300 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{item.rating}</span>
                    </span>
                    <span>{item.suggestedDuration}</span>
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

                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
                  <strong className="text-slate-800 block mb-0.5">Insider Travel Tip:</strong>
                  {item.travelTips}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
              <div>
                <span className="text-[11px] text-slate-500 block">Ticket Admission</span>
                <span className="text-lg font-bold text-slate-900 font-mono">
                  {item.ticketPrice === 0 ? 'Free Entry' : `$${item.ticketPrice}`}
                </span>
              </div>

              <button
                onClick={() => handleAdd(item)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Itinerary</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
