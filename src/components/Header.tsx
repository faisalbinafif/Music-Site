import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Calendar, Compass, Disc3 } from 'lucide-react';
import { luxuryAudio } from '../utils/soundEngine';

interface HeaderProps {
  onNavigate: (view: 'landing' | 'song-detail' | 'heritage' | 'booking', songId?: string) => void;
  activeView: 'landing' | 'song-detail' | 'heritage' | 'booking';
  onBookSession: () => void;
  currentSongPlaying: boolean;
  onTogglePlayGlobal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  activeView,
  onBookSession,
  currentSongPlaying,
  onTogglePlayGlobal,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [eqLevels, setEqLevels] = useState<number[]>([40, 70, 50, 80]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let interval: number;
    if (currentSongPlaying) {
      interval = window.setInterval(() => {
        setEqLevels([
          Math.floor(25 + Math.random() * 75),
          Math.floor(40 + Math.random() * 60),
          Math.floor(20 + Math.random() * 80),
          Math.floor(50 + Math.random() * 50),
        ]);
      }, 150);
    } else {
      setEqLevels([20, 20, 20, 20]);
    }
    return () => clearInterval(interval);
  }, [currentSongPlaying]);

  return (
    <>
      <header
        id="luxury-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled || isMenuOpen || activeView !== 'landing'
            ? 'bg-[#0b0b0d]/90 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Left Actions */}
          <div className="flex items-center gap-6">
            <button
              id="header-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2.5 text-xs tracking-[0.2em] uppercase font-light text-white/80 hover:text-white transition-colors cursor-pointer group"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4 text-[#c8a97e] transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="w-4 h-4 text-white/70 group-hover:text-white transition-transform duration-300" />
              )}
              <span className="hidden sm:inline">Menu</span>
            </button>

            <button
              id="header-sound-button"
              onClick={onTogglePlayGlobal}
              className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-light text-white/70 hover:text-[#c8a97e] transition-colors cursor-pointer group"
              title={currentSongPlaying ? 'Mute audio' : 'Play ambient composition'}
              aria-label="Toggle sound"
            >
              {currentSongPlaying ? (
                <div className="flex items-end gap-[2px] h-3 w-4">
                  {eqLevels.map((lvl, idx) => (
                    <span
                      key={idx}
                      className="w-[2px] bg-[#c8a97e] transition-all duration-150"
                      style={{ height: `${lvl}%` }}
                    />
                  ))}
                </div>
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-white/40 group-hover:text-[#c8a97e]" />
              )}
              <span className="hidden md:inline text-[11px] text-white/60">
                {currentSongPlaying ? 'Audio Playing' : 'Sound'}
              </span>
            </button>
          </div>

          {/* Center Brand Name */}
          <div className="text-center absolute left-1/2 -translate-x-1/2">
            <button
              id="brand-home-link"
              onClick={() => {
                setIsMenuOpen(false);
                onNavigate('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group block text-center focus:outline-none"
            >
              <h1 className="font-['Cinzel'] tracking-[0.3em] sm:tracking-[0.42em] text-base sm:text-lg md:text-xl font-medium text-white transition-all duration-500 group-hover:text-[#e5d5be]">
                VISHWESH RAGHUVANSHI
              </h1>
              <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#c8a97e]/80 font-light mt-0.5 font-['Montserrat']">
                Haute Bespoke Music
              </p>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            <button
              id="header-heritage-quicklink"
              onClick={() => {
                setIsMenuOpen(false);
                onNavigate('heritage');
              }}
              className={`hidden lg:block text-xs tracking-[0.2em] uppercase font-light transition-colors ${
                activeView === 'heritage' ? 'text-[#c8a97e]' : 'text-white/70 hover:text-white'
              }`}
            >
              Heritage
            </button>

            <button
              id="header-book-session-button"
              onClick={() => {
                setIsMenuOpen(false);
                onBookSession();
              }}
              className="relative px-4 sm:px-5 py-2 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium text-white border border-[#c8a97e]/50 hover:border-[#c8a97e] hover:bg-[#c8a97e]/10 transition-all duration-300 rounded-none cursor-pointer"
            >
              Book a Session
            </button>
          </div>
        </div>
      </header>

      {/* Louis Vuitton Inspired Editorial Fullscreen Overlay Menu */}
      {isMenuOpen && (
        <div
          id="editorial-navigation-drawer"
          className="fixed inset-0 z-40 bg-[#09090b]/98 backdrop-blur-xl pt-28 pb-12 px-8 sm:px-16 flex flex-col justify-between animate-fadeIn transition-opacity duration-500"
        >
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 pt-8">
            {/* Navigation Column */}
            <div className="md:col-span-7 space-y-6">
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#c8a97e] font-medium font-['Montserrat']">
                Directory & Compositions
              </p>
              <nav className="space-y-4">
                <button
                  id="menu-link-landing"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onNavigate('landing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="block text-left text-2xl sm:text-4xl font-['Cormorant_Garamond'] text-white/90 hover:text-[#c8a97e] hover:translate-x-2 transition-all duration-300 cursor-pointer italic"
                >
                  The Launch Trio <span className="text-xs font-['Montserrat'] not-italic tracking-[0.2em] text-white/40 ml-2">01 — 03</span>
                </button>

                <button
                  id="menu-link-heritage"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onNavigate('heritage');
                  }}
                  className="block text-left text-2xl sm:text-4xl font-['Cormorant_Garamond'] text-white/90 hover:text-[#c8a97e] hover:translate-x-2 transition-all duration-300 cursor-pointer italic"
                >
                  The Heritage & Philosophy <span className="text-xs font-['Montserrat'] not-italic tracking-[0.2em] text-white/40 ml-2">The Atelier</span>
                </button>

                <button
                  id="menu-link-book"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onBookSession();
                  }}
                  className="block text-left text-2xl sm:text-4xl font-['Cormorant_Garamond'] text-white/90 hover:text-[#c8a97e] hover:translate-x-2 transition-all duration-300 cursor-pointer italic"
                >
                  Private Commission Discussion <span className="text-xs font-['Montserrat'] not-italic tracking-[0.2em] text-[#c8a97e] ml-2">Book Session</span>
                </button>
              </nav>

              <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-[10px] tracking-[0.25em] uppercase text-white/40 font-mono mb-2">OPUS I</h4>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onNavigate('song-detail', 'song-1');
                    }}
                    className="text-sm font-['Cormorant_Garamond'] text-white/80 hover:text-[#c8a97e] transition-colors text-left"
                  >
                    L'Heure Dorée
                  </button>
                  <p className="text-[11px] text-white/40 mt-1">Steinway & Cello</p>
                </div>
                <div>
                  <h4 className="text-[10px] tracking-[0.25em] uppercase text-white/40 font-mono mb-2">OPUS II</h4>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onNavigate('song-detail', 'song-2');
                    }}
                    className="text-sm font-['Cormorant_Garamond'] text-white/80 hover:text-[#c8a97e] transition-colors text-left"
                  >
                    Nocturne d'Ivoire
                  </button>
                  <p className="text-[11px] text-white/40 mt-1">Kyoto Slate Solitude</p>
                </div>
                <div>
                  <h4 className="text-[10px] tracking-[0.25em] uppercase text-white/40 font-mono mb-2">OPUS III</h4>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onNavigate('song-detail', 'song-3');
                    }}
                    className="text-sm font-['Cormorant_Garamond'] text-white/80 hover:text-[#c8a97e] transition-colors text-left"
                  >
                    Aethelgard
                  </button>
                  <p className="text-[11px] text-white/40 mt-1">Centenary Orchestral</p>
                </div>
              </div>
            </div>

            {/* Editorial Showcase Column */}
            <div className="md:col-span-5 bg-white/[0.02] border border-white/5 p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] block mb-3 font-['Montserrat']">
                  The Maison Ethos
                </span>
                <p className="font-['Cormorant_Garamond'] text-lg text-white/85 italic leading-relaxed">
                  “I do not compose songs for the masses. I compose one original piece for one human soul, transcribing love, grief, and legacy into frequencies that outlive us.”
                </p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 mt-4">
                  — Vishwesh Raghuvanshi
                </p>
              </div>

              <div className="pt-8 border-t border-white/5">
                <p className="text-[11px] text-white/50 mb-3">
                  Private consultations conducted globally via encrypted video salon or in-person by appointment.
                </p>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onBookSession();
                  }}
                  className="w-full py-3 bg-[#c8a97e] text-black text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#dfc59f] transition-colors"
                >
                  Reserve Consultation
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto w-full pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 tracking-[0.15em] uppercase">
            <span>Geneva · London · Mumbai · Kyoto</span>
            <span>Edition 1 of 1 Bespoke Music Craftsmanship</span>
          </div>
        </div>
      )}
    </>
  );
};
