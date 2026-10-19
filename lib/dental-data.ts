import {
  ChamberConfig,
  ChamberLocation,
  DentalService,
  DentalWorkCase,
  Testimonial,
  Appointment,
  ThemePreset,
} from '@/types/dental';

export const THEME_CONFIGS: Record<
  ThemePreset,
  {
    name: string;
    primaryHex: string;
    primaryClass: string;
    bgSoftClass: string;
    borderClass: string;
    badgeClass: string;
  }
> = {
  emerald: {
    name: 'Mint Emerald (Modern Clean)',
    primaryHex: '#0f766e',
    primaryClass: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    bgSoftClass: 'bg-emerald-50/60',
    borderClass: 'border-emerald-200',
    badgeClass: 'bg-emerald-100 text-emerald-800',
  },
  teal: {
    name: 'Teal Medical (Fresh)',
    primaryHex: '#0d9488',
    primaryClass: 'bg-teal-600 hover:bg-teal-700 text-white',
    bgSoftClass: 'bg-teal-50/60',
    borderClass: 'border-teal-200',
    badgeClass: 'bg-teal-100 text-teal-800',
  },
  cyan: {
    name: 'Ocean Cyan (Aesthetic)',
    primaryHex: '#0891b2',
    primaryClass: 'bg-cyan-700 hover:bg-cyan-800 text-white',
    bgSoftClass: 'bg-cyan-50/60',
    borderClass: 'border-cyan-200',
    badgeClass: 'bg-cyan-100 text-cyan-800',
  },
  blue: {
    name: 'Royal Sapphire (Clinical)',
    primaryHex: '#1d4ed8',
    primaryClass: 'bg-blue-700 hover:bg-blue-800 text-white',
    bgSoftClass: 'bg-blue-50/60',
    borderClass: 'border-blue-200',
    badgeClass: 'bg-blue-100 text-blue-800',
  },
  purple: {
    name: 'Amethyst Luxury',
    primaryHex: '#7e22ce',
    primaryClass: 'bg-purple-700 hover:bg-purple-800 text-white',
    bgSoftClass: 'bg-purple-50/60',
    borderClass: 'border-purple-200',
    badgeClass: 'bg-purple-100 text-purple-800',
  },
  rose: {
    name: 'Gentle Rose (Warm)',
    primaryHex: '#be123c',
    primaryClass: 'bg-rose-700 hover:bg-rose-800 text-white',
    bgSoftClass: 'bg-rose-50/60',
    borderClass: 'border-rose-200',
    badgeClass: 'bg-rose-100 text-rose-800',
  },
};

export const DEFAULT_CHAMBERS: ChamberLocation[] = [
  {
    id: 'ch-dhanmondi',
    name: 'Dhanmondi Evening Chamber',
    area: 'Dhanmondi R/A',
    city: 'Dhaka',
    address: 'House 34 (3rd Floor), Road 9/A, Satmasjid Road, Dhanmondi, Dhaka-1209',
    visitingDays: 'Saturday - Thursday (Fri Closed)',
    visitingHours: '05:00 PM - 09:30 PM',
    timeSlots: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM'],
    phone: '+880 1711-234567',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Satmasjid+Road+Dhanmondi+Dhaka+1209',
    mapEmbedQuery: 'Satmasjid Road, Dhanmondi, Dhaka',
  },
  {
    id: 'ch-banani',
    name: 'Banani Aesthetic Lounge',
    area: 'Banani',
    city: 'Dhaka',
    address: 'Suite 4B, Plot 67, Block D, Kamal Ataturk Avenue, Banani, Dhaka-1213',
    visitingDays: 'Sunday, Tuesday, Thursday',
    visitingHours: '10:30 AM - 02:00 PM',
    timeSlots: ['10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM'],
    phone: '+880 1819-987654',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kamal+Ataturk+Avenue+Banani+Dhaka+1213',
    mapEmbedQuery: 'Kamal Ataturk Avenue, Banani, Dhaka',
  },
  {
    id: 'ch-chattogram',
    name: 'Chattogram Port City Chamber',
    area: 'GEC Circle',
    city: 'Chattogram',
    address: 'City Medical Complex (2nd Floor), O.R. Nizam Road, GEC Circle, Chattogram',
    visitingDays: 'Every Friday only',
    visitingHours: '10:00 AM - 06:00 PM',
    timeSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'],
    phone: '+880 1912-345678',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=City+Medical+Complex+OR+Nizam+Road+GEC+Circle+Chattogram',
    mapEmbedQuery: 'GEC Circle, Chattogram',
  },
];

