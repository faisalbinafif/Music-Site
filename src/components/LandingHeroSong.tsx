import React, { useState } from 'react';
import { Play, Pause, ArrowRight, Music2, Sparkles, ChevronDown } from 'lucide-react';
import { Song } from '../types';

interface LandingHeroSongProps {
  song: Song;
  songIndex: number;
  totalSongs: number;
  isPlaying: boolean;
  onPlayToggle: () => void;
  onSelectSong: (songId: string) => void;
  onScrollNext?: () => void;
}

export const LandingHeroSong: React.FC<LandingHeroSongProps> = ({
  song,
  songIndex,
  totalSongs,
  isPlaying,
  onPlayToggle,
  onSelectSong,
  onScrollNext,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id={`landing-${song.id}`}
      className="relative w-full h-screen min-h-[640px] flex items-end justify-center snap-start overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Visual Asset (Cinematic Fullscreen Hero with subtle zoom) */}
      <div className="absolute inset-0 z-0">
        <img
          src={song.coverImage}
          alt={song.title}
          className={`w-full h-full object-cover object-center transition-transform duration-[4000ms] ease-out ${
            isPlaying || isHovered ? 'scale-105' : 'scale-100'
          }`}
          referrerPolicy="no-referrer"
        />
        {/* Editorial Gradients & Vignette for high readability and luxury depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-black/50" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/70" />
      </div>

      {/* Floating Index / Opus Counter on top right */}
      <div className="absolute top-28 right-8 sm:right-14 z-10 hidden sm:flex items-center gap-3 text-white/50">
        <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#c8a97e]">
          0{songIndex + 1}
        </span>
        <span className="w-8 h-[1px] bg-white/20" />
        <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/40">
          0{totalSongs}
        </span>
      </div>

      {/* Content Container (Louis Vuitton Hero Product Architecture) */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-6 sm:px-12 pb-16 sm:pb-24 text-center flex flex-col items-center">
        {/* Category / Sub-Eyebrow */}
        <div className="flex items-center gap-3 mb-3">
          <span className="w-6 h-[1px] bg-[#c8a97e]/60" />
          <span className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#c8a97e] font-medium font-['Montserrat']">
            {song.opusNumber} · Original Composition
          </span>
          <span className="w-6 h-[1px] bg-[#c8a97e]/60" />
        </div>

        {/* Hero Song Title */}
        <h2 className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white tracking-wide leading-tight mb-4 drop-shadow-md">
          {song.title}
        </h2>

        {/* Short Line / Evocative Descriptor (Explicitly required in design brief) */}
        <p className="text-sm sm:text-base md:text-lg text-white/80 font-['Montserrat'] font-light tracking-wide max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed drop-shadow">
          {song.subtitle}
        </p>

        {/* Interactive Actions - Louis Vuitton Style Restraint */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {/* Audio Preview Toggle */}
          <button
            id={`play-preview-${song.id}`}
            onClick={onPlayToggle}
            className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 text-xs tracking-[0.2em] uppercase font-medium cursor-pointer group"
            aria-label={isPlaying ? 'Pause preview' : 'Listen to preview'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-[#c8a97e] fill-[#c8a97e]" />
            ) : (
              <Play className="w-3.5 h-3.5 text-[#c8a97e] fill-[#c8a97e] translate-x-0.5 group-hover:scale-110 transition-transform" />
            )}
            <span>{isPlaying ? 'Playing Sound' : 'Listen Preview'}</span>
          </button>

          {/* Discover Story & Full Composition */}
          <button
            id={`discover-story-${song.id}`}
            onClick={() => onSelectSong(song.id)}
            className="flex items-center gap-3 px-6 py-3 bg-[#c8a97e] hover:bg-[#d8bb90] text-black transition-all duration-300 text-xs tracking-[0.2em] uppercase font-medium cursor-pointer group shadow-lg"
          >
            <span>Discover the Story</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Orchestration Tagline */}
        <div className="mt-8 flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-white/40">
          <span>{song.duration}</span>
          <span>·</span>
          <span>{song.keySignature}</span>
          <span>·</span>
          <span className="hidden sm:inline">{song.tempo}</span>
        </div>

        {/* Next Scroll Prompt */}
        {onScrollNext && (
          <button
            onClick={onScrollNext}
            className="mt-8 flex flex-col items-center gap-1 text-white/40 hover:text-white/80 transition-colors cursor-pointer"
            aria-label="Scroll to next"
          >
            <span className="text-[9px] tracking-[0.25em] uppercase">Scroll</span>
            <ChevronDown className="w-4 h-4 animate-bounce opacity-70" />
          </button>
        )}
      </div>
    </section>
  );
};
