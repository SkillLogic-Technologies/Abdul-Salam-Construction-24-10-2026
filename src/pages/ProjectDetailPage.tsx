import React from 'react';
import {
  PROJECTS_DATA
} from '../data/companyData';
import { Button } from '../components/common/Button';
import { useParallax } from '../lib/useParallax';
import {
  MapPin,
  ArrowLeft,
  Calendar,
  Layers,
  FileCheck,
  CheckCircle2,
  HardHat,
  Share2
} from 'lucide-react';
interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
  onOpenConsultationModal: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  const project = PROJECTS_DATA.find((p) => p.slug === slug || p.id === slug) || PROJECTS_DATA[0];
  // Wrapper (not the <img> itself) gets the parallax ref — the image
  // already has its own hover:scale CSS transform, and GSAP setting
  // `transform` via inline style on the same element would silently
  // override that Tailwind class instead of combining with it.
  const heroImgWrapRef = useParallax<HTMLDivElement>({ strength: 30 });

  return (
    <div className="w-full bg-[var(--canvas-alt)]">
      {/* 1. TOP NAVIGATION CRUMBS */}
      <div className="bg-[var(--ink)] text-white border-b border-[#232a3d] py-3 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('/projects')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] hover:text-white transition-colors cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </button>

          <span className="text-xs text-[var(--ink-soft)] font-mono hidden sm:inline">
            Project Ref: {project.id}
          </span>
        </div>
      </div>

      {/* 2. PROJECT HERO HEADER */}
      <section className="bg-[var(--canvas)] text-[var(--ink)] py-12 sm:py-16 border-b border-[var(--line)]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1.5 bg-[var(--brick)] text-white text-[10px] font-black uppercase tracking-wider rounded-md border border-[var(--line)]">
                  {project.category}
                </span>
                <span
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border rounded-md ${
                    project.stage === 'In Progress'
                      ? 'bg-amber-50 text-amber-700 border-[var(--line)]'
                      : 'bg-green-50 text-green-700 border-[var(--line)]'
                  }`}
                >
                  {project.stage}
                </span>
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-[var(--ink)] tracking-tight leading-[1.02]">
                {project.title}
              </h1>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--brick)] font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>{project.location}</span>
              </div>
            </div>

            {/* Quick Summary Card */}
            <div className="lg:col-span-4 bg-[var(--canvas-alt)] p-7 space-y-4 rounded-xl border border-[var(--line)] shadow-elevate">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                Key Project Parameters
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-[var(--line)]/10 pb-2">
                  <span className="text-[var(--ink-soft)]">Built-Up Area:</span>
                  <span className="font-bold text-[var(--ink)]">{project.builtUpArea}</span>
                </div>
                <div className="flex justify-between border-b border-[var(--line)]/10 pb-2">
                  <span className="text-[var(--ink-soft)]">Plot Size:</span>
                  <span className="font-bold text-[var(--ink)]">{project.plotSize}</span>
                </div>
                <div className="flex justify-between border-b border-[var(--line)]/10 pb-2">
                  <span className="text-[var(--ink-soft)]">Floors / Levels:</span>
                  <span className="font-bold text-[var(--ink)]">{project.floors}</span>
                </div>
                <div className="flex justify-between border-b border-[var(--line)]/10 pb-2">
                  <span className="text-[var(--ink-soft)]">Contract Model:</span>
                  <span className="font-bold text-[var(--ink)]">{project.contractType}</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-center"
                  onClick={onOpenQuoteModal}
                >
                  Request Similar Project Estimate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HERO MEDIA GALLERY */}
      <section className="py-12 sm:py-16 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="aspect-16/9 sm:aspect-21/9 overflow-hidden bg-gray-900 border border-[var(--line)] rounded-xl shadow-elevate group">
          {/* Subtle scroll-linked parallax on the wrapper; hover-scale stays
              on the <img> itself so the two transforms don't collide. */}
          <div ref={heroImgWrapRef} className="w-full h-[calc(100%+60px)] -mt-[30px]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 4. OVERVIEW & ENGINEERING SPECIFICATIONS */}
      <section className="pb-16 sm:pb-20 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Description */}
          <div className="lg:col-span-8 bg-[var(--canvas)] border border-[var(--line)] p-8 sm:p-10 space-y-6 rounded-xl shadow-elevate">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brick)]">
                Detailed Case Study
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[var(--ink)] mt-1">
                Project Overview & Execution Scope
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
              {project.overview}
            </p>

            {/* Scope of Work */}
            {project.scopeOfWork && project.scopeOfWork.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-[var(--line)]">
                <h3 className="font-heading font-black text-lg text-[var(--ink)]">
                  Scope of Work Executed:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--ink-soft)]">
                  {project.scopeOfWork.map((scopeItem, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brick)] flex-shrink-0 mt-0.5" />
                      <span>{scopeItem}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights List */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-[var(--line)]">
                <h3 className="font-heading font-black text-lg text-[var(--ink)]">
                  Key Architectural & Structural Highlights:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[var(--ink-soft)]">
                  {project.highlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3.5 bg-[var(--canvas-alt)] rounded-lg border border-[var(--line)]/10">
                      <CheckCircle2 className="w-4 h-4 text-[var(--brick)] flex-shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Execution Stages Timeline */}
            {project.timeline && project.timeline.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-[var(--line)]">
                <h3 className="font-heading font-black text-lg text-[var(--ink)]">
                  Execution Milestone Stages:
                </h3>
                <div className="space-y-3">
                  {project.timeline.map((stg, i) => (
                    <div key={i} className="p-4 bg-[var(--canvas-alt)] rounded-lg border border-[var(--line)]/10 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[var(--ink)] text-[var(--brick)] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 border border-[var(--ink)]">
                        {i + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-xs font-heading font-bold text-[var(--ink)]">{stg.title}</strong>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-[var(--line)] rounded-md text-[var(--ink-soft)] border border-[var(--line)]/20">
                            {stg.status}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--ink-soft)] mt-1">{stg.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Materials & Consultation Action */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[var(--canvas)] border border-[var(--line)] p-6 space-y-4 rounded-xl shadow-elevate">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brick)]">
                Project Specifications
              </span>
              <h3 className="font-heading font-black text-lg text-[var(--ink)]">
                Specification Overview
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-[var(--line)]/10 pb-2">
                  <span className="text-[var(--ink-soft)] font-medium">Applied Package:</span>
                  <strong className="text-[var(--ink)] text-right">{project.packageApplied}</strong>
                </div>
                <div className="flex justify-between border-b border-[var(--line)]/10 pb-2">
                  <span className="text-[var(--ink-soft)] font-medium">Structure Type:</span>
                  <strong className="text-[var(--ink)] text-right">{project.projectType}</strong>
                </div>
                <div className="flex justify-between border-b border-[var(--line)]/10 pb-2">
                  <span className="text-[var(--ink-soft)] font-medium">Location:</span>
                  <strong className="text-[var(--ink)] text-right">{project.location}</strong>
                </div>
                <div className="flex justify-between border-b border-[var(--line)]/10 pb-2">
                  <span className="text-[var(--ink-soft)] font-medium">Status:</span>
                  <strong className="text-[var(--ink)] text-right">{project.stage}</strong>
                </div>
              </div>
            </div>

            <div className="bg-[var(--canvas)] text-[var(--ink)] p-6 border border-[var(--line)] space-y-4 rounded-xl shadow-elevate">
              <HardHat className="w-8 h-8 text-[var(--brick)]" />
              <h3 className="font-heading font-black text-lg text-[var(--ink)]">
                Planning a Similar Build?
              </h3>
              <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                Our site engineers can walk you through the architectural floor plans, 3D structural renders, and BOQ material breakdowns for this exact project.
              </p>
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  onClick={onOpenConsultationModal}
                >
                  Consult Site Engineers
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
