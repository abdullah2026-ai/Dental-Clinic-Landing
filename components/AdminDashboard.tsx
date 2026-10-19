'use client';

import React, { useState } from 'react';
import {
  Appointment,
  ChamberConfig,
  DentalService,
  ChamberLocation,
  ThemePreset,
} from '@/types/dental';
import {
  THEME_CONFIGS,
  resetAllDataToDefault,
  syncBookingToGoogleSheet,
  exportAppointmentsToCSV,
} from '@/lib/dental-data';
import { useToast } from '@/components/ToastContext';
import {
  Shield,
  Calendar,
  Users,
  CheckCircle2,
  Clock4,
  XCircle,
  Search,
  Plus,
  Trash2,
  Edit2,
  Sliders,
  DollarSign,
  Download,
  Upload,
  RefreshCw,
  LogOut,
  X,
  Phone,
  Printer,
  Sparkles,
  Sheet,
  ExternalLink,
  Copy,
  Check,
  MapPin,
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  config: ChamberConfig;
  onUpdateConfig: (newConfig: ChamberConfig) => void;
  appointments: Appointment[];
  onUpdateAppointments: (appointments: Appointment[]) => void;
  services: DentalService[];
  onUpdateServices: (services: DentalService[]) => void;
  chambers: ChamberLocation[];
  onUpdateChambers: (chambers: ChamberLocation[]) => void;
  onResetAll: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  appointments,
  onUpdateAppointments,
  services,
  onUpdateServices,
  chambers,
  onUpdateChambers,
  onResetAll,
}) => {
  const { toast, confirmModal } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'appointments' | 'chambers' | 'services' | 'branding' | 'googlesheets'>('appointments');

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | Appointment['status']>('All');

  // Config edit state
  const [tempConfig, setTempConfig] = useState<ChamberConfig>(config);
  const [jsonImportText, setJsonImportText] = useState('');
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [isTestingSheet, setIsTestingSheet] = useState(false);

  // Modals for Editing
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [editingService, setEditingService] = useState<DentalService | null>(null);
  const [showNewServiceModal, setShowNewServiceModal] = useState(false);
  const [editingChamber, setEditingChamber] = useState<ChamberLocation | null>(null);
  const [showNewChamberModal, setShowNewChamberModal] = useState(false);

  // New service form state
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceBengali, setNewServiceBengali] = useState('');
  const [newServicePrice, setNewServicePrice] = useState<number>(1500);
  const [newServiceCategory, setNewServiceCategory] = useState('General');
  const [newServiceDuration, setNewServiceDuration] = useState('30 mins');
  const [newServiceDesc, setNewServiceDesc] = useState('');

  // New chamber form state
  const [newChamberName, setNewChamberName] = useState('');
  const [newChamberArea, setNewChamberArea] = useState('');
  const [newChamberCity, setNewChamberCity] = useState('Dhaka');
  const [newChamberAddress, setNewChamberAddress] = useState('');
  const [newChamberDays, setNewChamberDays] = useState('Saturday - Thursday');
  const [newChamberHours, setNewChamberHours] = useState('05:00 PM - 09:30 PM');
  const [newChamberPhone, setNewChamberPhone] = useState('+880 1711-000000');
  const [newChamberMapUrl, setNewChamberMapUrl] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === 'admin') {
      setIsAuthenticated(true);
      setPinError(false);
      toast.success('Admin portal unlocked successfully');
    } else {
      setPinError(true);
      toast.error('Invalid PIN code');
    }
  };

  const handleQuickDemoLogin = () => {
    setIsAuthenticated(true);
    setPinError(false);
    toast.info('Logged in via Quick Test Access');
  };

  // Appointment Actions
  const handleUpdateStatus = (id: string, newStatus: Appointment['status']) => {
    const updated = appointments.map((a) => (a.id === id ? { ...a, status: newStatus } : a));
    onUpdateAppointments(updated);
    toast.success(`Booking #${id} status updated to ${newStatus}`);
  };

  const handleDeleteAppointment = (apt: Appointment) => {
    confirmModal({
      title: 'Delete Appointment Record?',
      message: `Are you sure you want to delete appointment ${apt.id} for ${apt.patientName}? This action cannot be undone.`,
      confirmLabel: 'Yes, Delete',
      cancelLabel: 'Cancel',
      isDestructive: true,
      onConfirm: () => {
        const updated = appointments.filter((a) => a.id !== apt.id);
        onUpdateAppointments(updated);
        toast.success(`Appointment ${apt.id} deleted`);
      },
    });
  };

  const handleSaveEditedAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAppointment) return;

    const updated = appointments.map((a) => (a.id === editingAppointment.id ? editingAppointment : a));
    onUpdateAppointments(updated);
    setEditingAppointment(null);
    toast.success(`Appointment ${editingAppointment.id} updated successfully`);
  };

  // Services Actions
  const handleSaveEditedService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    onUpdateServices(services.map((s) => (s.id === editingService.id ? editingService : s)));
    setEditingService(null);
    toast.success(`Service "${editingService.name}" updated successfully`);
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;

    const newSrv: DentalService = {
      id: `srv-${Date.now()}`,
      name: newServiceName.trim(),
      bengaliName: newServiceBengali.trim() || newServiceName.trim(),
      description: newServiceDesc.trim() || 'Comprehensive dental treatment and consultation.',
      startingPrice: Number(newServicePrice) || 1000,
      iconKey: 'tooth',
      category: newServiceCategory,
      estimatedDuration: newServiceDuration,
      popular: false,
    };

    onUpdateServices([...services, newSrv]);
    setShowNewServiceModal(false);
    setNewServiceName('');
    setNewServiceBengali('');
    setNewServiceDesc('');
    toast.success(`Service "${newSrv.name}" created`);
  };

  const handleDeleteService = (srv: DentalService) => {
    confirmModal({
      title: 'Delete Service?',
      message: `Delete "${srv.name}" from the active dental services catalog?`,
      confirmLabel: 'Yes, Delete',
      cancelLabel: 'Cancel',
      isDestructive: true,
      onConfirm: () => {
        onUpdateServices(services.filter((s) => s.id !== srv.id));
        toast.success(`Service "${srv.name}" removed`);
      },
    });
  };

  // Chamber Actions
  const handleSaveEditedChamber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChamber) return;

    const updated = chambers.map((c) => (c.id === editingChamber.id ? editingChamber : c));
    onUpdateChambers(updated);
    setEditingChamber(null);
    toast.success(`Chamber "${editingChamber.name}" updated`);
  };

  const handleAddChamber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChamberName.trim()) return;

    const newCh: ChamberLocation = {
      id: `ch-${Date.now()}`,
      name: newChamberName.trim(),
      area: newChamberArea.trim() || 'Dhaka',
      city: newChamberCity.trim() || 'Dhaka',
      address: newChamberAddress.trim(),
      visitingDays: newChamberDays.trim(),
      visitingHours: newChamberHours.trim(),
      timeSlots: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM'],
      phone: newChamberPhone.trim(),
      googleMapsUrl: newChamberMapUrl.trim() || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(newChamberAddress)}`,
    };

    onUpdateChambers([...chambers, newCh]);
    setShowNewChamberModal(false);
    setNewChamberName('');
    setNewChamberAddress('');
    toast.success(`New chamber "${newCh.name}" added`);
  };

  const handleDeleteChamber = (chamber: ChamberLocation) => {
    if (chambers.length <= 1) {
      toast.error('You must keep at least one active chamber location.');
      return;
    }

    confirmModal({
      title: 'Delete Chamber Location?',
      message: `Are you sure you want to delete ${chamber.name}? Appointments booked at this chamber will remain in records.`,
      confirmLabel: 'Yes, Delete',
      cancelLabel: 'Cancel',
      isDestructive: true,
      onConfirm: () => {
        onUpdateChambers(chambers.filter((c) => c.id !== chamber.id));
        toast.success(`Chamber "${chamber.name}" removed`);
      },
    });
  };

  // Branding Save
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(tempConfig);
    toast.success('Chamber configurations saved successfully');
  };

  // Google Sheets Test
  const handleTestGoogleSheet = async () => {
    if (!tempConfig.googleSheetWebhookUrl) {
      toast.error('Please enter your Google Apps Script Webhook URL first.');
      return;
    }

    setIsTestingSheet(true);
    const testAppointment: Appointment = {
      id: `TEST-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: 'Test Patient (Webhook Check)',
      phone: '+8801700000000',
      age: 28,
      gender: 'Male',
      chamberId: 'test',
      chamberName: 'Dhaka Chamber (Test)',
      serviceId: 'test',
      serviceName: 'General Checkup',
      date: new Date().toISOString().split('T')[0],
      timeSlot: '06:00 PM',
      serialNumber: 99,
      status: 'Confirmed',
      notes: 'Test ping sent from SmileCraft Dental Admin Dashboard',
      createdAt: new Date().toISOString(),
      feeBDT: 800,
    };

    const success = await syncBookingToGoogleSheet(testAppointment, tempConfig.googleSheetWebhookUrl);
    setIsTestingSheet(false);
    if (success) {
      toast.success('Test row sent to Google Sheet successfully! Check your spreadsheet.');
    } else {
      toast.error('Could not connect. Please ensure the Apps Script Web App is deployed with Access: Anyone.');
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    exportAppointmentsToCSV(appointments, config.clinicName);
    toast.success('Exported bookings CSV. You can import directly into Google Sheets or Excel!');
  };

  const appsScriptCode = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Auto-create headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Tracking ID", "Serial #", "Patient Name", 
        "Phone", "Age", "Gender", "Chamber", "Service", 
        "Date", "Time Slot", "Status", "Fee (BDT)", "Notes"
      ]);
      sheet.getRange(1, 1, 1, 14).setFontWeight("bold").setBackground("#d1fae5");
    }
    
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.trackingId || "",
      data.serialNumber || "",
      data.patientName || "",
      data.phone || "",
      data.age || "",
      data.gender || "",
      data.chamber || "",
      data.service || "",
      data.date || "",
      data.timeSlot || "",
      data.status || "",
      data.feeBDT || "",
      data.notes || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({result: "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({result: "error", error: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  // Filtered Appointments
  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.phone.includes(searchTerm) ||
      a.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // KPI Calculations
  const totalBookings = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === 'Pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'Confirmed').length;
  const completedCount = appointments.filter((a) => a.status === 'Completed').length;
  const estimatedRevenue = appointments
    .filter((a) => a.status !== 'Cancelled')
    .reduce((sum, a) => sum + (a.feeBDT || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-6xl w-full h-[94vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
        
        {/* Top Navbar in Admin */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold flex items-center gap-2">
                <span>Chamber Admin Portal</span>
                <span className="text-[10px] font-normal text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
                  Full Functional Mode
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                {config.clinicName} · {config.doctorName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lock / Log Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Gate */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
            <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-lg text-center space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <Shield className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Chamber Admin Access
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your Chamber Admin PIN to view appointments, manage doctor schedule, edit services, and sync Google Sheets.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Enter PIN (Default: 1234)"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full text-center tracking-widest text-lg font-mono px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                  {pinError && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">
                      Invalid PIN. Try &ldquo;1234&rdquo; or click below.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-semibold rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm transition-all cursor-pointer"
                >
                  Unlock Admin Dashboard
                </button>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleQuickDemoLogin}
                    className="w-full py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                  >
                    🚀 Quick 1-Click Test Access (No PIN Required)
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Main Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
            
            {/* Tab Navigation */}
            <div className="bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 overflow-x-auto">
              <div className="flex gap-2 py-2">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'appointments'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Appointments ({appointments.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'services'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Services & Pricing ({services.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('chambers')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'chambers'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Chambers & Maps ({chambers.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('googlesheets')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'googlesheets'
                      ? 'bg-emerald-800 text-white'
                      : 'text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  <Sheet className="w-3.5 h-3.5" />
                  <span>Google Sheets Sync</span>
                </button>

                <button
                  onClick={() => setActiveTab('branding')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'branding'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Customizer & Theme</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    confirmModal({
                      title: 'Reset Demo Data?',
                      message: 'This will restore all default Bangladeshi chambers, services, and mock appointments.',
                      confirmLabel: 'Yes, Reset',
                      cancelLabel: 'Cancel',
                      isDestructive: true,
                      onConfirm: () => {
                        onResetAll();
                        toast.success('All demo data restored to initial state');
                      },
                    });
                  }}
                  title="Reset Demo Data"
                  className="p-1.5 text-xs text-slate-500 hover:text-slate-800 rounded hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Reset Demo</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Appointments Management */}
            {activeTab === 'appointments' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                
                {/* KPI Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-[11px] font-medium text-slate-400 block">Total Bookings</span>
                    <span className="text-xl font-bold text-slate-900 tabular-nums">{totalBookings}</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-[11px] font-medium text-amber-600 block">Pending</span>
                    <span className="text-xl font-bold text-amber-600 tabular-nums">{pendingCount}</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-[11px] font-medium text-emerald-600 block">Confirmed</span>
                    <span className="text-xl font-bold text-emerald-600 tabular-nums">{confirmedCount}</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-[11px] font-medium text-blue-600 block">Completed</span>
                    <span className="text-xl font-bold text-blue-600 tabular-nums">{completedCount}</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
                    <span className="text-[11px] font-medium text-slate-400 block">Est. Revenue</span>
                    <span className="text-xl font-bold text-slate-900 tabular-nums">
                      {config.currency}{estimatedRevenue.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-72">
                    <input
                      type="text"
                      placeholder="Search patient, phone, ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-1.5 overflow-x-auto">
                      {(['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'] as const).map((st) => (
                        <button
                          key={st}
                          onClick={() => setStatusFilter(st)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                            statusFilter === st
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleExportCSV}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer shrink-0"
                      title="Download CSV for Excel / Google Sheets"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden md:inline">Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Appointments Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                        <tr>
                          <th className="py-3 px-4">Serial & ID</th>
                          <th className="py-3 px-4">Patient</th>
                          <th className="py-3 px-4">Chamber</th>
                          <th className="py-3 px-4">Date & Time</th>
                          <th className="py-3 px-4">Service</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredAppointments.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-8 text-center text-slate-400">
                              No appointments match this filter.
                            </td>
                          </tr>
                        ) : (
                          filteredAppointments.map((apt, index) => (
                            <tr key={`${apt.id}-${index}`} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3 px-4">
                                <div className="font-bold text-slate-900 text-sm tabular-nums">
                                  #{apt.serialNumber}
                                </div>
                                <div className="font-mono text-[11px] text-slate-400">{apt.id}</div>
                              </td>

                              <td className="py-3 px-4">
                                <div className="font-semibold text-slate-900">{apt.patientName}</div>
                                <div className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                                  <Phone className="w-3 h-3 text-slate-400" />
                                  <span>{apt.phone}</span>
                                </div>
                                <div className="text-slate-400 text-[10px]">
                                  {apt.age} yrs · {apt.gender}
                                </div>
                              </td>

                              <td className="py-3 px-4">
                                <div className="text-slate-800 font-medium">{apt.chamberName}</div>
                              </td>

                              <td className="py-3 px-4">
                                <div className="font-medium text-slate-800">{apt.date}</div>
                                <div className="text-slate-500">{apt.timeSlot}</div>
                              </td>

                              <td className="py-3 px-4">
                                <div className="text-slate-800 font-medium">{apt.serviceName}</div>
                                <div className="text-emerald-700 font-semibold tabular-nums">
                                  {config.currency}{apt.feeBDT}
                                </div>
                              </td>

                              <td className="py-3 px-4">
                                <select
                                  value={apt.status}
                                  onChange={(e) => handleUpdateStatus(apt.id, e.target.value as any)}
                                  className={`px-2 py-1 text-[11px] font-semibold rounded-lg border focus:outline-none cursor-pointer ${
                                    apt.status === 'Confirmed'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                      : apt.status === 'Pending'
                                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                                      : apt.status === 'Completed'
                                      ? 'bg-blue-50 text-blue-800 border-blue-200'
                                      : 'bg-rose-50 text-rose-800 border-rose-200'
                                  }`}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>

                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => setEditingAppointment(apt)}
                                    title="Edit Full Appointment"
                                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteAppointment(apt)}
                                    title="Delete Record"
                                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* Tab 2: Services Manager (Full Editable) */}
            {activeTab === 'services' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Dental Services & BDT Pricing
                    </h3>
                    <p className="text-xs text-slate-500">
                      Manage treatments, Bengali translations, and starting fees in ৳ BDT.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowNewServiceModal(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Service</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((srv) => (
                    <div
                      key={srv.id}
                      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between gap-4 hover:border-emerald-300 transition-all"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{srv.name}</span>
                          {srv.popular && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">{srv.bengaliName}</div>
                        <p className="text-xs text-slate-600 leading-relaxed">{srv.description}</p>
                        <div className="text-xs font-bold text-emerald-800 pt-1">
                          Starting at {config.currency}{srv.startingPrice.toLocaleString()} · {srv.estimatedDuration} · <span className="text-slate-400 font-normal">{srv.category}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => setEditingService(srv)}
                          title="Edit Service"
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(srv)}
                          title="Delete Service"
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Chambers & Maps Manager (Full Editable) */}
            {activeTab === 'chambers' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Visiting Chambers & Google Maps
                    </h3>
                    <p className="text-xs text-slate-500">
                      Configure visiting locations, Google Maps links, and time slots.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowNewChamberModal(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Chamber</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {chambers.map((chamber) => (
                    <div
                      key={chamber.id}
                      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">
                            {chamber.name} ({chamber.city})
                          </h4>
                          <span className="text-xs text-slate-500">{chamber.area}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                            {chamber.visitingDays}
                          </span>

                          <button
                            onClick={() => setEditingChamber(chamber)}
                            title="Edit Chamber"
                            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteChamber(chamber)}
                            title="Delete Chamber"
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600">
                        <strong>Address:</strong> {chamber.address}
                      </p>

                      <div className="text-xs text-slate-500 flex flex-wrap gap-4">
                        <span><strong>Hours:</strong> {chamber.visitingHours}</span>
                        <span><strong>Phone:</strong> {chamber.phone}</span>
                        {chamber.googleMapsUrl && (
                          <a
                            href={chamber.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <MapPin className="w-3 h-3" />
                            <span>Open in Google Maps ↗</span>
                          </a>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {chamber.timeSlots.map((slot) => (
                          <span key={slot} className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-mono">
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Google Sheets Integration (Requested Extra Feature) */}
            {activeTab === 'googlesheets' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                
                <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-md space-y-3">
                  <div className="flex items-center gap-2">
                    <Sheet className="w-6 h-6 text-emerald-300" />
                    <h3 className="text-lg font-bold">
                      Google Sheets Integration (গুগল শিট কানেকশন)
                    </h3>
                  </div>
                  <p className="text-xs text-emerald-100 max-w-2xl leading-relaxed">
                    Automatically sync patient bookings, serial numbers, phone numbers, and chamber appointments to your Google Spreadsheet in real-time. Follow the 2-minute setup guide below!
                  </p>
                </div>

                {/* Configuration Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
                  <h4 className="text-sm font-bold text-slate-900">
                    Webhook Settings
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Google Apps Script Web App URL (Webhook)
                      </label>
                      <input
                        type="url"
                        placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                        value={tempConfig.googleSheetWebhookUrl || ''}
                        onChange={(e) =>
                          setTempConfig({ ...tempConfig, googleSheetWebhookUrl: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">
                        When configured, every new appointment booked by patients will automatically append as a new row in your Google Sheet.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tempConfig.googleSheetAutoSync ?? false}
                          onChange={(e) =>
                            setTempConfig({ ...tempConfig, googleSheetAutoSync: e.target.checked })
                          }
                          className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                        />
                        <span>Enable Real-time Auto-Sync on new patient bookings</span>
                      </label>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleSaveConfig}
                        className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl cursor-pointer"
                      >
                        Save Webhook URL
                      </button>

                      <button
                        type="button"
                        disabled={isTestingSheet}
                        onClick={handleTestGoogleSheet}
                        className="px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors cursor-pointer"
                      >
                        {isTestingSheet ? 'Sending Test...' : '🧪 Send Test Row to Google Sheet'}
                      </button>

                      <button
                        type="button"
                        onClick={handleExportCSV}
                        className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export All Existing Bookings to CSV</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Instructions */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        How to Connect in 2 Minutes (কীভাবে সেটআপ করবেন)
                      </h4>
                      <p className="text-xs text-slate-500">
                        Follow these simple 4 steps to create your free Google Sheets Webhook:
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(appsScriptCode);
                        setCopiedScript(true);
                        toast.success('Google Apps Script code copied to clipboard!');
                        setTimeout(() => setCopiedScript(false), 2000);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 cursor-pointer"
                    >
                      {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedScript ? 'Copied Script!' : 'Copy Script Code'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                        1
                      </div>
                      <div className="font-bold text-slate-900">Open Google Sheet</div>
                      <p className="text-slate-500 text-[11px]">
                        Create a new Google Sheet. Go to <strong>Extensions</strong> → <strong>Apps Script</strong>.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                        2
                      </div>
                      <div className="font-bold text-slate-900">Paste Script Code</div>
                      <p className="text-slate-500 text-[11px]">
                        Delete existing code in <code>Code.gs</code> and paste the script code shown below.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                        3
                      </div>
                      <div className="font-bold text-slate-900">Deploy as Web App</div>
                      <p className="text-slate-500 text-[11px]">
                        Click <strong>Deploy</strong> → <strong>New deployment</strong> → Type: <strong>Web App</strong> → Who has access: <strong>Anyone</strong>.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                        4
                      </div>
                      <div className="font-bold text-slate-900">Paste URL Here</div>
                      <p className="text-slate-500 text-[11px]">
                        Copy the Web App URL and paste it into the Webhook field above. Done!
                      </p>
                    </div>
                  </div>

                  {/* Code snippet display */}
                  <div className="pt-2">
                    <span className="text-xs font-semibold text-slate-700 block mb-1">
                      Google Apps Script Code (Code.gs):
                    </span>
                    <pre className="p-4 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto max-h-48 leading-relaxed">
                      {appsScriptCode}
                    </pre>
                  </div>
                </div>

              </div>
            )}

            {/* Tab 5: Customizer & Branding */}
            {activeTab === 'branding' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Chamber Customizer & White-Label Setup
                    </h3>
                    <p className="text-xs text-slate-500">
                      Easily adapt this landing page for another doctor or dental chamber in Bangladesh.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
                        const downloadAnchor = document.createElement('a');
                        downloadAnchor.setAttribute('href', dataStr);
                        downloadAnchor.setAttribute('download', `${config.clinicName.replace(/\s+/g, '_')}_config.json`);
                        document.body.appendChild(downloadAnchor);
                        downloadAnchor.click();
                        downloadAnchor.remove();
                        toast.success('Configuration exported as JSON');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export JSON</span>
                    </button>
                    <button
                      onClick={() => setShowJsonModal(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Import JSON</span>
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSaveConfig} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                  
                  {/* Color Theme Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-2 uppercase tracking-wider">
                      Color Theme Preset
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      {(Object.keys(THEME_CONFIGS) as ThemePreset[]).map((themeKey) => {
                        const t = THEME_CONFIGS[themeKey];
                        const isSelected = tempConfig.themePreset === themeKey;
                        return (
                          <button
                            type="button"
                            key={themeKey}
                            onClick={() =>
                              setTempConfig({
                                ...tempConfig,
                                themePreset: themeKey,
                                primaryColorHex: t.primaryHex,
                              })
                            }
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'border-slate-900 ring-2 ring-slate-900/10 bg-slate-50'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div
                              className="w-6 h-6 rounded-md mb-2 shadow-sm"
                              style={{ backgroundColor: t.primaryHex }}
                            />
                            <div className="text-xs font-semibold text-slate-900 capitalize">
                              {themeKey}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              {t.primaryHex}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Clinic Name & Tagline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Clinic / Chamber Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={tempConfig.clinicName}
                        onChange={(e) => setTempConfig({ ...tempConfig, clinicName: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tagline / Subheading
                      </label>
                      <input
                        type="text"
                        value={tempConfig.tagline}
                        onChange={(e) => setTempConfig({ ...tempConfig, tagline: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Doctor Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={tempConfig.doctorName}
                        onChange={(e) => setTempConfig({ ...tempConfig, doctorName: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        BMDC Registration No *
                      </label>
                      <input
                        type="text"
                        required
                        value={tempConfig.bmdcReg}
                        onChange={(e) => setTempConfig({ ...tempConfig, bmdcReg: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Consultation Fee ({tempConfig.currency}) *
                      </label>
                      <input
                        type="number"
                        required
                        value={tempConfig.consultationFeeBDT}
                        onChange={(e) =>
                          setTempConfig({ ...tempConfig, consultationFeeBDT: Number(e.target.value) })
                        }
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Doctor Degrees & Qualifications
                    </label>
                    <input
                      type="text"
                      value={tempConfig.degrees}
                      onChange={(e) => setTempConfig({ ...tempConfig, degrees: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Primary Hotline Phone *
                      </label>
                      <input
                        type="text"
                        required
                        value={tempConfig.primaryPhone}
                        onChange={(e) => setTempConfig({ ...tempConfig, primaryPhone: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Emergency Mobile / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={tempConfig.emergencyPhone}
                        onChange={(e) => setTempConfig({ ...tempConfig, emergencyPhone: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Support Email
                      </label>
                      <input
                        type="email"
                        value={tempConfig.email}
                        onChange={(e) => setTempConfig({ ...tempConfig, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setTempConfig(config)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                    >
                      Discard Unsaved Changes
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs font-bold rounded-xl text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-all cursor-pointer"
                    >
                      Save Chamber Customizations
                    </button>
                  </div>

                </form>

              </div>
            )}

          </div>
        )}

      </div>

      {/* Modal 1: Edit Appointment Modal */}
      {editingAppointment && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Edit Appointment ({editingAppointment.id})
              </h3>
              <button
                onClick={() => setEditingAppointment(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedAppointment} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Patient Name</label>
                  <input
                    type="text"
                    required
                    value={editingAppointment.patientName}
                    onChange={(e) =>
                      setEditingAppointment({ ...editingAppointment, patientName: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={editingAppointment.phone}
                    onChange={(e) =>
                      setEditingAppointment({ ...editingAppointment, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Serial Number</label>
                  <input
                    type="number"
                    required
                    value={editingAppointment.serialNumber}
                    onChange={(e) =>
                      setEditingAppointment({ ...editingAppointment, serialNumber: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={editingAppointment.age}
                    onChange={(e) =>
                      setEditingAppointment({ ...editingAppointment, age: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={editingAppointment.gender}
                    onChange={(e) =>
                      setEditingAppointment({ ...editingAppointment, gender: e.target.value as any })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={editingAppointment.date}
                    onChange={(e) =>
                      setEditingAppointment({ ...editingAppointment, date: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Time Slot</label>
                  <input
                    type="text"
                    required
                    value={editingAppointment.timeSlot}
                    onChange={(e) =>
                      setEditingAppointment({ ...editingAppointment, timeSlot: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={editingAppointment.status}
                    onChange={(e) =>
                      setEditingAppointment({ ...editingAppointment, status: e.target.value as any })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Fee ({config.currency})</label>
                  <input
                    type="number"
                    value={editingAppointment.feeBDT}
                    onChange={(e) =>
                      setEditingAppointment({ ...editingAppointment, feeBDT: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notes / Prescription</label>
                <textarea
                  rows={2}
                  value={editingAppointment.notes || ''}
                  onChange={(e) =>
                    setEditingAppointment({ ...editingAppointment, notes: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingAppointment(null)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg font-bold text-white bg-slate-900 hover:bg-slate-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Edit Dental Service</h3>
            <form onSubmit={handleSaveEditedService} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Service Name</label>
                <input
                  type="text"
                  required
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Bengali Name</label>
                <input
                  type="text"
                  value={editingService.bengaliName}
                  onChange={(e) => setEditingService({ ...editingService, bengaliName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Starting Price ({config.currency})</label>
                  <input
                    type="number"
                    required
                    value={editingService.startingPrice}
                    onChange={(e) =>
                      setEditingService({ ...editingService, startingPrice: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingService.estimatedDuration}
                    onChange={(e) =>
                      setEditingService({ ...editingService, estimatedDuration: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingService.description}
                  onChange={(e) =>
                    setEditingService({ ...editingService, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="srv-popular"
                  checked={editingService.popular || false}
                  onChange={(e) =>
                    setEditingService({ ...editingService, popular: e.target.checked })
                  }
                  className="rounded text-emerald-600"
                />
                <label htmlFor="srv-popular" className="font-semibold text-slate-700">
                  Mark as Popular service
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-3.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg font-bold text-white bg-emerald-700 hover:bg-emerald-800"
                >
                  Update Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Edit Chamber Modal */}
      {editingChamber && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900">Edit Chamber Location & Google Map</h3>
            <form onSubmit={handleSaveEditedChamber} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Chamber Name</label>
                  <input
                    type="text"
                    required
                    value={editingChamber.name}
                    onChange={(e) => setEditingChamber({ ...editingChamber, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={editingChamber.city}
                    onChange={(e) => setEditingChamber({ ...editingChamber, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Address</label>
                <input
                  type="text"
                  required
                  value={editingChamber.address}
                  onChange={(e) => setEditingChamber({ ...editingChamber, address: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Google Maps URL (short map click opens this)
                </label>
                <input
                  type="url"
                  placeholder="https://www.google.com/maps/search/?api=1&query=..."
                  value={editingChamber.googleMapsUrl || ''}
                  onChange={(e) => setEditingChamber({ ...editingChamber, googleMapsUrl: e.target.value })}
                  className="w-full px-3 py-2 font-mono text-[11px] bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Visiting Days</label>
                  <input
                    type="text"
                    value={editingChamber.visitingDays}
                    onChange={(e) => setEditingChamber({ ...editingChamber, visitingDays: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Visiting Hours</label>
                  <input
                    type="text"
                    value={editingChamber.visitingHours}
                    onChange={(e) => setEditingChamber({ ...editingChamber, visitingHours: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Chamber Phone</label>
                <input
                  type="text"
                  value={editingChamber.phone}
                  onChange={(e) => setEditingChamber({ ...editingChamber, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingChamber(null)}
                  className="px-3.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg font-bold text-white bg-slate-900 hover:bg-slate-800"
                >
                  Save Chamber Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 4: Add New Chamber Modal */}
      {showNewChamberModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900">Add New Chamber Branch</h3>
            <form onSubmit={handleAddChamber} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Chamber Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Uttara Branch"
                    value={newChamberName}
                    onChange={(e) => setNewChamberName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dhaka or Sylhet"
                    value={newChamberCity}
                    onChange={(e) => setNewChamberCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Address *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. House 12, Sector 3, Uttara, Dhaka"
                  value={newChamberAddress}
                  onChange={(e) => setNewChamberAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Google Maps URL</label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/..."
                  value={newChamberMapUrl}
                  onChange={(e) => setNewChamberMapUrl(e.target.value)}
                  className="w-full px-3 py-2 font-mono text-[11px] bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Visiting Days</label>
                  <input
                    type="text"
                    value={newChamberDays}
                    onChange={(e) => setNewChamberDays(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Visiting Hours</label>
                  <input
                    type="text"
                    value={newChamberHours}
                    onChange={(e) => setNewChamberHours(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Chamber Phone</label>
                <input
                  type="text"
                  value={newChamberPhone}
                  onChange={(e) => setNewChamberPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewChamberModal(false)}
                  className="px-3.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg font-bold text-white bg-emerald-700 hover:bg-emerald-800"
                >
                  Add Chamber
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 5: Add New Service Modal */}
      {showNewServiceModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Add Dental Service</h3>
            <form onSubmit={handleAddService} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Service Name (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Laser Gum Treatment"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Bengali Name</label>
                <input
                  type="text"
                  placeholder="e.g. লেজার মাড়ি চিকিৎসা"
                  value={newServiceBengali}
                  onChange={(e) => setNewServiceBengali(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Starting Price ({config.currency}) *</label>
                  <input
                    type="number"
                    required
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newServiceDuration}
                    onChange={(e) => setNewServiceDuration(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Short service description..."
                  value={newServiceDesc}
                  onChange={(e) => setNewServiceDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewServiceModal(false)}
                  className="px-3.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg font-bold text-white bg-emerald-700 hover:bg-emerald-800"
                >
                  Add Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 6: JSON Import Modal */}
      {showJsonModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Import Chamber Configuration JSON</h3>
            <p className="text-xs text-slate-500">
              Paste the exported JSON configuration of another doctor or dental chamber to load their settings instantly.
            </p>
            <textarea
              rows={8}
              placeholder="Paste JSON here..."
              value={jsonImportText}
              onChange={(e) => setJsonImportText(e.target.value)}
              className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowJsonModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  try {
                    const parsed = JSON.parse(jsonImportText);
                    if (parsed.clinicName && parsed.doctorName) {
                      onUpdateConfig({ ...config, ...parsed });
                      setTempConfig({ ...config, ...parsed });
                      setShowJsonModal(false);
                      setJsonImportText('');
                      toast.success('Configuration imported successfully!');
                    } else {
                      toast.error('Invalid JSON structure: Missing clinicName or doctorName.');
                    }
                  } catch {
                    toast.error('Error parsing JSON text. Please check format.');
                  }
                }}
                className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 rounded-lg cursor-pointer"
              >
                Import Configuration
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
