'use client';

import React, { useState, useEffect } from 'react';
import {
  ChamberConfig,
  Appointment,
  DentalService,
  DentalWorkCase,
  Testimonial,
} from '@/types/dental';
import {
  DEFAULT_CONFIG,
  DEFAULT_SERVICES,
  DEFAULT_WORKS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_APPOINTMENTS,
  getSavedConfig,
  saveConfigToStorage,
  getSavedAppointments,
  saveAppointmentsToStorage,
  getSavedServices,
  saveServicesToStorage,
  getSavedWorks,
  saveWorksToStorage,
  getSavedTestimonials,
  saveTestimonialsToStorage,
  resetAllDataToDefault,
  syncBookingToGoogleSheet,
} from '@/lib/dental-data';

import { ToastProvider, useToast } from '@/components/ToastContext';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { StatsBar } from '@/components/StatsBar';
import { ServicesSection } from '@/components/ServicesSection';
import { OurWorkSection } from '@/components/OurWorkSection';
import { DoctorChamberSection } from '@/components/DoctorChamberSection';
import { TrackingSection } from '@/components/TrackingSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { Footer } from '@/components/Footer';
import { BookingModal } from '@/components/BookingModal';
import { BookingSuccessModal } from '@/components/BookingSuccessModal';
import { AdminDashboard } from '@/components/AdminDashboard';
import { QuickCustomizerDrawer } from '@/components/QuickCustomizerDrawer';
import { SlidersHorizontal } from 'lucide-react';

