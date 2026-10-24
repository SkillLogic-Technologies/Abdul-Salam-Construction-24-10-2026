import React, { useEffect, useRef, useState } from 'react';
import {
  PACKAGES_DATA,
  SERVICES_DATA
} from '../data/companyData';
import { Button } from '../components/common/Button';
import {
  Calculator,
  CheckCircle2
} from 'lucide-react';
import gsap from 'gsap';

interface GetAQuotePageProps {
  onNavigate: (href: string) => void;
  onOpenConsultationModal: () => void;
}

export const GetAQuotePage: React.FC<GetAQuotePageProps> = ({}) => {
  const [plotArea, setPlotArea] = useState<number>(1500);
  const [floors, setFloors] = useState<number>(2);
  const [selectedService, setSelectedService] = useState('residential-construction');
  const [selectedPackage, setSelectedPackage] = useState('standard');
  const [elevationStyle, setElevationStyle] = useState('Modern Minimalist');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Harirampur / Aurai Road');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const resultBoxRef = useRef<HTMLDivElement>(null);

  const selectedPkg = PACKAGES_DATA.find((p) => p.id === selectedPackage) || PACKAGES_DATA[1];
  const ratePerSqFt = selectedPkg.ratePerSqFt;
  const estimatedBuiltUp = Math.round(plotArea * floors * 0.85); // 85% FAR efficiency
  const baseCost = estimatedBuiltUp * ratePerSqFt;

  // A tiny, cheap "pop" on the live result box whenever the inputs change —
  // one GPU-friendly transform tween, not a layout-affecting animation.
  useEffect(() => {
    const el = resultBoxRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    gsap.fromTo(el, { scale: 0.99 }, { scale: 1, duration: 0.25, ease: 'power2.out' });
  }, [plotArea, floors, selectedPackage]);

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
      {/* PAGE HEADER */}
      <section className="bg-[var(--canvas)] text-[var(--ink)] py-14 sm:py-20 border-b border-[var(--line)]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-4">
          <div className="vh-eyebrow">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Cost Calculator & BOQ</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-[var(--ink)] tracking-tight leading-[1.0]">
            Calculate Construction Cost for Your Plot
          </h1>

          <p className="text-sm sm:text-base text-[var(--ink-soft)] max-w-3xl leading-relaxed">
            Estimate your residential home or commercial project budget across Bhadohi, Mirzapur, Jaunpur, Varanasi & Prayagraj with transparent rate parameters.
          </p>
        </div>
      </section>

      {/* CALCULATOR & FORM GRID */}
      <section className="py-16 sm:py-20 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Calculator Controls & Live Estimate */}
          <div className="lg:col-span-7 bg-[var(--canvas)] border border-[var(--line)] p-7 sm:p-9 space-y-8 rounded-xl shadow-elevate">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brick)]">
                Step 1: Configuration
              </span>
              <h2 className="font-heading font-black text-2xl text-[var(--ink)] mt-1">
                Project Parameters
              </h2>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-2">
                Construction Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICES_DATA.map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedService(srv.id)}
                    className={`p-3 text-left border text-xs font-bold transition-all cursor-pointer rounded-lg active:scale-95 ${
                      selectedService === srv.id
                        ? 'border-[var(--brick)] bg-[var(--brick)]/10 text-[var(--brick)] shadow-elevate'
                        : 'border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--canvas-alt)]'
                    }`}
                  >
                    {srv.title}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-2">
                Specification Tier
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PACKAGES_DATA.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`p-3.5 text-left border transition-all cursor-pointer rounded-lg active:scale-95 ${
                      selectedPackage === pkg.id
                        ? 'border-[var(--brick)] bg-[var(--brick)]/10 shadow-elevate'
                        : 'border-[var(--line)] hover:bg-[var(--canvas-alt)]'
                    }`}
                  >
                    <p className={`text-xs font-black ${selectedPackage === pkg.id ? 'text-[var(--brick)]' : 'text-[var(--ink)]'}`}>
                      {pkg.name}
                    </p>
                    <p className="text-[11px] font-bold text-[var(--ink-soft)] mt-1">
                      ₹{pkg.ratePerSqFt}/sq.ft
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-[var(--ink-soft)]">Plot / Ground Area</span>
                <span className="font-extrabold text-[var(--brick)] text-sm">{plotArea} sq.ft</span>
              </div>
              <input
                type="range"
                min="600"
                max="5000"
                step="50"
                value={plotArea}
                onChange={(e) => setPlotArea(Number(e.target.value))}
                className="w-full accent-[var(--brick)] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[var(--ink-soft)]">
                <span>600 sq.ft (Single plot)</span>
                <span>2500 sq.ft (Standard duplex)</span>
                <span>5000 sq.ft (Large villa)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-[var(--ink-soft)]">Number of Floors</span>
                <span className="font-extrabold text-[var(--brick)] text-sm">
                  {floors === 1 ? 'Ground Floor Only' : `Ground + ${floors - 1} Floors (${floors} Levels)`}
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
            </div>

            <div
              ref={resultBoxRef}
              className="bg-[var(--canvas-alt)] text-[var(--ink)] p-6 space-y-4 rounded-xl border border-[var(--line)]"
            >
              <div className="flex justify-between items-start border-b border-[var(--line)] pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brick)]">
                    Estimated Built-Up Area
                  </span>
                  <p className="font-heading font-black text-2xl text-[var(--ink)]">
                    {estimatedBuiltUp.toLocaleString()} <span className="text-xs font-normal text-[var(--ink-soft)]">sq.ft</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                    Base Package Rate
                  </span>
                  <p className="font-heading font-black text-xl text-[var(--ink)]">
                    ₹{ratePerSqFt}/sq.ft
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[var(--ink-soft)] block">Calculated Budget Range:</span>
                  <p className="font-heading font-black text-2xl sm:text-3xl text-[var(--brick)]">
                    ₹{(baseCost * 0.96).toLocaleString('en-IN')} – ₹{(baseCost * 1.05).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: BOQ Request Submission Form */}
          <div className="lg:col-span-5 bg-[var(--canvas)] border border-[var(--line)] p-7 sm:p-9 rounded-xl shadow-elevate">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-50 border border-[var(--line)] text-green-600 flex items-center justify-center mx-auto rounded-full">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-heading font-black text-2xl text-[var(--ink)]">
                  Estimate Request Received!
                </h3>
                <p className="text-xs sm:text-sm text-[var(--ink-soft)]">
                  Thank you, <span className="font-bold text-[var(--ink)]">{name}</span>. A detailed Bill of Quantities (BOQ) with material breakdown for your <span className="font-bold text-[var(--ink)]">{estimatedBuiltUp} sq.ft</span> project will be shared to <span className="font-bold text-[var(--ink)]">{phone}</span> via WhatsApp.
                </p>
                <div className="pt-4">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setPhone('');
                    }}
                  >
                    Calculate Another Estimate
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brick)]">
                    Step 2: Get Formal BOQ
                  </span>
                  <h3 className="font-heading font-black text-xl text-[var(--ink)] mt-1">
                    Receive Itemized Bill of Quantities
                  </h3>
                  <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                    Our site engineers will cross-check your estimate with current cement/steel rates across Bhadohi, Mirzapur, Jaunpur, Varanasi & Prayagraj.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mohd. Aslam"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[var(--line)] text-xs focus:border-[var(--brick)] focus:outline-none rounded-lg transition-all bg-[var(--canvas)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[var(--line)] text-xs focus:border-[var(--brick)] focus:outline-none rounded-lg transition-all bg-[var(--canvas)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                    Plot Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Harirampur, Aurai Road, Bhadohi / Mirzapur / Jaunpur / Varanasi / Prayagraj"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[var(--line)] text-xs focus:border-[var(--brick)] focus:outline-none rounded-lg transition-all bg-[var(--canvas)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                    Elevation / Architectural Style Preference
                  </label>
                  <select
                    value={elevationStyle}
                    onChange={(e) => setElevationStyle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[var(--line)] text-xs focus:border-[var(--brick)] focus:outline-none bg-[var(--canvas)] rounded-lg transition-all"
                  >
                    <option value="Modern Minimalist">Modern Minimalist Glass & Louvers</option>
                    <option value="Classic Indian Contemporary">Classic Indian Contemporary</option>
                    <option value="Ultra-Luxury Villa Aesthetics">Ultra-Luxury Villa Aesthetics</option>
                    <option value="Commercial Showroom Facade">Commercial Showroom Facade</option>
                  </select>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full justify-center"
                  >
                    SEND DETAILED BOQ TO MY WHATSAPP
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
