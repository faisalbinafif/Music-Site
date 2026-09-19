export interface SongStory {
  title: string;
  clientStory: string;
  composerNotes: string;
  atmosphere: string;
  quote: string;
  manuscriptLines: string[];
  dedicatedTo: string;
  occasion: string;
}

export interface Song {
  id: string;
  opusNumber: string;
  title: string;
  frenchTitle?: string;
  subtitle: string;
  duration: string;
  durationSeconds: number;
  keySignature: string;
  tempo: string;
  instrumentation: string[];
  story: SongStory;
  coverImage: string;
  videoPreviewPoster: string;
  accentColor: string;
  chordProgression: number[][]; // Frequency patterns for Web Audio synthesis
}

export interface HeritageChapter {
  id: number;
  romanNumeral: string;
  year: string;
  title: string;
  subtitle: string;
  image: string;
  caption: string;
  diaryDate: string;
  diaryContent: string[];
  philosophyQuote: string;
  musicalNote: string;
}

export interface BookingFormData {
  // Step 1 - Basic Details
  clientName: string;
  clientAge: string;
  clientOccupation: string;
  recipientRelationship: string;
  recipientName: string;

  // Step 2 - The Form (Deep emotional inquiry)
  coreStory: string;
  emotionalArc: string;
  sensoryMetaphor: string;
  instrumentalPreference: string;
  firstListeningOccasion: string;
  specialElements: string;

  // Step 3 - Session Calendar
  selectedDate: string;
  selectedTimeSlot: string;
  timezone: string;
  meetingPlatform: 'google_meet' | 'zoom';
  clientEmail: string;
  whatsappNumber: string;
  additionalNotes: string;
}

export interface ConfirmedBooking {
  bookingId: string;
  createdAt: string;
  formData: BookingFormData;
  meetLink: string;
  zoomLink: string;
  sessionTimeFormatted: string;
}