function DentalLandingContent() {
  const { toast, confirmModal } = useToast();

  // Local states initialized deterministically to match SSR
  const [config, setConfig] = useState<ChamberConfig>(DEFAULT_CONFIG);
  const [appointments, setAppointments] = useState<Appointment[]>(DEFAULT_APPOINTMENTS);
  const [services, setServices] = useState<DentalService[]>(DEFAULT_SERVICES);
  const [works, setWorks] = useState<DentalWorkCase[]>(DEFAULT_WORKS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);

  // Sync client-side localStorage after hydration cleanly
  useEffect(() => {
    const timer = setTimeout(() => {
      setConfig(getSavedConfig());
      setAppointments(getSavedAppointments());
      setServices(getSavedServices());
      setWorks(getSavedWorks());
      setTestimonials(getSavedTestimonials());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // UI Modal Controls
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [lastBookedAppointment, setLastBookedAppointment] = useState<Appointment | null>(null);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>();
  const [preselectedChamberId, setPreselectedChamberId] = useState<string | undefined>();

  // Update handlers with automatic storage persistence
  const handleUpdateConfig = (newConfig: ChamberConfig) => {
    setConfig(newConfig);
    saveConfigToStorage(newConfig);
  };

  const handleUpdateAppointments = (newAppointments: Appointment[]) => {
    setAppointments(newAppointments);
    saveAppointmentsToStorage(newAppointments);
  };

  const handleUpdateServices = (newServices: DentalService[]) => {
    setServices(newServices);
    saveServicesToStorage(newServices);
  };

  const handleResetAll = () => {
    confirmModal({
      title: 'Reset Demo Data?',
      message: 'This will restore all default Bangladeshi chambers, services, and mock appointments.',
      confirmLabel: 'Yes, Reset',
      cancelLabel: 'Cancel',
      isDestructive: true,
      onConfirm: () => {
        resetAllDataToDefault();
        setConfig(DEFAULT_CONFIG);
        setAppointments(DEFAULT_APPOINTMENTS);
        setServices(DEFAULT_SERVICES);
        setWorks(DEFAULT_WORKS);
        setTestimonials(DEFAULT_TESTIMONIALS);
        toast.success('All demo data restored to initial state');
      },
    });
  };

  // Create new appointment (handles both Hero widget and Booking Modal)
  const handleCreateBooking = async (data: {
    patientName: string;
    phone: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    chamberId: string;
    serviceId: string;
    date: string;
    timeSlot: string;
    notes?: string;
  }) => {
    const chamber = config.chambers.find((c) => c.id === data.chamberId) || config.chambers[0];
    const service = services.find((s) => s.id === data.serviceId) || services[0];

    const sameDayAppointments = appointments.filter(
      (a) => a.chamberId === data.chamberId && a.date === data.date
    );
    const nextSerial = sameDayAppointments.length + 1;

    // Generate random 4-digit ID
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newId = `BD-${randomDigits}`;

    const newAppointment: Appointment = {
      id: newId,
      patientName: data.patientName,
      phone: data.phone,
      age: data.age,
      gender: data.gender,
      chamberId: data.chamberId,
      chamberName: chamber.name,
      serviceId: data.serviceId,
      serviceName: service.name,
      date: data.date,
      timeSlot: data.timeSlot,
      serialNumber: nextSerial,
      status: 'Confirmed', // Immediate serial reservation
      notes: data.notes,
      createdAt: new Date().toISOString(),
      feeBDT: service.startingPrice || config.consultationFeeBDT,
    };

    const updated = [newAppointment, ...appointments];
    handleUpdateAppointments(updated);
    setLastBookedAppointment(newAppointment);

    toast.success(`Serial #${newAppointment.serialNumber} assigned! Tracking ID: ${newAppointment.id}`);

    // If Google Sheets Auto-Sync is enabled, send row to webhook in background
    if (config.googleSheetWebhookUrl) {
      syncBookingToGoogleSheet(newAppointment, config.googleSheetWebhookUrl).then((synced) => {
        if (synced) {
          toast.info('Appointment synced to Google Sheet');
        }
      });
    }
  };

  // Add testimonial handler
  const handleAddTestimonial = (item: Omit<Testimonial, 'id' | 'date' | 'verified'>) => {
    const newTestimonial: Testimonial = {
      ...item,
      id: `test-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      verified: true,
    };
    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    saveTestimonialsToStorage(updated);
    toast.success('Thank you! Your testimonial has been posted.');
  };

  // Smooth scroll to tracking section
  const handleScrollToTracking = (idToSearch?: string) => {
    const el = document.getElementById('tracking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 3-Zone Navigation */}
      <Navbar
        config={config}
        onOpenBooking={() => {
          setPreselectedServiceId(undefined);
          setPreselectedChamberId(undefined);
          setIsBookingOpen(true);
        }}
        onOpenTracking={() => handleScrollToTracking()}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      <main className="flex-1">
        {/* 3D Colorful Hero Section */}
        <Hero
          config={config}
          services={services}
          chambers={config.chambers}
          onBookSuccess={(bookingData) => handleCreateBooking(bookingData)}
          onOpenTracking={() => handleScrollToTracking()}
        />

        {/* Proof & Stats Bar */}
        <StatsBar config={config} />

        {/* Services Catalog with Gradient Cards */}
        <ServicesSection
          services={services}
          config={config}
          onSelectService={(service) => {
            setPreselectedServiceId(service.id);
            setIsBookingOpen(true);
          }}
        />

        {/* Our Work Section with Gradients & 3D Hover */}
        <OurWorkSection
          works={works}
          config={config}
          onBookConsultation={() => {
            setPreselectedServiceId('srv-cosmetic');
            setIsBookingOpen(true);
          }}
        />

        {/* Doctor Profile & Chamber Schedules with Short Google Maps */}
        <DoctorChamberSection
          config={config}
          chambers={config.chambers}
          onSelectChamberToBook={(chamberId) => {
            setPreselectedChamberId(chamberId);
            setIsBookingOpen(true);
          }}
        />

        {/* Real-Time Serial & Booking Tracking */}
        <TrackingSection
          appointments={appointments}
          config={config}
          onNewBookingClick={() => setIsBookingOpen(true)}
        />

        {/* Testimonials & Patient Reviews */}
        <TestimonialsSection
          testimonials={testimonials}
          config={config}
          onAddTestimonial={handleAddTestimonial}
        />
      </main>

      {/* Quiet Footer */}
      <Footer
        config={config}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenTracking={() => handleScrollToTracking()}
      />

      {/* Floating Quick Customizer Pill */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsCustomizerOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-slate-700/50"
        >
          <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
          <span>Customize Chamber</span>
        </button>
      </div>

      {/* Appointment Booking Modal */}
      <BookingModal
        key={`${preselectedServiceId || 'default'}-${preselectedChamberId || 'default'}-${isBookingOpen ? 'open' : 'closed'}`}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        config={config}
        services={services}
        chambers={config.chambers}
        initialServiceId={preselectedServiceId}
        initialChamberId={preselectedChamberId}
        onBookingSubmit={handleCreateBooking}
      />

      {/* Booking Confirmation / Serial Slip Modal */}
      <BookingSuccessModal
        appointment={lastBookedAppointment}
        onClose={() => setLastBookedAppointment(null)}
        config={config}
        onTrackClick={(id) => handleScrollToTracking(id)}
      />

      {/* Full Chamber Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
        appointments={appointments}
        onUpdateAppointments={handleUpdateAppointments}
        services={services}
        onUpdateServices={handleUpdateServices}
        chambers={config.chambers}
        onUpdateChambers={(newChambers) => {
          handleUpdateConfig({ ...config, chambers: newChambers });
        }}
        onResetAll={handleResetAll}
      />

      {/* Quick Customizer Drawer */}
      <QuickCustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
      />

    </div>
  );
}

export default function DentalLandingPage() {
  return (
    <ToastProvider>
      <DentalLandingContent />
    </ToastProvider>
  );
}
