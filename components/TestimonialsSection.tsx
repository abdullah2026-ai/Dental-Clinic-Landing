'use client';

import React, { useState } from 'react';
import { Testimonial, ChamberConfig } from '@/types/dental';
import { Star, CheckCircle, MessageSquarePlus, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  config: ChamberConfig;
  onAddTestimonial: (t: Omit<Testimonial, 'id' | 'date' | 'verified'>) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  config,
  onAddTestimonial,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [treatment, setTreatment] = useState('General Consultation & Scaling');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    onAddTestimonial({
      patientName: name.trim(),
      location: location.trim() || 'Dhaka, Bangladesh',
      treatment,
      rating,
      comment: comment.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setLocation('');
      setComment('');
      setShowForm(false);
      setSubmitted(false);
    }, 1500);
  };

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div
              className="text-xs font-semibold tracking-wider uppercase mb-1"
              style={{ color: config.primaryColorHex }}
            >
              PATIENT REVIEWS & STORIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Trusted by 5,000+ Happy Patients
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-xl">
              Real testimonials from patients treated at our Dhanmondi, Banani, and Chattogram dental chambers.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-sm transition-all self-start md:self-auto cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" style={{ color: config.primaryColorHex }} />
            <span>{showForm ? 'Close Review Form' : 'Write Patient Review'}</span>
          </button>
        </div>

        {/* Add Review Form Dropdown */}
        {showForm && (
          <div className="mb-12 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md max-w-2xl mx-auto transition-all">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Share Your Dental Chamber Experience
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Your feedback helps future patients choose quality oral healthcare in Bangladesh.
            </p>

            {submitted ? (
              <div
                className="p-4 rounded-xl text-center text-xs font-semibold flex items-center justify-center gap-2 border"
                style={{
                  backgroundColor: `${config.primaryColorHex}12`,
                  borderColor: `${config.primaryColorHex}30`,
                  color: config.primaryColorHex,
                }}
              >
                <CheckCircle className="w-4 h-4" style={{ color: config.primaryColorHex }} />
                <span>Thank you! Your testimonial has been saved to local chamber records.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanzim Ahmed"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Location / Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dhanmondi, Dhaka"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Treatment Received
                    </label>
                    <select
                      value={treatment}
                      onChange={(e) => setTreatment(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                      <option value="General Consultation & Scaling">General Consultation & Scaling</option>
                      <option value="Ceramic Braces & Orthodontics">Ceramic Braces & Orthodontics</option>
                      <option value="Porcelain Veneers & Smile Makeover">Porcelain Veneers & Smile Makeover</option>
                      <option value="Root Canal Treatment (RCT)">Root Canal Treatment (RCT)</option>
                      <option value="Dental Titanium Implant">Dental Titanium Implant</option>
                      <option value="Pediatric Dental Care">Pediatric Dental Care</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Rating (Stars)
                    </label>
                    <div className="flex items-center gap-1.5 pt-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-slate-500 ml-2 font-semibold">
                        {rating} / 5
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Your Testimonial Review
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe the treatment, doctor care, chamber cleanliness, and results..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold rounded-lg text-white shadow-sm"
                    style={{ backgroundColor: config.primaryColorHex }}
                  >
                    Post Testimonial
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Testimonials Grid (matching image.png quote cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <Quote className="w-7 h-7 text-emerald-600/30" />

                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < t.rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">
                    {t.patientName}
                  </h4>
                  {t.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {t.treatment} · {t.location}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
