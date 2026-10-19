'use client';

import React from 'react';
import { DentalService, ChamberConfig } from '@/types/dental';
import { Sparkles, Shield, Clock, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  services: DentalService[];
  config: ChamberConfig;
  onSelectService: (service: DentalService) => void;
}

// Custom crisp dental SVG icons matching the reference image style
const ServiceIcon: React.FC<{ iconKey: string; colorHex: string }> = ({ iconKey, colorHex }) => {
  switch (iconKey) {
    case 'tooth': // General dentistry
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={colorHex} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.5 2 6 4.5 6 8c0 3 1.5 5 2.5 7.5.8 2 1 4.5 1.5 6.5.3 1 1.5 1 2 0 .5-1.5 1-3 2-3s1.5 1.5 2 3c.5 1 1.7 1 2 0 .5-2 .7-4.5 1.5-6.5C20.5 13 22 11 22 8c0-3.5-2.5-6-6-6h-4z" />
          <path d="M9 7c1-1 3-1 4 0" />
        </svg>
      );
    case 'braces': // Orthodontics
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={colorHex} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="9" width="4" height="6" rx="1" />
          <rect x="10" y="9" width="4" height="6" rx="1" />
          <rect x="17" y="9" width="4" height="6" rx="1" />
          <path d="M1 12h22" />
        </svg>
      );
    case 'implant': // Dental implants
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={colorHex} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3h6v4H9z" />
          <path d="M8 7h8v3a4 4 0 0 1-8 0V7z" />
          <path d="M10 14h4" />
          <path d="M11 17h2" />
          <path d="M12 20v2" />
        </svg>
      );
    case 'sparkles': // Cosmetic
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={colorHex} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.5 2 6 4.5 6 8c0 3 1.5 5 2.5 7.5.8 2 1 4.5 1.5 6.5.3 1 1.5 1 2 0 .5-1.5 1-3 2-3s1.5 1.5 2 3c.5 1 1.7 1 2 0 .5-2 .7-4.5 1.5-6.5C20.5 13 22 11 22 8c0-3.5-2.5-6-6-6h-4z" />
          <path d="M18 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
        </svg>
      );
    case 'baby': // Pediatric
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={colorHex} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M8 13c1 1.5 3 2 4 2s3-.5 4-2" />
          <circle cx="9" cy="9" r="1" fill={colorHex} />
          <circle cx="15" cy="9" r="1" fill={colorHex} />
          <path d="M12 3a4 4 0 0 0-4 4" />
        </svg>
      );
    case 'shield': // Emergency
    default:
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={colorHex} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      );
  }
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  config,
  onSelectService,
}) => {
  return (
    <section id="services" className="py-16 lg:py-24 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-emerald-800 mb-1">
              COMPREHENSIVE ORAL HEALTHCARE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Our Dental Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-xl">
              From routine scaling and preventive hygiene to complex aesthetic smile makeovers and dental implants.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            <span>All instruments sterilized via Class-B Autoclave</span>
          </div>
        </div>

        {/* Services Grid (6 cards with gradients and 3D hover) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const gradients = [
              'from-white via-white to-emerald-50/50 hover:to-emerald-100/40',
              'from-white via-white to-teal-50/50 hover:to-teal-100/40',
              'from-white via-white to-cyan-50/50 hover:to-cyan-100/40',
              'from-white via-white to-blue-50/50 hover:to-blue-100/40',
              'from-white via-white to-emerald-50/60 hover:to-emerald-100/50',
              'from-white via-white to-rose-50/40 hover:to-rose-100/40',
            ];
            const cardGradient = gradients[index % gradients.length];

            return (
              <div
                key={service.id}
                className={`group relative bg-gradient-to-b ${cardGradient} rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  {/* Icon box with gradient container matching reference image */}
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 shadow-xs bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-cyan-500/15 border border-emerald-200/40"
                  >
                    <ServiceIcon iconKey={service.iconKey} colorHex={config.primaryColorHex} />
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {service.name}
                    </h3>
                    {service.popular && (
                      <span className="text-[11px] font-bold text-emerald-800 bg-gradient-to-r from-emerald-100 to-teal-100 px-2.5 py-0.5 rounded-full border border-emerald-300/60 shadow-2xs">
                        Popular
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    {service.bengaliName}
                  </p>

                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-200/60 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">Starting from</div>
                    <div className="text-base font-bold text-slate-900 tabular-nums">
                      {config.currency}{service.startingPrice.toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectService(service)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-xs hover:shadow-md transform hover:-translate-y-0.5"
                    style={{
                      color: '#ffffff',
                      backgroundColor: config.primaryColorHex,
                    }}
                  >
                    <span>Book Slot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
