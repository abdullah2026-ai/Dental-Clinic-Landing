'use client';

import React, { useState, useEffect } from 'react';
import { ChamberConfig, DentalService, ChamberLocation } from '@/types/dental';
import { X, Calendar, Clock, Phone, User, CheckCircle2, ShieldCheck } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ChamberConfig;
  services: DentalService[];
  chambers: ChamberLocation[];
  initialServiceId?: string;
  initialChamberId?: string;
  onBookingSubmit: (data: {
    patientName: string;
    phone: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    chamberId: string;
    serviceId: string;
    date: string;
    timeSlot: string;
    notes?: string;
  }) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  config,
  services,
  chambers,
  initialServiceId,
  initialChamberId,
  onBookingSubmit,
}) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState<number>(28);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [chamberId, setChamberId] = useState(initialChamberId || chambers[0]?.id || '');
  const [serviceId, setServiceId] = useState(initialServiceId || services[0]?.id || '');
  const [date, setDate] = useState('2026-10-20');
  const [timeSlot, setTimeSlot] = useState('05:30 PM');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // If initialServiceId or initialChamberId are provided, the parent passes key to reset or we use state

  if (!isOpen) return null;

  const currentChamber = chambers.find((c) => c.id === chamberId) || chambers[0];
  const availableSlots = currentChamber?.timeSlots || ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setErrorMsg('Please enter patient full name');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setErrorMsg('Please provide a valid Bangladeshi phone number (e.g. 01711234567)');
      return;
    }
    setErrorMsg('');

    onBookingSubmit({
      patientName: patientName.trim(),
      phone: phone.trim(),
      age: Number(age) || 28,
      gender,
      chamberId,
      serviceId,
      date,
      timeSlot,
      notes: notes.trim(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: config.primaryColorHex }}
            >
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Book Chamber Appointment
              </h3>
              <p className="text-[11px] text-slate-500">
                {config.doctorName} · {config.bmdcReg}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {errorMsg && (
            <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
              {errorMsg}
            </div>
          )}

          {/* Patient name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Patient Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Abdullah Ibne Ali"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Number (BD) *
              </label>
              <input
                type="tel"
                required
                placeholder="01711-234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Age & Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Age
              </label>
              <input
                type="number"
                min={1}
                max={120}
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 28)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Chamber selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Chamber Location *
            </label>
            <select
              value={chamberId}
              onChange={(e) => {
                setChamberId(e.target.value);
                const c = chambers.find((ch) => ch.id === e.target.value);
                if (c && c.timeSlots.length > 0) setTimeSlot(c.timeSlots[0]);
              }}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {chambers.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {ch.name} ({ch.city}) - {ch.visitingHours}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400 mt-1">
              Address: {currentChamber?.address}
            </p>
          </div>

          {/* Service & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Treatment Service *
              </label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({config.currency}{s.startingPrice})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Appointment Date *
              </label>
              <input
                type="date"
                required
                suppressHydrationWarning
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Available Time Slot
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {availableSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setTimeSlot(slot)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
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

          {/* Problem description / notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Dental Problem / Symptoms (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Tooth sensitivity, chipped tooth, want scaling or braces..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <div className="text-[11px] text-slate-500">
              Pay at chamber · Consultation {config.currency}{config.consultationFeeBDT}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-bold rounded-xl text-white shadow-sm hover:shadow transition-all cursor-pointer"
                style={{ backgroundColor: config.primaryColorHex }}
              >
                Confirm Booking & Serial
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
