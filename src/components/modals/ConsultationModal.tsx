import React, { useEffect, useRef, useState } from 'react';
import { X, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { Button } from '../common/Button';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [projectType, setProjectType] = useState('New Home Construction');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.96, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
      <div
        ref={panelRef}
        className="relative w-full max-w-lg bg-[var(--canvas)] border border-[var(--line)] shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)] overflow-hidden my-8 rounded-xl"
      >
        {/* Header */}
        <div className="bg-[var(--canvas-alt)] text-[var(--ink)] p-6 flex items-center justify-between border-b border-[var(--line)]">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-[var(--brick)]/10 text-[var(--brick)] rounded-lg border border-[var(--line)]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg tracking-tight text-[var(--ink)]">
                Schedule a Site Consultation
              </h3>
              <p className="text-xs text-[var(--ink-soft)]">
                Expert On-Site Evaluation & Soil / Layout Assessment
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-black/5 transition-colors cursor-pointer rounded-full border border-[var(--line)]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-50 border border-green-700 text-green-600 flex items-center justify-center mx-auto rounded-full">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-heading font-black text-xl text-[var(--ink)]">
              Consultation Request Confirmed!
            </h4>
            <p className="text-xs sm:text-sm text-[var(--ink-soft)]">
              Thank you, <span className="font-bold text-[var(--ink)]">{name}</span>. An engineer from our Bhadohi office will call your number (<span className="font-semibold">{phone}</span>) to verify the site address and schedule the inspection.
            </p>
            <div className="p-4 bg-[var(--canvas-alt)] border border-[var(--line)] text-left text-xs space-y-1 rounded-lg">
              <p><span className="font-bold text-[var(--ink-soft)]">Office Location:</span> Opposite H.P. Petrol Pump, Aurai Road, Bhadohi</p>
              <p><span className="font-bold text-[var(--ink-soft)]">Service Area:</span> Harirampur, Gyanpur, Gopiganj, Suriyawan</p>
            </div>
            <Button variant="primary" size="md" onClick={handleReset} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rajesh Kumar Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-[var(--line)] text-sm focus:border-[var(--brick)] focus:outline-none rounded-lg transition-colors bg-[var(--canvas)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-[var(--line)] text-sm focus:border-[var(--brick)] focus:outline-none rounded-lg transition-colors bg-[var(--canvas)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                  Project Type
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-[var(--line)] text-xs font-medium focus:border-[var(--brick)] focus:outline-none bg-[var(--canvas)] rounded-lg transition-colors"
                >
                  <option value="New Home Construction">New Home Construction</option>
                  <option value="Residential Villa / Duplex">Residential Villa / Duplex</option>
                  <option value="Renovation & Floor Addition">Renovation & Floor Addition</option>
                  <option value="Commercial Complex / Shop">Commercial Complex / Shop</option>
                  <option value="RCC Structural Framework">RCC Structural Framework</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                  Preferred Visit Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-[var(--line)] text-xs focus:border-[var(--brick)] focus:outline-none rounded-lg transition-colors bg-[var(--canvas)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                Site Address / Landmark *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Near Harirampur Mandir, Aurai Road, Bhadohi / Mirzapur / Jaunpur / Varanasi / Prayagraj"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border border-[var(--line)] text-sm focus:border-[var(--brick)] focus:outline-none rounded-lg transition-colors bg-[var(--canvas)]"
              />
            </div>

            <div className="p-4 bg-[var(--canvas-alt)] border border-[var(--line)] text-xs text-[var(--ink-soft)] flex items-start gap-2 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-[var(--brick)] flex-shrink-0 mt-0.5" />
              <span>Our structural civil engineer will visit the site with soil guidance and boundary layout verification.</span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              className="w-full justify-center"
            >
              Confirm Site Visit Request
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
