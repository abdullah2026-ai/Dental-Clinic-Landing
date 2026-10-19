'use client';

import React, { useState } from 'react';
import { ChamberConfig, DentalService, ChamberLocation } from '@/types/dental';
import { ShieldCheck, Users, Sparkles, CheckCircle2, Calendar, Phone, Clock, ArrowRight } from 'lucide-react';

interface HeroProps {
  config: ChamberConfig;
  services: DentalService[];
  chambers: ChamberLocation[];
  onBookSuccess: (bookingData: {
    patientName: string;
    phone: string;
    chamberId: string;
    serviceId: string;
    date: string;
    timeSlot: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    notes?: string;
  }) => void;
  onOpenTracking: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  config,
  services,
  chambers,
  onBookSuccess,
  onOpenTracking,
}) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [chamberId, setChamberId] = useState(chambers[0]?.id || '');
  const [serviceId, setServiceId] = useState(services[0]?.id || '');
  const [date, setDate] = useState('2026-10-20');
  const [minDate, setMinDate] = useState('2026-10-19');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const today = new Date();
      setMinDate(today.toISOString().split('T')[0]);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().split('T')[0]);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const [timeSlot, setTimeSlot] = useState('05:30 PM');
  const [errorMsg, setErrorMsg] = useState('');

  const selectedChamber = chambers.find((c) => c.id === chamberId) || chambers[0];
  const availableSlots = selectedChamber?.timeSlots || ['05:00 PM', '05:30 PM', '06:00 PM', '07:00 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setErrorMsg('Please enter patient full name');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setErrorMsg('Please enter a valid Bangladeshi mobile number (e.g. 01711234567)');
      return;
    }
    setErrorMsg('');

    onBookSuccess({
      patientName: patientName.trim(),
      phone: phone.trim(),
      chamberId,
      serviceId,
      date,
      timeSlot,
      age: 30,
      gender: 'Male',
      notes: 'Booked via Hero Quick Widget',
    });

    setPatientName('');
    setPhone('');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-100/40 via-teal-50/30 to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* 3D Colorful Ambient Glow Orbs */}
      <div 
        className="absolute top-0 right-1/4 -z-10 w-[500px] h-[500px] rounded-full blur-[110px] opacity-30 pointer-events-none animate-pulse"
        style={{ backgroundColor: config.primaryColorHex }}
      />
      <div className="absolute top-32 left-10 -z-10 w-80 h-80 rounded-full blur-[100px] opacity-25 bg-cyan-400 pointer-events-none" />
      <div className="absolute bottom-10 right-10 -z-10 w-96 h-96 rounded-full blur-[120px] opacity-20 bg-emerald-300 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Colorful Trust Kicker */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border shadow-xs"
              style={{
                backgroundColor: `${config.primaryColorHex}12`,
                borderColor: `${config.primaryColorHex}35`,
                color: config.primaryColorHex,
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: config.primaryColorHex }}
              />
              <span>CARING TODAY FOR BRIGHTER TOMORROWS · BANGLADESH</span>
            </div>

            {/* 3D Colorful Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12] text-balance drop-shadow-xs">
              Healthy Smiles <br />
              <span className="relative inline-block mt-1">
                <span 
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${config.primaryColorHex}, #0d9488, #0284c7)`,
                  }}
                >
                  Happier Lives
                </span>
                <svg
                  className="absolute -bottom-2.5 left-0 w-full h-3"
                  style={{ color: config.primaryColorHex }}
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C50 2 150 2 197 9"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Hero value proposition */}
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
              Gentle, modern dental care by <strong className="text-slate-900 font-semibold">{config.doctorName}</strong>.
              Convenient chambers in Dhaka (Dhanmondi & Banani) and Chattogram with sterilized European equipment, zero pain protocols, and verified BMDC registration.
            </p>

            {/* Doctor info snippet with dynamic theme tag */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-600 p-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-xs">
              <span className="font-semibold text-slate-900">{config.degrees}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span
                className="font-bold px-2 py-0.5 rounded-md border"
                style={{
                  backgroundColor: `${config.primaryColorHex}15`,
                  borderColor: `${config.primaryColorHex}30`,
                  color: config.primaryColorHex,
                }}
              >
                {config.bmdcReg}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="font-semibold text-slate-900">Consultation {config.currency}{config.consultationFeeBDT}</span>
            </div>

            {/* CTA action cluster with 3D hover */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#hero-booking"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold rounded-xl text-white shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer hover:brightness-110"
                style={{
                  backgroundColor: config.primaryColorHex,
                  boxShadow: `0 10px 25px -5px ${config.primaryColorHex}50`,
                }}
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenTracking}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-700 bg-white/90 hover:bg-white border border-slate-300 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 backdrop-blur-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4" style={{ color: config.primaryColorHex }} />
                <span>Track Serial / Booking</span>
              </button>
            </div>

            {/* 3 Colorful Value Pillars with 3D gradient cards */}
            <div className="grid grid-cols-3 gap-3.5 pt-6 border-t border-slate-200/80">
              <div
                className="group/pillar p-3 rounded-2xl bg-white border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-start gap-2.5"
                style={{ borderColor: `${config.primaryColorHex}25` }}
              >
                <div
                  className="w-9 h-9 rounded-xl text-white flex items-center justify-center shrink-0 shadow-sm"
                  style={{ backgroundColor: config.primaryColorHex }}
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">BMDC Certified</div>
                  <div className="text-[11px] text-slate-500 leading-tight">Registered Dentist</div>
                </div>
              </div>

              <div className="group/pillar p-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">All Ages Welcome</div>
                  <div className="text-[11px] text-slate-500 leading-tight">Adult & Pediatric</div>
                </div>
              </div>

              <div
                className="group/pillar p-3 rounded-2xl bg-white border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-start gap-2.5"
                style={{ borderColor: `${config.primaryColorHex}25` }}
              >
                <div
                  className="w-9 h-9 rounded-xl text-white flex items-center justify-center shrink-0 shadow-sm"
                  style={{
                    backgroundColor: config.primaryColorHex,
                    opacity: 0.9,
                  }}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Modern Tech</div>
                  <div className="text-[11px] text-slate-500 leading-tight">Autoclave Sterilized</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Column: 3D Colorful Booking Card */}
          <div id="hero-booking" className="lg:col-span-5 relative [perspective:1200px]">
            
            {/* Floating 3D Badge 1: Top Right */}
            <div
              className="hidden sm:flex absolute -top-4 -right-3 z-20 items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border shadow-lg text-[11px] font-bold text-slate-800 animate-bounce duration-1000"
              style={{ borderColor: `${config.primaryColorHex}30` }}
            >
              <span className="text-amber-500">★</span>
              <span>4.9 / 5 Rating</span>
              <span className="text-slate-400">·</span>
              <span className="font-semibold" style={{ color: config.primaryColorHex }}>5000+ Happy Patients</span>
            </div>

            {/* Outer 3D Gradient Glow Frame */}
            <div
              className="relative rounded-[28px] p-1 shadow-xl transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${config.primaryColorHex}, #38bdf8, #818cf8)`,
                boxShadow: `0 20px 50px ${config.primaryColorHex}25`,
              }}
            >
              <div className="bg-white/95 backdrop-blur-xl rounded-[25px] p-6 sm:p-7 shadow-inner border border-white">
                
                {/* Booking Header */}
                <div className="flex items-start gap-3 pb-5 border-b border-slate-100">
                  <div 
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md"
                    style={{ backgroundColor: config.primaryColorHex }}
                  >
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-snug">
                      Book Your Appointment
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Get an instant Serial Number for doctor consultation.
                    </p>
                  </div>
                </div>

                {/* Booking Form */}
                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  
                  {errorMsg && (
                    <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
                      {errorMsg}
                    </div>
                  )}

                  {/* Patient Name */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Patient Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Shamim Osman"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Mobile Number (For SMS / Call)
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="01711234567 or +880..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-3.5 pr-8 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Chamber Location */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Select Chamber
                    </label>
                    <select
                      value={chamberId}
                      onChange={(e) => {
                        setChamberId(e.target.value);
                        const c = chambers.find((ch) => ch.id === e.target.value);
                        if (c && c.timeSlots.length > 0) {
                          setTimeSlot(c.timeSlots[0]);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                    >
                      {chambers.map((ch) => (
                        <option key={ch.id} value={ch.id}>
                          {ch.name} ({ch.city}) - {ch.visitingHours}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Two column: Date & Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Select Date
                      </label>
                      <input
                        type="date"
                        required
                        suppressHydrationWarning
                        value={date}
                        min={minDate}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Select Service
                      </label>
                      <select
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
                      >
                        {services.map((srv) => (
                          <option key={srv.id} value={srv.id}>
                            {srv.name} ({config.currency}{srv.startingPrice})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Time slot pills */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Available Time Slot
                    </label>
                    <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                      {availableSlots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setTimeSlot(slot)}
                          className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                            timeSlot === slot
                              ? 'text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                          style={{
                            backgroundColor: timeSlot === slot ? config.primaryColorHex : undefined,
                          }}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 text-sm font-semibold rounded-xl text-white shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    style={{ backgroundColor: config.primaryColorHex }}
                  >
                    <span>Confirm & Generate Serial</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: config.primaryColorHex }} />
                    <span>Pay at chamber on consultation day · Instant Tracking ID</span>
                  </div>

                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