export const DEFAULT_CONFIG: ChamberConfig = {
  clinicName: 'Cleargrin Dental Care',
  tagline: 'Gentle, modern dental care for you and your family in Bangladesh',
  doctorName: 'Dr. Sarah Rahman',
  doctorTitle: 'Consultant Dental Surgeon & Aesthetic Specialist',
  degrees: 'BDS (Dhaka Dental College), PGT (Aesthetic Dentistry), FCPS (Part-II), Fellow (PGI Chandigarh)',
  bmdcReg: 'BMDC Reg No: A-14289',
  primaryPhone: '+880 1711-234567',
  emergencyPhone: '+880 1819-987654',
  email: 'care@cleargrindental.bd',
  visitingSummary: 'Open 6 Days a Week · Friday Special Chamber',
  currency: '৳',
  consultationFeeBDT: 800,
  themePreset: 'emerald',
  primaryColorHex: '#0f766e',
  heroImage: '/images/hero_dental_smile_1792388149649.jpg',
  receptionImage: '/images/clinic_reception_1792388149997.jpg',
  chambers: DEFAULT_CHAMBERS,
  googleSheetWebhookUrl: '',
  googleSheetAutoSync: false,
};

export const DEFAULT_SERVICES: DentalService[] = [
  {
    id: 'srv-general',
    name: 'General Dentistry & Consultation',
    bengaliName: 'সাধারণ দন্ত চিকিৎসা ও পরামর্শ',
    description: 'Comprehensive dental exams, painless scaling, deep cleaning, dental X-rays, and preventive oral health care.',
    startingPrice: 800,
    iconKey: 'tooth',
    category: 'Preventive',
    estimatedDuration: '30 mins',
    popular: true,
  },
  {
    id: 'srv-orthodontics',
    name: 'Orthodontics & Clear Braces',
    bengaliName: 'অর্থোডন্টিক্স এবং দাঁতের ব্রেসেস',
    description: 'Precision tooth realignment with ceramic braces, metal brackets, and transparent invisible aligners.',
    startingPrice: 35000,
    iconKey: 'braces',
    category: 'Specialized',
    estimatedDuration: '45 mins',
    popular: true,
  },
  {
    id: 'srv-implants',
    name: 'Dental Implants & Crowns',
    bengaliName: 'ডেন্টাল ইমপ্ল্যান্ট এবং ক্যাপ',
    description: 'Permanent titanium dental implants and zirconia crowns that look, feel, and function like real natural teeth.',
    startingPrice: 28000,
    iconKey: 'implant',
    category: 'Restorative',
    estimatedDuration: '60 mins',
  },
  {
    id: 'srv-cosmetic',
    name: 'Cosmetic Dentistry & Whitening',
    bengaliName: 'কসমেটিক ডেন্টিস্ট্রি ও হোয়াইটেনিং',
    description: 'Laser teeth whitening, composite bonding, porcelain veneers, and Hollywood smile enhancement.',
    startingPrice: 4500,
    iconKey: 'sparkles',
    category: 'Cosmetic',
    estimatedDuration: '40 mins',
    popular: true,
  },
  {
    id: 'srv-pediatric',
    name: 'Pediatric Dentistry for Kids',
    bengaliName: 'শিশুদের দন্ত যত্ন ও চিকিৎসা',
    description: 'Gentle, fear-free care for growing smiles, fluoridation, cavity prevention, and habit correction for kids.',
    startingPrice: 1200,
    iconKey: 'baby',
    category: 'Pediatric',
    estimatedDuration: '30 mins',
  },
  {
    id: 'srv-emergency',
    name: 'Emergency Dental Relief & RCT',
    bengaliName: 'জরুরী দাঁতের ব্যথা নিরাময় ও রুট ক্যানেল',
    description: 'Single-sitting painless root canal treatment (RCT), acute toothache relief, and trauma repair.',
    startingPrice: 4000,
    iconKey: 'shield',
    category: 'Emergency',
    estimatedDuration: '45 mins',
  },
];

