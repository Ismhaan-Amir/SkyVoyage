import React, { useState, useEffect } from 'react';
import { Plane, Menu, X, User, Compass, BookmarkCheck, Calendar } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedBookingsCount: number;
  onOpenDashboard: () => void;
  onOpenAuth: () => void;
  user: { name: string; email: string } | null;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedBookingsCount,
  onOpenDashboard,
  onOpenAuth,
  user,
  onReplayIntro
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'packages', label: 'Packages' },
    { id: 'visa', label: 'Visa Services' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'dining', label: 'Dining' },
    { id: 'attractions', label: 'Things To Do' },
    { id: 'planner', label: 'Trip Planner' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isTransparent = !scrolled && activeTab === 'home';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isTransparent
            ? 'bg-gradient-to-b from-black/60 via-black/25 to-transparent text-white'
            : 'bg-white/95 backdrop-blur-md text-[#10233F] border-b border-slate-200/80 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-20">
            {/* Zone 1: Single text wordmark */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-xl font-bold tracking-tight whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Plane className="w-5 h-5 -rotate-45" />
              </div>
              <span className={`font-display text-2xl tracking-tight ${isTransparent ? 'text-white' : 'text-[#10233F]'}`}>
                SkyVoyage
              </span>
            </button>

            {/* Zone 2: Navigation Links (Single Line, clean text hover states) */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                      isActive
                        ? isTransparent
                          ? 'text-white font-semibold'
                          : 'text-blue-600 font-semibold'
                        : isTransparent
                        ? 'text-white/85 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                          isTransparent ? 'bg-white' : 'bg-blue-600'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: 1 Primary Action (Trips / Account) + Mobile Hamburger */}
            <div className="flex items-center gap-3 shrink-0">
              {user ? (
                <button
                  onClick={onOpenDashboard}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all active:scale-95 ${
                    isTransparent
                      ? 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>My Trips ({savedBookingsCount})</span>
                </button>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all active:scale-95 ${
                    isTransparent
                      ? 'bg-white text-[#10233F] hover:bg-slate-100 shadow-sm'
                      : 'bg-[#10233F] text-white hover:bg-[#1b365d] shadow-sm'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isTransparent ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'
                }`}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-black/50 backdrop-blur-xs pt-20">
          <div className="bg-white px-6 py-6 border-b border-slate-200 shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    onOpenDashboard();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-sm"
                >
                  <BookmarkCheck className="w-4 h-4" />
                  <span>My Trips & Reservations ({savedBookingsCount})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
