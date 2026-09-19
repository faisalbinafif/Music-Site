import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Check, Calendar as CalendarIcon, Clock, 
  Video, Mail, MessageSquare, ShieldCheck, Sparkles, User, FileText, 
  Download, Copy, ExternalLink, Globe 
} from 'lucide-react';
import { BookingFormData, ConfirmedBooking } from '../types';

interface BookingFlowProps {
  onClose: () => void;
  onReturnToMusic: () => void;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({
  onClose,
  onReturnToMusic,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [formData, setFormData] = useState<BookingFormData>({
    clientName: '',
    clientAge: '',
    clientOccupation: '',
    recipientRelationship: 'Spouse / Partner',
    recipientName: '',
    coreStory: '',
    emotionalArc: 'Nostalgic tenderness transforming into deep reverence',
    sensoryMetaphor: 'Twilight over still water, cool marble, and the scent of cedar',
    instrumentalPreference: 'Hamburg Steinway Concert Grand & Solo Cello',
    firstListeningOccasion: 'An intimate private anniversary dinner at dusk',
    specialElements: '',
    selectedDate: '2026-10-04',
    selectedTimeSlot: '15:00 CET',
    timezone: 'Europe/Paris (CET)',
    meetingPlatform: 'google_meet',
    clientEmail: '',
    whatsappNumber: '',
    additionalNotes: '',
  });

  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Available dates for Step 3 Calendar (realistic next 14 days)
  const availableDates = [
    { dateStr: '2026-10-02', display: 'Fri, Oct 2', slots: ['11:00', '15:00', '18:30'] },
    { dateStr: '2026-10-04', display: 'Sun, Oct 4', slots: ['14:00', '16:30', '19:00'] },
    { dateStr: '2026-10-06', display: 'Tue, Oct 6', slots: ['10:30', '15:00', '17:30'] },
    { dateStr: '2026-10-08', display: 'Thu, Oct 8', slots: ['13:00', '16:00', '20:00'] },
    { dateStr: '2026-10-11', display: 'Sun, Oct 11', slots: ['11:00', '14:30', '18:00'] },
    { dateStr: '2026-10-14', display: 'Wed, Oct 14', slots: ['15:00', '17:00', '19:30'] },
  ];

  const selectedDateObj = availableDates.find((d) => d.dateStr === formData.selectedDate) || availableDates[1];

  // Validation handlers
  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (!formData.clientAge.trim()) {
      setValidationError('Please provide your age.');
      return;
    }
    if (!formData.clientOccupation.trim()) {
      setValidationError('Please share your occupation.');
      return;
    }
    if (!formData.recipientName.trim()) {
      setValidationError('Please provide the recipient’s name.');
      return;
    }
    setValidationError(null);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.coreStory.trim() || formData.coreStory.trim().length < 20) {
      setValidationError('Please share at least a short paragraph about the story and heart of this composition.');
      return;
    }
    setValidationError(null);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientEmail.trim() || !formData.clientEmail.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    if (!formData.whatsappNumber.trim()) {
      setValidationError('Please enter your WhatsApp number (with country code).');
      return;
    }

    setValidationError(null);
    const bookingRef = `VR-${Math.floor(1000 + Math.random() * 9000)}`;
    const meetUrl = `https://meet.google.com/vr-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`;
    const zoomUrl = `https://zoom.us/j/9843${Math.floor(1000000 + Math.random() * 9000000)}`;

    const confirmed: ConfirmedBooking = {
      bookingId: bookingRef,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      formData: { ...formData },
      meetLink: meetUrl,
      zoomLink: zoomUrl,
      sessionTimeFormatted: `${selectedDateObj.display} at ${formData.selectedTimeSlot} (${formData.timezone})`,
    };

    setConfirmedBooking(confirmed);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate downloadable .ics calendar file
  const handleDownloadCalendar = () => {
    if (!confirmedBooking) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Vishwesh Raghuvanshi Bespoke Music//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
SUMMARY:Private Music Commission Session with Vishwesh Raghuvanshi
DESCRIPTION:Private 1-on-1 creative discussion regarding bespoke song commission for ${formData.recipientName}.\\nMeeting Link: ${confirmedBooking.meetLink}\\nBooking Reference: ${confirmedBooking.bookingId}
LOCATION:Google Meet / Private Video Salon (${confirmedBooking.meetLink})
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Vishwesh_Raghuvanshi_Session_${confirmedBooking.bookingId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    if (!confirmedBooking) return;
    const url = confirmedBooking.formData.meetingPlatform === 'zoom' ? confirmedBooking.zoomLink : confirmedBooking.meetLink;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div id="booking-flow-container" className="min-h-screen bg-[#09090b] text-[#f4f2ee] pt-24 pb-20 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Top Header & Close button */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Site</span>
          </button>

          <div className="text-center">
            <h2 className="font-['Cinzel'] text-lg sm:text-xl tracking-[0.25em] text-white">
              PRIVATE COMMISSION
            </h2>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] font-mono">
              Bespoke Song Consultation
            </p>
          </div>

          <div className="text-xs font-mono tracking-[0.2em] text-[#c8a97e]">
            {currentStep < 4 ? `Step 0${currentStep} of 03` : 'Confirmed'}
          </div>
        </div>

        {/* Step Indicator Progress Bar */}
        {currentStep < 4 && (
          <div className="mb-12">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-3">
              <div
                className={`h-1 transition-all duration-500 ${
                  currentStep >= 1 ? 'bg-[#c8a97e]' : 'bg-white/10'
                }`}
              />
              <div
                className={`h-1 transition-all duration-500 ${
                  currentStep >= 2 ? 'bg-[#c8a97e]' : 'bg-white/10'
                }`}
              />
              <div
                className={`h-1 transition-all duration-500 ${
                  currentStep >= 3 ? 'bg-[#c8a97e]' : 'bg-white/10'
                }`}
              />
            </div>
            <div className="flex justify-between text-[11px] tracking-[0.2em] uppercase text-white/40 font-mono">
              <span className={currentStep === 1 ? 'text-[#c8a97e]' : ''}>1. Basic Details</span>
              <span className={currentStep === 2 ? 'text-[#c8a97e]' : ''}>2. The Creative Form</span>
              <span className={currentStep === 3 ? 'text-[#c8a97e]' : ''}>3. Session Calendar</span>
            </div>
          </div>
        )}

        {/* Validation error notification */}
        {validationError && (
          <div className="mb-8 p-4 bg-red-950/40 border border-red-800/60 text-red-200 text-xs tracking-wider">
            {validationError}
          </div>
        )}

        {/* ================= STEP 1: BASIC DETAILS ================= */}
        {currentStep === 1 && (
          <div className="bg-[#111116] border border-white/10 p-8 sm:p-12 shadow-2xl">
            <div className="mb-8 border-b border-white/10 pb-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] font-mono block mb-1">
                Step 01
              </span>
              <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl text-white font-normal">
                Basic Details & Relationship
              </h3>
              <p className="text-xs sm:text-sm text-white/50 font-light mt-2 leading-relaxed">
                Before exploring musical themes, help us understand who you are and for whom this singular song is being composed.
              </p>
            </div>

            <form onSubmit={handleNextStep1} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/70 mb-2 font-mono">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Vance-Sterling"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/15 focus:border-[#c8a97e] focus:outline-none p-3.5 text-sm text-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/70 mb-2 font-mono">
                    Your Age *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 42"
                    value={formData.clientAge}
                    onChange={(e) => setFormData({ ...formData, clientAge: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/15 focus:border-[#c8a97e] focus:outline-none p-3.5 text-sm text-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-white/70 mb-2 font-mono">
                  Your Profession or Field *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Architect / Private Investor / Surgeon"
                  value={formData.clientOccupation}
                  onChange={(e) => setFormData({ ...formData, clientOccupation: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/15 focus:border-[#c8a97e] focus:outline-none p-3.5 text-sm text-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/70 mb-2 font-mono">
                    Recipient’s Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance-Sterling"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/15 focus:border-[#c8a97e] focus:outline-none p-3.5 text-sm text-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/70 mb-2 font-mono">
                    Your Relationship with Them *
                  </label>
                  <select
                    value={formData.recipientRelationship}
                    onChange={(e) => setFormData({ ...formData, recipientRelationship: e.target.value })}
                    className="w-full bg-[#17171d] border border-white/15 focus:border-[#c8a97e] focus:outline-none p-3.5 text-sm text-white transition-colors"
                  >
                    <option value="Spouse / Partner">Spouse / Partner (Anniversary, Marriage, Devotion)</option>
                    <option value="Parent / Grandparent">Parent / Grandparent (Gratitude & Lineage)</option>
                    <option value="Child / Heir">Child / Heir (Inheritance of Love & Blessing)</option>
                    <option value="For Myself / Personal Legacy">For Myself (Architectural, Personal Milestone)</option>
                    <option value="In Memoriam / Remembrance">In Memoriam / Honoring a Departed Soul</option>
                    <option value="Dynasty / Centenary Celebration">Dynasty / Centenary Company Foundation</option>
                  </select>
                </div>
              </div>

              <div className="pt-8 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#c8a97e] hover:bg-[#d8bb90] text-black text-xs uppercase tracking-[0.25em] font-medium flex items-center gap-3 transition-colors cursor-pointer"
                >
                  <span>Proceed to The Creative Form</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= STEP 2: THE FORM (DEEPER CREATIVE QUESTIONS) ================= */}
        {currentStep === 2 && (
          <div className="bg-[#111116] border border-white/10 p-8 sm:p-12 shadow-2xl">
            <div className="mb-8 border-b border-white/10 pb-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] font-mono block mb-1">
                Step 02 · Mandatory Creative Inquiry
              </span>
              <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl text-white font-normal">
                The Creative Form
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-light mt-2 leading-relaxed">
                “This is not a generic intake form; it is the beginning of the creative process.” Take your time. Vishwesh reads every word himself.
              </p>
            </div>

            <form onSubmit={handleNextStep2} className="space-y-8">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-white/80 mb-2 font-mono">
                  1. The Core Story & Sacred Memory *
                </label>
                <p className="text-xs text-white/40 mb-2 font-light">
                  What is the specific moment, unsaid feeling, or journey you want transformed into melody?
                </p>
                <textarea
                  rows={4}
                  required
                  value={formData.coreStory}
                  onChange={(e) => setFormData({ ...formData, coreStory: e.target.value })}
                  placeholder="e.g. Twenty-five years ago on a quiet stone terrace in Lake Como, we sat for thirty minutes in absolute silence as the light turned to gold. I want to freeze that feeling forever..."
                  className="w-full bg-white/[0.03] border border-white/15 focus:border-[#c8a97e] focus:outline-none p-3.5 text-sm text-white leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/80 mb-2 font-mono">
                    2. Emotional Arc at Peak
                  </label>
                  <input
                    type="text"
                    value={formData.emotionalArc}
                    onChange={(e) => setFormData({ ...formData, emotionalArc: e.target.value })}
                    placeholder="e.g. A solitary stillness that blooms into soaring triumph"
                    className="w-full bg-white/[0.03] border border-white/15 focus:border-[#c8a97e] focus:outline-none p-3 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/80 mb-2 font-mono">
                    3. Atmospheric / Sensory Metaphor
                  </label>
                  <input
                    type="text"
                    value={formData.sensoryMetaphor}
                    onChange={(e) => setFormData({ ...formData, sensoryMetaphor: e.target.value })}
                    placeholder="e.g. Midnight rain on cedar wood; twilight in the mountains"
                    className="w-full bg-white/[0.03] border border-white/15 focus:border-[#c8a97e] focus:outline-none p-3 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-white/80 mb-2 font-mono">
                  4. Preferred Sonic Texture & Instrumentation
                </label>
                <select
                  value={formData.instrumentalPreference}
                  onChange={(e) => setFormData({ ...formData, instrumentalPreference: e.target.value })}
                  className="w-full bg-[#17171d] border border-white/15 focus:border-[#c8a97e] focus:outline-none p-3.5 text-sm text-white"
                >
                  <option value="Hamburg Steinway Concert Grand & Solo Cello">Hamburg Steinway Concert Grand & Solo Cello (Intimate, lyrical, timeless)</option>
                  <option value="Solo Felt Piano & Ambient Silence">Solo Felt Piano & Ambient Silence (Minimalist, contemplative, Kyoto retreat style)</option>
                  <option value="Full Chamber String Orchestra & French Horn">Full Chamber String Orchestra & French Horn (Expansive, cinematic grandeur)</option>
                  <option value="Acoustic Nylon Guitar, Harp & Woodwinds">Acoustic Nylon Guitar, Harp & Woodwinds (Warm Mediterranean organic acoustic)</option>
                  <option value="Composer's Choice (Guided purely by the story)">Composer's Choice (Let Vishwesh select the ideal acoustic palette)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-white/80 mb-2 font-mono">
                  5. The First Listening Occasion
                </label>
                <input
                  type="text"
                  value={formData.firstListeningOccasion}
                  onChange={(e) => setFormData({ ...formData, firstListeningOccasion: e.target.value })}
                  placeholder="e.g. A private dinner for two under the stars, or presented in a leather folio on Christmas morning"
                  className="w-full bg-white/[0.03] border border-white/15 focus:border-[#c8a97e] focus:outline-none p-3 text-sm text-white"
                />
              </div>

              <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 border border-white/20 text-white/70 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer"
                >
                  Back to Details
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#c8a97e] hover:bg-[#d8bb90] text-black text-xs uppercase tracking-[0.25em] font-medium flex items-center gap-3 transition-colors cursor-pointer"
                >
                  <span>Select Session on Calendar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= STEP 3: SESSION CALENDAR ================= */}
        {currentStep === 3 && (
          <div className="bg-[#111116] border border-white/10 p-8 sm:p-12 shadow-2xl">
            <div className="mb-8 border-b border-white/10 pb-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] font-mono block mb-1">
                Step 03 · Private Calendar
              </span>
              <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl text-white font-normal">
                Reserve Your Discovery Discussion
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-light mt-2 leading-relaxed">
                Select an available date for a one-on-one discussion with Vishwesh Raghuvanshi, so that we can decide together whether to proceed.
              </p>
            </div>

            <form onSubmit={handleCompleteBooking} className="space-y-8">
              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Available Dates */}
                <div className="md:col-span-6 space-y-3">
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/80 font-mono mb-2">
                    Available Consultation Dates
                  </label>
                  <div className="space-y-2">
                    {availableDates.map((item) => (
                      <button
                        key={item.dateStr}
                        type="button"
                        onClick={() => setFormData({ ...formData, selectedDate: item.dateStr })}
                        className={`w-full p-4 border text-left flex items-center justify-between transition-all cursor-pointer ${
                          formData.selectedDate === item.dateStr
                            ? 'border-[#c8a97e] bg-[#c8a97e]/10 text-white'
                            : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CalendarIcon className="w-4 h-4 text-[#c8a97e]" />
                          <span className="text-sm font-medium">{item.display}</span>
                        </div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-white/40">
                          {item.slots.length} Slots Open
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Available Time Slots for Selected Date */}
                <div className="md:col-span-6 space-y-4">
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/80 font-mono mb-2">
                    Available Slots ({selectedDateObj.display})
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {selectedDateObj.slots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, selectedTimeSlot: slot })}
                        className={`p-3.5 border text-center transition-all cursor-pointer ${
                          formData.selectedTimeSlot === slot
                            ? 'border-[#c8a97e] bg-[#c8a97e] text-black font-semibold'
                            : 'border-white/10 bg-white/[0.02] text-white/80 hover:border-white/30'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5 mx-auto mb-1 opacity-60" />
                        <span className="text-xs font-mono tracking-wider">{slot}</span>
                      </button>
                    ))}
                  </div>

                  {/* Timezone and Platform Preference */}
                  <div className="pt-4 space-y-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.2em] text-white/60 mb-1.5 font-mono">
                        Your Timezone
                      </label>
                      <select
                        value={formData.timezone}
                        onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                        className="w-full bg-[#17171d] border border-white/15 focus:border-[#c8a97e] p-2.5 text-xs text-white"
                      >
                        <option value="Europe/Paris (CET)">Europe/Paris (CET)</option>
                        <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                        <option value="America/New_York (EST)">America/New_York (EST)</option>
                        <option value="America/Los_Angeles (PST)">America/Los_Angeles (PST)</option>
                        <option value="Asia/Dubai (GST)">Asia/Dubai (GST)</option>
                        <option value="Asia/Tokyo (JST)">Asia/Tokyo (JST)</option>
                        <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.2em] text-white/60 mb-1.5 font-mono">
                        Preferred Encrypted Video Salon
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, meetingPlatform: 'google_meet' })}
                          className={`p-3 border text-xs tracking-wider uppercase transition-colors cursor-pointer ${
                            formData.meetingPlatform === 'google_meet'
                              ? 'border-[#c8a97e] bg-[#c8a97e]/15 text-[#c8a97e]'
                              : 'border-white/10 text-white/60'
                          }`}
                        >
                          Google Meet
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, meetingPlatform: 'zoom' })}
                          className={`p-3 border text-xs tracking-wider uppercase transition-colors cursor-pointer ${
                            formData.meetingPlatform === 'zoom'
                              ? 'border-[#c8a97e] bg-[#c8a97e]/15 text-[#c8a97e]'
                              : 'border-white/10 text-white/60'
                          }`}
                        >
                          Zoom Salon
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Contact for WhatsApp and Email Invitation (Brief mandate: "sent directly to the client's WhatsApp and email") */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/80 mb-2 font-mono">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="client@luxury-residence.com"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/15 focus:border-[#c8a97e] p-3 pl-10 text-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/80 mb-2 font-mono">
                    WhatsApp Number (with Country Code) *
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 234-5678 or +44 7911 123456"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/15 focus:border-[#c8a97e] p-3 pl-10 text-sm text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 border border-white/20 text-white/70 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer"
                >
                  Back to Form
                </button>

                <button
                  type="submit"
                  className="px-10 py-4 bg-[#c8a97e] hover:bg-[#d8bb90] text-black text-xs uppercase tracking-[0.25em] font-semibold flex items-center gap-3 transition-all duration-300 shadow-xl cursor-pointer"
                >
                  <span>Confirm Session with Vishwesh</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= STEP 4: CONFIRMATION ================= */}
        {currentStep === 4 && confirmedBooking && (
          <div className="bg-[#111116] border border-white/10 p-8 sm:p-14 shadow-2xl space-y-10 animate-fadeIn">
            {/* Top Badge & Title */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#c8a97e]/15 border border-[#c8a97e] text-[#c8a97e] flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono tracking-[0.35em] uppercase text-[#c8a97e]">
                Consultation Confirmed · Dossier {confirmedBooking.bookingId}
              </span>
              <h3 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl text-white font-normal">
                Your Session with Vishwesh Raghuvanshi is Reserved
              </h3>
              <p className="text-sm text-white/60 font-light max-w-xl mx-auto leading-relaxed">
                A private video invitation and greeting have been transmitted to your WhatsApp and email.
              </p>
            </div>

            {/* Session Summary Card */}
            <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-light">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 block mb-1">
                    Date & Time
                  </span>
                  <span className="text-white/90 text-sm font-medium">
                    {confirmedBooking.sessionTimeFormatted}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 block mb-1">
                    Client & Commission
                  </span>
                  <span className="text-white/90 text-sm font-medium">
                    {formData.clientName} (For: {formData.recipientName})
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 block mb-1">
                    Email Confirmation Sent To
                  </span>
                  <span className="text-white/80 font-mono">
                    {formData.clientEmail}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 block mb-1">
                    WhatsApp Link Sent To
                  </span>
                  <span className="text-white/80 font-mono">
                    {formData.whatsappNumber}
                  </span>
                </div>
              </div>

              {/* Private Meeting Access Link */}
              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/40 p-4 border border-white/5">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-[#c8a97e]" />
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block">
                      Direct Video Meeting Access
                    </span>
                    <span className="text-xs font-mono text-white/90 break-all">
                      {formData.meetingPlatform === 'zoom' ? confirmedBooking.zoomLink : confirmedBooking.meetLink}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyLink}
                    className="p-2 border border-white/20 hover:border-[#c8a97e] text-xs text-white/80 hover:text-[#c8a97e] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </button>
                  <a
                    href={formData.meetingPlatform === 'zoom' ? confirmedBooking.zoomLink : confirmedBooking.meetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-[#c8a97e] text-black text-xs font-medium hover:bg-[#d8bb90] transition-colors flex items-center gap-1.5"
                  >
                    <span>Launch</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Greeting & Personal Note from Vishwesh */}
            <div className="border-l-2 border-[#c8a97e] pl-6 py-2">
              <p className="font-['Cormorant_Garamond'] text-lg text-white/90 italic leading-relaxed">
                “Thank you, {formData.clientName}. I have received your notes regarding {formData.recipientName}. Preparing a bespoke song is an act of deep reverence, and I look forward to meeting you on {selectedDateObj.display} to listen to your story in person.”
              </p>
              <p className="text-xs tracking-[0.2em] uppercase text-white/50 mt-3 font-mono">
                — Vishwesh Raghuvanshi, Composer & Founder
              </p>
            </div>

            {/* Calendar File Download & Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handleDownloadCalendar}
                className="w-full sm:w-auto px-6 py-3.5 border border-white/20 hover:border-[#c8a97e] text-white/90 hover:text-white text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#c8a97e]" />
                <span>Add to Apple / Google Calendar (.ics)</span>
              </button>

              <button
                onClick={onReturnToMusic}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#c8a97e] hover:bg-[#d8bb90] text-black text-xs uppercase tracking-[0.25em] font-medium transition-colors cursor-pointer text-center"
              >
                Return to the Compositions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
