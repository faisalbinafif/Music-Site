import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Volume2, Sparkles, ChevronLeft, ChevronRight, Sliders } from 'lucide-react';
import { HERITAGE_CHAPTERS } from '../data/musicData';
import { HeritageChapter } from '../types';

interface HeritagePageProps {
  onBackToLanding: () => void;
  onBookSession: () => void;
}

export const HeritagePage: React.FC<HeritagePageProps> = ({
  onBackToLanding,
  onBookSession,
}) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [snapEnabled, setSnapEnabled] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const diaryRef = useRef<HTMLDivElement>(null);

  const totalChapters = HERITAGE_CHAPTERS.length;
  const activeChapter = HERITAGE_CHAPTERS[currentChapterIndex];

  // Map vertical wheel scroll to horizontal diary page slide
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If we are at the top/within diary zone, transform vertical scroll to diary transition
      if (!diaryRef.current) return;
      const rect = diaryRef.current.getBoundingClientRect();
      const isInDiaryZone = rect.top <= 100 && rect.bottom >= window.innerHeight;

      if (isInDiaryZone) {
        if (Math.abs(e.deltaY) > 30) {
          if (e.deltaY > 0 && currentChapterIndex < totalChapters - 1) {
            e.preventDefault();
            setCurrentChapterIndex((prev) => Math.min(totalChapters - 1, prev + 1));
          } else if (e.deltaY < 0 && currentChapterIndex > 0) {
            e.preventDefault();
            setCurrentChapterIndex((prev) => Math.max(0, prev - 1));
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentChapterIndex, totalChapters]);

  // Update scroll progress
  useEffect(() => {
    setScrollProgress((currentChapterIndex / (totalChapters - 1)) * 100);
  }, [currentChapterIndex, totalChapters]);

  const handleNext = () => {
    if (currentChapterIndex < totalChapters - 1) {
      setCurrentChapterIndex((prev) => prev + 1);
    } else {
      // Scroll to booking invitation at bottom
      const bookingElem = document.getElementById('heritage-booking-invitation');
      if (bookingElem) {
        bookingElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handlePrev = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      ref={containerRef}
      id="heritage-page"
      className="min-h-screen bg-[#0b0b0e] text-[#f4f2ee] pt-24 select-none overflow-x-hidden"
    >
      {/* Top Heritage Breadcrumbs & Navigation */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 border-b border-white/5 flex items-center justify-between">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Return to Collection</span>
        </button>

        <div className="text-center">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#c8a97e] font-mono">
            Heritage Archive · Louis Vuitton Inspiration
          </span>
        </div>

        <button
          onClick={onBookSession}
          className="text-xs uppercase tracking-[0.2em] text-white/70 hover:text-[#c8a97e] transition-colors cursor-pointer hidden sm:block"
        >
          Book a Session →
        </button>
      </div>

      {/* Heritage Cover / Intro Section */}
      <section className="relative py-16 sm:py-24 text-center max-w-4xl mx-auto px-6">
        <span className="text-xs tracking-[0.4em] uppercase text-[#c8a97e] font-['Montserrat'] block mb-4">
          The Bespoke Maison
        </span>
        <h1 className="font-['Cinzel'] text-4xl sm:text-6xl md:text-7xl font-normal tracking-[0.1em] text-white mb-6">
          HERITAGE
        </h1>
        <p className="font-['Cormorant_Garamond'] text-lg sm:text-2xl text-white/80 italic max-w-2xl mx-auto leading-relaxed">
          “Music does not begin with an instrument. It begins with the listening heart of a composer who knows how to honor another person's story.”
        </p>
        <p className="mt-4 text-xs tracking-[0.25em] uppercase text-white/40">
          Scroll or swipe through the interactive diary
        </p>

        {/* Vintage Leather Strap / Trunk Handle Motif (Inspired by Louis Vuitton Heritage handle in the brief) */}
        <div className="mt-8 flex justify-center">
          <div className="w-48 h-12 border-t-2 border-b-2 border-[#c8a97e]/40 rounded-full flex items-center justify-center bg-[#151311] px-6 shadow-inner">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e]/80 font-mono">
              The Living Archive
            </span>
          </div>
        </div>
      </section>

      {/* The Scroll-Driven Diary Container (Pages slide horizontally as user scrolls) */}
      <section
        ref={diaryRef}
        className="relative min-h-[85vh] flex flex-col justify-between py-6 px-4 sm:px-12 max-w-7xl mx-auto"
      >
        {/* Diary Slide Viewport */}
        <div className="relative w-full overflow-hidden bg-[#111116] border border-white/10 shadow-2xl p-6 sm:p-12 lg:p-16">
          {/* Subtle archival watermark & parchment lines */}
          <div className="absolute top-6 right-8 text-white/5 font-['Cinzel'] text-7xl select-none pointer-events-none font-bold">
            {activeChapter.romanNumeral}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Visual Column: slides left/right with smooth transition */}
            <div className="lg:col-span-6 relative order-2 lg:order-1 overflow-hidden group">
              <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] w-full bg-black/40 overflow-hidden border border-white/10">
                <img
                  key={activeChapter.id}
                  src={activeChapter.image}
                  alt={activeChapter.title}
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-all duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Caption overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <p className="text-[11px] font-light text-white/70 italic font-['Cormorant_Garamond']">
                    {activeChapter.caption}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] tracking-[0.2em] text-white/40 uppercase font-mono">
                <span>{activeChapter.year}</span>
                <span>{activeChapter.musicalNote}</span>
              </div>
            </div>

            {/* Narrative Diary Column (Simulating flipping through pages of a leather journal) */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#c8a97e]">
                  {activeChapter.romanNumeral} · {activeChapter.year}
                </span>
                <span className="text-xs text-white/40 italic font-['Cormorant_Garamond']">
                  {activeChapter.diaryDate}
                </span>
              </div>

              <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
                {activeChapter.title}
              </h2>

              <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[#c8a97e]/90 font-light">
                {activeChapter.subtitle}
              </p>

              {/* Diary Entries */}
              <div className="space-y-4 text-sm sm:text-base text-white/80 font-light font-['Montserrat'] leading-relaxed pt-2">
                {activeChapter.diaryContent.map((paragraph, pIdx) => (
                  <p key={pIdx} className="first-letter:text-2xl first-letter:font-['Cormorant_Garamond'] first-letter:text-[#c8a97e] first-letter:mr-0.5">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Philosophy Quote Callout */}
              <div className="pt-6 border-t border-white/10">
                <p className="font-['Cormorant_Garamond'] text-lg sm:text-xl text-[#e5d5be] italic leading-relaxed">
                  {activeChapter.philosophyQuote}
                </p>
                <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 block mt-2">
                  — From the Handwritten Manuscript Archives
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Louis Vuitton Heritage-Inspired Interactive Bottom Scrubber Bar */}
        <div className="mt-8 bg-[#121217] border border-white/10 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Previous / Next page controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              disabled={currentChapterIndex === 0}
              className={`p-2 border border-white/10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                currentChapterIndex === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-white/10 text-white'
              }`}
              aria-label="Previous chapter"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono tracking-[0.2em] text-white/70 uppercase">
              Entry {currentChapterIndex + 1} of {totalChapters}
            </span>

            <button
              onClick={handleNext}
              disabled={currentChapterIndex === totalChapters - 1}
              className={`p-2 border border-white/10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                currentChapterIndex === totalChapters - 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-white/10 text-white'
              }`}
              aria-label="Next chapter"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Center: Interactive Chapter Markers */}
          <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto max-w-full py-1">
            {HERITAGE_CHAPTERS.map((chap, idx) => (
              <button
                key={chap.id}
                onClick={() => setCurrentChapterIndex(idx)}
                className={`text-[11px] tracking-[0.2em] uppercase font-mono transition-all cursor-pointer whitespace-nowrap ${
                  idx === currentChapterIndex
                    ? 'text-[#c8a97e] font-semibold border-b border-[#c8a97e] pb-1'
                    : 'text-white/40 hover:text-white/80'
                }`}
              >
                {chap.romanNumeral}
              </button>
            ))}
          </div>

          {/* Right: Progress Indicator */}
          <div className="flex items-center gap-3">
            <div className="w-24 sm:w-32 bg-white/10 h-1 relative rounded-full overflow-hidden">
              <div
                className="bg-[#c8a97e] h-full transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-white/40">
              {Math.round(scrollProgress)}%
            </span>
          </div>
        </div>
      </section>

      {/* End of Heritage Page: Session Booking Invitation Pathway (Explicit requirement in PDF section 5: "When the visitor reaches the end of this page, the booking pathway appears again — an invitation to book a session.") */}
      <section
        id="heritage-booking-invitation"
        className="py-24 sm:py-32 px-6 sm:px-12 bg-gradient-to-t from-[#09090b] via-[#111116] to-[#0b0b0e] border-t border-white/10 text-center"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="text-[11px] tracking-[0.35em] uppercase text-[#c8a97e] font-['Montserrat'] block">
            End of Archive · An Invitation
          </span>

          <h3 className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl text-white font-normal leading-tight">
            Your Story Deserves Its Own Original Composition
          </h3>

          <p className="text-base sm:text-lg text-white/70 font-['Montserrat'] font-light max-w-2xl mx-auto leading-relaxed">
            Every bespoke work begins with an unhurried dialogue. In a private 45-minute discovery session with Vishwesh Raghuvanshi, we will explore the emotional architecture of the song you wish to bring into existence.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              id="heritage-book-session-cta"
              onClick={onBookSession}
              className="w-full sm:w-auto px-10 py-4 bg-[#c8a97e] hover:bg-[#d8bb90] text-black text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 shadow-xl cursor-pointer"
            >
              Book a Session with Vishwesh
            </button>

            <button
              onClick={onBackToLanding}
              className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-white/50 text-white text-xs uppercase tracking-[0.25em] font-light transition-all duration-300 cursor-pointer"
            >
              Back to Three Songs
            </button>
          </div>

          <p className="text-[10px] tracking-[0.25em] uppercase text-white/30 pt-8">
            Limited to 8 private commissions annually · Worldwide delivery & master rights
          </p>
        </div>
      </section>
    </div>
  );
};
