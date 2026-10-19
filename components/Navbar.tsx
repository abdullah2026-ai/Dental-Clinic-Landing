'use client';

import React from 'react';
import { ChamberConfig } from '@/types/dental';
import { THEME_CONFIGS } from '@/lib/dental-data';
import { ShieldCheck, Calendar, Search, SlidersHorizontal, Shield } from 'lucide-react';

interface NavbarProps {
  config: ChamberConfig;
  onOpenBooking: () => void;
  onOpenTracking: () => void;
  onOpenAdmin: () => void;
  onOpenCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  onOpenBooking,
  onOpenTracking,
  onOpenAdmin,
  onOpenCustomizer,
}) => {
  const theme = THEME_CONFIGS[config.themePreset] || THEME_CONFIGS.emerald;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          
          {/* Zone 1: Single clean text element wordmark with dental icon */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105"
              style={{ backgroundColor: config.primaryColorHex }}
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C8.69 2 6 4.69 6 8c0 2.21 1.2 4.15 3 5.19V19c0 1.66 1.34 3 3 3s3-1.34 3-3v-5.81c1.8-1.04 3-2.98 3-5.19 0-3.31-2.69-6-6-6zm0 14c-1.1 0-2-.9-2-2v-2.34C10.63 11.88 11.3 12 12 12s1.37-.12 2-.34V14c0 1.1-.9 2-2 2zm4-8c0 .24-.03.48-.08.71-.58.37-1.24.63-1.92.77V7c0-.55-.45-1-1-1s-1 .45-1 1v2.48c-.68-.14-1.34-.4-1.92-.77C10.03 8.48 10 8.24 10 8c0-1.1.9-2 2-2s2 .9 2 2z"/>
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                {config.clinicName}
              </span>
              <span className="text-xs text-slate-500 font-medium block">
                {config.doctorName} · {config.bmdcReg}
              </span>
            </div>
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#services" className="hover:text-slate-900 transition-colors whitespace-nowrap">
              Services
            </a>
            <a href="#our-work" className="hover:text-slate-900 transition-colors whitespace-nowrap">
              Our Work
            </a>
            <a href="#doctor-chamber" className="hover:text-slate-900 transition-colors whitespace-nowrap">
              Chambers & Schedule
            </a>
            <a href="#testimonials" className="hover:text-slate-900 transition-colors whitespace-nowrap">
              Testimonials
            </a>
            <button
              onClick={onOpenTracking}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap"
            >
              <Search className="w-3.5 h-3.5 text-emerald-600" />
              <span>Track Booking</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick customization trigger */}
            <button
              onClick={onOpenCustomizer}
              title="Customize Chamber Details & Color Theme"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Customize Chamber</span>
            </button>

            {/* Admin access button - icon only */}
            <button
              onClick={onOpenAdmin}
              title="Admin Portal (Manage Bookings, Services & Google Sheet)"
              className="p-2.5 text-slate-700 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all shadow-xs cursor-pointer hover:scale-105"
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4 text-slate-700" />
            </button>

            {/* Primary CTA */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer hover:shadow"
              style={{
                backgroundColor: config.primaryColorHex,
                color: '#ffffff',
              }}
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
