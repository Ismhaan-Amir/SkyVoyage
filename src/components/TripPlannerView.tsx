import React, { useState } from 'react';
import { Compass, Calendar, Users, Hotel, Utensils, FileCheck, DollarSign, Plus, Trash2, ArrowRight, CheckCircle2, MapPin, Sparkles, MoveUp, MoveDown } from 'lucide-react';
import { DESTINATIONS, HOTELS, ATTRACTIONS, DINING_EXPERIENCES, BookingRecord } from '../data/travelData';

export interface PlannedActivity {
  id: string;
  day: number;
  title: string;
  cost: number;
  type: 'activity' | 'dining';
  location: string;
}

interface TripPlannerViewProps {
  initialDestinationId?: string;
  plannerItems: PlannedActivity[];
  setPlannerItems: React.Dispatch<React.SetStateAction<PlannedActivity[]>>;
  onSaveItinerary: (booking: BookingRecord) => void;
}

export const TripPlannerView: React.FC<TripPlannerViewProps> = ({
  initialDestinationId = 'switzerland',
  plannerItems,
  setPlannerItems,
  onSaveItinerary
}) => {
  const [destinationId, setDestinationId] = useState<string>(initialDestinationId);
  const [startDate, setStartDate] = useState<string>('2026-11-20');
  const [totalDays, setTotalDays] = useState<number>(5);
  const [travelers, setTravelers] = useState<number>(2);
  const [targetBudget, setTargetBudget] = useState<number>(4500);

  // Selected Hotel
  const availableHotels = HOTELS.filter((h) => h.destinationId === destinationId);
  const [selectedHotelId, setSelectedHotelId] = useState<string>(availableHotels[0]?.id || HOTELS[0].id);

  // Visa Addon Toggle
  const [includeVisa, setIncludeVisa] = useState<boolean>(true);

  // Feedback Notification
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState<BookingRecord | null>(null);

  // Current Destination Object
  const currentDest = DESTINATIONS.find((d) => d.id === destinationId) || DESTINATIONS[0];
  const currentHotel = HOTELS.find((h) => h.id === selectedHotelId) || availableHotels[0] || HOTELS[0];

  // Quick activity adder state
  const [newActivityDay, setNewActivityDay] = useState<number>(1);
  const [customActTitle, setCustomActTitle] = useState('');
  const [customActCost, setCustomActCost] = useState(50);

  // Initial seed activities if none
  React.useEffect(() => {
    if (plannerItems.length === 0) {
      setPlannerItems([
        {
          id: 'init-1',
          day: 1,
          title: 'Arrival & Scenic Lake Promenade Welcome Dinner',
          cost: 65,
          type: 'dining',
          location: currentDest.name
        },
        {
          id: 'init-2',
          day: 2,
          title: 'Matterhorn Glacier Paradise Ascent Cable Car',
          cost: 110,
          type: 'activity',
          location: 'Alpine Summit'
        },
        {
          id: 'init-3',
          day: 3,
          title: 'Vintage Steamer Cruise & Local Cheese Fondue',
          cost: 85,
          type: 'dining',
          location: 'Lakefront'
        }
      ]);
    }
  }, [destinationId]);

  // Expenses calculations
  const hotelTotal = currentHotel ? currentHotel.pricePerNight * (totalDays - 1) : 0;
  const activitiesTotal = plannerItems.reduce((acc, curr) => acc + (curr.cost * travelers), 0);
  const transportEst = 120 * totalDays * travelers; // Local rail, taxi & airport transfers
  const mealsDailyEst = 75 * totalDays * travelers; // General daily breakfast & lunches
  const visaTotal = includeVisa ? (90 + 65) * travelers : 0;
  const grandEstimatedBudget = hotelTotal + activitiesTotal + transportEst + mealsDailyEst + visaTotal;

  const handleAddCustomActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customActTitle.trim()) return;

    const newAct: PlannedActivity = {
      id: `act-${Date.now()}`,
      day: newActivityDay,
      title: customActTitle,
      cost: customActCost,
      type: 'activity',
      location: currentDest.name
    };

    setPlannerItems((prev) => [...prev, newAct]);
    setCustomActTitle('');
    setActionNotice(`Added "${customActTitle}" to Day ${newActivityDay}`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleRemoveActivity = (id: string) => {
    setPlannerItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMoveDay = (id: string, newDay: number) => {
    if (newDay < 1 || newDay > totalDays) return;
    setPlannerItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, day: newDay } : item))
    );
  };

  const handleSaveTrip = (status: 'Confirmed' | 'Processing') => {
    const generatedId = `SV-TRIP-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRecord: BookingRecord = {
      id: generatedId,
      type: 'itinerary',
      title: `Custom ${totalDays}-Day ${currentDest.name} Journey`,
      destination: currentDest.country,
      bookingDate: new Date().toISOString().split('T')[0],
      travelDate: startDate,
      travelersCount: travelers,
      totalAmount: grandEstimatedBudget,
      status: status,
      customerName: 'Elena Rostova',
      customerEmail: 'elena.rostova@voyage.demo',
      details: {
        hotel: currentHotel?.name || 'Selected Boutique Stay',
        totalDays: totalDays,
        itemCount: plannerItems.length,
        visaIncluded: includeVisa,
        targetBudget: targetBudget
      }
    };

    onSaveItinerary(newRecord);
    setSavedSuccess(newRecord);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Custom Itinerary Studio</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
          Design Your Dream Trip
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Craft a bespoke day-by-day travel plan. Pair 5-star accommodations with curated local attractions, culinary feasts, and visa concierge with real-time budget forecasting.
        </p>
      </div>

      {actionNotice && (
        <div className="max-w-xl mx-auto mb-6 p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {savedSuccess && (
        <div className="max-w-2xl mx-auto mb-10 p-6 bg-emerald-50 border border-emerald-200 rounded-3xl text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-display mb-1">
            Trip Itinerary Saved to Your Account!
          </h3>
          <p className="text-slate-600 text-xs mb-4">
            Reference code <strong className="font-mono text-blue-600">{savedSuccess.id}</strong>. Your full day-by-day schedule and estimated budget of ${savedSuccess.totalAmount.toLocaleString()} is saved in your bookings dashboard.
          </p>
          <button
            onClick={() => setSavedSuccess(null)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold"
          >
            Continue Editing Itinerary
          </button>
        </div>
      )}

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Itinerary Configuration Form */}
        <div className="space-y-6">
          {/* Trip Essentials Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>1. Trip Parameters</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Target Destination
              </label>
              <select
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800"
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.country} — {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Departure Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Duration (Days)
                </label>
                <select
                  value={totalDays}
                  onChange={(e) => setTotalDays(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                >
                  <option value={3}>3 Days (Weekend)</option>
                  <option value={5}>5 Days (Standard)</option>
                  <option value={7}>7 Days (1 Week)</option>
                  <option value={10}>10 Days (Extended)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Travelers
                </label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                >
                  <option value={1}>1 Solo Explorer</option>
                  <option value={2}>2 Couple / Pair</option>
                  <option value={3}>3 Travelers</option>
                  <option value={4}>4 Family Group</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Target Budget ($)
                </label>
                <input
                  type="number"
                  value={targetBudget}
                  onChange={(e) => setTargetBudget(Number(e.target.value))}
                  step={500}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>
            </div>
          </div>

          {/* Hotel Selection Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <Hotel className="w-4 h-4 text-emerald-600" />
              <span>2. Accommodation Choice</span>
            </h3>

            <div className="space-y-2">
              {availableHotels.map((h) => {
                const isSelected = selectedHotelId === h.id;
                return (
                  <div
                    key={h.id}
                    onClick={() => setSelectedHotelId(h.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">{h.name}</span>
                      <span className="font-mono font-bold text-emerald-700 text-xs">
                        ${h.pricePerNight} <span className="font-normal text-[10px] text-slate-500">/nt</span>
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">{h.city} · {h.category}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visa Concierge Toggle */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div className="pr-4">
              <h4 className="font-bold text-slate-900 text-sm font-display flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-amber-500" />
                <span>3. Add Visa Concierge</span>
              </h4>
              <p className="text-slate-500 text-xs mt-1">
                Include consular document preparation and embassy handling ($155 / traveler).
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIncludeVisa(!includeVisa)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                includeVisa ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  includeVisa ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Add Custom Activity Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-sm font-display flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-blue-600" />
              <span>Add Custom Activity / Dining</span>
            </h4>
            <form onSubmit={handleAddCustomActivity} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={customActTitle}
                  onChange={(e) => setCustomActTitle(e.target.value)}
                  placeholder="e.g. Paragliding, Museum pass, Sunset cruise..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-semibold">Assign to Day</label>
                  <select
                    value={newActivityDay}
                    onChange={(e) => setNewActivityDay(Number(e.target.value))}
                    className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    {Array.from({ length: totalDays }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>
                        Day {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-semibold">Cost per Person ($)</label>
                  <input
                    type="number"
                    value={customActCost}
                    onChange={(e) => setCustomActCost(Number(e.target.value))}
                    className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                    min={0}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
              >
                Add to Schedule
              </button>
            </form>
          </div>
        </div>

        {/* Center Column: Day-by-Day Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
                  Timeline Overview
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                  {totalDays}-Day Custom Itinerary: {currentDest.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSaveTrip('Processing')}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all"
                >
                  Save Draft
                </button>
                <button
                  onClick={() => handleSaveTrip('Confirmed')}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Book Entire Trip</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days Stack */}
            <div className="space-y-6">
              {Array.from({ length: totalDays }, (_, i) => i + 1).map((dayNumber) => {
                const dayActivities = plannerItems.filter((item) => item.day === dayNumber);
                return (
                  <div key={dayNumber} className="relative pl-6 sm:pl-8 border-l-2 border-blue-200 space-y-3">
                    {/* Day Marker Dot */}
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-xs" />

                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 font-display">
                        Day {dayNumber}{' '}
                        <span className="text-xs font-normal text-slate-400">
                          ({new Date(new Date(startDate).getTime() + (dayNumber - 1) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
                        </span>
                      </h4>
                      <span className="text-xs text-slate-400">
                        {dayActivities.length} items planned
                      </span>
                    </div>

                    {dayActivities.length === 0 ? (
                      <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-xs text-slate-400 text-center">
                        Free morning / leisurely exploration. Add an activity from the left panel.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {dayActivities.map((act) => (
                          <div
                            key={act.id}
                            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0">
                                {act.type === 'dining' ? (
                                  <Utensils className="w-4 h-4 text-amber-500" />
                                ) : (
                                  <Compass className="w-4 h-4" />
                                )}
                              </div>
                              <div>
                                <span className="font-semibold text-slate-800 text-xs sm:text-sm block">
                                  {act.title}
                                </span>
                                <span className="text-[11px] text-slate-400">
                                  {act.location} · ${act.cost} / person
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => handleMoveDay(act.id, act.day - 1)}
                                disabled={act.day <= 1}
                                title="Move to previous day"
                                className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                              >
                                <MoveUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleMoveDay(act.id, act.day + 1)}
                                disabled={act.day >= totalDays}
                                title="Move to next day"
                                className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                              >
                                <MoveDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleRemoveActivity(act.id)}
                                title="Remove activity"
                                className="p-1 rounded text-rose-400 hover:text-rose-600 ml-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Estimated Trip Budget Card (Itemized breakdown) */}
            <div className="mt-8 pt-6 border-t border-slate-200 bg-slate-50/70 p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-display">
                    Estimated Trip Budget Breakdown
                  </h4>
                  <p className="text-xs text-slate-500">
                    Calculated for {travelers} travelers across {totalDays} days.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Total Est. Cost</span>
                  <span className="text-2xl font-extrabold text-blue-600 font-mono">
                    ${grandEstimatedBudget.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Itemized Categories */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs pt-2">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-0.5">Accommodation</span>
                  <span className="font-bold text-slate-800 font-mono">${hotelTotal.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-0.5">Activities & Feasts</span>
                  <span className="font-bold text-slate-800 font-mono">${activitiesTotal.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-0.5">Est. Local Transport</span>
                  <span className="font-bold text-slate-800 font-mono">${transportEst.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-0.5">Daily Meals & Cafes</span>
                  <span className="font-bold text-slate-800 font-mono">${mealsDailyEst.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-0.5">Visa Concierge</span>
                  <span className="font-bold text-slate-800 font-mono">${visaTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Budget Health indicator */}
              <div className="pt-2">
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Target Budget: ${targetBudget.toLocaleString()}</span>
                  <span>
                    {grandEstimatedBudget <= targetBudget
                      ? `Within budget ($${(targetBudget - grandEstimatedBudget).toLocaleString()} remaining)`
                      : `Exceeds target by $${(grandEstimatedBudget - targetBudget).toLocaleString()}`}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      grandEstimatedBudget <= targetBudget ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(100, (grandEstimatedBudget / targetBudget) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
