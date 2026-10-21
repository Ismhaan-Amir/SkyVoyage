import React, { useState, useEffect } from 'react';
import {
  Compass,
  Star,
  Heart,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Plane,
  Sparkles,
  Users,
  ChevronDown,
  ChevronUp,
  MapPin,
  CheckCircle2,
  Hotel as HotelIcon,
  Utensils,
  Plus
} from 'lucide-react';

import {
  DESTINATIONS,
  PACKAGES,
  HOTELS,
  ATTRACTIONS,
  DINING_EXPERIENCES,
  INITIAL_BOOKINGS,
  Destination,
  TravelPackage,
  Hotel,
  BookingRecord,
  Attraction,
  DiningExperience
} from './data/travelData';

import { AirplaneIntro } from './components/AirplaneIntro';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TravelSearch } from './components/TravelSearch';
import { DestinationModal } from './components/DestinationModal';
import { PackageModal } from './components/PackageModal';
import { HotelModal } from './components/HotelModal';
import { VisaServicesView } from './components/VisaServicesView';
import { DiningView } from './components/DiningView';
import { AttractionsView } from './components/AttractionsView';
import { TripPlannerView, PlannedActivity } from './components/TripPlannerView';
import { UserDashboardModal } from './components/UserDashboardModal';
import { Footer } from './components/Footer';

