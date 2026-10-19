'use client';

import React from 'react';
import { Smile, Star, Award, Heart } from 'lucide-react';
import { ChamberConfig } from '@/types/dental';

interface StatsBarProps {
  config: ChamberConfig;
}

export const StatsBar: React.FC<StatsBarProps> = ({ config }) => {
  const stats = [
    {
      icon: Smile,
      value: '5,000+',
      label: 'Happy Patients in Bangladesh',
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'Average Patient Satisfaction',
    },
    {
      icon: Award,
      value: '10+ Years',
      label: 'Of Specialized Dental Care',
    },
    {
      icon: Heart,
      value: 'Healthy Smiles',
      label: 'Lifelong Oral Health Guidance',
    },
  ];

  return (
    <section className="bg-white border-y border-slate-200/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${config.primaryColorHex}15`,
                    color: config.primaryColorHex,
                  }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                    {item.value}
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-tight">
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
