import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Compass,
  MessageSquare,
  Navigation,
  ExternalLink,
  Route
} from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { useScrollReveal } from '../lib/useScrollReveal';

interface ContactPageProps {
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
  onOpenConsultationModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  const contactGridRef = useScrollReveal<HTMLDivElement>({ stagger: 0.12, y: 30 });
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [service, setService] = useState('Turnkey Home Construction');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="w-full bg-[var(--canvas-alt)]">
      {/* 1. HERO HEADER */}
      <section className="bg-[var(--canvas)] text-[var(--ink)] py-16 sm:py-20 border-b border-[var(--line)]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl space-y-4">
            <div className="vh-eyebrow">
              <span>Connect With Our Engineers</span>
            </div>

            <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-[var(--ink)] tracking-tight leading-[1.0]">
              Contact Abdul Salam Construction Company
            </h1>

            <p className="text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed font-sans">
              Have a plot to build on or an existing structure to renovate in Bhadohi, Mirzapur, Jaunpur, Varanasi or Prayagraj? Reach out to our engineering office or schedule an on-site visit today.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT DETAILS & INTERACTIVE FORM */}
      <section className="py-16 sm:py-20 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div ref={contactGridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Office Details & Landmark (5 cols) */}
          <div data-reveal className="lg:col-span-5 space-y-6">
            <div className="bg-[var(--canvas)] border border-[var(--line)] p-6 sm:p-8 space-y-6 shadow-elevate rounded-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brick)]">
                  Registered Head Office
                </span>
                <h3 className="font-heading font-black text-xl text-[var(--ink)] mt-1.5">
                  Bhadohi Main Office
                </h3>
              </div>

              <div className="space-y-4 text-xs text-[var(--ink-soft)]">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-[var(--brick)]/10 text-[var(--brick)] flex-shrink-0 mt-0.5 rounded-lg border border-[var(--line)]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[var(--ink)] block font-heading font-bold text-sm">
                      Company Address:
                    </strong>
                    <p className="mt-1 leading-relaxed text-[var(--ink-soft)]">
                      {COMPANY_DATA.address.line1},<br />
                      {COMPANY_DATA.address.line2},<br />
                      {COMPANY_DATA.address.city} - {COMPANY_DATA.address.pincode},<br />
                      {COMPANY_DATA.address.state}, India
                    </p>
                    <div className="mt-2.5 p-3 bg-[var(--canvas-alt)] text-[11px] text-[var(--ink)] font-medium rounded-lg border border-[var(--line)] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[var(--brick)] flex-shrink-0" />
                      <span>Landmark: {COMPANY_DATA.address.landmark}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-4 border-t border-[var(--line)]">
                  <div className="p-2.5 bg-[var(--brick)]/10 text-[var(--brick)] flex-shrink-0 mt-0.5 rounded-lg border border-[var(--line)]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[var(--ink)] block font-heading font-bold text-sm">
                      Visiting & Consultation Hours:
                    </strong>
                    <p className="text-[var(--ink-soft)] mt-1">
                      {COMPANY_DATA.contact.officeHours}
                    </p>
                    <p className="text-[var(--ink-soft)] text-[11px] mt-0.5">
                      Sunday: Site Inspections & Prior Appointments Only
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-4 border-t border-[var(--line)]">
                  <div className="p-2.5 bg-[var(--brick)]/10 text-[var(--brick)] flex-shrink-0 mt-0.5 rounded-lg border border-[var(--line)]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[var(--ink)] block font-heading font-bold text-sm">
                      Official Inquiries:
                    </strong>
                    <p className="text-[var(--ink-soft)] mt-0.5">
                      {COMPANY_DATA.contact.emailDisplay}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center"
                  onClick={onOpenConsultationModal}
                >
                  Schedule an Engineer Site Visit
                </Button>
              </div>
            </div>

            {/* Quality Commitment Card */}
            <div className="bg-[var(--canvas)] text-[var(--ink)] p-6 border border-[var(--line)] space-y-3 rounded-xl shadow-elevate">
              <div className="flex items-center gap-2 text-[var(--brick)]">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-heading font-black text-sm uppercase tracking-wider text-[var(--ink)]">
                  Direct Engineer Consultation
                </span>
              </div>
              <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                When you visit our Bhadohi office, you discuss your project directly with experienced civil engineers and project coordinators—not sales agents.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form (7 cols) */}
          <div data-reveal className="lg:col-span-7 bg-[var(--canvas)] border border-[var(--line)] p-8 sm:p-10 shadow-elevate rounded-xl">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-50 border border-[var(--line)] text-green-600 flex items-center justify-center mx-auto rounded-full">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-heading font-black text-2xl text-[var(--ink)]">
                  Message Successfully Dispatched!
                </h3>
                <p className="text-xs sm:text-sm text-[var(--ink-soft)] max-w-md mx-auto">
                  Thank you, <span className="font-bold text-[var(--ink)]">{name}</span>. Our civil project engineer will review your site requirements and contact you at <span className="font-bold text-[var(--ink)]">{phone}</span>.
                </p>
                <div className="pt-4">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setLocation('');
                      setMessage('');
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brick)]">
                    Direct Project Inquiry
                  </span>
                  <h2 className="font-heading font-black text-3xl text-[var(--ink)] mt-2 tracking-tight">
                    Send Us Your Project Details
                  </h2>
                  <p className="text-xs text-[var(--ink-soft)] mt-1">
                    Fill out the form below to receive a call back from our site engineering team.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aslam Khan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-[var(--line)] text-sm focus:border-[var(--brick)] focus:outline-none focus:shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)] rounded-lg transition-all bg-[var(--canvas)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1.5">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-[var(--line)] text-sm focus:border-[var(--brick)] focus:outline-none focus:shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)] rounded-lg transition-all bg-[var(--canvas)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-[var(--line)] text-sm focus:border-[var(--brick)] focus:outline-none focus:shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)] rounded-lg transition-all bg-[var(--canvas)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1.5">
                      Plot Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Harirampur, Aurai Road, Bhadohi / Mirzapur / Jaunpur / Varanasi / Prayagraj"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-3 border border-[var(--line)] text-sm focus:border-[var(--brick)] focus:outline-none focus:shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)] rounded-lg transition-all bg-[var(--canvas)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1.5">
                    Service Required
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 border border-[var(--line)] text-sm focus:border-[var(--brick)] focus:outline-none focus:shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)] bg-[var(--canvas)] rounded-lg transition-all"
                  >
                    <option value="Turnkey Home Construction">Turnkey Residential Home Construction</option>
                    <option value="Commercial Complex">Commercial Complex / Retail Showroom</option>
                    <option value="Architectural Design & 3D">Architectural Design & 2D/3D Floor Plan</option>
                    <option value="RCC Civil Structure">Civil Structure & RCC Framework</option>
                    <option value="Home Renovation">Renovation & Floor Addition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1.5">
                    Plot Size & Project Notes
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about plot dimensions (e.g. 30x50 ft), number of floors (G+1/G+2), and when you plan to start..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-[var(--line)] text-sm focus:border-[var(--brick)] focus:outline-none focus:shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)] rounded-lg transition-all bg-[var(--canvas)]"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full justify-center"
                >
                  SUBMIT INQUIRY FOR ENGINEERING REVIEW
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. GEOTAGGED OFFICE LOCATION & HIGHWAY NAVIGATION HUB (GEO & LOCAL SEO) */}
      <section className="py-16 bg-[var(--canvas-alt)] text-[var(--ink)] border-t border-[var(--line)]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--brick)]/10 text-[var(--brick)] text-xs font-bold uppercase tracking-[0.2em] rounded-md border border-[var(--line)]">
              <Navigation className="w-3.5 h-3.5" />
              <span>Official Geolocation & Navigation</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[var(--ink)] tracking-tight mt-3">
              Bhadohi Engineering Office & Highway Transit Hub
            </h2>
            <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed font-sans">
              Strategically positioned along the Aurai Road corridor with rapid connectivity to NH-19 (Grand Trunk Road), Bhadohi Railway Station, and Gyanpur District Collectorate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Map Container (7 cols) */}
            <div className="lg:col-span-7 bg-[var(--canvas)] border border-[var(--line)] rounded-xl overflow-hidden flex flex-col shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)]">
              <div className="bg-[var(--canvas-alt)] px-5 py-4 border-b border-[var(--line)] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--ink)]">
                  <MapPin className="w-4 h-4 text-[var(--brick)]" />
                  <span>Phase-II, Rajpura Colony, Aurai Road, Bhadohi</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-[var(--line)]">
                  GPS: 25.3956° N, 82.5698° E
                </span>
              </div>

              {/* Embedded Interactive Map Frame */}
              <div className="w-full h-80 sm:h-96 relative bg-[var(--line)]">
                <iframe
                  title="Abdul Salam Construction Company Office Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14427.659972304919!2d82.56158229828456!3d25.395604179374465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398fe26500000001%3A0x0!2sBhadohi%2C%20Uttar%20Pradesh%20221401!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>

              <div className="p-5 bg-[var(--canvas-alt)] border-t border-[var(--line)] flex flex-wrap items-center justify-end gap-3">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=25.3956,82.5698"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[var(--brick)] hover:bg-[var(--brick-deep)] text-white text-xs font-bold uppercase tracking-wider rounded-lg border border-[var(--line)] transition-all duration-150 flex items-center gap-1.5 shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)] hover:shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)] active:shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)]"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Live Route Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Geo Logistics & Verification Details (5 cols) */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              {/* NAP Box */}
              <div className="p-6 bg-[var(--canvas)] border border-[var(--line)] rounded-xl space-y-4 shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)]">
                <div className="border-b border-[var(--line)] pb-3">
                  <span className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brick)]">
                    Local Business Verification (NAP)
                  </span>
                  <h3 className="font-heading font-bold text-base text-[var(--ink)] mt-0.5">
                    M/S ABDUL SALAM CONSTRUCTIONS COMPANY
                  </h3>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <dt className="text-[var(--ink-soft)] font-medium">District & State</dt>
                    <dd className="text-[var(--ink)] font-semibold mt-0.5">Bhadohi (Sant Ravidas Nagar), UP</dd>
                  </div>
                  <div>
                    <dt className="text-[var(--ink-soft)] font-medium">Postal PIN Code</dt>
                    <dd className="text-[var(--ink)] font-semibold mt-0.5">221401</dd>
                  </div>
                  <div>
                    <dt className="text-[var(--ink-soft)] font-medium">Registered GSTIN</dt>
                    <dd className="font-mono text-[var(--brick)] font-bold mt-0.5">{COMPANY_DATA.gstin}</dd>
                  </div>
                  <div>
                    <dt className="text-[var(--ink-soft)] font-medium">Region Code</dt>
                    <dd className="text-[var(--ink)] font-semibold mt-0.5">IN-UP (India)</dd>
                  </div>
                </dl>
              </div>

              {/* Transit Distance Matrix */}
              <div className="p-6 bg-[var(--canvas)] border border-[var(--line)] rounded-xl space-y-3 shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                  <Route className="w-4 h-4 text-[var(--brick)]" />
                  <span>Transit Distances to Surrounding Hubs</span>
                </div>

                <div className="space-y-2 text-xs divide-y divide-gray-200">
                  {[
                    { hub: 'Bhadohi Railway Station', dist: '2.8 km', time: '8 mins' },
                    { hub: 'Gyanpur District Collectorate', dist: '12.5 km', time: '18 mins' },
                    { hub: 'Gopiganj (GT Road / NH-19)', dist: '18.0 km', time: '25 mins' },
                    { hub: 'Varanasi Babatpur Airport (VNS)', dist: '48.0 km', time: '55 mins' },
                    { hub: 'Prayagraj Civil Lines Corridor', dist: '78.0 km', time: '1 hr 30 mins' }
                  ].map((item, idx) => (
                    <div key={idx} className="pt-2 flex items-center justify-between text-[var(--ink-soft)]">
                      <span className="font-medium">{item.hub}</span>
                      <span className="text-[var(--brick)] font-mono text-[11px] font-bold">
                        {item.dist} ({item.time})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Site Consultation Banner */}
              <div className="p-5 bg-gradient-to-r from-[var(--brick)]/10 to-[var(--brick)]/5 border border-[var(--line)] rounded-xl flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[var(--ink)]">Need an Engineer on Your Plot?</p>
                  <p className="text-[11px] text-[var(--ink-soft)]">We provide zero-obligation on-site plot inspections across Bhadohi, Mirzapur, Jaunpur, Varanasi & Prayagraj.</p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onOpenConsultationModal}
                  className="whitespace-nowrap"
                >
                  Book Visit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