export const DEFAULT_WORKS: DentalWorkCase[] = [
  {
    id: 'case-1',
    title: 'Full Aesthetic Smile Makeover & Veneers',
    bengaliTitle: 'ফুল স্মাইল মেকওভার ও সিরামিক ভেনিয়ার',
    category: 'Cosmetic',
    image: '/images/work_smile_makeover_1792388151213.jpg',
    beforeAfterDescription: 'Corrected severe tetracycline tooth discoloration and uneven enamel alignment with 8 ultra-thin porcelain veneers.',
    treatmentDuration: '3 Visits (14 Days)',
    approxCostBDT: 42000,
    doctorNotes: 'Achieved natural BL2 shade with lifelike translucency and optimal gingival symmetry.',
    patientAgeGender: '28 Yrs, Female (Dhaka)',
  },
  {
    id: 'case-2',
    title: 'Clear Ceramic Orthodontic Alignment',
    bengaliTitle: 'সিরামিক ব্রেসেস দিয়ে আঁকাবাঁকা দাঁত সোজা',
    category: 'Orthodontics',
    image: '/images/work_orthodontics_1792388151131.jpg',
    beforeAfterDescription: 'Resolved class-II deep bite and severe anterior crowding using clear ceramic aesthetic brackets without premolar extraction.',
    treatmentDuration: '14 Months',
    approxCostBDT: 55000,
    doctorNotes: 'Patient maintained excellent oral hygiene; smile arc achieved full lip concordance.',
    patientAgeGender: '22 Yrs, Female (Chattogram)',
  },
  {
    id: 'case-3',
    title: 'State-of-the-Art Clinic Architecture & Treatment Suite',
    bengaliTitle: 'আধুনিক ও স্টেরিলাইজড চেম্বার পরিবেশ',
    category: 'Chamber Environment',
    image: '/images/clinic_reception_1792388149997.jpg',
    beforeAfterDescription: 'Equipped with European Class-B autoclave sterilizers, digital RVG X-ray sensors, and ambient relaxation lounge.',
    treatmentDuration: 'Zero Wait Lounge',
    approxCostBDT: 800,
    doctorNotes: 'Designed for strict 4-step cross-infection control protocol ensuring maximum patient safety.',
    patientAgeGender: 'Dhanmondi Main Chamber',
  },
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    patientName: 'Jessica Rahman',
    location: 'Gulshan 2, Dhaka',
    treatment: 'Laser Teeth Whitening & Polishing',
    rating: 5,
    comment: 'The team at Cleargrin made my visit so easy and comfortable. Dr. Sarah explains every step gently. My teeth are noticeably brighter for my wedding photography!',
    date: '12 October 2026',
    verified: true,
  },
  {
    id: 'test-2',
    patientName: 'Kazi Tanvir Hasan',
    location: 'Dhaka University Area',
    treatment: 'Ceramic Braces & Alignment',
    rating: 5,
    comment: 'I was hesitant about adult braces, but the ceramic ones are nearly invisible. Visiting the Dhanmondi chamber after office hours is extremely convenient. Highly recommend!',
    date: '28 September 2026',
    verified: true,
  },
  {
    id: 'test-3',
    patientName: 'Syeda Afroza Begum',
    location: 'Uttara Sector 7, Dhaka',
    treatment: 'Single-Sitting Root Canal (RCT)',
    rating: 5,
    comment: 'I was terrified of root canal pain due to past bad experiences. Here, with local anesthesia and digital X-ray, I felt zero pain throughout the procedure. Excellent care!',
    date: '04 October 2026',
    verified: true,
  },
  {
    id: 'test-4',
    patientName: 'Engr. Mahbubul Alam',
    location: 'GEC Circle, Chattogram',
    treatment: 'Zirconia Dental Crown',
    rating: 5,
    comment: 'Visited the Friday chamber in Chattogram. The precision of the crown fitting is superb. It feels completely natural when chewing food. Truly international standard.',
    date: '15 September 2026',
    verified: true,
  },
];

export const DEFAULT_APPOINTMENTS: Appointment[] = [
  {
    id: 'BD-8492',
    patientName: 'Shamim Osman',
    phone: '+8801712984512',
    age: 34,
    gender: 'Male',
    chamberId: 'ch-dhanmondi',
    chamberName: 'Dhanmondi Evening Chamber',
    serviceId: 'srv-general',
    serviceName: 'General Dentistry & Consultation',
    date: '2026-10-19',
    timeSlot: '05:30 PM',
    serialNumber: 1,
    status: 'Confirmed',
    notes: 'Mild tooth sensitivity on lower left molar during cold drinks.',
    createdAt: '2026-10-18T14:20:00Z',
    feeBDT: 800,
  },
  {
    id: 'BD-8493',
    patientName: 'Nusrat Jahan',
    phone: '+8801822334455',
    age: 26,
    gender: 'Female',
    chamberId: 'ch-banani',
    chamberName: 'Banani Aesthetic Lounge',
    serviceId: 'srv-cosmetic',
    serviceName: 'Cosmetic Dentistry & Whitening',
    date: '2026-10-20',
    timeSlot: '11:30 AM',
    serialNumber: 2,
    status: 'Pending',
    notes: 'Inquiring about veneers for front teeth gap.',
    createdAt: '2026-10-18T18:10:00Z',
    feeBDT: 4500,
  },
  {
    id: 'BD-8490',
    patientName: 'Fahim Morshed',
    phone: '+8801911223344',
    age: 41,
    gender: 'Male',
    chamberId: 'ch-dhanmondi',
    chamberName: 'Dhanmondi Evening Chamber',
    serviceId: 'srv-emergency',
    serviceName: 'Emergency Dental Relief & RCT',
    date: '2026-10-18',
    timeSlot: '07:00 PM',
    serialNumber: 4,
    status: 'Completed',
    notes: 'Completed 1st session of RCT with temp filling.',
    createdAt: '2026-10-17T09:00:00Z',
    feeBDT: 4000,
  },
];

