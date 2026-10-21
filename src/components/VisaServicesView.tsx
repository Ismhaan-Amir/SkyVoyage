import React, { useState } from 'react';
import { FileCheck, Shield, Clock, CheckCircle2, AlertCircle, Search, HelpCircle, ArrowRight, UserCheck, Calendar } from 'lucide-react';
import { VISA_DATA, BookingRecord } from '../data/travelData';

interface VisaServicesViewProps {
  onVisaRequestSubmitted: (newBooking: BookingRecord) => void;
}

export const VisaServicesView: React.FC<VisaServicesViewProps> = ({
  onVisaRequestSubmitted
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('Switzerland');
  const [selectedTypeIndex, setSelectedTypeIndex] = useState<number>(0);

  // Inquiry Form State
  const [nationality, setNationality] = useState('United States');
  const [travelDate, setTravelDate] = useState('2026-12-10');
  const [applicantName, setApplicantName] = useState('Elena Rostova');
  const [applicantEmail, setApplicantEmail] = useState('elena.rostova@voyage.demo');
  const [applicantPhone, setApplicantPhone] = useState('+1 (555) 234-8901');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<BookingRecord | null>(null);

  // Status Tracker State
  const [trackRefId, setTrackRefId] = useState('CH-SCHENGEN-8821');
  const [trackingResult, setTrackingResult] = useState<{
    found: boolean;
    stage: number;
    destination: string;
    type: string;
    applicant: string;
    statusText: string;
    eta: string;
  } | null>({
    found: true,
    stage: 2,
    destination: 'Switzerland (Schengen Zone)',
    type: 'Tourist Visa Concierge',
    applicant: 'Elena Rostova',
    statusText: 'Document Verification & Appointment Scheduled',
    eta: 'November 02, 2026'
  });

  const currentVisaInfo = VISA_DATA[selectedCountry] || VISA_DATA['Switzerland'];
  const currentVisaType = currentVisaInfo.visaTypes[selectedTypeIndex] || currentVisaInfo.visaTypes[0];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRef = `SV-VSA-${Math.floor(100000 + Math.random() * 900000)}`;
      const newRecord: BookingRecord = {
        id: generatedRef,
        type: 'visa',
        title: `${currentVisaType.type} Concierge (${selectedCountry})`,
        destination: selectedCountry,
        bookingDate: new Date().toISOString().split('T')[0],
        travelDate: travelDate,
        travelersCount: 1,
        totalAmount: currentVisaType.serviceFee + currentVisaType.govFee,
        status: 'Processing',
        customerName: applicantName,
        customerEmail: applicantEmail,
        details: {
          trackingNumber: `TRACK-${Math.floor(1000 + Math.random() * 9000)}`,
          visaCategory: currentVisaType.type,
          processingTime: currentVisaType.processingTime,
          serviceFee: currentVisaType.serviceFee,
          govFee: currentVisaType.govFee,
          nationality: nationality,
          notes: additionalNotes || 'Standard Processing'
        }
      };

      setSubmissionSuccess(newRecord);
      onVisaRequestSubmitted(newRecord);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleTrackLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackRefId.trim()) return;

    if (trackRefId.toUpperCase().includes('SCHENGEN') || trackRefId.toUpperCase().includes('SV')) {
      setTrackingResult({
        found: true,
        stage: 2,
        destination: 'Switzerland (Schengen Zone)',
        type: 'Tourist Visa Assistance',
        applicant: 'Elena Rostova',
        statusText: 'Dossier Verified — Embassy Appointment Scheduled',
        eta: 'November 02, 2026'
      });
    } else {
      setTrackingResult({
        found: true,
        stage: 1,
        destination: selectedCountry,
        type: `${currentVisaType.type}`,
        applicant: applicantName || 'Traveler',
        statusText: 'Application Under Document Review',
        eta: 'Estimated 5–7 business days'
      });
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <FileCheck className="w-3.5 h-3.5" />
          <span>Professional Global Visa Assistance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
          Hassle-Free Visa Guidance & Filing
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Navigate consular protocols with clarity. We provide document verification, official appointment bookings, interview guidance, and transparent fee separation.
        </p>
      </div>

      {/* Interactive Visa Information Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Country & Type Selector Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Select Destination Country
            </label>
            <div className="space-y-2">
              {Object.keys(VISA_DATA).map((countryKey) => (
                <button
                  key={countryKey}
                  type="button"
                  onClick={() => {
                    setSelectedCountry(countryKey);
                    setSelectedTypeIndex(0);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                    selectedCountry === countryKey
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {countryKey}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Visa Category
            </label>
            <div className="space-y-2">
              {currentVisaInfo.visaTypes.map((vt, idx) => (
                <button
                  key={vt.type}
                  type="button"
                  onClick={() => setSelectedTypeIndex(idx)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    selectedTypeIndex === idx
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{vt.type}</span>
                    <span className="text-[11px] opacity-80">{vt.validity}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Visa Requirements & Checklist Display */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="text-xs text-blue-600 font-semibold tracking-wide uppercase mb-1">
                Official Guidelines · {currentVisaInfo.destinationCountry}
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                {currentVisaType.type} Requirements
              </h2>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block">Processing Time</span>
                <span className="font-semibold text-slate-800">{currentVisaType.processingTime}</span>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div>
                <span className="text-slate-400 block">Stay Validity</span>
                <span className="font-semibold text-slate-800">{currentVisaType.validity}</span>
              </div>
            </div>
          </div>

          {/* Fee Transparency Box (Mandatory requirement: Distinguish gov fees from service fees) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs">
            <div>
              <span className="text-amber-800 font-medium block mb-1">Official Government Fee</span>
              <div className="text-lg font-bold font-mono text-slate-900">
                ${currentVisaType.govFee} <span className="text-xs font-normal text-slate-500">USD</span>
              </div>
              <span className="text-[11px] text-slate-500">Paid directly to Embassy / Consulate</span>
            </div>

            <div>
              <span className="text-amber-800 font-medium block mb-1">SkyVoyage Concierge Fee</span>
              <div className="text-lg font-bold font-mono text-blue-600">
                ${currentVisaType.serviceFee} <span className="text-xs font-normal text-slate-500">USD</span>
              </div>
              <span className="text-[11px] text-slate-500">Includes form filing & document review</span>
            </div>

            <div>
              <span className="text-amber-800 font-medium block mb-1">Total Estimated Outlay</span>
              <div className="text-lg font-bold font-mono text-emerald-600">
                ${currentVisaType.govFee + currentVisaType.serviceFee} <span className="text-xs font-normal text-slate-500">USD</span>
              </div>
              <span className="text-[11px] text-slate-500">All fees transparently itemized</span>
            </div>
          </div>

          {/* Required Document Checklist */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Mandatory Document Checklist</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentVisaType.checklist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Important Regulatory Disclaimers */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Consular Transparency Notice:</span>
            </div>
            <p>
              Visa issuance is solely at the sovereign discretion of the destination government embassy or immigration department. SkyVoyage provides document preparation, verification, and procedural representation, but never guarantees visa issuance or tampers with official fees.
            </p>
          </div>
        </div>
      </div>

      {/* Consultation Request Form & Live Application Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visa Consultation Request Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 font-display mb-1">
              Request Visa Assistance Consultation
            </h3>
            <p className="text-slate-500 text-xs">
              Submit your inquiry and our certified consular visa specialist will evaluate your case within 4 business hours.
            </p>
          </div>

          {submissionSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1">
                Consultation Request Received!
              </h4>
              <p className="text-slate-600 text-xs mb-4">
                Your dossier reference is <strong className="font-mono text-blue-600">{submissionSuccess.id}</strong>. We have emailed the preliminary checklist and will assign your dedicated visa manager.
              </p>
              <button
                onClick={() => setSubmissionSuccess(null)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Your Nationality
                  </label>
                  <select
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="India">India</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Intended Travel Date
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-500 mb-1">Additional Travel Details or Previous Visas</label>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Mention previous Schengen/US visas held, travel purpose, or urgent departure dates..."
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Registering Case Dossier...</span>
                ) : (
                  <>
                    <span>Request Professional Visa Assistance</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Live Visa Application Status Tracker */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 font-display mb-1">
                Visa Application Status Dashboard
              </h3>
              <p className="text-slate-500 text-xs">
                Enter your application reference code or test with our sample reference: <strong className="font-mono text-blue-600">CH-SCHENGEN-8821</strong>
              </p>
            </div>

            <form onSubmit={handleTrackLookup} className="flex gap-2 mb-6">
              <input
                type="text"
                value={trackRefId}
                onChange={(e) => setTrackRefId(e.target.value)}
                placeholder="Enter Reference Number (e.g. CH-SCHENGEN-8821)"
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
              >
                Track Status
              </button>
            </form>

            {trackingResult && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-slate-500 block">Applicant</span>
                    <span className="font-bold text-slate-900 text-sm">{trackingResult.applicant}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Destination</span>
                    <span className="font-semibold text-slate-800 text-xs">{trackingResult.destination}</span>
                  </div>
                </div>

                {/* Milestone Stepper */}
                <div className="pt-2">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-2">
                    <span className={trackingResult.stage >= 1 ? 'text-blue-600' : 'text-slate-400'}>1. Received</span>
                    <span className={trackingResult.stage >= 2 ? 'text-blue-600' : 'text-slate-400'}>2. Verified</span>
                    <span className={trackingResult.stage >= 3 ? 'text-blue-600' : 'text-slate-400'}>3. Embassy</span>
                    <span className={trackingResult.stage >= 4 ? 'text-blue-600' : 'text-slate-400'}>4. Decision</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-500 rounded-full"
                      style={{ width: `${(trackingResult.stage / 4) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-xs flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Status: {trackingResult.statusText}</span>
                  <span className="text-blue-600 font-bold font-mono">ETA: {trackingResult.eta}</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Official Government VFS / TLScontact liaison</span>
            <span className="font-semibold text-slate-700">Encrypted Dossier Handling</span>
          </div>
        </div>
      </div>
    </div>
  );
};
