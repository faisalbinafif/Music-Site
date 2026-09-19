import React from 'react';
import { ArrowRight, Compass, Sparkles, BookOpen, Calendar } from 'lucide-react';

interface TwoPathwaysProps {
  onOpenHeritage: () => void;
  onBookSession: () => void;
  variant?: 'landing' | 'song-page';
}

export const TwoPathways: React.FC<TwoPathwaysProps> = ({
  onOpenHeritage,
  onBookSession,
  variant = 'landing'
}) => {
  return (
    <section
      id="two-pathways-section"
      className="relative w-full min-h-screen py-24 px-6 sm:px-12 flex flex-col justify-center items-center bg-[#09090b] border-t border-white/5 snap-start"
    >
      {/* Editorial Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
        <span className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#c8a97e] font-['Montserrat'] block mb-4">
          The Two Gateways · The Maison
        </span>
        <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-wide">
          Deliberately Minimal: Two Doors
        </h3>
        <p className="mt-4 text-xs sm:text-sm text-white/50 tracking-[0.2em] uppercase max-w-xl mx-auto font-light">
          {variant === 'song-page'
            ? 'Continue into the artistic lineage or initiate your own bespoke creation.'
            : 'Explore the atelier of Vishwesh Raghuvanshi or commission a singular sonic heirloom.'}
        </p>
      </div>

      {/* The Two Doors / Pathways (Side by side editorial cards inspired by Louis Vuitton Maison) */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
        {/* Pathway 1: Know more about the creator / brand / music */}
        <div
          id="pathway-heritage-card"
          onClick={onOpenHeritage}
          className="group relative bg-[#111115] border border-white/10 hover:border-[#c8a97e]/60 transition-all duration-700 overflow-hidden cursor-pointer flex flex-col justify-between p-8 sm:p-12 min-h-[460px]"
        >
          {/* Background image subtle peek on hover */}
          <div className="absolute inset-0 z-0 opacity-25 group-hover:opacity-40 transition-opacity duration-700">
            <img
              src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80"
              alt="The Creator and Atelier"
              className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-[#111115]/80 to-transparent" />
          </div>

          {/* Top category */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] font-mono">
              Door 01 · Heritage & Philosophy
            </span>
            <BookOpen className="w-4 h-4 text-white/40 group-hover:text-[#c8a97e] transition-colors" />
          </div>

          {/* Core Content */}
          <div className="relative z-10 my-auto py-8">
            <h4 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl text-white font-normal group-hover:text-[#f3e7d5] transition-colors">
              Know more about the creator, the brand & the music
            </h4>
            <p className="mt-4 text-xs sm:text-sm text-white/60 font-light leading-relaxed max-w-md">
              Step inside the scroll-driven diary of Vishwesh Raghuvanshi — from ancestral roots and conservatory discipline to the private listening ateliers of Geneva and Kyoto.
            </p>
          </div>

          {/* Bottom Action */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs tracking-[0.25em] uppercase text-white/80 group-hover:text-[#c8a97e] transition-colors">
            <span>Explore Heritage Diary</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2 text-[#c8a97e]" />
          </div>
        </div>

        {/* Pathway 2: Book a session with the musician */}
        <div
          id="pathway-booking-card"
          onClick={onBookSession}
          className="group relative bg-[#111115] border border-white/10 hover:border-[#c8a97e]/60 transition-all duration-700 overflow-hidden cursor-pointer flex flex-col justify-between p-8 sm:p-12 min-h-[460px]"
        >
          {/* Background image subtle peek on hover */}
          <div className="absolute inset-0 z-0 opacity-25 group-hover:opacity-40 transition-opacity duration-700">
            <img
              src="https://images.unsplash.com/photo-1520523839898-5071282543e1?auto=format&fit=crop&w=1200&q=80"
              alt="Bespoke Private Consultation"
              className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-[#111115]/80 to-transparent" />
          </div>

          {/* Top category */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] font-mono">
              Door 02 · Private Commission
            </span>
            <Calendar className="w-4 h-4 text-white/40 group-hover:text-[#c8a97e] transition-colors" />
          </div>

          {/* Core Content */}
          <div className="relative z-10 my-auto py-8">
            <h4 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl lg:text-5xl text-white font-normal group-hover:text-[#f3e7d5] transition-colors">
              Book a session with the musician
            </h4>
            <p className="mt-4 text-xs sm:text-sm text-white/60 font-light leading-relaxed max-w-md">
              Initiate a 4-step creative consultation with Vishwesh. Share your story, select your intimate session on the private calendar, and receive your direct video invitation.
            </p>
          </div>

          {/* Bottom Action */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs tracking-[0.25em] uppercase text-white/80 group-hover:text-[#c8a97e] transition-colors">
            <span>Begin 4-Step Consultation</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2 text-[#c8a97e]" />
          </div>
        </div>
      </div>

      {/* Minimal Editorial Footer Note */}
      <div className="mt-16 sm:mt-24 text-center max-w-lg mx-auto">
        <p className="text-[10px] tracking-[0.25em] uppercase text-white/30 font-['Montserrat']">
          Every piece is a 1-of-1 bespoke recording. Inquiries strictly limited per quarter.
        </p>
      </div>
    </section>
  );
};
