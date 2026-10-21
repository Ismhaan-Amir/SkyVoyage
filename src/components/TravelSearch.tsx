import React, { useState } from 'react';
import { Search, Calendar, Users, MapPin, DollarSign, Plane, Hotel, Compass, FileCheck, ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '../data/travelData';

interface TravelSearchProps {
  onSearch: (type: 'packages' | 'hotels' | 'flights' | 'visa', params: Record<string, any>) => void;
}

export const TravelSearch: React.FC<TravelSearchProps> = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState<'packages' | 'hotels' | 'flights' | 'visa'>('packages');

  // Form States - Packages
  const [pkgDestination, setPkgDestination] = useState('switzerland');
  const [pkgDepartureCity, setPkgDepartureCity] = useState('New York (JFK)');
  const [pkgTravelDate, setPkgTravelDate] = useState('2026-11-15');
  const [pkgTravelers, setPkgTravelers] = useState(2);
  const [pkgBudget, setPkgBudget] = useState('all');

  // Form States - Hotels
  const [hotelDestination, setHotelDestination] = useState('maldives');
  const [hotelCheckIn, setHotelCheckIn] = useState('2026-11-20');
  const [hotelCheckOut, setHotelCheckOut] = useState('2026-11-25');
  const [hotelGuests, setHotelGuests] = useState(2);
  const [hotelRooms, setHotelRooms] = useState(1);

  // Form States - Flights
  const [flightOrigin, setFlightOrigin] = useState('London Heathrow (LHR)');
  const [flightDestination, setFlightDestination] = useState('Tokyo Haneda (HND)');
  const [flightDate, setFlightDate] = useState('2026-11-18');
  const [flightCabin, setFlightCabin] = useState('Business');

  // Form States - Visa
  const [visaNationality, setVisaNationality] = useState('United States');
  const [visaDestination, setVisaDestination] = useState('Switzerland');
  const [visaType, setVisaType] = useState('Tourist Visa');

  const [notification, setNotification] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'packages') {
      onSearch('packages', {
        destination: pkgDestination,
        departureCity: pkgDepartureCity,
        date: pkgTravelDate,
        travelers: pkgTravelers,
        budget: pkgBudget
      });
    } else if (activeTab === 'hotels') {
      onSearch('hotels', {
        destination: hotelDestination,
        checkIn: hotelCheckIn,
        checkOut: hotelCheckOut,
        guests: hotelGuests,
        rooms: hotelRooms
      });
    } else if (activeTab === 'flights') {
      setNotification(`Searching live scheduled flight routes from ${flightOrigin} to ${flightDestination} in ${flightCabin} Class...`);
      setTimeout(() => {
        onSearch('flights', {
          origin: flightOrigin,
          destination: flightDestination,
          date: flightDate,
          cabin: flightCabin
        });
        setNotification(null);
      }, 1000);
    } else if (activeTab === 'visa') {
      onSearch('visa', {
        nationality: visaNationality,
        destination: visaDestination,
        type: visaType
      });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto -mt-16 sm:-mt-20 relative z-20 px-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Tab Selection Header */}
        <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar bg-slate-50/70 p-2 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('packages')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === 'packages'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Compass className="w-4 h-4 text-blue-600" />
            <span>Holiday Packages</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('hotels')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === 'hotels'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Hotel className="w-4 h-4 text-emerald-600" />
            <span>Hotels & Stays</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('flights')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === 'flights'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Plane className="w-4 h-4 text-sky-500" />
            <span>Flights</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('visa')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === 'visa'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <FileCheck className="w-4 h-4 text-amber-500" />
            <span>Visa Assistance</span>
          </button>
        </div>

        {/* Search Panel Form */}
        <form onSubmit={handleSearchSubmit} className="p-6 sm:p-8">
          {activeTab === 'packages' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <select
                    value={pkgDestination}
                    onChange={(e) => setPkgDestination(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {DESTINATIONS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.country} — {d.name.split('&')[0]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Departure City
                </label>
                <input
                  type="text"
                  value={pkgDepartureCity}
                  onChange={(e) => setPkgDepartureCity(e.target.value)}
                  placeholder="e.g. New York, London, Dubai"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Travel Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="date"
                    value={pkgTravelDate}
                    onChange={(e) => setPkgTravelDate(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Travelers & Budget
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <Users className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                    <select
                      value={pkgTravelers}
                      onChange={(e) => setPkgTravelers(Number(e.target.value))}
                      className="w-full pl-7 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value={1}>1 Person</option>
                      <option value={2}>2 Guests</option>
                      <option value={4}>4 (Family)</option>
                      <option value={6}>6+ Group</option>
                    </select>
                  </div>
                  <select
                    value={pkgBudget}
                    onChange={(e) => setPkgBudget(e.target.value)}
                    className="w-full px-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="all">Any Tier</option>
                    <option value="budget">&lt; $1,200</option>
                    <option value="moderate">$1,200-$2,500</option>
                    <option value="luxury">$2,500+</option>
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  <span>Find Packages</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'hotels' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Destination or City
                </label>
                <select
                  value={hotelDestination}
                  onChange={(e) => setHotelDestination(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.country} ({d.name.split(' ')[0]})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={hotelCheckIn}
                  onChange={(e) => setHotelCheckIn(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={hotelCheckOut}
                  onChange={(e) => setHotelCheckOut(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Guests & Rooms
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={hotelGuests}
                    onChange={(e) => setHotelGuests(Number(e.target.value))}
                    className="w-full px-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4+ Guests</option>
                  </select>
                  <select
                    value={hotelRooms}
                    onChange={(e) => setHotelRooms(Number(e.target.value))}
                    className="w-full px-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                  >
                    <option value={1}>1 Room</option>
                    <option value={2}>2 Rooms</option>
                    <option value={3}>3+ Rooms</option>
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Hotels</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'flights' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  From (Origin)
                </label>
                <input
                  type="text"
                  value={flightOrigin}
                  onChange={(e) => setFlightOrigin(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  To (Destination)
                </label>
                <input
                  type="text"
                  value={flightDestination}
                  onChange={(e) => setFlightDestination(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Departure Date
                </label>
                <input
                  type="date"
                  value={flightDate}
                  onChange={(e) => setFlightDate(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Cabin Class
                </label>
                <select
                  value={flightCabin}
                  onChange={(e) => setFlightCabin(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800"
                >
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">Business Class</option>
                  <option value="First">First Class Suite</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <Plane className="w-4 h-4" />
                  <span>Search Flights</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'visa' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  My Passport Nationality
                </label>
                <select
                  value={visaNationality}
                  onChange={(e) => setVisaNationality(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="India">India</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Destination Country
                </label>
                <select
                  value={visaDestination}
                  onChange={(e) => setVisaDestination(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Switzerland">Switzerland (Schengen)</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Japan">Japan</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Northern Pakistan">Pakistan</option>
                  <option value="Indonesia">Indonesia (Bali)</option>
                  <option value="United Arab Emirates">United Arab Emirates (Dubai)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Visa Category
                </label>
                <select
                  value={visaType}
                  onChange={(e) => setVisaType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Tourist Visa">Tourist Visa</option>
                  <option value="Business Visa">Business Visa</option>
                  <option value="E-Visa">E-Visa (Online)</option>
                  <option value="Family Visit">Family Visit Visa</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Check Requirements</span>
                </button>
              </div>
            </div>
          )}

          {notification && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-center justify-between">
              <span>{notification}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
