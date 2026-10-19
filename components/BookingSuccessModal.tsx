'use client';

import React, { useState } from 'react';
import { Appointment, ChamberConfig } from '@/types/dental';
import { CheckCircle2, Copy, Check, Printer, X, Calendar, MapPin, Clock } from 'lucide-react';

interface BookingSuccessModalProps {
  appointment: Appointment | null;
  onClose: () => void;
  config: ChamberConfig;
  onTrackClick: (id: string) => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  appointment,
  onClose,
  config,
  onTrackClick,
}) => {
  const [copied, setCopied] = useState(false);

  if (!appointment) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(appointment.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 sm:p-8 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Appointment Booked!
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Your appointment has been registered at {config.clinicName}. Please save your Serial Number & Tracking ID.
          </p>
        </div>

        {/* Serial Card */}
        <div className="my-6 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
          <div className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
            YOUR CHAMBER SERIAL NUMBER
          </div>
          <div className="text-4xl font-extrabold text-slate-900 tabular-nums my-1">
            #{appointment.serialNumber}
          </div>
          <div className="text-xs text-slate-600">
            Estimated Slot: <strong className="text-slate-900">{appointment.timeSlot}</strong>
          </div>
        </div>

        {/* Details snippet */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2.5 text-xs text-slate-700">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-400">Tracking ID:</span>
            <div className="flex items-center gap-1.5 font-mono font-bold text-slate-900">
              <span>{appointment.id}</span>
              <button
                onClick={handleCopy}
                title="Copy Tracking ID"
                className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-800 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Patient:</span>
            <span className="font-semibold text-slate-900">{appointment.patientName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Chamber:</span>
            <span className="font-semibold text-slate-900">{appointment.chamberName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Date & Service:</span>
            <span className="font-semibold text-slate-900">{appointment.date} · {appointment.serviceName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Pay at chamber:</span>
            <span className="font-bold text-emerald-800">{config.currency}{appointment.feeBDT}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => {
              onTrackClick(appointment.id);
              onClose();
            }}
            className="flex-1 py-2.5 px-4 text-xs font-semibold rounded-xl text-white shadow-sm hover:shadow transition-all text-center cursor-pointer"
            style={{ backgroundColor: config.primaryColorHex }}
          >
            Open Live Serial Tracker
          </button>

          <button
            onClick={() => window.print()}
            className="py-2.5 px-4 text-xs font-semibold rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>

      </div>
    </div>
  );
};
