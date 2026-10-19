'use client';

import React, { useState } from 'react';
import { Appointment, ChamberConfig } from '@/types/dental';
import { Search, Calendar, Clock, MapPin, CheckCircle2, AlertCircle, Printer, XCircle, Clock4 } from 'lucide-react';

interface TrackingSectionProps {
  appointments: Appointment[];
  config: ChamberConfig;
  onNewBookingClick: () => void;
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({
  appointments,
  config,
  onNewBookingClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundAppointment, setFoundAppointment] = useState<Appointment | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toLowerCase();
    // Match either by ID (case-insensitive) or phone number (digits)
    const match = appointments.find((a) => {
      const matchId = a.id.toLowerCase() === query;
      const cleanPhone = a.phone.replace(/[^0-9]/g, '');
      const cleanQuery = query.replace(/[^0-9]/g, '');
      const matchPhone = cleanQuery.length >= 6 && cleanPhone.includes(cleanQuery);
      return matchId || matchPhone;
    });

    setFoundAppointment(match || null);
    setSearched(true);
  };

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Serial Confirmed</span>
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            <Clock4 className="w-3.5 h-3.5 text-amber-600" />
            <span>Pending Chamber Confirmation</span>
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Consultation Completed</span>
          </span>
        );
      case 'Cancelled':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Cancelled / Rescheduled</span>
          </span>
        );
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="tracking" className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-center mb-10">
          <div className="text-xs font-semibold tracking-wider uppercase text-emerald-800 mb-1">
            PATIENT SERIAL STATUS & RECORD
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Track Chamber Booking & Serial
          </h2>
          <p className="text-slate-600 text-sm mt-1.5 max-w-lg mx-auto">
            Enter your Booking Tracking ID (e.g. <span className="font-mono font-semibold text-emerald-700">BD-8492</span>) or patient mobile number to check serial status.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto mb-10">
          <div className="relative flex-1">
            <input
              type="text"
              required
              placeholder="Enter Booking ID (e.g. BD-8492) or Phone Number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          </div>

          <button
            type="submit"
            className="px-6 py-3 text-sm font-semibold rounded-xl text-white shadow-sm hover:shadow transition-all shrink-0 cursor-pointer"
            style={{ backgroundColor: config.primaryColorHex }}
          >
            Track Status
          </button>
        </form>

        {/* Demo IDs Quick Helper */}
        <div className="text-center -mt-6 mb-8 text-xs text-slate-400">
          <span>Try quick demo IDs: </span>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('BD-8492');
              const match = appointments.find((a) => a.id === 'BD-8492');
              setFoundAppointment(match || null);
              setSearched(true);
            }}
            className="text-emerald-700 font-medium hover:underline underline-offset-2 mx-1"
          >
            BD-8492
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('BD-8493');
              const match = appointments.find((a) => a.id === 'BD-8493');
              setFoundAppointment(match || null);
              setSearched(true);
            }}
            className="text-emerald-700 font-medium hover:underline underline-offset-2 mx-1"
          >
            BD-8493
          </button>
        </div>

        {/* Search Result Card */}
        {searched && (
          <div>
            {foundAppointment ? (
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Tracking Number</div>
                    <div className="text-2xl font-bold font-mono tracking-tight text-slate-900">
                      {foundAppointment.id}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(foundAppointment.status)}
                    <button
                      onClick={handlePrint}
                      title="Print Slip"
                      className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Serial Spotlight */}
                <div className="my-6 p-4 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-semibold">
                      Chamber Serial Number (সিরিয়াল নম্বর)
                    </div>
                    <div className="text-3xl font-extrabold text-slate-900 tabular-nums mt-0.5">
                      #{foundAppointment.serialNumber}
                    </div>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <div>Please report to receptionist</div>
                    <div className="text-emerald-700 font-semibold mt-0.5">15 minutes prior to slot</div>
                  </div>
                </div>

                {/* Grid details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Patient Details</span>
                    <div className="font-semibold text-slate-900 text-sm">
                      {foundAppointment.patientName} ({foundAppointment.age} Y, {foundAppointment.gender})
                    </div>
                    <div className="text-slate-500 font-mono">{foundAppointment.phone}</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Chamber Location</span>
                    <div className="font-semibold text-slate-900 text-sm">
                      {foundAppointment.chamberName}
                    </div>
                    <div className="text-slate-500">{config.doctorName} ({config.bmdcReg})</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Date & Time Slot</span>
                    <div className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{foundAppointment.date}</span>
                      <span className="text-slate-400">·</span>
                      <Clock className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{foundAppointment.timeSlot}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Service & Fee</span>
                    <div className="font-semibold text-slate-900 text-sm">
                      {foundAppointment.serviceName}
                    </div>
                    <div className="text-emerald-700 font-bold tabular-nums">
                      Pay at chamber: {config.currency}{foundAppointment.feeBDT.toLocaleString()}
                    </div>
                  </div>
                </div>

                {foundAppointment.notes && (
                  <div className="mt-5 p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-600">
                    <strong className="text-slate-800">Problem Description / Notes:</strong> {foundAppointment.notes}
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                  <span>For urgent rescheduling, call chamber hotline: <strong className="text-slate-800">{config.primaryPhone}</strong></span>
                </div>

              </div>
            ) : (
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 text-center space-y-4">
                <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    No Appointment Found
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    We could not find an appointment matching &ldquo;{searchQuery}&rdquo;. Please verify the Booking ID or phone number.
                  </p>
                </div>
                <button
                  onClick={onNewBookingClick}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-white shadow-sm transition-all cursor-pointer"
                  style={{ backgroundColor: config.primaryColorHex }}
                >
                  Book New Appointment
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
