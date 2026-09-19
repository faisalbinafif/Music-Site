import { Song, HeritageChapter } from '../types';

export const SONGS: Song[] = [
  {
    id: 'song-1',
    opusNumber: 'OPUS I',
    title: "L'Heure Dorée",
    frenchTitle: 'The Golden Hour',
    subtitle: 'A symphony born from an unhurried twilight on the Mediterranean coast.',
    duration: '3:42',
    durationSeconds: 222,
    keySignature: 'D Major',
    tempo: '72 BPM — Andante Cantabile',
    instrumentation: [
      'Hamburg Steinway Model D Concert Grand',
      'Handcrafted Italian Cello (circa 1884)',
      'Subtle Analog Tape Saturation',
      'Muted French Horn in F'
    ],
    coverImage: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=2000&q=85',
    videoPreviewPoster: 'https://images.unsplash.com/photo-1520523839898-5071282543e1?auto=format&fit=crop&w=2000&q=85',
    accentColor: '#d4af37',
    chordProgression: [
      [293.66, 369.99, 440.00, 587.33], // D maj (D4, F#4, A4, D5)
      [246.94, 311.13, 369.99, 493.88], // B min (B3, D#4, F#4, B4)
      [220.00, 277.18, 329.63, 440.00], // G maj / A (A3, C#4, E4, A4)
      [196.00, 246.94, 293.66, 392.00], // G maj (G3, B3, D4, G4)
    ],
    story: {
      title: 'A Twenty-Fifth Anniversary Commission',
      dedicatedTo: 'Eleanor & Julian Vance-Sterling',
      occasion: 'Silver Wedding Anniversary, Villa Balbianello, Lake Como',
      clientStory:
        'Twenty-five years ago, Julian proposed to Eleanor at dusk on a stone terrace overlooking Lake Como. In Julian’s words: "The light had turned to liquid amber. Neither of us spoke for ten minutes because the silence felt sacred." Julian approached Vishwesh to transform that single, unrepeatable thirty minutes of twilight into an immortal sonic keepsake that his wife could hold for the rest of her life.',
      composerNotes:
        'To capture the descent of sunlight across cool Alpine water, the piece opens with a solitary, unpedaled D-Major motif on the felted hammers of a 1928 Steinway. When the cello enters at bar 17, it does not lead — it converses, mirroring Eleanor’s laughter against the gentle rhythm of small waves against the villa dock.',
      atmosphere:
        'Warm sunlight fading into deep cobalt blue. The smell of cedar needles and chilled Franciacorta. An intimate stillness where two lives are eternally braided.',
      quote:
        '“Music is the only vessel capable of holding the warmth of light after the sun has long dipped below the mountain.” — Vishwesh Raghuvanshi',
      manuscriptLines: [
        'I. Adagio — Liquid amber descending upon the lake surface',
        'II. Espressivo — Two heartbeats suspended in the silence of Como',
        'III. Rallentando — The quiet promise that outlived twenty-five winters'
      ]
    }
  },
  {
    id: 'song-2',
    opusNumber: 'OPUS II',
    title: "Nocturne d'Ivoire",
    frenchTitle: 'Ivory Nocturne',
    subtitle: 'Solitary keys reverberating through quiet marble halls at midnight.',
    duration: '4:18',
    durationSeconds: 258,
    keySignature: 'F# Minor',
    tempo: '64 BPM — Lento Misterioso',
    instrumentation: [
      'Bösendorfer Imperial 290 with Sub-Bass Resonance',
      'Acoustic Felt Dampeners',
      'Micro-tuned Japanese Koto Harmonic Resonance',
      'Chamber String Trio'
    ],
    coverImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=2000&q=85',
    videoPreviewPoster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2000&q=85',
    accentColor: '#c5a059',
    chordProgression: [
      [185.00, 220.00, 277.18, 369.99], // F# min (F#3, A3, C#4, F#4)
      [146.83, 220.00, 293.66, 369.99], // D maj7 (D3, A3, D4, F#4)
      [164.81, 246.94, 329.63, 392.00], // E min7 (E3, B3, E4, G4)
      [138.59, 207.65, 277.18, 329.63], // C# min (C#3, G#3, C#4, E4)
    ],
    story: {
      title: 'The Solitary Sanctuary in Arashiyama',
      dedicatedTo: 'Kenzo Takahashi',
      occasion: 'Completion of a Minimalist Forest Residence, Kyoto',
      clientStory:
        'A lifelong patron of architecture commissioned Vishwesh to compose the inaugural sonic identity of a private sanctuary constructed entirely of raw cedar, river slate, and glass in the bamboo groves of Kyoto. The client requested that the music "teach the room how to breathe, without disturbing the rain outside."',
      composerNotes:
        'We recorded at 2:00 AM inside the sanctuary before any furniture arrived. The acoustic decay of the high slate walls became the fourth instrument. Notice the spacious intervals: the empty spaces between the piano strikes are deliberate pauses where the listener can hear the night itself.',
      atmosphere:
        'Distant rain striking blackened cedar wood. The quiet hum of an open stone hearth. Clean lines, profound stillness, and intellectual serenity.',
      quote:
        '“The true luxury of sound is not its volume, but the reverence it pays to silence.” — Vishwesh Raghuvanshi',
      manuscriptLines: [
        'I. Silence as Canvas — Slate stones drenched in midnight rain',
        'II. The Resonant Cedar — Harmonic intervals echoing through untouched rooms',
        'III. Vanishing Point — A single high key lingering until dissolved'
      ]
    }
  },
  {
    id: 'song-3',
    opusNumber: 'OPUS III',
    title: 'Aethelgard',
    frenchTitle: 'The Architecture of Memory',
    subtitle: 'Cinematic orchestral grandeur honoring three generations of legacy.',
    duration: '5:06',
    durationSeconds: 306,
    keySignature: 'B-flat Major',
    tempo: '88 BPM — Maestoso e Nobile',
    instrumentation: [
      '48-Piece European Session String Orchestra',
      'Grand Concert Timpani & Orchestral Brass',
      'Handmade Wooden Transverse Flute',
      'Concert Harp with Silver Wound Bass'
    ],
    coverImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=2000&q=85',
    videoPreviewPoster: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=85',
    accentColor: '#e0c080',
    chordProgression: [
      [233.08, 293.66, 349.23, 466.16], // Bb maj (Bb3, D4, F4, Bb4)
      [174.61, 261.63, 349.23, 440.00], // F maj (F3, C4, F4, A4)
      [207.65, 261.63, 311.13, 415.30], // G min / Eb (G#3/Ab3 -> Eb maj)
      [233.08, 277.18, 349.23, 466.16], // Bb sus
    ],
    story: {
      title: 'A Dynasty’s Centenary Anthem',
      dedicatedTo: 'The House of Moreau',
      occasion: 'Centenary of an Artisanal Silk House, Lyon',
      clientStory:
        'To celebrate one hundred years since their grandfather opened a small silk weaving atelier on the slopes of Croix-Rousse, the third-generation Moreau family commissioned Vishwesh to write a legacy anthem. The piece was premiered live in the presence of 180 descendants and artisans beneath the vaulted arches of Palais de la Bourse.',
      composerNotes:
        'We translated the physical rhythm of ancient wooden looms into the gentle ostinato of the cellos. As the composition advances, brass chorales swell to signify generations overcoming wars, economic shifts, and time, concluding in a soaring triumph that leaves the room breathless.',
      atmosphere:
        'Heavy velvet curtains, gilded ceilings, vintage oak cutting tables, and the dignified pride of a century of uncompromising dedication.',
      quote:
        '“A family’s century cannot be recounted in words alone. It requires the breath of sixty musicians to hold its weight.” — Vishwesh Raghuvanshi',
      manuscriptLines: [
        'I. The Wooden Shuttle — Soft rhythmic string ostinato in 6/8',
        'II. The Crucible — Brass swells evoking perseverance and family loyalty',
        'III. The Sovereign Crown — Full orchestral apotheosis and bell chime'
      ]
    }
  }
];

