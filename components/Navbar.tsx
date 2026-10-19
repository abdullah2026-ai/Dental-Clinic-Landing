'use client';

import React, { useState, useEffect } from 'react';
import { ChamberConfig } from '@/types/dental';
import { THEME_CONFIGS } from '@/lib/dental-data';
import {
  Calendar,
  Search,
  SlidersHorizontal,
  Shield,
  Menu,
  X,
  Phone,
  Clock,
  Sparkles,
  ChevronRight,
  MapPin,
  Stethoscope,
  ExternalLink,
} from 'lucide-react';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const theme = THEME_CONFIGS[config.themePreset] || THEME_CONFIGS.emerald;

  // Close mobile menu on Escape key press or screen resize to desktop (>= 1024px)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Prevent background body scroll when side drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleMobileNavClick = (action?: () => void) => {
    setIsMobileMenuOpen(false);
    if (action) action();
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4 h-16 sm:h-20">
            
            {/* Left Zone: Hamburger Button (Mobile/Tablet) + Brand Wordmark */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0 max-w-[65%] sm:max-w-none">
              
              {/* Hamburger Button placed on the LEFT */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 shrink-0"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5 text-slate-800" />
              </button>

              {/* Clinic Brand & Doctor Identity */}
              <a href="#" className="flex items-center gap-2 sm:gap-2.5 group min-w-0">
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105 shrink-0"
                  style={{ backgroundColor: config.primaryColorHex }}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2C8.69 2 6 4.69 6 8c0 2.21 1.2 4.15 3 5.19V19c0 1.66 1.34 3 3 3s3-1.34 3-3v-5.81c1.8-1.04 3-2.98 3-5.19 0-3.31-2.69-6-6-6zm0 14c-1.1 0-2-.9-2-2v-2.34C10.63 11.88 11.3 12 12 12s1.37-.12 2-.34V14c0 1.1-.9 2-2 2zm4-8c0 .24-.03.48-.08.71-.58.37-1.24.63-1.92.77V7c0-.55-.45-1-1-1s-1 .45-1 1v2.48c-.68-.14-1.34-.4-1.92-.77C10.03 8.48 10 8.24 10 8c0-1.1.9-2 2-2s2 .9 2 2z"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-slate-900 block leading-tight truncate">
                    {config.clinicName}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-500 font-medium block truncate">
                    {config.doctorName} · {config.bmdcReg}
                  </span>
                </div>
              </a>
            </div>

            {/* Center Zone: Desktop Navigation Links (>= 1024px) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-slate-600">
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
                type="button"
                onClick={onOpenTracking}
                className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" style={{ color: config.primaryColorHex }} />
                <span>Track Serial</span>
              </button>
            </nav>

            {/* Right Zone: Primary Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Quick Customizer (desktop & tablet) */}
              <button
                type="button"
                onClick={onOpenCustomizer}
                title="Customize Chamber Details & Color Theme"
                className="hidden md:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden lg:inline">Customize</span>
              </button>

              {/* Admin access button - icon only */}
              <button
                type="button"
                onClick={onOpenAdmin}
                title="Doctor Admin Portal"
                className="p-2 sm:p-2.5 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all shadow-xs cursor-pointer hover:scale-105"
                aria-label="Admin Portal"
              >
                <Shield className="w-4 h-4 text-slate-700" />
              </button>

              {/* Primary Booking CTA */}
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-all whitespace-nowrap cursor-pointer hover:shadow"
                style={{
                  backgroundColor: config.primaryColorHex,
                  color: '#ffffff',
                }}
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Book Serial</span>
                <span className="sm:hidden">Book</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Full Page Slide-Over Side Navigation Drawer (Tablet & Mobile) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
          
          {/* Full Screen Dimmed Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-out Left Drawer Panel */}
          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <div className="w-screen max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col justify-between z-10 transition-transform duration-300 ease-in-out">
              
              {/* Drawer Top Header */}
              <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xs shrink-0"
                    style={{ backgroundColor: config.primaryColorHex }}
                  >
                    <svg
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C8.69 2 6 4.69 6 8c0 2.21 1.2 4.15 3 5.19V19c0 1.66 1.34 3 3 3s3-1.34 3-3v-5.81c1.8-1.04 3-2.98 3-5.19 0-3.31-2.69-6-6-6zm0 14c-1.1 0-2-.9-2-2v-2.34C10.63 11.88 11.3 12 12 12s1.37-.12 2-.34V14c0 1.1-.9 2-2 2zm4-8c0 .24-.03.48-.08.71-.58.37-1.24.63-1.92.77V7c0-.55-.45-1-1-1s-1 .45-1 1v2.48c-.68-.14-1.34-.4-1.92-.77C10.03 8.48 10 8.24 10 8c0-1.1.9-2 2-2s2 .9 2 2z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-slate-900 text-sm block truncate">
                      {config.clinicName}
                    </span>
                    <span className="text-[11px] text-slate-500 block truncate">
                      {config.doctorName}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
                  aria-label="Close Navigation"
                >
                  <X className="w-5 h-5 text-slate-700" />
                </button>
              </div>

              {/* Scrollable Navigation Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
                
                {/* Doctor BMDC Info & 1-Tap Dial */}
                <div
                  className="p-3.5 rounded-2xl space-y-2 border"
                  style={{
                    backgroundColor: `${config.primaryColorHex}12`,
                    borderColor: `${config.primaryColorHex}30`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: config.primaryColorHex }}
                    >
                      BMDC Registered
                    </span>
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: config.primaryColorHex }}
                    >
                      {config.currency} {config.consultationFeeBDT} Fee
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {config.degrees || 'Consultant Dental Surgeon & Specialist'}
                  </p>
                  <a
                    href={`tel:${config.primaryPhone.replace(/\s+/g, '')}`}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 text-white rounded-xl text-xs font-bold transition-all shadow-xs hover:brightness-110"
                    style={{ backgroundColor: config.primaryColorHex }}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Chamber ({config.primaryPhone})</span>
                  </a>
                </div>

                {/* Main Navigation Links */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 pb-1">
                    Explore Sections
                  </div>

                  <a
                    href="#services"
                    onClick={() => handleMobileNavClick()}
                    className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                        <Stethoscope className="w-4 h-4" />
                      </div>
                      <span>Services & Treatments</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </a>

                  <a
                    href="#our-work"
                    onClick={() => handleMobileNavClick()}
                    className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <span>Our Clinical Work</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </a>

                  <a
                    href="#doctor-chamber"
                    onClick={() => handleMobileNavClick()}
                    className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span>Chambers & Schedules</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </a>

                  <a
                    href="#testimonials"
                    onClick={() => handleMobileNavClick()}
                    className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                        <Clock className="w-4 h-4" />
                      </div>
                      <span>Patient Testimonials</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleMobileNavClick(onOpenTracking)}
                    className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                        <Search className="w-4 h-4" />
                      </div>
                      <span>Track Patient Serial</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Live
                    </span>
                  </button>
                </div>

                {/* Chamber Branch Quick Addresses */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
                    Available Branches
                  </div>
                  {config.chambers.map((ch) => (
                    <div key={ch.id} className="p-2.5 rounded-xl bg-slate-50 text-xs space-y-1">
                      <div className="font-bold text-slate-800 flex items-center justify-between">
                        <span>{ch.name}</span>
                        <span className="text-[10px] text-emerald-700 font-semibold">{ch.city}</span>
                      </div>
                      <div className="text-slate-500 text-[11px] leading-tight">{ch.address}</div>
                      <div className="text-[10px] text-slate-400 font-medium">🕒 {ch.visitingHours}</div>
                    </div>
                  ))}
                </div>

                {/* Quick Clinic Utilities */}
                <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleMobileNavClick(onOpenCustomizer)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Theme</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMobileNavClick(onOpenAdmin)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5 text-slate-700" />
                    <span>Admin PIN</span>
                  </button>
                </div>

              </div>

              {/* Bottom Sticky Action Area */}
              <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-2">
                <button
                  type="button"
                  onClick={() => handleMobileNavClick(onOpenBooking)}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-white shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer text-sm"
                  style={{ backgroundColor: config.primaryColorHex }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment Serial</span>
                </button>
                <p className="text-center text-[10px] text-slate-400">
                  Instant Serial & Token Slip Generation
                </p>
              </div>

            </div>
          </div>

        </div>
      )}
    </>
  );
};