export default function App() {
  // Opening Airplane Intro: Automatically shows when the user visits or opens the website
  const [showIntro, setShowIntro] = useState<boolean>(true);

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  // User & Bookings Persistence
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    try {
      const savedUser = localStorage.getItem('skyvoyage_user');
      return savedUser ? JSON.parse(savedUser) : { name: 'Elena Rostova', email: 'elena.rostova@voyage.demo' };
    } catch {
      return { name: 'Elena Rostova', email: 'elena.rostova@voyage.demo' };
    }
  });

  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem('skyvoyage_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('skyvoyage_favs');
      return saved ? JSON.parse(saved) : ['switzerland', 'maldives', 'japan'];
    } catch {
      return ['switzerland', 'maldives', 'japan'];
    }
  });

  // Custom Trip Planner state
  const [plannerDestinationId, setPlannerDestinationId] = useState<string>('switzerland');
  const [plannerItems, setPlannerItems] = useState<PlannedActivity[]>([]);

  // Modals
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Sync bookings & favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('skyvoyage_bookings', JSON.stringify(bookings));
    } catch {}
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('skyvoyage_favs', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNewBooking = (newBooking: BookingRecord) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
  };

  const handleSearchTrigger = (type: 'packages' | 'hotels' | 'flights' | 'visa', params: Record<string, any>) => {
    if (type === 'packages') {
      setActiveTab('packages');
      if (params.destination) {
        const destPkg = PACKAGES.find((p) => p.destinationId === params.destination);
        if (destPkg) setSelectedPackage(destPkg);
      }
    } else if (type === 'hotels') {
      setActiveTab('hotels');
      if (params.destination) {
        const h = HOTELS.find((item) => item.destinationId === params.destination);
        if (h) setSelectedHotel(h);
      }
    } else if (type === 'visa') {
      setActiveTab('visa');
    } else if (type === 'flights') {
      setActiveTab('packages');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddAttractionToPlanner = (attr: Attraction) => {
    const newItem: PlannedActivity = {
      id: `attr-${Date.now()}`,
      day: Math.min(5, plannerItems.length + 1),
      title: attr.name,
      cost: attr.ticketPrice,
      type: 'activity',
      location: attr.destination
    };
    setPlannerItems((prev) => [...prev, newItem]);
  };

  const handleAddDiningToPlanner = (dine: DiningExperience) => {
    const newItem: PlannedActivity = {
      id: `dine-${Date.now()}`,
      day: Math.min(5, plannerItems.length + 1),
      title: dine.name,
      cost: dine.pricePerPerson,
      type: 'dining',
      location: dine.destination
    };
    setPlannerItems((prev) => [...prev, newItem]);
  };

  const faqs = [
    {
      q: 'How does SkyVoyage guarantee hotel and villa quality?',
      a: 'Every property listed in our portfolio is physically inspected by our regional concierge teams according to a 60-point luxury standard covering room hygiene, acoustic insulation, verified view alignments, and guest hospitality.'
    },
    {
      q: 'What is your cancellation and refund policy?',
      a: 'We offer a 100% transparent cancellation policy. Most packages and hotel bookings feature free cancellation up to 14 days prior to departure with a full refund credited to your original payment method.'
    },
    {
      q: 'How does the Consular Visa Assistance service operate?',
      a: 'Our certified visa team audits your documents, compiles the official dossier, books priority embassy appointments, and submits e-visas directly through official government portals. We clearly distinguish official consular fees from our service charges.'
    },
    {
      q: 'Can I customize a package itinerary or combine multiple destinations?',
      a: 'Yes! Use our interactive "Trip Planner" tab to build a customized day-by-day itinerary, pick your desired hotels, and add specific attractions or culinary feasts with automated budget estimation.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFF] text-slate-900">
      {/* 1. Cinematic Three.js Airplane Opening Animation */}
      {showIntro && <AirplaneIntro onComplete={handleIntroComplete} />}

      {/* 2. Top Navigation Bar (Contract strictly enforced) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedBookingsCount={bookings.filter((b) => b.status !== 'Cancelled').length}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onOpenAuth={() => setIsDashboardOpen(true)}
        user={user}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <HeroSection
              onExploreDestinations={() => setActiveTab('destinations')}
              onPlanTrip={() => setActiveTab('planner')}
            />

            {/* Interactive Travel Search Widget */}
            <TravelSearch onSearch={handleSearchTrigger} />

            {/* Popular Destinations Section */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                <div>
                  <div className="text-xs font-semibold tracking-wider uppercase text-blue-600 mb-2">
                    Curated World Portfolios
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                    Explore Popular Destinations
                  </h2>
                  <p className="text-slate-600 text-sm mt-1 max-w-xl">
                    From the snow-draped Swiss Alps to turquoise Maldivian atolls and Ottoman palaces, discover iconic destinations crafted for memorable journeys.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('destinations')}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-800 group whitespace-nowrap"
                >
                  <span>View All 48 Destinations</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Destination Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {DESTINATIONS.slice(0, 8).map((dest) => {
                  const isFav = favorites.includes(dest.id);
                  return (
                    <div
                      key={dest.id}
                      onClick={() => setSelectedDestination(dest)}
                      className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-64 w-full overflow-hidden">
                          <img
                            src={dest.image}
                            alt={dest.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          {/* Country metadata (no pills, unboxed with separators) */}
                          <div className="absolute top-4 left-4 text-xs font-semibold text-white/90 drop-shadow-sm">
                            <span>{dest.country}</span>
                            <span className="mx-1.5 opacity-60">·</span>
                            <span>{dest.region}</span>
                          </div>

                          {/* Favorite button */}
                          <button
                            onClick={(e) => handleToggleFavorite(dest.id, e)}
                            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-90"
                            aria-label="Add to favorites"
                          >
                            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                          </button>

                          {/* Destination Title & Rating */}
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h3 className="font-bold text-lg leading-tight font-display mb-1 group-hover:text-sky-200 transition-colors">
                              {dest.name}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs text-amber-300">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span className="font-semibold">{dest.rating}</span>
                              <span className="text-white/80 font-normal">({dest.reviewsCount} reviews)</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-5">
                          <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                            {dest.tagline}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                        <div>
                          <span className="text-[11px] text-slate-400 block">Starting from</span>
                          <span className="text-base font-bold text-slate-900 font-mono">
                            ${dest.startingPrice.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ person</span>
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-blue-600 group-hover:underline">
                          Explore &rarr;
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Featured Travel Packages Section */}
            <section className="py-20 bg-slate-50/70 border-y border-slate-200/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                  <div>
                    <div className="text-xs font-semibold tracking-wider uppercase text-blue-600 mb-2">
                      Handcrafted All-Inclusive Itineraries
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                      Featured Holiday Packages
                    </h2>
                    <p className="text-slate-600 text-sm mt-1 max-w-xl">
                      Complete packages with luxury accommodations, private transportation, day-by-day curated excursions, and 24/7 bilingual travel hosts.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('packages')}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-800 group whitespace-nowrap"
                  >
                    <span>Browse All Packages</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PACKAGES.slice(0, 3).map((pkg) => (
                    <div
                      key={pkg.id}
                      className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-60 w-full overflow-hidden">
                          <img
                            src={pkg.image}
                            alt={pkg.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                              {pkg.category} Package
                            </span>
                          </div>

                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
                              <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
                              <span>·</span>
                              <span>{pkg.country}</span>
                            </div>
                            <h3 className="font-bold text-lg leading-snug font-display line-clamp-1">
                              {pkg.title}
                            </h3>
                          </div>
                        </div>

                        <div className="p-6 space-y-4">
                          <div className="space-y-1.5 text-xs text-slate-600">
                            <div className="flex justify-between py-1 border-b border-slate-100">
                              <span className="text-slate-400">Accommodation:</span>
                              <span className="font-medium text-slate-800 text-right">{pkg.accommodationType}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-slate-100">
                              <span className="text-slate-400">Meals:</span>
                              <span className="font-medium text-slate-800 text-right">{pkg.mealsIncluded}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-slate-400">Transport:</span>
                              <span className="font-medium text-slate-800 text-right">{pkg.transportation}</span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                              Key Highlights
                            </span>
                            <div className="space-y-1">
                              {pkg.inclusions.slice(0, 2).map((inc, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                                  <span className="line-clamp-1">{inc}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-slate-900 font-mono">
                              ${pkg.pricePerPerson.toLocaleString()}
                            </span>
                            <span className="text-xs text-slate-400 line-through">
                              ${pkg.originalPrice.toLocaleString()}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400">per person (twin share)</span>
                        </div>

                        <button
                          onClick={() => setSelectedPackage(pkg)}
                          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
                        >
                          View & Book
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Curated Luxury Hotels Preview */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                <div>
                  <div className="text-xs font-semibold tracking-wider uppercase text-blue-600 mb-2">
                    Extraordinary Stays
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                    Luxury Stays & Accommodations
                  </h2>
                  <p className="text-slate-600 text-sm mt-1 max-w-xl">
                    Overwater bungalows with direct ocean slides, 400-year restored royal stone forts, and cliffside alpine chalets.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('hotels')}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-800 group whitespace-nowrap"
                >
                  <span>Explore All Stays</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {HOTELS.slice(0, 3).map((hotel) => (
                  <div
                    key={hotel.id}
                    className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-60 w-full overflow-hidden">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                            {hotel.category}
                          </span>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <div className="flex items-center gap-1.5 text-xs text-amber-300 mb-1">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="font-semibold">{hotel.rating}</span>
                            <span className="text-slate-300 font-normal">({hotel.reviewsCount} reviews)</span>
                          </div>
                          <h3 className="font-bold text-base leading-snug line-clamp-1 font-display">
                            {hotel.name}
                          </h3>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                          {hotel.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {hotel.amenities.slice(0, 3).map((am, i) => (
                            <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                              {am}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                      <div>
                        <span className="text-[11px] text-slate-400 block">From</span>
                        <span className="text-lg font-bold text-slate-900 font-mono">
                          ${hotel.pricePerNight} <span className="text-xs font-normal text-slate-500">/ night</span>
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedHotel(hotel)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
                      >
                        View Rooms
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Custom Trip Planner Teaser Banner */}
            <section className="py-16 bg-gradient-to-r from-[#10233F] to-[#1E3A8A] text-white my-8 relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-sky-300 mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Personalized Travel Concierge</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-3">
                    Build Your Custom Journey in Minutes
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Combine bespoke hotels, sunrise excursions, Michelin dining, and visa assistance with an auto-updating budget calculator and day-by-day itinerary timeline.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('planner')}
                  className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-[#10233F] font-bold text-sm shadow-xl transition-all active:scale-95 shrink-0 flex items-center gap-2"
                >
                  <span>Launch Trip Planner</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* Travel FAQs Section */}
            <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-2">
                  Frequently Asked Questions
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 font-display">
                  Everything You Need to Know Before Traveling
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 transition-colors hover:bg-slate-50"
                      >
                        <span className="font-bold text-slate-900 text-sm sm:text-base font-display">
                          {faq.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {/* Tab 2: All Destinations Catalog */}
        {activeTab === 'destinations' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-2">
                Explore The Globe
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display mb-4">
                Global Travel Destinations
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Click on any destination to view verified high-resolution photo galleries, seasonal climate insights, entry visa guidelines, and direct booking options.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DESTINATIONS.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => setSelectedDestination(dest)}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-64 w-full overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute top-4 left-4 text-xs font-semibold text-white/90">
                        <span>{dest.country}</span>
                        <span className="mx-1.5 opacity-60">·</span>
                        <span>{dest.region}</span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="font-bold text-lg font-display mb-1">{dest.name}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-amber-300">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{dest.rating}</span>
                          <span className="text-white/80">({dest.reviewsCount} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                        {dest.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                    <div>
                      <span className="text-[11px] text-slate-400 block">From</span>
                      <span className="text-base font-bold text-slate-900 font-mono">
                        ${dest.startingPrice.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-blue-600">Details &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Packages Catalog */}
        {activeTab === 'packages' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-2">
                All-Inclusive Holiday Tours
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display mb-4">
                Curated Travel Packages
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Seamless multi-day itineraries with 5-star accommodations, private transport, and personal travel concierges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-60 w-full overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                          {pkg.category}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="text-xs text-slate-300 block mb-1">
                          {pkg.durationDays} Days / {pkg.durationNights} Nights · {pkg.country}
                        </span>
                        <h3 className="font-bold text-lg font-display line-clamp-1">{pkg.title}</h3>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="space-y-1.5 text-xs text-slate-600">
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span className="text-slate-400">Stay:</span>
                          <span className="font-medium text-slate-800 text-right">{pkg.accommodationType}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span className="text-slate-400">Meals:</span>
                          <span className="font-medium text-slate-800 text-right">{pkg.mealsIncluded}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-slate-400">Transport:</span>
                          <span className="font-medium text-slate-800 text-right">{pkg.transportation}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                          Included Experiences
                        </span>
                        <div className="space-y-1">
                          {pkg.inclusions.slice(0, 3).map((inc, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                              <span className="line-clamp-1">{inc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                    <div>
                      <span className="text-lg font-bold text-slate-900 font-mono">
                        ${pkg.pricePerPerson.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-slate-400 block">per person</span>
                    </div>

                    <button
                      onClick={() => setSelectedPackage(pkg)}
                      className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
                    >
                      View Details & Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Visa Assistance Services */}
        {activeTab === 'visa' && (
          <VisaServicesView onVisaRequestSubmitted={handleNewBooking} />
        )}

        {/* Tab 5: Hotels and Stays */}
        {activeTab === 'hotels' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider block mb-2">
                Handpicked Accommodations
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display mb-4">
                Luxury Stays & Boutique Resorts
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Indulge in private infinity pool villas, restored antique cave suites, and high-alpine chalet hotels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {HOTELS.map((hotel) => (
                <div
                  key={hotel.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-60 w-full overflow-hidden">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                          {hotel.category}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center gap-1.5 text-xs text-amber-300 mb-1">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-semibold">{hotel.rating}</span>
                          <span className="text-slate-300 font-normal">({hotel.reviewsCount} reviews)</span>
                        </div>
                        <h3 className="font-bold text-base leading-snug line-clamp-1 font-display">
                          {hotel.name}
                        </h3>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                        {hotel.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {hotel.amenities.map((am, i) => (
                          <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                            {am}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Nightly Rate</span>
                      <span className="text-lg font-bold text-slate-900 font-mono">
                        ${hotel.pricePerNight}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedHotel(hotel)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
                    >
                      Reserve Suite
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Food & Dining Experiences */}
        {activeTab === 'dining' && (
          <DiningView
            onAddToPlanner={(dine) => {
              handleAddDiningToPlanner(dine);
              setActiveTab('planner');
            }}
            onBookingConfirmed={handleNewBooking}
          />
        )}

        {/* Tab 7: Attractions and Things To Do */}
        {activeTab === 'attractions' && (
          <AttractionsView
            onAddToPlanner={(attr) => {
              handleAddAttractionToPlanner(attr);
              setActiveTab('planner');
            }}
          />
        )}

        {/* Tab 8: Personalized Custom Trip Planner */}
        {activeTab === 'planner' && (
          <TripPlannerView
            initialDestinationId={plannerDestinationId}
            plannerItems={plannerItems}
            setPlannerItems={setPlannerItems}
            onSaveItinerary={handleNewBooking}
          />
        )}
      </main>

      {/* 3. Footer */}
      <Footer
        onSelectDestination={(id) => {
          const d = DESTINATIONS.find((item) => item.id === id);
          if (d) setSelectedDestination(d);
        }}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modals */}
      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onBookPackage={(destId) => {
          const pkg = PACKAGES.find((p) => p.destinationId === destId);
          if (pkg) setSelectedPackage(pkg);
          else setActiveTab('packages');
        }}
        onPlanTrip={(destId) => {
          setPlannerDestinationId(destId);
          setActiveTab('planner');
        }}
      />

      <PackageModal
        packageData={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onBookingConfirmed={handleNewBooking}
      />

      <HotelModal
        hotel={selectedHotel}
        onClose={() => setSelectedHotel(null)}
        onBookingConfirmed={handleNewBooking}
      />

      <UserDashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        user={user}
        onSignOut={() => setUser(null)}
        onSignIn={(name, email) => setUser({ name, email })}
        favorites={favorites}
        allDestinations={DESTINATIONS}
      />
    </div>
  );
}
