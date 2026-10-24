import React from 'react';
import {
  MapPin,
  Clock,
  Mail,
  Phone,
  ArrowRight,
  ChevronRight,
  Globe,
  Navigation,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Heart
} from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY_DATA, SERVICES_DATA, SERVICE_AREAS_DATA } from '../../data/companyData';

interface FooterProps {
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuoteModal }) => {
  const currentYear = new Date().getFullYear();

  const handleLink = (href: string) => {
    onNavigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialIcons = [
    { Icon: Facebook, href: COMPANY_DATA.socialLinks.facebook, label: 'Facebook' },
    { Icon: Instagram, href: COMPANY_DATA.socialLinks.instagram, label: 'Instagram' },
    { Icon: Linkedin, href: COMPANY_DATA.socialLinks.linkedin, label: 'LinkedIn' },
    { Icon: Youtube, href: COMPANY_DATA.socialLinks.youtube, label: 'YouTube' }
  ].filter((s) => s.href);

  return (
    <footer className="bg-[var(--footer-bg)] text-[var(--footer-ink)] w-full relative overflow-hidden">
      {/* ambient blue glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[var(--brick)]/[0.10] blur-[120px] rounded-full" />

      {/* Top Banner: Quick Contact & Quote Strip */}
      <div className="relative border-b border-white/[0.08] bg-white/[0.03] py-9 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full">
        <div className="w-full max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-7">
          <div className="flex items-center gap-5">
            <div className="p-3.5 bg-[var(--brick)]/15 border border-[var(--brick)]/40 text-[var(--brick)] rounded-lg">
              <Phone className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-medium text-white font-heading tracking-tight">
                Planning a Construction Project in Bhadohi, Mirzapur, Jaunpur, Varanasi or Prayagraj?
              </h3>
              <p className="text-xs sm:text-sm text-[#c3cad6] mt-1">
                Get an authentic cost estimate, 2D/3D architectural consultation, and dependable engineering supervision.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-3 bg-[var(--brick)] hover:bg-[var(--brick-deep)] text-white text-xs sm:text-sm font-medium uppercase tracking-[0.06em] transition-colors duration-200 cursor-pointer flex items-center gap-2 group rounded-full shadow-[0_8px_20px_rgba(201, 162, 74,0.28)]"
            >
              <span>GET FREE ESTIMATE</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => handleLink('/contact')}
              className="px-6 py-3 bg-transparent hover:bg-white/[0.08] text-white text-xs sm:text-sm font-medium uppercase tracking-[0.06em] transition-colors duration-200 border border-white/[0.24] cursor-pointer rounded-full"
            >
              Contact Our Office
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links — 5 column layout matching reference structure */}
      <div className="relative w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Column 1: Brand / Logo + description + social */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            {/* logo.png has a solid white background baked in (no alpha
                channel) — wrap it in a small white card here since the rest
                of the footer stays dark, so it never shows as a stray white
                box floating directly on the dark background. */}
            <div className="inline-block bg-white rounded-lg px-3 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
              <Logo variant="footer" size="sm" />
            </div>

            <p className="text-xs sm:text-sm text-[#8891a0] leading-relaxed max-w-sm">
              Abdul Salam Construction Company is a premier residential and commercial construction firm operating across Bhadohi, Mirzapur, Jaunpur, Varanasi & Prayagraj, Uttar Pradesh. We focus on transparent contracts, high-grade materials, and dependable on-site engineering supervision.
            </p>

            {socialIcons.length > 0 && (
              <div className="flex items-center gap-2.5 pt-1">
                {socialIcons.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 flex items-center justify-center bg-white/[0.08] hover:bg-white/[0.18] border border-white/[0.24] text-[#c3cad6] hover:text-white rounded-full transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-white/90 pb-2.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brick)] flex-shrink-0" aria-hidden="true" />
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/');
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-white" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a
                  href="/packages"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/packages');
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-white" />
                  <span>Construction Packages</span>
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/projects');
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-white" />
                  <span>Our Projects</span>
                </a>
              </li>
              <li>
                <a
                  href="/get-a-quote"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/get-a-quote');
                  }}
                  className="hover:text-white font-semibold text-white transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-white" />
                  <span>Get A Free Quote</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Project Types (mirrors the homepage "Explore Project Types" categories) */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-white/90 pb-2.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brick)] flex-shrink-0" aria-hidden="true" />
              Project Types
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {SERVICES_DATA.slice(0, 6).map((srv) => (
                <li key={srv.id}>
                  <a
                    href={`/services#${srv.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLink(`/services#${srv.slug}`);
                    }}
                    className="hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-white transition-colors" />
                    <span>{srv.title.replace(' Construction', '').replace(' & Interior Work', '').replace(' & Remodeling', '')}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-white/90 pb-2.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brick)] flex-shrink-0" aria-hidden="true" />
              Company
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/about');
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-white" />
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/projects');
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-white" />
                  <span>Our Portfolio</span>
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/contact');
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-white" />
                  <span>Terms &amp; Conditions</span>
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/contact');
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-white" />
                  <span>Privacy Policy</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Us */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-white/90 pb-2.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brick)] flex-shrink-0" aria-hidden="true" />
              Contact Us
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#c3cad6]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                <span>
                  {COMPANY_DATA.address.line1}, {COMPANY_DATA.address.line2},{' '}
                  {COMPANY_DATA.address.city} - {COMPANY_DATA.address.pincode},{' '}
                  {COMPANY_DATA.address.state}, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-white flex-shrink-0" />
                <span>{COMPANY_DATA.contact.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-white flex-shrink-0" />
                <span>{COMPANY_DATA.contact.emailDisplay}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                <span>{COMPANY_DATA.contact.officeHours}</span>
              </div>
            </div>

            <ul className="mt-5 pt-4 border-t border-white/[0.08] space-y-2">
              {SERVICE_AREAS_DATA.slice(0, 4).map((area) => (
                <li key={area.id} className="flex items-start gap-1.5 text-xs text-[#8891a0]">
                  <MapPin className="w-3.5 h-3.5 text-[#8891a0] flex-shrink-0 mt-0.5" />
                  <span>{area.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Popular Search Localities Banner */}
        <div className="mt-12 pt-8 border-t border-white/[0.08]">
          <p className="text-xs font-bold text-[#8891a0] uppercase tracking-wider mb-3">
            Popular Construction Locations in Bhadohi & Surrounding Corridors:
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-[#c3cad6]">
            {[
              'Harirampur',
              'Aurai Road',
              'Civil Lines Bhadohi',
              'Station Road',
              'Maryadpatti',
              'Gyanpur',
              'Gopiganj GT Road',
              'Suriyawan',
              'Aurai Tehsil',
              'Khamaria',
              'Chauri Road',
              'Varanasi-Bhadohi Corridor'
            ].map((loc, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.24] hover:border-white/40 hover:bg-white/[0.1] hover:text-white transition-all cursor-default rounded-full"
              >
                {loc}
              </span>
            ))}
          </div>
        </div>

        {/* Local GEO & Business Verification Strip (Local SEO & GEO) */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8891a0]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-1.5 text-[#c3cad6]">
              <Navigation className="w-3.5 h-3.5 text-white" />
              <span>Geo Coordinates:</span>
              <strong className="text-white font-mono">25.3956° N, 82.5698° E</strong>
            </div>
            <div className="flex items-center gap-1.5 text-[#c3cad6]">
              <Globe className="w-3.5 h-3.5 text-white" />
              <span>Region:</span>
              <strong className="text-white">Bhadohi (IN-UP, PIN 221401)</strong>
            </div>
            <div className="flex items-center gap-1.5 text-[#c3cad6]">
              <span>GSTIN:</span>
              <strong className="text-white font-mono">{COMPANY_DATA.gstin}</strong>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://maps.google.com/?q=25.3956,82.5698"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c3cad6] hover:text-white transition-colors flex items-center gap-1"
            >
              <span>View Office on Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-[var(--ink-soft)]">|</span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c3cad6] hover:text-white transition-colors flex items-center gap-1"
            >
              <span>XML Sitemap</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-[var(--ink-soft)]">|</span>
            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c3cad6] hover:text-white transition-colors flex items-center gap-1 font-mono text-[11px]"
              title="Machine-readable Generative Engine Optimization feed"
            >
              <span>llms.txt</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Terms */}
      <div className="bg-black/20 py-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t border-white/[0.06] text-xs text-[#8891a0] w-full relative">
        <div className="w-full max-w-[1920px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {currentYear} Abdul Salam Construction Company. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => handleLink('/contact')}
              className="hover:text-[#c3cad6] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleLink('/contact')}
              className="hover:text-[#c3cad6] transition-colors"
            >
              Terms
            </button>
            <button
              onClick={() => handleLink('/contact')}
              className="hover:text-[#c3cad6] transition-colors"
            >
              Site Consultation
            </button>
          </div>

          <p className="flex items-center gap-1.5">
            <span>Designed with</span>
            <Heart className="w-3 h-3 fill-[var(--brick)] text-[var(--brick)]" />
            <span>in Bhadohi, UP</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
