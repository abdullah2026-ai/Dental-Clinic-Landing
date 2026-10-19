'use client';

import React from 'react';
import { ChamberConfig } from '@/types/dental';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';

interface FooterProps {
  config: ChamberConfig;
  onOpenAdmin: () => void;
  onOpenTracking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenAdmin,
  onOpenTracking,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: config.primaryColorHex }}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C8.69 2 6 4.69 6 8c0 2.21 1.2 4.15 3 5.19V19c0 1.66 1.34 3 3 3s3-1.34 3-3v-5.81c1.8-1.04 3-2.98 3-5.19 0-3.31-2.69-6-6-6zm0 14c-1.1 0-2-.9-2-2v-2.34C10.63 11.88 11.3 12 12 12s1.37-.12 2-.34V14c0 1.1-.9 2-2 2zm4-8c0 .24-.03.48-.08.71-.58.37-1.24.63-1.92.77V7c0-.55-.45-1-1-1s-1 .45-1 1v2.48c-.68-.14-1.34-.4-1.92-.77C10.03 8.48 10 8.24 10 8c0-1.1.9-2 2-2s2 .9 2 2z"/>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {config.clinicName}
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {config.tagline}. Dedicated to ethical, gentle, and international-standard dental surgery and aesthetics in Bangladesh.
            </p>

            <div className="text-xs font-medium" style={{ color: config.primaryColorHex }}>
              {config.doctorName} · {config.bmdcReg}
            </div>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>Hotline: {config.primaryPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{config.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Dental Services & Fees
                </a>
              </li>
              <li>
                <a href="#our-work" className="hover:text-white transition-colors">
                  Our Work & Clinical Cases
                </a>
              </li>
              <li>
                <a href="#doctor-chamber" className="hover:text-white transition-colors">
                  Chamber Visiting Schedule
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">
                  Patient Reviews & Stories
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Track My Serial Number
                </button>
              </li>
            </ul>
          </div>

          {/* Chambers in Bangladesh */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Chambers & Visiting Hours
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              {config.chambers.map((c) => (
                <div
                  key={c.id}
                  className="border-l-2 pl-3 space-y-0.5"
                  style={{ borderColor: config.primaryColorHex }}
                >
                  <div className="font-semibold text-slate-200">
                    {c.name} ({c.city})
                  </div>
                  <div className="text-[11px] text-slate-400">{c.address}</div>
                  <div
                    className="text-[11px] font-mono"
                    style={{ color: config.primaryColorHex }}
                  >
                    {c.visitingDays} · {c.visitingHours}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div suppressHydrationWarning>
            © {new Date().getFullYear()} {config.clinicName}. Bangladesh Medical & Dental Council (BMDC) registered chamber practice.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenTracking}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Serial Tracking
            </button>
            <span>·</span>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" style={{ color: config.primaryColorHex }} />
              <span>Admin System</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
