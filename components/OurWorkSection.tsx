'use client';

import React, { useState } from 'react';
import { DentalWorkCase, ChamberConfig } from '@/types/dental';
import { Check, Sparkles, Clock, Calendar, ArrowUpRight } from 'lucide-react';

interface OurWorkSectionProps {
  works: DentalWorkCase[];
  config: ChamberConfig;
  onBookConsultation: () => void;
}

export const OurWorkSection: React.FC<OurWorkSectionProps> = ({
  works,
  config,
  onBookConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCase, setActiveCase] = useState<DentalWorkCase | null>(null);

  const categories = ['All', 'Cosmetic', 'Orthodontics', 'Chamber Environment'];

  const filteredWorks =
    selectedCategory === 'All'
      ? works
      : works.filter((w) => w.category === selectedCategory);

  return (
    <section id="our-work" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div
              className="text-xs font-semibold tracking-wider uppercase mb-1"
              style={{ color: config.primaryColorHex }}
            >
              CLINICAL EXCELLENCE & RESULTS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Our Work & Clinical Cases
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
              Real results accomplished at our chambers. Precision cosmetic dentistry, orthodontic smile alignment, and strict sterilization standards.
            </p>
          </div>

          {/* Interactive filter tabs (functional buttons with click handlers) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Works Grid with gradients and 3D hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorks.map((item, index) => {
            const cardGradients = [
              'from-white via-white to-emerald-50/50 hover:to-emerald-100/40',
              'from-white via-white to-teal-50/50 hover:to-teal-100/40',
              'from-white via-white to-cyan-50/50 hover:to-cyan-100/40',
            ];
            const gradient = cardGradients[index % cardGradients.length];

            return (
              <div
                key={item.id}
                className={`group bg-gradient-to-b ${gradient} rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col`}
              >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-800 shadow-sm">
                  {item.category}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    {item.bengaliTitle}
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {item.beforeAfterDescription}
                  </p>
                </div>

                {/* Details Breakdown */}
                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" style={{ color: config.primaryColorHex }} />
                      <span>Duration:</span>
                    </span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      {item.treatmentDuration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" style={{ color: config.primaryColorHex }} />
                      <span>Est. Treatment Cost:</span>
                    </span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      {config.currency}{item.approxCostBDT.toLocaleString()}
                    </span>
                  </div>

                  {item.doctorNotes && (
                    <div
                      className="p-2.5 rounded-lg text-[11px] leading-relaxed border"
                      style={{
                        backgroundColor: `${config.primaryColorHex}0d`,
                        borderColor: `${config.primaryColorHex}20`,
                        color: '#1e293b',
                      }}
                    >
                      <strong style={{ color: config.primaryColorHex }}>Doctor Note:</strong> {item.doctorNotes}
                    </div>
                  )}

                  <div className="text-[11px] text-slate-400 pt-1">
                    Patient Profile: {item.patientAgeGender}
                  </div>
                </div>

                {/* Card Action */}
                <button
                  onClick={onBookConsultation}
                  className="w-full mt-2 py-2 px-3 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Book Case Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            );
          })}
        </div>

        {/* Sub-banner: Modern Care, Kinder Approach matching image.png */}
        <div
          className="mt-16 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 border"
          style={{
            backgroundColor: `${config.primaryColorHex}08`,
            borderColor: `${config.primaryColorHex}20`,
          }}
        >
          <div className="space-y-3 max-w-xl">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: config.primaryColorHex }}
            >
              A CALMER DENTAL EXPERIENCE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Modern Care. A Kinder Approach.
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We combine advanced German & Japanese dental technology with gentle, patient-first care to make every visit relaxed and pain-free. Book online to reserve your serial number today.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={onBookConsultation}
              className="px-6 py-3 text-sm font-semibold text-white rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
              style={{ backgroundColor: config.primaryColorHex }}
            >
              Book Serial Number →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
