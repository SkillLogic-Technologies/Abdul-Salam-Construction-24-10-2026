import React, { useEffect, useRef, useState } from 'react';
import { X, Calculator, CheckCircle2, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { PACKAGES_DATA, SERVICES_DATA } from '../../data/companyData';
import { Button } from '../common/Button';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackageId?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  defaultPackageId
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = useState('residential-construction');
  const [selectedPackage, setSelectedPackage] = useState(defaultPackageId || 'standard');
  const [plotArea, setPlotArea] = useState<number>(1200);
  const [floors, setFloors] = useState<number>(2);
  const [location, setLocation] = useState('Bhadohi City');
  const [customLocation, setCustomLocation] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.96, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  // scaleX, not `width` — width is layout-triggering (forces reflow+paint
  // on every tween frame); the element is always rendered at full width and
  // scaled from its left edge instead, which is compositor-only. Same
  // pattern already used for Hero.tsx's scrub-progress bar.
  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: step >= 2 ? 1 : 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }, [step]);

  const currentPkg = PACKAGES_DATA.find((p) => p.id === selectedPackage) || PACKAGES_DATA[1];
  const ratePerSqFt = currentPkg.ratePerSqFt;
  const totalBuiltUpArea = Math.round(plotArea * floors * 0.85); // 85% FAR guideline
  const estimatedCost = totalBuiltUpArea * ratePerSqFt;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
      <div
        ref={panelRef}
        className="relative w-full max-w-2xl bg-[var(--canvas)] border border-[var(--line)] shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)] overflow-hidden my-8 rounded-xl"
      >
        {/* Header */}
        <div className="bg-[var(--canvas-alt)] text-[var(--ink)] p-6 flex items-center justify-between border-b border-[var(--line)]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[var(--brick)]/10 text-[var(--brick)] rounded-lg border border-[var(--line)]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg sm:text-xl tracking-tight text-[var(--ink)]">
                Instant Construction Quote Estimator
              </h3>
              <p className="text-xs text-[var(--ink-soft)]">
                Abdul Salam Construction Company • Bhadohi, UP
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

        {/* Body Content */}
        {isSubmitted ? (
          <div className="p-8 sm:p-12 text-center space-y-5">
            <div className="w-16 h-16 bg-green-50 border border-green-700 text-green-600 flex items-center justify-center mx-auto rounded-full">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-heading font-black text-2xl text-[var(--ink)]">
              Quote Request Received!
            </h4>
            <p className="text-sm text-[var(--ink-soft)] max-w-md mx-auto">
              Thank you, <span className="font-bold text-[var(--ink)]">{name || 'valued client'}</span>. Our senior site engineer will review your project parameters (approx. {totalBuiltUpArea.toLocaleString()} sq.ft built-up in {location}) and contact you with a customized bill of quantities (BOQ).
            </p>
            <div className="p-4 bg-[var(--canvas-alt)] border border-[var(--line)] max-w-md mx-auto text-left text-xs space-y-1.5 rounded-lg">
              <p><span className="font-bold text-[var(--ink-soft)]">Estimated Range:</span> ₹{(estimatedCost * 0.95).toLocaleString('en-IN')} – ₹{(estimatedCost * 1.08).toLocaleString('en-IN')}</p>
              <p><span className="font-bold text-[var(--ink-soft)]">Package Spec:</span> {currentPkg.name} ({currentPkg.tier})</p>
              <p><span className="font-bold text-[var(--ink-soft)]">Office Helpline:</span> info@abdulsalamconstruction.com</p>
            </div>
            <Button variant="primary" size="md" onClick={handleReset} className="w-full sm:w-auto">
              Done & Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Step indicator */}
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
              <div className="flex items-center gap-2.5">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 border border-[var(--line)] ${step >= 1 ? 'bg-[var(--brick)] text-white' : 'bg-[var(--canvas-alt)] text-[var(--ink-soft)]'}`}>
                  1
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">Project Specs</span>
              </div>
              <div className="h-0.5 flex-1 mx-4 bg-[var(--line)] rounded-full overflow-hidden">
                <div
                  ref={progressRef}
                  className="h-full w-full bg-[var(--brick)] origin-left"
                  style={{ transform: `scaleX(${step >= 2 ? 1 : 0})` }}
                />
              </div>
              <div className="flex items-center gap-2.5">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 border border-[var(--line)] ${step >= 2 ? 'bg-[var(--brick)] text-white' : 'bg-[var(--canvas-alt)] text-[var(--ink-soft)]'}`}>
                  2
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">Contact Details</span>
              </div>
            </div>

            {step === 1 ? (
              <div className="space-y-5">
                {/* Service Type Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-2">
                    1. Select Construction Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SERVICES_DATA.map((srv) => (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => setSelectedService(srv.id)}
                        className={`p-3 text-left border text-xs font-bold transition-all cursor-pointer rounded-lg ${
                          selectedService === srv.id
                            ? 'border-[var(--brick)] bg-[var(--brick)]/10 text-[var(--brick)] shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)]'
                            : 'border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--canvas-alt)]'
                        }`}
                      >
                        {srv.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Package Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-2">
                    2. Choose Quality / Finishes Package
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {PACKAGES_DATA.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackage(pkg.id)}
                        className={`p-3 text-left border transition-all cursor-pointer rounded-lg ${
                          selectedPackage === pkg.id
                            ? 'border-[var(--brick)] bg-[var(--brick)]/10 shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)]'
                            : 'border-[var(--line)] hover:bg-[var(--canvas-alt)]'
                        }`}
                      >
                        <p className={`text-xs font-black ${selectedPackage === pkg.id ? 'text-[var(--brick)]' : 'text-[var(--ink)]'}`}>
                          {pkg.name}
                        </p>
                        <p className="text-[11px] font-bold text-[var(--ink-soft)] mt-0.5">
                          ₹{pkg.ratePerSqFt}/sq.ft
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Plot Dimensions & Floors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                        Plot / Ground Area (Sq.Ft)
                      </label>
                      <span className="text-xs font-extrabold text-[var(--brick)]">{plotArea} sq.ft</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="5000"
                      step="50"
                      value={plotArea}
                      onChange={(e) => setPlotArea(Number(e.target.value))}
                      className="w-full accent-[var(--brick)] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[var(--ink-soft)] mt-1">
                      <span>500 sq.ft</span>
                      <span>2500 sq.ft</span>
                      <span>5000+ sq.ft</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                        Number of Floors
                      </label>
                      <span className="text-xs font-extrabold text-[var(--brick)]">
                        {floors === 1 ? 'Ground Only (G)' : `G + ${floors - 1} (${floors} Floors)`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      step="1"
                      value={floors}
                      onChange={(e) => setFloors(Number(e.target.value))}
                      className="w-full accent-[var(--brick)] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[var(--ink-soft)] mt-1">
                      <span>1 Floor</span>
                      <span>2 Floors</span>
                      <span>3 Floors</span>
                      <span>4 Floors</span>
                    </div>
                  </div>
                </div>

                {/* Real-time Calculation Summary Strip */}
                <div className="p-5 bg-[var(--canvas-alt)] border border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-soft)]">Approx. Built-up Area</span>
                    <p className="font-heading font-black text-lg text-[var(--ink)]">
                      {totalBuiltUpArea.toLocaleString()} <span className="text-xs font-medium text-[var(--ink-soft)]">sq.ft</span>
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--brick)]">Estimated Project Cost</span>
                    <p className="font-heading font-black text-xl text-[var(--brick)]">
                      ₹{estimatedCost.toLocaleString('en-IN')}{' '}
                      <span className="text-[10px] font-normal text-[var(--ink-soft)]">approx.*</span>
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    showArrow
                    onClick={() => setStep(2)}
                  >
                    Continue to Contact Info
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mohammad Arif"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-[var(--line)] text-sm focus:border-[var(--brick)] focus:outline-none rounded-lg transition-colors bg-[var(--canvas)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1.5">
                      Phone / WhatsApp Number *
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="client@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-[var(--line)] text-sm focus:border-[var(--brick)] focus:outline-none rounded-lg transition-colors bg-[var(--canvas)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1.5">
                      Plot / Site Location *
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-3 border border-[var(--line)] text-sm focus:border-[var(--brick)] focus:outline-none bg-[var(--canvas)] rounded-lg transition-colors"
                    >
                      <option value="Bhadohi City (Harirampur / Aurai Road)">Bhadohi City (Harirampur / Aurai Road)</option>
                      <option value="Civil Lines / Station Road Bhadohi">Civil Lines / Station Road Bhadohi</option>
                      <option value="Gyanpur Town & Tehsil">Gyanpur Town & Tehsil</option>
                      <option value="Gopiganj GT Road Belt">Gopiganj GT Road Belt</option>
                      <option value="Suriyawan & Nearby">Suriyawan & Nearby</option>
                      <option value="Aurai Corridor">Aurai Corridor</option>
                      <option value="Mirzapur">Mirzapur</option>
                      <option value="Jaunpur">Jaunpur</option>
                      <option value="Varanasi">Varanasi</option>
                      <option value="Prayagraj">Prayagraj</option>
                      <option value="Other">Other (Specify Below)</option>
                    </select>
                  </div>
                </div>

                {location === 'Other' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1.5">
                      Specific Location / Landmark
                    </label>
                    <input
                      type="text"
                      placeholder="Village / Mohalla name in Bhadohi, Mirzapur, Jaunpur, Varanasi, Prayagraj or adjacent district"
                      value={customLocation}
                      onChange={(e) => setCustomLocation(e.target.value)}
                      className="w-full px-4 py-3 border border-[var(--line)] text-sm focus:border-[var(--brick)] focus:outline-none rounded-lg transition-colors bg-[var(--canvas)]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1.5">
                    Specific Requirements / Questions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Looking for RCC framed structure, modular kitchen, and front elevation modern facade..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full px-4 py-3 border border-[var(--line)] text-sm focus:border-[var(--brick)] focus:outline-none resize-none rounded-lg transition-colors bg-[var(--canvas)]"
                  />
                </div>

                <div className="p-4 bg-[var(--brick)]/5 border border-[var(--line)] text-xs text-[var(--ink-soft)] flex items-center gap-2 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-[var(--brick)] flex-shrink-0" />
                  <span>Your details are confidential and used solely for authentic site consultation.</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] hover:text-[var(--ink)] cursor-pointer"
                  >
                    ← Back to Specs
                  </button>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isSubmitting}
                    showArrow
                  >
                    Submit Quote Request
                  </Button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
