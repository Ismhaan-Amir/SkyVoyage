import React, { useState } from 'react';
import { X, Star, Calendar, Users, Check, MapPin, Shield, CheckCircle2, BedDouble, ChevronRight } from 'lucide-react';
import { Hotel, BookingRecord } from '../data/travelData';

interface HotelModalProps {
  hotel: Hotel | null;
  onClose: () => void;
  onBookingConfirmed: (newBooking: BookingRecord) => void;
}

export const HotelModal: React.FC<HotelModalProps> = ({
  hotel,
  onClose,
  onBookingConfirmed
}) => {
  if (!hotel) return null;

  const [selectedRoomId, setSelectedRoomId] = useState<string>(hotel.rooms[0]?.id || '');
  const [checkInDate, setCheckInDate] = useState('2026-11-20');
  const [checkOutDate, setCheckOutDate] = useState('2026-11-24');
  const [guestName, setGuestName] = useState('Elena Rostova');
  const [guestEmail, setGuestEmail] = useState('elena.rostova@voyage.demo');
  const [guestCount, setGuestCount] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  // Compute nights
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const diffTime = Math.max(1, checkOut.getTime() - checkIn.getTime());
  const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

  const selectedRoom = hotel.rooms.find((r) => r.id === selectedRoomId) || hotel.rooms[0];
  const roomTotal = (selectedRoom ? selectedRoom.pricePerNight : hotel.pricePerNight) * nights;
  const taxes = Math.round(roomTotal * 0.1);
  const total = roomTotal + taxes;

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `SV-${Math.floor(100000 + Math.random() * 900000)}`;
      const newRecord: BookingRecord = {
        id: generatedId,
        type: 'hotel',
        title: hotel.name,
        destination: hotel.country,
        bookingDate: new Date().toISOString().split('T')[0],
        travelDate: checkInDate,
        travelersCount: guestCount,
        totalAmount: total,
        status: 'Confirmed',
        customerName: guestName,
        customerEmail: guestEmail,
        details: {
          hotelId: hotel.id,
          roomName: selectedRoom.name,
          nights: nights,
          checkOutDate: checkOutDate,
          category: hotel.category,
          amenities: selectedRoom.amenities
        }
      };

      setConfirmedBooking(newRecord);
      onBookingConfirmed(newRecord);
      setIsSubmitting(false);
    }, 1000);
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

        {/* Hero Header */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sky-300 mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{hotel.city}, {hotel.country}</span>
              <span>·</span>
              <span>{hotel.category}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight font-display mb-2">
              {hotel.name}
            </h2>
            <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-200">
              <span className="flex items-center gap-1 text-amber-300 font-semibold">
                <Star className="w-4 h-4 fill-current" />
                <span>{hotel.rating}</span>
                <span className="text-slate-300 font-normal">({hotel.reviewsCount} verified reviews)</span>
              </span>
              <span>·</span>
              <span>From ${hotel.pricePerNight} / night</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
          {confirmedBooking ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 font-display mb-2">
                Hotel Reservation Confirmed!
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                Your reservation at <strong className="text-slate-900">{hotel.name}</strong> is locked in. The property has reserved your room with flexible 48-hour check-in policy.
              </p>

              <div className="bg-slate-50 rounded-2xl p-6 max-w-md mx-auto border border-slate-200 text-left text-xs sm:text-sm mb-6 space-y-2">
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Reservation Reference</span>
                  <span className="font-mono font-bold text-blue-600">{confirmedBooking.id}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Room Selected</span>
                  <span className="font-semibold text-slate-800">{selectedRoom.name}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Dates</span>
                  <span className="font-semibold text-slate-800">{checkInDate} to {checkOutDate} ({nights} nights)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Total Paid</span>
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
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <span>Close & View in Dashboard</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReserve} className="space-y-6">
              {/* Form Header with Close & Explore More Action */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Suite Reservation Form
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
              {/* Hotel Description & Amenities */}
              <div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {hotel.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map((am, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                      <span>{am}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Room Selection */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-display mb-3">
                  Choose Your Room & Suite
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hotel.rooms.map((room) => {
                    const isSelected = selectedRoomId === room.id;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-bold text-slate-900 text-sm">{room.name}</h5>
                          <span className="font-mono font-bold text-blue-600 text-sm">
                            ${room.pricePerNight} <span className="text-xs font-normal text-slate-500">/ night</span>
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-3 mb-3">
                          <span className="flex items-center gap-1">
                            <BedDouble className="w-3.5 h-3.5" />
                            <span>{room.bedType}</span>
                          </span>
                          <span>·</span>
                          <span>Max {room.capacity} Guests</span>
                          <span>·</span>
                          <span>{room.sizeSqM} m²</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {room.amenities.map((a, idx) => (
                            <span key={idx} className="text-[11px] text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-100">
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dates & Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Guests
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Guest Full Name</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Confirmation Email</label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Room Rate ({nights} nights × ${selectedRoom.pricePerNight})</span>
                  <span className="font-mono font-medium">${roomTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Local Hospitality Taxes & Resort Service (10%)</span>
                  <span className="font-mono font-medium">${taxes.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-base">
                  <span>Grand Total</span>
                  <span className="font-mono text-emerald-600">${total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Securing Room Reservation...</span>
                ) : (
                  <>
                    <span>Reserve Suite for ${total.toLocaleString()}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
