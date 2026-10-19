'use client';

import React from 'react';
import { ChamberConfig, ChamberLocation } from '@/types/dental';
import { MapPin, Clock, Phone, Calendar, CheckCircle2, UserCheck } from 'lucide-react';

interface DoctorChamberSectionProps {
  config: ChamberConfig;
  chambers: ChamberLocation[];
  onSelectChamberToBook: (chamberId: string) => void;
}

export const DoctorChamberSection: React.FC<DoctorChamberSectionProps> = ({
  config,
  chambers,
  onSelectChamberToBook,
}) => {
  return (
    <section id="doctor-chamber" className="py-16 lg:py-24 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Doctor Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-12">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Doctor Photo */}
            <div
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border-2 shadow-sm"
              style={{ borderColor: `${config.primaryColorHex}30` }}
            >
              <img
                src={config.heroImage}
                alt={config.doctorName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Doctor Details */}
            <div className="flex-1 text-center lg:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-md"
                  style={{
                    backgroundColor: `${config.primaryColorHex}15`,
                    color: config.primaryColorHex,
                  }}
                >
                  {config.bmdcReg}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  BMDC Verified Registered Dental Surgeon
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {config.doctorName}
              </h2>

              <p className="text-sm font-semibold" style={{ color: config.primaryColorHex }}>
                {config.doctorTitle}
              </p>

              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                {config.degrees}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" style={{ color: config.primaryColorHex }} />
                  <span>10+ Yrs Clinical Experience</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4" style={{ color: config.primaryColorHex }} />
                  <span>Helpline: {config.primaryPhone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900">
                    Consultation Fee: {config.currency}{config.consultationFeeBDT}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-8">
          <div
            className="text-xs font-semibold tracking-wider uppercase mb-1"
            style={{ color: config.primaryColorHex }}
          >
            CHAMBER SCHEDULE & LOCATIONS
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Available Visiting Chambers
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Book your serial number in advance. Serial numbers are called sequentially at the chamber.
          </p>
        </div>

        {/* Chambers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {chambers.map((chamber) => (
            <div
              key={chamber.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      {chamber.name}
                    </h4>
                    <span className="text-xs font-semibold" style={{ color: config.primaryColorHex }}>
                      {chamber.city} · {chamber.area}
                    </span>
                  </div>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${config.primaryColorHex}15`,
                      color: config.primaryColorHex,
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <span>{chamber.address}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <span className="font-medium text-slate-800">{chamber.visitingDays}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <span>{chamber.visitingHours}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <span>{chamber.phone}</span>
                  </div>
                </div>

                {/* Available Slots Preview */}
                <div>
                  <span className="text-[11px] font-medium text-slate-400 block mb-1.5">
                    Available Slots Today:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {chamber.timeSlots.slice(0, 4).map((slot) => (
                      <span
                        key={slot}
                        className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-mono"
                      >
                        {slot}
                      </span>
                    ))}
                    {chamber.timeSlots.length > 4 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{chamber.timeSlots.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Short Interactive Map Preview - Click to open Google Maps */}
                <div className="pt-2">
                  <a
                    href={
                      chamber.googleMapsUrl ||
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        chamber.address
                      )}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/map relative block h-24 rounded-xl overflow-hidden border transition-all shadow-xs hover:shadow-md"
                    style={{
                      borderColor: `${config.primaryColorHex}30`,
                      backgroundColor: `${config.primaryColorHex}08`,
                    }}
                  >
                    {/* Stylized schematic map background */}
                    <div
                      className="absolute inset-0 opacity-30 [background-size:12px_12px]"
                      style={{
                        backgroundImage: `radial-gradient(${config.primaryColorHex} 1px, transparent 1px)`,
                      }}
                    />
                    <svg
                      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none stroke-slate-500"
                      viewBox="0 0 300 100"
                      fill="none"
                    >
                      <path d="M0 30h300M0 70h300M80 0v100M180 0v100M240 0v100" strokeWidth="1.5" />
                      <circle cx="140" cy="50" r="16" fill={config.primaryColorHex} fillOpacity="0.25" />
                    </svg>

                    {/* Center Animated Location Pin */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center bg-white/75 backdrop-blur-[2px] group-hover/map:bg-white/50 transition-colors">
                      <div
                        className="w-7 h-7 rounded-full text-white flex items-center justify-center shadow-md transform group-hover/map:scale-110 transition-transform"
                        style={{ backgroundColor: config.primaryColorHex }}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div
                        className="text-[11px] font-bold mt-1 flex items-center gap-1 transition-colors"
                        style={{ color: config.primaryColorHex }}
                      >
                        <span>Click to Open Google Maps</span>
                        <span className="text-[10px]">↗</span>
                      </div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[220px]">
                        {chamber.area}, {chamber.city}
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => onSelectChamberToBook(chamber.id)}
                  className="w-full py-2.5 px-3 text-xs font-semibold rounded-xl text-white shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  style={{ backgroundColor: config.primaryColorHex }}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Serial at this Chamber</span>
                </button>

                <a
                  href={
                    chamber.googleMapsUrl ||
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      chamber.address
                    )}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" style={{ color: config.primaryColorHex }} />
                  <span>Get Live Directions on Google Maps</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