// Local Storage Keys
const STORAGE_KEYS = {
  CONFIG: 'cleargrin_dental_config_v1',
  SERVICES: 'cleargrin_dental_services_v1',
  WORKS: 'cleargrin_dental_works_v1',
  TESTIMONIALS: 'cleargrin_dental_testimonials_v1',
  APPOINTMENTS: 'cleargrin_dental_appointments_v1',
};

// Safe local storage helpers
export function getSavedConfig(): ChamberConfig {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (!raw) return DEFAULT_CONFIG;
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveConfigToStorage(config: ChamberConfig) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
}

export function getSavedAppointments(): Appointment[] {
  if (typeof window === 'undefined') return DEFAULT_APPOINTMENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(DEFAULT_APPOINTMENTS));
      return DEFAULT_APPOINTMENTS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_APPOINTMENTS;
  }
}

export function saveAppointmentsToStorage(appointments: Appointment[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
}

export function getSavedServices(): DentalService[] {
  if (typeof window === 'undefined') return DEFAULT_SERVICES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (!raw) return DEFAULT_SERVICES;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_SERVICES;
  }
}

export function saveServicesToStorage(services: DentalService[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
}

export function getSavedWorks(): DentalWorkCase[] {
  if (typeof window === 'undefined') return DEFAULT_WORKS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WORKS);
    if (!raw) return DEFAULT_WORKS;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_WORKS;
  }
}

export function saveWorksToStorage(works: DentalWorkCase[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.WORKS, JSON.stringify(works));
}

export function getSavedTestimonials(): Testimonial[] {
  if (typeof window === 'undefined') return DEFAULT_TESTIMONIALS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    if (!raw) return DEFAULT_TESTIMONIALS;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_TESTIMONIALS;
  }
}

export function saveTestimonialsToStorage(testimonials: Testimonial[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
}

export function resetAllDataToDefault() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.CONFIG);
  localStorage.removeItem(STORAGE_KEYS.SERVICES);
  localStorage.removeItem(STORAGE_KEYS.WORKS);
  localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
  localStorage.removeItem(STORAGE_KEYS.APPOINTMENTS);
}

// Google Sheets Sync Helper (via Google Apps Script Webhook)
export async function syncBookingToGoogleSheet(booking: Appointment, webhookUrl: string): Promise<boolean> {
  if (!webhookUrl || !webhookUrl.trim().startsWith('http')) return false;
  try {
    const payload = {
      timestamp: new Date().toLocaleString('en-GB'),
      trackingId: booking.id,
      serialNumber: booking.serialNumber,
      patientName: booking.patientName,
      phone: booking.phone,
      age: booking.age,
      gender: booking.gender,
      chamber: booking.chamberName,
      service: booking.serviceName,
      date: booking.date,
      timeSlot: booking.timeSlot,
      status: booking.status,
      feeBDT: booking.feeBDT,
      notes: booking.notes || '',
    };

    // Google Apps Script Webhooks typically require mode 'no-cors' from browsers or text payload
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (error) {
    console.warn('Google Sheets sync error:', error);
    return false;
  }
}

// Export Appointments to CSV (Can directly open in Google Sheets / Excel)
export function exportAppointmentsToCSV(appointments: Appointment[], clinicName: string) {
  const headers = ['Tracking ID', 'Serial #', 'Patient Name', 'Phone', 'Age', 'Gender', 'Chamber', 'Service', 'Date', 'Time Slot', 'Status', 'Fee (BDT)', 'Notes', 'Created At'];
  const rows = appointments.map((a) => [
    `"${a.id}"`,
    a.serialNumber,
    `"${a.patientName.replace(/"/g, '""')}"`,
    `"${a.phone}"`,
    a.age,
    `"${a.gender}"`,
    `"${a.chamberName.replace(/"/g, '""')}"`,
    `"${a.serviceName.replace(/"/g, '""')}"`,
    `"${a.date}"`,
    `"${a.timeSlot}"`,
    `"${a.status}"`,
    a.feeBDT,
    `"${(a.notes || '').replace(/"/g, '""')}"`,
    `"${a.createdAt}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${clinicName.replace(/\s+/g, '_')}_bookings_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

