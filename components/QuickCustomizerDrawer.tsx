'use client';

import React, { useState } from 'react';
import { ChamberConfig, ThemePreset } from '@/types/dental';
import { THEME_CONFIGS } from '@/lib/dental-data';
import { X, Check, SlidersHorizontal, Palette, Sparkles, RefreshCw } from 'lucide-react';

interface QuickCustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: ChamberConfig;
  onUpdateConfig: (newConfig: ChamberConfig) => void;
}

export const QuickCustomizerDrawer: React.FC<QuickCustomizerDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
}) => {
  if (!isOpen) return null;

  const handleThemeChange = (themePreset: ThemePreset) => {
    const preset = THEME_CONFIGS[themePreset];
    onUpdateConfig({
      ...config,
      themePreset,
      primaryColorHex: preset.primaryHex,
    });
  };

  const handleNameChange = (name: string) => {
    onUpdateConfig({
      ...config,
      clinicName: name,
    });
  };

  const handleDoctorChange = (doctor: string) => {
    onUpdateConfig({
      ...config,
      doctorName: doctor,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-emerald-700" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Quick Chamber Customizer
              </h3>
              <p className="text-[11px] text-slate-500">
                Switch themes or customize details for other chambers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto text-xs">
          
          {/* Quick preset colors */}
          <div>
            <label className="block font-bold text-slate-800 uppercase tracking-wider mb-2">
              Chamber Color Palette
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {(Object.keys(THEME_CONFIGS) as ThemePreset[]).map((key) => {
                const item = THEME_CONFIGS[key];
                const active = config.themePreset === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleThemeChange(key)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? 'border-slate-900 ring-2 ring-slate-900/10 bg-slate-50 font-semibold'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-md shrink-0 shadow-xs"
                      style={{ backgroundColor: item.primaryHex }}
                    />
                    <div className="truncate text-slate-800 capitalize">
                      {key}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Hex Color */}
          <div>
            <label className="block font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Custom Primary Color Hex
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.primaryColorHex}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    primaryColorHex: e.target.value,
                  })
                }
                className="w-10 h-10 rounded-lg cursor-pointer border border-slate-200 p-0.5"
              />
              <input
                type="text"
                value={config.primaryColorHex}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    primaryColorHex: e.target.value,
                  })
                }
                className="flex-1 px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Quick Clinic & Doctor Names */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Clinic Name
              </label>
              <input
                type="text"
                value={config.clinicName}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Doctor Name & Degrees
              </label>
              <input
                type="text"
                value={config.doctorName}
                onChange={(e) => handleDoctorChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                BMDC Registration
              </label>
              <input
                type="text"
                value={config.bmdcReg}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    bmdcReg: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Helpline Phone
              </label>
              <input
                type="text"
                value={config.primaryPhone}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    primaryPhone: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-100 rounded-xl text-slate-600 text-[11px] leading-relaxed">
            💡 Changes apply in real-time and persist in your browser&apos;s local storage. Full chamber management, service editing, and JSON export/import are available in the <strong>Admin Portal</strong>.
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Real-time preview enabled
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
