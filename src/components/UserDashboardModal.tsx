import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle2, Clock, Trash2, Printer, Download, CreditCard, ShieldCheck, Heart, User, Settings, AlertTriangle } from 'lucide-react';
import { BookingRecord, Destination, Hotel } from '../data/travelData';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRecord[];
  onCancelBooking: (bookingId: string) => void;
  user: { name: string; email: string } | null;
  onSignOut: () => void;
  onSignIn: (name: string, email: string) => void;
  favorites: string[];
  allDestinations: Destination[];
}

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  user,
  onSignOut,
  onSignIn,
  favorites,
  allDestinations
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'bookings' | 'visas' | 'favorites' | 'profile'>('bookings');
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  // Auth Form State (when user is not signed in or wants to switch account)
  const [inputName, setInputName] = useState('Elena Rostova');
  const [inputEmail, setInputEmail] = useState('elena.rostova@voyage.demo');

  const handleDownloadVoucher = (booking: BookingRecord) => {
    setDownloadNotice(`Downloading electronic itinerary voucher for ${booking.id}...`);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 2500);
  };

  const handleConfirmCancel = (id: string) => {
    onCancelBooking(id);
    setCancellingId(null);
  };

  const visaBookings = bookings.filter((b) => b.type === 'visa');
  const tripBookings = bookings.filter((b) => b.type !== 'visa');
  const favoriteDests = allDestinations.filter((d) => favorites.includes(d.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-100 relative my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#10233F] to-[#1E3A8A] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-md transition-all active:scale-95 shadow-md border border-white/20 group"
            aria-label="Close and explore more"
            title="Close and explore more"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform text-white" />
            <span>Close & Explore More</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-xl font-bold font-display">
                {user ? user.name.split(' ').map((n) => n[0]).join('') : 'U'}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display">
                  {user ? user.name : 'Guest Traveler'}
                </h2>
                <p className="text-slate-300 text-xs">
                  {user ? user.email : 'Sign in to sync reservations and itineraries across devices.'}
                </p>
              </div>
            </div>

            {user ? (
              <button
                onClick={onSignOut}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold self-start sm:self-auto"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => onSignIn(inputName, inputEmail)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold self-start sm:self-auto shadow-sm"
              >
                Sign In Demo Account
              </button>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mt-6 pt-4 border-t border-white/10 text-xs font-semibold overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`pb-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'bookings' ? 'border-amber-400 text-amber-300' : 'border-transparent text-slate-300 hover:text-white'
              }`}
            >
              Trips & Reservations ({tripBookings.length})
            </button>
            <button
              onClick={() => setActiveTab('visas')}
              className={`pb-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'visas' ? 'border-amber-400 text-amber-300' : 'border-transparent text-slate-300 hover:text-white'
              }`}
            >
              Visa Dossiers ({visaBookings.length})
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`pb-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'favorites' ? 'border-amber-400 text-amber-300' : 'border-transparent text-slate-300 hover:text-white'
              }`}
            >
              Saved Destinations ({favoriteDests.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'profile' ? 'border-amber-400 text-amber-300' : 'border-transparent text-slate-300 hover:text-white'
              }`}
            >
              Profile & Preferences
            </button>
          </div>
        </div>

        {downloadNotice && (
          <div className="bg-blue-50 border-b border-blue-200 px-6 py-2.5 text-xs text-blue-800 flex items-center justify-between">
            <span>{downloadNotice}</span>
          </div>
        )}

        {/* Modal Content */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {tripBookings.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  <Calendar className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p>No active trip or hotel reservations yet.</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Explore our curated packages or design a custom itinerary to see it here!
                  </p>
                </div>
              ) : (
                tripBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {b.id}
                        </span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'Cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {b.status}
                        </span>
                        <span className="text-xs text-slate-400 uppercase tracking-wide">
                          {b.type.toUpperCase()}
                        </span>
                      </div>

                      <h4 className="font-bold text-base text-slate-900 font-display">
                        {b.title}
                      </h4>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span>Departing: {b.travelDate}</span>
                        <span>·</span>
                        <span>{b.travelersCount} Guests</span>
                        <span>·</span>
                        <span>Total Paid: <strong className="text-slate-900 font-mono">${b.totalAmount.toLocaleString()}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => handleDownloadVoucher(b)}
                        title="Download electronic booking dossier"
                        className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      {b.status !== 'Cancelled' && (
                        cancellingId === b.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleConfirmCancel(b.id)}
                              className="px-2.5 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold"
                            >
                              Confirm Cancel
                            </button>
                            <button
                              onClick={() => setCancellingId(null)}
                              className="px-2 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setCancellingId(b.id)}
                            className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-medium transition-colors"
                          >
                            Cancel Reservation
                          </button>
                        )
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'visas' && (
            <div className="space-y-4">
              {visaBookings.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  <ShieldCheck className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p>No active visa applications submitted yet.</p>
                </div>
              ) : (
                visaBookings.map((b) => (
                  <div key={b.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {b.id}
                          </span>
                          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">
                            {b.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm font-display">{b.title}</h4>
                      </div>
                      <span className="text-xs text-slate-500 font-mono">Travel: {b.travelDate}</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                      <span className="text-slate-600">Consular Tracking Code: <strong>{b.details?.trackingNumber || 'CH-SCHENGEN-8821'}</strong></span>
                      <span className="text-emerald-700 font-semibold">Dossier In Review</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favoriteDests.length === 0 ? (
                <div className="col-span-2 text-center py-12 text-slate-400 text-sm">
                  <Heart className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p>You haven't saved any destination favorites yet.</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Click the heart icon on any destination card to bookmark it here!
                  </p>
                </div>
              ) : (
                favoriteDests.map((dest) => (
                  <div key={dest.id} className="flex gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <img src={dest.image} alt={dest.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                    <div>
                      <span className="text-xs text-blue-600 font-semibold">{dest.country}</span>
                      <h4 className="font-bold text-sm text-slate-900 font-display line-clamp-1">{dest.name}</h4>
                      <span className="text-xs text-slate-500 block mt-1">From ${dest.startingPrice}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-lg mx-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Account Name
                  </label>
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Account Email
                  </label>
                  <input
                    type="email"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Default Passport Nationality
                  </label>
                  <select className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Pakistan</option>
                    <option>Germany</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      onSignIn(inputName, inputEmail);
                      setDownloadNotice('Profile preferences updated.');
                      setTimeout(() => setDownloadNotice(null), 2000);
                    }}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
