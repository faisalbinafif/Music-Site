import React, { useState, useEffect } from 'react';
import { SONGS } from './data/musicData';
import { Song } from './types';
import { luxuryAudio } from './utils/soundEngine';
import { Header } from './components/Header';
import { LandingHeroSong } from './components/LandingHeroSong';
import { TwoPathways } from './components/TwoPathways';
import { SongDetailPage } from './components/SongDetailPage';
import { HeritagePage } from './components/HeritagePage';
import { BookingFlow } from './components/BookingFlow';

export default function App() {
  const [view, setView] = useState<'landing' | 'song-detail' | 'heritage' | 'booking'>('landing');
  const [selectedSongId, setSelectedSongId] = useState<string>('song-1');
  const [currentPlayingSongId, setCurrentPlayingSongId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const selectedSong = SONGS.find((s) => s.id === selectedSongId) || SONGS[0];

  // Play / Pause toggle for specific song
  const handleTogglePlay = (song: Song) => {
    if (isPlaying && currentPlayingSongId === song.id) {
      luxuryAudio.pause();
      setIsPlaying(false);
    } else {
      luxuryAudio.playSong(song.id, song.chordProgression, (time) => {
        setCurrentTime(time);
      });
      setCurrentPlayingSongId(song.id);
      setIsPlaying(true);
    }
  };

  // Global sound toggle from header
  const handleGlobalAudioToggle = () => {
    if (isPlaying) {
      luxuryAudio.pause();
      setIsPlaying(false);
    } else {
      const songToPlay = SONGS.find((s) => s.id === (currentPlayingSongId || selectedSongId)) || SONGS[0];
      luxuryAudio.playSong(songToPlay.id, songToPlay.chordProgression, (time) => {
        setCurrentTime(time);
      });
      setCurrentPlayingSongId(songToPlay.id);
      setIsPlaying(true);
    }
  };

  // Navigation handlers
  const handleOpenSongDetail = (songId: string) => {
    setSelectedSongId(songId);
    setView('song-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenHeritage = () => {
    setView('heritage');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = () => {
    setView('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToNextSong = (index: number) => {
    if (index < SONGS.length - 1) {
      const nextSong = SONGS[index + 1];
      const elem = document.getElementById(`landing-${nextSong.id}`);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const pathwayElem = document.getElementById('two-pathways-section');
      if (pathwayElem) {
        pathwayElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f2ee] font-['Montserrat'] selection:bg-[#c8a97e] selection:text-black">
      {/* Top Header with Louis Vuitton Inspired Minimal Restraint */}
      <Header
        activeView={view}
        onNavigate={(newView, songId) => {
          if (newView === 'song-detail' && songId) {
            handleOpenSongDetail(songId);
          } else if (newView === 'heritage') {
            handleOpenHeritage();
          } else if (newView === 'booking') {
            handleOpenBooking();
          } else {
            handleBackToLanding();
          }
        }}
        onBookSession={handleOpenBooking}
        currentSongPlaying={isPlaying}
        onTogglePlayGlobal={handleGlobalAudioToggle}
      />

      {/* VIEW 1: LANDING PAGE (Scroll-driven experience with 3 full-screen songs and 2 pathways) */}
      {view === 'landing' && (
        <main
          id="scroll-driven-landing"
          className="w-full h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
        >
          {/* Scroll 1, 2, 3: Fullscreen songs */}
          {SONGS.map((song, index) => (
            <LandingHeroSong
              key={song.id}
              song={song}
              songIndex={index}
              totalSongs={SONGS.length}
              isPlaying={isPlaying && currentPlayingSongId === song.id}
              onPlayToggle={() => handleTogglePlay(song)}
              onSelectSong={handleOpenSongDetail}
              onScrollNext={() => handleScrollToNextSong(index)}
            />
          ))}

          {/* Fourth Scroll — Two Pathways (Explicitly required in design brief) */}
          <TwoPathways
            variant="landing"
            onOpenHeritage={handleOpenHeritage}
            onBookSession={handleOpenBooking}
          />
        </main>
      )}

      {/* VIEW 2: INDIVIDUAL SONG PAGE */}
      {view === 'song-detail' && (
        <SongDetailPage
          song={selectedSong}
          allSongs={SONGS}
          isPlaying={isPlaying && currentPlayingSongId === selectedSong.id}
          onPlayToggle={() => handleTogglePlay(selectedSong)}
          onSelectSong={handleOpenSongDetail}
          onBackToLanding={handleBackToLanding}
          onOpenHeritage={handleOpenHeritage}
          onBookSession={handleOpenBooking}
          currentTime={currentTime}
        />
      )}

      {/* VIEW 3: ABOUT THE CREATOR / HERITAGE PAGE (Scroll-driven parallax diary) */}
      {view === 'heritage' && (
        <HeritagePage
          onBackToLanding={handleBackToLanding}
          onBookSession={handleOpenBooking}
        />
      )}

      {/* VIEW 4: BOOKING A SESSION (4-step flow: Basic Details -> Form -> Calendar -> Confirmation) */}
      {view === 'booking' && (
        <BookingFlow
          onClose={handleBackToLanding}
          onReturnToMusic={handleBackToLanding}
        />
      )}
    </div>
  );
}
