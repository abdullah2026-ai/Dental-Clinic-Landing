export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export type ThemePreset = 'emerald' | 'teal' | 'cyan' | 'blue' | 'purple' | 'rose';

export interface ChamberLocation {
  id: string;
  name: string;
  area: string;
  city: string;
  address: string;
  visitingDays: string;
  visitingHours: string;
  timeSlots: string[];
  phone: string;
  googleMapsUrl?: string;
  mapEmbedQuery?: string;
}

export interface DentalService {
  id: string;
  name: string;
  bengaliName: string;
  description: string;
  startingPrice: number; // in BDT
  iconKey: 'tooth' | 'braces' | 'implant' | 'sparkles' | 'baby' | 'shield' | 'syringe' | 'clipboard';
  category: string;
  estimatedDuration: string;
  popular?: boolean;
}

export interface DentalWorkCase {
  id: string;
  title: string;
  bengaliTitle: string;
  category: string;
  image: string;
  beforeAfterDescription: string;
  treatmentDuration: string;
  approxCostBDT: number;
  doctorNotes: string;
  patientAgeGender: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  location: string;
  treatment: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Appointment {
  id: string; // e.g. "BD-7492"
  patientName: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  chamberId: string;
  chamberName: string;
  serviceId: string;
  serviceName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "05:30 PM"
  serialNumber: number;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
  feeBDT: number;
}

export interface ChamberConfig {
  clinicName: string;
  tagline: string;
  doctorName: string;
  doctorTitle: string;
  degrees: string;
  bmdcReg: string;
  primaryPhone: string;
  emergencyPhone: string;
  email: string;
  visitingSummary: string;
  currency: string;
  consultationFeeBDT: number;
  themePreset: ThemePreset;
  primaryColorHex: string;
  heroImage: string;
  receptionImage: string;
  chambers: ChamberLocation[];
  googleSheetWebhookUrl?: string;
  googleSheetAutoSync?: boolean;
}
