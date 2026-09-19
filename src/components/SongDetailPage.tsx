import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Disc, Sparkles, ChevronRight, ChevronLeft, Music } from 'lucide-react';
import { Song } from '../types';
import { TwoPathways } from './TwoPathways';

interface SongDetailPageProps {
  song: Song;
  allSongs: Song[];
  isPlaying: boolean;
  onPlayToggle: () => void;
  onSelectSong: (songId: string) => void;
  onBackToLanding: () => void;
  onOpenHeritage: () => void;
  onBookSession: () => void;
  currentTime: number;
}

export const SongDetailPage: React.FC<SongDetailPageProps> = ({
  song,
  allSongs,
  isPlaying,
  onPlayToggle,
  onSelectSong,
  onBackToLanding,
  onOpenHeritage,
  onBookSession,
  currentTime,
}) => {
  const [activeTab, setActiveTab] = useState<'narrative' | 'orchestration' | 'manuscript'>('narrative');
  const [volume, setVolume] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState(false);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = Math.min(100, (currentTime / song.durationSeconds) * 100);

  // Scroll to top when song changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [song.id]);

  const currentIndex = allSongs.findIndex((s) => s.id === song.id);
  const prevSong = allSongs[(currentIndex - 1 + allSongs.length) % allSongs.length];
  const nextSong = allSongs[(currentIndex + 1) % allSongs.length];

  return (
    <div id="song-detail-page" className="min-h-screen bg-[#09090b] text-[#f4f2ee] pt-24">
      {/* Top Breadcrumb & Switcher Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors uppercase tracking-[0.2em] font-light cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Return to Collection</span>
        </button>

        {/* Opus Switcher */}
        <div className="flex items-center gap-6">
          <span className="text-white/30 tracking-[0.2em] uppercase text-[10px] hidden sm:inline">Compositions:</span>
          {allSongs.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectSong(s.id)}
              className={`text-xs tracking-[0.2em] uppercase transition-colors cursor-pointer ${
                s.id === song.id
                  ? 'text-[#c8a97e] font-medium border-b border-[#c8a97e] pb-0.5'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              {s.opusNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Visual & Player Header */}
      <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden">
        {/* Background Visual */}
        <div className="absolute inset-0 z-0">
          <img
            src={song.coverImage}
            alt={song.title}
            className="w-full h-full object-cover object-center scale-100 transition-transform duration-[8000ms]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/75 to-black/40" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/80" />
        </div>

        {/* Top Hero Text */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 pb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs tracking-[0.35em] uppercase text-[#c8a97e] font-mono">
              {song.opusNumber} · {song.duration}
            </span>
            <span className="w-8 h-[1px] bg-white/20" />
            <span className="text-xs tracking-[0.25em] uppercase text-white/50">
              {song.keySignature}
            </span>
          </div>

          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal leading-tight mb-4">
            {song.title}
          </h1>

          {song.frenchTitle && (
            <p className="text-sm tracking-[0.3em] uppercase text-white/40 font-['Montserrat'] mb-4">
              Translation: {song.frenchTitle}
            </p>
          )}

          <p className="text-base sm:text-xl text-white/80 font-['Cormorant_Garamond'] italic max-w-3xl leading-relaxed">
            “{song.subtitle}”
          </p>

          {/* Luxury Floating Audio Controller Bar */}
          <div className="mt-10 bg-[#121217]/90 backdrop-blur-xl border border-white/10 p-5 sm:p-7 max-w-4xl shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
              {/* Play / Pause & Titles */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button
                  id={`detail-play-btn-${song.id}`}
                  onClick={onPlayToggle}
                  className="w-14 h-14 rounded-full bg-[#c8a97e] hover:bg-[#d8bb90] text-black flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer shrink-0"
                  aria-label={isPlaying ? 'Pause full composition' : 'Play full composition'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current translate-x-0.5" />
                  )}
                </button>

                <div>
                  <h3 className="font-['Cormorant_Garamond'] text-xl text-white font-medium">
                    {song.title}
                  </h3>
                  <p className="text-xs text-white/40 tracking-[0.15em] uppercase">
                    Composed by Vishwesh Raghuvanshi
                  </p>
                </div>
              </div>

              {/* Status Indicator & Volume */}
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-white/20'}`} />
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">
                    {isPlaying ? 'Acoustic Synthesis Active' : 'Standby'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-white/50">
                    {formatTime(currentTime)} / {song.duration}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Scrub Bar */}
            <div className="mt-5">
              <div className="w-full bg-white/10 h-1 relative overflow-hidden">
                <div
                  className="bg-[#c8a97e] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Editorial Story Section (The brief explicitly says: "where the full song can be played, and the story behind that song is displayed alongside it — in a similar visual language to the landing page.") */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Commission Specs & Atelier Craftsmanship */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white/[0.02] border border-white/5 p-8">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] font-mono block mb-2">
                Bespoke Provenance
              </span>
              <h4 className="font-['Cormorant_Garamond'] text-2xl text-white mb-6">
                Commission Dossier
              </h4>

              <div className="space-y-4 text-xs font-light">
                <div className="border-b border-white/5 pb-3">
                  <span className="text-white/40 block text-[10px] uppercase tracking-[0.2em] mb-1">
                    Dedicated To
                  </span>
                  <span className="text-white/90 text-sm font-['Cormorant_Garamond']">
                    {song.story.dedicatedTo}
                  </span>
                </div>

                <div className="border-b border-white/5 pb-3">
                  <span className="text-white/40 block text-[10px] uppercase tracking-[0.2em] mb-1">
                    Occasion & Location
                  </span>
                  <span className="text-white/80">
                    {song.story.occasion}
                  </span>
                </div>

                <div className="border-b border-white/5 pb-3">
                  <span className="text-white/40 block text-[10px] uppercase tracking-[0.2em] mb-1">
                    Tempo & Harmonic Key
                  </span>
                  <span className="text-white/80 font-mono">
                    {song.tempo} · {song.keySignature}
                  </span>
                </div>

                <div>
                  <span className="text-white/40 block text-[10px] uppercase tracking-[0.2em] mb-2">
                    Instrumentation Selected
                  </span>
                  <ul className="space-y-1.5 text-white/70">
                    {song.instrumentation.map((inst, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#c8a97e] text-xs">·</span>
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Composer's Quote Plaque */}
            <div className="border-l-2 border-[#c8a97e]/60 pl-6 py-2">
              <p className="font-['Cormorant_Garamond'] text-lg text-white/90 italic leading-relaxed">
                {song.story.quote}
              </p>
            </div>
          </div>

          {/* Right Column: The Full Story & Manuscript Behind the Song */}
          <div className="lg:col-span-8 space-y-10">
            {/* Story Tabs */}
            <div className="flex border-b border-white/10 gap-8">
              <button
                onClick={() => setActiveTab('narrative')}
                className={`pb-4 text-xs tracking-[0.25em] uppercase font-light cursor-pointer transition-colors ${
                  activeTab === 'narrative'
                    ? 'text-[#c8a97e] border-b-2 border-[#c8a97e]'
                    : 'text-white/40 hover:text-white/80'
                }`}
              >
                The Story Behind the Song
              </button>
              <button
                onClick={() => setActiveTab('orchestration')}
                className={`pb-4 text-xs tracking-[0.25em] uppercase font-light cursor-pointer transition-colors ${
                  activeTab === 'orchestration'
                    ? 'text-[#c8a97e] border-b-2 border-[#c8a97e]'
                    : 'text-white/40 hover:text-white/80'
                }`}
              >
                Composer's Notes
              </button>
              <button
                onClick={() => setActiveTab('manuscript')}
                className={`pb-4 text-xs tracking-[0.25em] uppercase font-light cursor-pointer transition-colors ${
                  activeTab === 'manuscript'
                    ? 'text-[#c8a97e] border-b-2 border-[#c8a97e]'
                    : 'text-white/40 hover:text-white/80'
                }`}
              >
                Manuscript Movements
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'narrative' && (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] font-['Montserrat'] block mb-2">
                    Client Commission History
                  </span>
                  <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl text-white font-normal mb-6">
                    {song.story.title}
                  </h3>
                </div>

                <div className="prose prose-invert max-w-none text-white/80 font-['Montserrat'] font-light leading-relaxed text-sm sm:text-base space-y-4">
                  <p>{song.story.clientStory}</p>
                </div>

                <div className="p-6 bg-white/[0.02] border border-white/5 mt-8">
                  <h5 className="text-[11px] tracking-[0.25em] uppercase text-white/50 mb-2">
                    Sensory Landscape & Atmosphere
                  </h5>
                  <p className="font-['Cormorant_Garamond'] text-lg text-white/90 italic leading-relaxed">
                    {song.story.atmosphere}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'orchestration' && (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] font-['Montserrat'] block mb-2">
                    Art of the Atelier
                  </span>
                  <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl text-white font-normal mb-6">
                    Harmonic Architecture & Recording
                  </h3>
                </div>

                <div className="prose prose-invert max-w-none text-white/80 font-['Montserrat'] font-light leading-relaxed text-sm sm:text-base space-y-4">
                  <p>{song.story.composerNotes}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                  <div className="p-5 border border-white/5 bg-white/[0.02]">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#c8a97e] block mb-1">
                      Acoustic Space
                    </span>
                    <p className="text-xs text-white/70">
                      Captured live with stereo Neumann U67 tube microphones and analog tube preamps.
                    </p>
                  </div>
                  <div className="p-5 border border-white/5 bg-white/[0.02]">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#c8a97e] block mb-1">
                      Singular Provenance
                    </span>
                    <p className="text-xs text-white/70">
                      Delivered in hand-stitched leather folio with original handwritten musical score.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'manuscript' && (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] font-['Montserrat'] block mb-2">
                    Score Structure
                  </span>
                  <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl text-white font-normal mb-6">
                    Hand-Inked Movements
                  </h3>
                </div>

                <div className="space-y-4">
                  {song.story.manuscriptLines.map((line, idx) => (
                    <div key={idx} className="p-5 border border-white/10 bg-white/[0.02] flex items-center gap-4">
                      <span className="font-['Cinzel'] text-[#c8a97e] text-lg">0{idx + 1}</span>
                      <p className="font-['Cormorant_Garamond'] text-xl text-white/90 italic">
                        {line}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Next / Previous Song Navigation */}
            <div className="pt-12 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => onSelectSong(prevSong.id)}
                className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous:</span> {prevSong.title}
              </button>

              <button
                onClick={() => onSelectSong(nextSong.id)}
                className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <span className="hidden sm:inline">Next:</span> {nextSong.title}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The Two Pathways Reappear on Scroll (Brief section 3: "If the visitor scrolls further on this page, the same two pathway options reappear: know more about the creator, or book a session.") */}
      <TwoPathways
        variant="song-page"
        onOpenHeritage={onOpenHeritage}
        onBookSession={onBookSession}
      />
    </div>
  );
};
