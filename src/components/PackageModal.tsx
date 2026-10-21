import React, { useState } from 'react';
import { X, Star, Calendar, Users, Check, Clock, MapPin, Shield, CreditCard, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';
import { TravelPackage, BookingRecord } from '../data/travelData';

interface PackageModalProps {
  packageData: TravelPackage | null;
  onClose: () => void;
  onBookingConfirmed: (newBooking: BookingRecord) => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({
  packageData,
  onClose,
  onBookingConfirmed
}) => {
  if (!packageData) return null;

  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'book'>('itinerary');
  const [selectedDay, setSelectedDay] = useState<number>(1);

  // Booking Form State
  const [selectedDate, setSelectedDate] = useState<string>(packageData.availableDates[0] || '2026-11-20');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [guestName, setGuestName] = useState('Elena Rostova');
  const [guestEmail, setGuestEmail] = useState('elena.rostova@voyage.demo');
  const [guestPhone, setGuestPhone] = useState('+1 (555) 234-8901');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'wire'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  // Pricing calculations
  const baseTotal = packageData.pricePerPerson * travelersCount;
  const taxesAndFees = Math.round(baseTotal * 0.05); // 5% regulatory & port taxes
  const grandTotal = baseTotal + taxesAndFees;

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `SV-${Math.floor(100000 + Math.random() * 900000)}`;
      const newRecord: BookingRecord = {
        id: generatedId,
        type: 'package',
        title: packageData.title,
        destination: packageData.country,
        bookingDate: new Date().toISOString().split('T')[0],
        travelDate: selectedDate,
        travelersCount: travelersCount,
        totalAmount: grandTotal,
        status: 'Confirmed',
        customerName: guestName,
        customerEmail: guestEmail,
        details: {
          packageId: packageData.id,
          category: packageData.category,
          duration: `${packageData.durationDays} Days / ${packageData.durationNights} Nights`,
          accommodation: packageData.accommodationType,
          paymentMethod: paymentMethod.toUpperCase(),
          specialRequests: specialRequests || 'None'
        }
      };

      setConfirmedBooking(newRecord);
      onBookingConfirmed(newRecord);
      setIsSubmitting(false);
    }, 1200);
  };

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

        {/* Hero Banner */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden">
          <img
            src={packageData.image}
            alt={packageData.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-300 mb-1">
              <span>{packageData.category} Tour</span>
              <span>·</span>
              <span>{packageData.durationDays} Days / {packageData.durationNights} Nights</span>
              <span>·</span>
              <span>{packageData.destinationsCount} Destinations</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight font-display mb-2">
              {packageData.title}
            </h2>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
              <span className="flex items-center gap-1 text-amber-300 font-semibold">
                <Star className="w-4 h-4 fill-current" />
                <span>{packageData.rating}</span>
                <span className="text-slate-300 font-normal">({packageData.reviewsCount} reviews)</span>
              </span>
              <span>·</span>
              <span className="font-semibold text-white">${packageData.pricePerPerson.toLocaleString()} per person</span>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        {!confirmedBooking && (
          <div className="flex border-b border-slate-100 px-6 bg-slate-50 gap-4 text-xs sm:text-sm font-semibold">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`py-3.5 border-b-2 transition-colors ${
                activeTab === 'itinerary' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Day-by-Day Itinerary
            </button>
            <button
              onClick={() => setActiveTab('inclusions')}
              className={`py-3.5 border-b-2 transition-colors ${
                activeTab === 'inclusions' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Inclusions & Accommodation
            </button>
            <button
              onClick={() => setActiveTab('book')}
              className={`py-3.5 border-b-2 transition-colors ${
                activeTab === 'book' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Book This Package
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
          {confirmedBooking ? (
            /* Confirmation Screen */
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 font-display mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                Your reservation for <strong className="text-slate-900">{packageData.title}</strong> has been secured. A confirmation dossier with flight guidelines and voucher tickets has been generated.
              </p>

              <div className="bg-slate-50 rounded-2xl p-6 max-w-md mx-auto border border-slate-200 text-left text-xs sm:text-sm mb-6">
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Booking Reference</span>
                  <span className="font-mono font-bold text-blue-600">{confirmedBooking.id}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Primary Traveler</span>
                  <span className="font-semibold text-slate-800">{confirmedBooking.customerName}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Departure Date</span>
                  <span className="font-semibold text-slate-800">{confirmedBooking.travelDate}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Number of Guests</span>
                  <span className="font-semibold text-slate-800">{confirmedBooking.travelersCount} Travelers</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Total Paid (Demo)</span>
                  <span className="font-bold text-slate-900">${confirmedBooking.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <X className="w-4 h-4 text-slate-300" />
                  <span>Close & Explore More</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <span>Done & View in My Trips</span>
                </button>
              </div>
            </div>
          ) : activeTab === 'itinerary' ? (
            /* Day-by-Day Timeline */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Select a day to inspect schedule
                </span>
                <span className="text-xs text-blue-600 font-medium">
                  {packageData.itinerary.length} Days Planned
                </span>
              </div>

              {/* Day Selector Buttons */}
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {packageData.itinerary.map((item) => (
                  <button
                    key={item.day}
                    onClick={() => setSelectedDay(item.day)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedDay === item.day
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Day {item.day}
                  </button>
                ))}
              </div>

              {/* Day Details Card */}
              {(() => {
                const dayItem = packageData.itinerary.find((d) => d.day === selectedDay) || packageData.itinerary[0];
                return (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 mt-4">
                    <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
                      <span>Day {dayItem.day}</span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 font-display mb-2">
                      {dayItem.title}
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {dayItem.description}
                    </p>

                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                        Included Day Activities
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {dayItem.activities.map((act, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : activeTab === 'inclusions' ? (
            /* Inclusions & Accommodation Info */
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs">
                <div>
                  <span className="block text-slate-500 mb-1">Accommodation</span>
                  <span className="font-semibold text-slate-800">{packageData.accommodationType}</span>
                </div>
                <div>
                  <span className="block text-slate-500 mb-1">Meals Included</span>
                  <span className="font-semibold text-slate-800">{packageData.mealsIncluded}</span>
                </div>
                <div>
                  <span className="block text-slate-500 mb-1">Internal Transport</span>
                  <span className="font-semibold text-slate-800">{packageData.transportation}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 font-display mb-3">Package Inclusions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {packageData.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 font-display mb-3">Exclusions</h4>
                <div className="space-y-2">
                  {packageData.exclusions.map((exc, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      <span>{exc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600">
                <strong>Cancellation Policy:</strong> Free cancellation up to 14 days before departure for a 100% refund. Within 14 days, a 20% hotel hold applies.
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleBookSubmit} className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Package Reservation Form
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-600 hover:text-slate-900 text-xs font-semibold shadow-2xs transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-slate-500" />
                  <span>Close & Explore More</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Available Departure Date
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800"
                  >
                    {packageData.availableDates.map((d) => (
                      <option key={d} value={d}>
                        {new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Number of Travelers
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="text-base font-bold text-slate-800 font-mono w-8 text-center">
                      {travelersCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTravelersCount(travelersCount + 1)}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 flex items-center justify-center"
                    >
                      +
                    </button>
                    <span className="text-xs text-slate-500 ml-2">
                      (${packageData.pricePerPerson} / person)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Primary Traveler Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-500 mb-1">Special Bedding or Dietary Requests</label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Vegetarian, king bed, honeymoon champagne setup"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Payment Method (Simulated Secure Sandbox)
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 ${
                      paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/50 text-blue-700' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 ${
                      paymentMethod === 'applepay' ? 'border-blue-600 bg-blue-50/50 text-blue-700' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>Apple / Google Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wire')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 ${
                      paymentMethod === 'wire' ? 'border-blue-600 bg-blue-50/50 text-blue-700' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>Bank Wire</span>
                  </button>
                </div>
              </div>

              {/* Itemized Price Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Base Package ({travelersCount} × ${packageData.pricePerPerson.toLocaleString()})</span>
                  <span className="font-mono font-medium">${baseTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Regulatory Taxes & Port Service (5%)</span>
                  <span className="font-mono font-medium">${taxesAndFees.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-base">
                  <span>Total Due</span>
                  <span className="font-mono text-blue-600">${grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Authorizing Reservation...</span>
                ) : (
                  <>
                    <span>Confirm & Book for ${grandTotal.toLocaleString()}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Modal Actions Footer when not in booking tab */}
        {!confirmedBooking && activeTab !== 'book' && (
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 block">Total per person</span>
              <span className="text-2xl font-extrabold text-slate-900 font-display">
                ${packageData.pricePerPerson.toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => setActiveTab('book')}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold tracking-wide shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>Proceed to Booking</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
