/**
 * Luxury Web Audio Synthesizer for Vishwesh Raghuvanshi
 * Generates warm, bespoke acoustic-style arpeggios, cello drones,
 * and delicate piano harmonies with real waveform frequency analysis.
 */

class LuxuryAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isPlaying: boolean = false;
  private currentSongId: string | null = null;
  private timerId: number | null = null;
  private activeVoices: { stop: () => void }[] = [];
  private volume: number = 0.7;
  private step: number = 0;
  private chords: number[][] = [];
  private onTimeUpdateCallback?: (currentTime: number) => void;
  private simulatedCurrentTime: number = 0;
  private tickerInterval: number | null = null;

  private init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public playSong(songId: string, chords: number[][], onTimeUpdate?: (time: number) => void) {
    this.init();
    if (this.isPlaying && this.currentSongId === songId) {
      return;
    }

    this.stop();
    this.isPlaying = true;
    this.currentSongId = songId;
    this.chords = chords;
    this.step = 0;
    this.simulatedCurrentTime = 0;
    this.onTimeUpdateCallback = onTimeUpdate;

    this.scheduleChordLoop();

    // Start progress timer
    this.tickerInterval = window.setInterval(() => {
      if (this.isPlaying) {
        this.simulatedCurrentTime += 0.5;
        if (this.onTimeUpdateCallback) {
          this.onTimeUpdateCallback(this.simulatedCurrentTime);
        }
      }
    }, 500);
  }

  private scheduleChordLoop() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const currentChord = this.chords[this.step % this.chords.length];
    this.triggerPianoChord(currentChord);

    this.step++;
    // Schedule next chord in 2.8 seconds
    this.timerId = window.setTimeout(() => {
      if (this.isPlaying) {
        this.scheduleChordLoop();
      }
    }, 2800);
  }

  private triggerPianoChord(frequencies: number[]) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    frequencies.forEach((freq, index) => {
      if (!this.ctx || !this.masterGain) return;
      const noteDelay = index * 0.09; // Gentle arpeggiation
      const noteTime = now + noteDelay;

      // Primary tone (triangle for warm wooden body)
      const osc = this.ctx.createOscillator();
      osc.type = index === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);

      // Warm lowpass filter to mimic felt hammer
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 3.5, noteTime);
      filter.frequency.exponentialRampToValueAtTime(freq * 0.8, noteTime + 2.5);

      // Gentle gain envelope (piano attack and long natural decay)
      const noteGain = this.ctx.createGain();
      noteGain.gain.setValueAtTime(0.0001, noteTime);
      noteGain.gain.linearRampToValueAtTime(0.22 / (frequencies.length * 0.5), noteTime + 0.03);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 3.2);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(noteTime);
      osc.stop(noteTime + 3.3);

      this.activeVoices.push({
        stop: () => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Ignore if already stopped
          }
        }
      });
    });

    // Add subtle ambient cello drone underneath
    if (this.step % 2 === 0) {
      const bassFreq = frequencies[0] / 2;
      const droneOsc = this.ctx.createOscillator();
      droneOsc.type = 'sawtooth';
      droneOsc.frequency.setValueAtTime(bassFreq, now);

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(240, now);

      const droneGain = this.ctx.createGain();
      droneGain.gain.setValueAtTime(0.001, now);
      droneGain.gain.linearRampToValueAtTime(0.08, now + 0.8);
      droneGain.gain.exponentialRampToValueAtTime(0.001, now + 4.8);

      droneOsc.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.masterGain);

      droneOsc.start(now);
      droneOsc.stop(now + 4.9);

      this.activeVoices.push({
        stop: () => {
          try {
            droneOsc.stop();
            droneOsc.disconnect();
          } catch {
            // Ignore
          }
        }
      });
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.tickerInterval) {
      clearInterval(this.tickerInterval);
      this.tickerInterval = null;
    }
  }

  public resume() {
    if (this.currentSongId && this.chords.length > 0) {
      this.isPlaying = true;
      this.scheduleChordLoop();
      this.tickerInterval = window.setInterval(() => {
        if (this.isPlaying) {
          this.simulatedCurrentTime += 0.5;
          if (this.onTimeUpdateCallback) {
            this.onTimeUpdateCallback(this.simulatedCurrentTime);
          }
        }
      }, 500);
    }
  }

  public stop() {
    this.isPlaying = false;
    this.currentSongId = null;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.tickerInterval) {
      clearInterval(this.tickerInterval);
      this.tickerInterval = null;
    }
    this.activeVoices.forEach((v) => v.stop());
    this.activeVoices = [];
    this.simulatedCurrentTime = 0;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentSongId(): string | null {
    return this.currentSongId;
  }

  public getFrequencyData(array: Uint8Array<ArrayBuffer>): void {
    if (this.analyser && this.isPlaying) {
      this.analyser.getByteFrequencyData(array);
    } else {
      array.fill(0);
    }
  }
}

export const luxuryAudio = new LuxuryAudioEngine();
