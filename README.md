# 🦷 SmileCraft Dental Chamber & Patient Booking Portal

A modern, production-grade dental clinic landing page, patient serial booking system, real-time tracking portal, and comprehensive admin dashboard specifically tailored for dental surgeons and multi-chamber practices in Bangladesh (Dhaka, Dhanmondi, Banani, Uttara, Chattogram).

---

## 📋 Table of Contents
1. [Project Overview](#-1-project-overview)
2. [Key Features](#-2-key-features)
3. [Pre-Configured Google Sheets Webhook](#-3-pre-configured-google-sheets-webhook)
4. [Technology Stack](#-4-technology-stack)
5. [Quick Start & Local Setup](#-5-quick-start--local-setup)
6. [Admin Dashboard & Clinic Controls](#-6-admin-dashboard--clinic-controls)
7. [Project Structure & File Map](#-7-project-structure--file-map)
8. [Business Logic & Architecture](#-8-business-logic--architecture)
9. [Deployment](#-9-deployment)

---

## 🌟 1. Project Overview

**SmileCraft Dental Chamber & Patient Booking Portal** provides an all-in-one digital solution for dental clinics and surgeons across Bangladesh. It replaces manual paper logbooks with an automated, responsive web application that offers:

- **Instant Serial Number Generation**: Automatically calculates sequential serial numbers (`#1`, `#2`, `#3`...) per chamber branch for each date.
- **Self-Service Appointment Tracking**: Patients can check their assigned serial number, queue status, date, and time slot using their Booking Tracking ID (e.g. `BD-8492`) or mobile number.
- **Zero-Friction Cloud Storage**: Form submissions are stored locally in the browser and automatically forwarded in real-time to your connected **Google Sheet**.
- **Multi-Chamber Branch Management**: Seamlessly manages multiple chamber branches (e.g., Dhanmondi Evening Chamber, Banani Aesthetic Lounge, Chattogram Port City Chamber) with direct Google Maps navigation links.
- **White-Label Customization**: Update doctor name, BMDC registration number, consultation fees (BDT `৳`), chamber schedules, and color branding on the fly.

---

## 🚀 2. Key Features

### For Patients:
- 📅 **Online Serial Booking**: Choose clinic branch, treatment service, visiting date, and available time slot.
- 🎟️ **Instant Digital Token Slip**: Displays assigned serial number, patient details, clinic address, and contact numbers (printable).
- 🔍 **Live Serial & Status Tracker**: Track booking approval status (`Pending`, `Confirmed`, `Completed`, `Cancelled`) without calling the front desk.
- 🗺️ **One-Click Directions**: Direct Google Maps links for each chamber location.
- ⭐ **Patient Reviews**: Read verified testimonials and submit new patient feedback.

### For Doctors & Clinic Staff:
- 🛡️ **Secure Admin Dashboard**: PIN-protected (`1234` default, with 1-click test login).
- 📊 **Real-time KPI Overview**: Live counter for today's bookings, pending approvals, completed visits, and revenue summary in BDT (`৳`).
- 🔄 **Real-Time Google Sheets Sync**: New patient bookings are instantly appended to your Google Spreadsheet.
- 📥 **CSV Export**: Export all records to standard `.csv` for Excel or clinic records.
- 🎨 **6 Theme Color Presets**: Switch between Mint Emerald, Teal, Cyan, Blue, Purple, and Rose, or enter a custom HEX.
- 💾 **Config Backup (JSON)**: Export or import clinic settings with one click.

---

## 📊 3. Pre-Configured Google Sheets Webhook

Your Google Apps Script Web App is connected in `lib/dental-data.ts`:

- **Deployment Name**: `Doctor Appointment`
- **Deployment ID**: `AKfycbz_SH63OravpxO-Wxce4smZeHXlEXrX2vLaf4paix5LcDi33Bf2d-O1Vk-P9y7yYNVb-g`
- **Webhook Endpoint**: `https://script.google.com/macros/s/AKfycbz_SH63OravpxO-Wxce4smZeHXlEXrX2vLaf4paix5LcDi33Bf2d-O1Vk-P9y7yYNVb-g/exec`
- **Library URL**: `https://script.google.com/macros/library/d/1ov8vjAjWqQA0594tmg_xMfTYgprFUDfm_omWvfLDqvbvlUYOnMzwL177/1`
- **Auto-Sync**: `Enabled` by default

Whenever a patient books an appointment, the system automatically posts the booking payload (Timestamp, Tracking ID, Serial #, Patient Name, Phone, Age, Gender, Chamber, Service, Date, Time Slot, Status, Fee BDT, and Notes) directly into your Google Sheet.

> [!TIP]
> **Important Note on Apps Script Permissions**:
> In Google Apps Script under **Deploy** → **Manage Deployments**, ensure **Who has access** is set to **"Anyone"** so that form submissions from the website can append rows without requiring patient Google account logins.

---

## 💻 4. Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Storage & Sync**: Synchronized LocalStorage + Google Apps Script Webhook
- **Currency & Formats**: Bangladeshi Taka (`৳` BDT), Bangladeshi phone formatting (`+880`)

---

## ⚡ 5. Quick Start & Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Run the development server (runs on Port 3000)
npm run dev

# 3. Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

- **Admin Access**: Click the **Shield Icon** (`🛡️`) in the top navigation bar or the footer.
- **Default PIN**: `1234` (or click *"🚀 Quick 1-Click Test Access"*).

---

## 🛠️ 6. Admin Dashboard & Clinic Controls

1. **Appointments**:
   - Filter by status (`All`, `Pending`, `Confirmed`, `Completed`, `Cancelled`).
   - Search by patient name, phone number, or Tracking ID.
   - Edit serial numbers, update appointment dates, add clinical prescription notes, or delete records.
2. **Chambers**:
   - Add new branches (e.g., Banani, Uttara, Mirpur, Chattogram).
   - Configure visiting days, hours, contact numbers, and Google Maps direction links.
3. **Services**:
   - Add/edit treatments (e.g., Scaling & Polishing, Teeth Whitening, Dental Implants).
   - Set English and Bengali names, durations, and starting prices in BDT (`৳`).
4. **Branding & Customizer**:
   - Update Doctor Name, BMDC Registration number, degrees, consultation fees, hotline numbers.
   - Select color themes or customize branding.
   - Export / Import configuration JSON.
5. **Google Sheets**:
   - View connected webhook URL, test webhook connection, or export all data to CSV.

---

## 📂 7. Project Structure & File Map

```
Dental-Clinic-Landing-main/
├── app/
│   ├── layout.tsx                # HTML root layout, metadata & fonts
│   ├── page.tsx                  # Master page orchestrator & booking logic
│   └── globals.css               # Tailwind CSS v4 styling & animations
│
├── types/
│   └── dental.ts                 # TypeScript schemas (Appointment, Config, Service, Chamber)
│
├── lib/
│   ├── dental-data.ts            # Default seeds, LocalStorage persistence, Google Sheets webhook, CSV exporter
│   └── utils.ts                  # clsx & tailwind-merge helper
│
├── components/
│   ├── Navbar.tsx                # Navigation bar with quick theme drawer & Admin trigger
│   ├── Hero.tsx                  # Clinical Hero section with instant booking card
│   ├── StatsBar.tsx              # Proven track record strip (patients treated, ratings)
│   ├── ServicesSection.tsx       # Treatments grid with BDT pricing
│   ├── OurWorkSection.tsx        # Clinical case studies (Before/After makeovers)
│   ├── DoctorChamberSection.tsx  # BMDC certified doctor bio & Chamber location cards
│   ├── TrackingSection.tsx       # Real-time patient serial tracker
│   ├── TestimonialsSection.tsx   # Verified patient reviews + review submission form
│   ├── Footer.tsx                # Chamber branches, hotline, and copyright
│   ├── AdminDashboard.tsx        # Comprehensive admin portal & Google Sheets settings
│   ├── BookingModal.tsx          # Standalone booking modal with date & slot pickers
│   ├── BookingSuccessModal.tsx   # Printable token slip modal with assigned serial #
│   ├── QuickCustomizerDrawer.tsx # Floating drawer for quick doctor & color customizations
│   └── ToastContext.tsx          # Toast notification alerts & confirm dialogs
│
└── public/
    └── images/                   # High-resolution clinical and aesthetic assets
```

---

## 🧠 8. Business Logic & Architecture

1. **Daily Chamber Serial Generation**:
   - Inside `handleCreateBooking` in `app/page.tsx`.
   - Iterates existing bookings for the specified chamber and date to determine the next sequential serial number (`#1, #2, #3...`).
2. **SSR Hydration Safe**:
   - Initial render uses deterministic defaults to prevent SSR hydration mismatches.
   - Synchronizes with `localStorage` upon client mount.
3. **Safe Deletions**:
   - All destructive actions use custom `confirmModal()` from `ToastContext.tsx`. Native `window.confirm()` is never used.

---

## 🚢 9. Deployment

The application is production-ready for deployment on [Vercel](https://vercel.com):
```bash
npm run build
npm run start
```