export const HERITAGE_CHAPTERS: HeritageChapter[] = [
  {
    id: 1,
    romanNumeral: 'CHAPTER I',
    year: '1994 — The Ear for Silence',
    title: 'The Resonance of Early Memory',
    subtitle: 'Where classical Indian lineage met the discipline of Western counterpoint.',
    image: 'https://images.unsplash.com/photo-1520523839898-5071282543e1?auto=format&fit=crop&w=1400&q=80',
    caption: 'The ancestral harmonium and vintage Bösendorfer upright in the family salon.',
    diaryDate: 'October 14 — Entry from the Original Leather Journal',
    diaryContent: [
      'My grandfather used to say that a true musician does not rush to fill the air. He waits until the silence has purified the room.',
      'Raised between two distinct traditions — the microtonal emotional nuance of classical Indian ragas and the architectural purity of Bach and Chopin — I learned early that sound is not merely an aesthetic; it is a spiritual imprint.',
      'At age eight, while others practiced etudes for speed, I would strike a single low C on the piano and sit motionless with my ear pressed against the wooden rim until the vibration dissipated sixty seconds later. That dissipation was where the music truly lived.'
    ],
    philosophyQuote: '“Silence is not the absence of sound; it is the velvet cushion upon which the singular note rests.”',
    musicalNote: 'Rooted in D-Dorian and meditative drone resonance.'
  },
  {
    id: 2,
    romanNumeral: 'CHAPTER II',
    year: '2008 — The Conservatory & Restraint',
    title: 'The Discipline of Restraint',
    subtitle: 'Learning to discard the superfluous until only the essential remains.',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1400&q=80',
    caption: 'Hand-inked score manuscripts at the Royal Academy of Music atelier.',
    diaryDate: 'March 22 — London Conservatory Sketchbook',
    diaryContent: [
      'My mentor once took my 40-page orchestral score, struck a red fountain pen through 32 of them, and whispered: "Now play what remains."',
      'It was a devastating lesson in luxury. True luxury is never opulence or excess. It is absolute restraint. It is knowing that one cello phrase played with the weight of conviction holds more emotional truth than a hundred hurried arpeggios.',
      'I spent the next seven years mastering orchestration not to write louder, but to write quieter. To make thirty violins whisper so softly that listeners hold their breath.'
    ],
    philosophyQuote: '“Mastery is achieved not when there is nothing more to add, but when there is nothing left to take away.”',
    musicalNote: 'Pianissimo dynamics, micro-articulation, analog tape recording.'
  },
  {
    id: 3,
    romanNumeral: 'CHAPTER III',
    year: '2016 — The First Private Commission',
    title: 'Translating Human Story into Melody',
    subtitle: 'The birth of a private music atelier dedicated to singular lives.',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1400&q=80',
    caption: 'Private listening salon in Geneva during the first bespoke playback session.',
    diaryDate: 'September 9 — Geneva Salon Notes',
    diaryContent: [
      'A patron asked me: "Can you write a song for my father who cannot speak after his stroke, but whose eyes still water when he hears rain?"',
      'That commission changed everything. I realized that commercial music is made for millions of strangers, but the most profound music is made for one single heart. Like a bespoke Savile Row suit or an Hermès saddle, music could be tailored to the exact contour of a personal memory.',
      'When the son played the recording in his father’s hospital room, the father closed his eyes and squeezed his son’s hand. In that instant, Vishwesh Raghuvanshi Bespoke was born.'
    ],
    philosophyQuote: '“Every person carries a melody inside them that they have never heard out loud. My craft is simply to transcribe it.”',
    musicalNote: 'Bespoke pitch themes derived from names, dates, and emotional landmarks.'
  },
  {
    id: 4,
    romanNumeral: 'CHAPTER IV',
    year: '2022 — The Modern Atelier',
    title: 'The Alchemy of the Creative Session',
    subtitle: 'From intimate dialogue to 96kHz master recordings.',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1400&q=80',
    caption: 'Late-night mixing console and Steinway Model D at the private mountain studio.',
    diaryDate: 'November 18 — The Atelier Journal',
    diaryContent: [
      'We do not begin at the piano. We begin with a cup of Darjeeling tea, or a glass of aged single malt, and four hours of conversation.',
      'I ask questions that seem unrelated to notes: What did your mother’s perfume smell like on Sunday mornings? What was the exact shade of the sky the day your company was founded? What is the secret sorrow you have never told anyone?',
      'From these raw emotional coordinates, motifs emerge. We audition tones together. The client hears their own heart reflected back to them through acoustic strings and hand-struck keys.'
    ],
    philosophyQuote: '“I do not compose for you; I compose with the invisible fabric of your memory.”',
    musicalNote: 'Mastered to analog 1/2-inch magnetic tape for eternal warmth.'
  },
  {
    id: 5,
    romanNumeral: 'CHAPTER V',
    year: 'Today & Tomorrow',
    title: 'The Living Archive of Bespoke Music',
    subtitle: 'Heirlooms that will outlast our voices.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80',
    caption: 'Custom debossed linen score folio and engraved brass USB vault.',
    diaryDate: 'Spring Solstice — Personal Manifesto',
    diaryContent: [
      'In an era where millions of songs are generated in seconds and discarded in minutes, we believe in the sanctity of the permanent.',
      'Each bespoke song we craft is archived in a custom leather and brass folio, accompanied by the hand-bound orchestral score, a Certificate of Unique Provenance, and the master recording stored on titanium vault media.',
      'Long after the flowers have wilted and the words of speeches have faded, this music remains — played on golden anniversaries, passed down to grandchildren, a testament that this love, this triumph, this life truly existed.'
    ],
    philosophyQuote: '“Art is the only currency that time cannot devalue.”',
    musicalNote: 'Numbered Edition 1 of 1. Never re-licensed, never duplicated.'
  }
];
