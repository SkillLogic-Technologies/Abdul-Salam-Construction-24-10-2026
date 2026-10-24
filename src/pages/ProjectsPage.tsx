import React, { useEffect, useRef, useState } from 'react';
import {
  PROJECTS_DATA
} from '../data/companyData';
import { Button } from '../components/common/Button';
import {
  MapPin,
  HardHat,
  Filter
} from 'lucide-react';
import gsap from 'gsap';
import { useScrollReveal } from '../lib/useScrollReveal';

interface ProjectsPageProps {
  onNavigate: (href: string) => void;
  onOpenConsultationModal: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onNavigate,
  onOpenConsultationModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStage, setSelectedStage] = useState<string>('All');
  // The very first render's reveal is scroll-triggered (once: true, fires
  // only when the grid actually scrolls into view — see useScrollReveal.ts)
  // rather than firing unconditionally on mount the way the filter
  // re-animation below correctly does. Without this, a visitor who hadn't
  // scrolled the grid into view yet would find the cards already fully
  // faded in the moment they got there — the reveal would have finished
  // invisibly before it could be seen.
  const gridRef = useScrollReveal<HTMLDivElement>({ selector: '[data-project-tile]', stagger: 0.06, y: 16, duration: 0.6 });
  const isFirstRender = useRef(true);

  const categories = ['All', 'Residential', 'Commercial', 'Villas'];
  const stages = ['All', 'In Progress', 'Completed'];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesStage = selectedStage === 'All' || project.stage === selectedStage;
    return matchesCategory && matchesStage;
  });

  // Re-animate the grid as one batched stagger whenever the filter result
  // set changes (a genuine user-driven, in-view interaction — not an
  // initial reveal, so this stays immediate/unconditional rather than
  // scroll-gated) — a single tween pass instead of independent exit/enter
  // animations per card competing for the frame budget. Skips the very
  // first render since useScrollReveal above already owns that initial
  // scroll-into-view animation; running both on mount would double-animate
  // the same cards.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const el = gridRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = el.querySelectorAll<HTMLElement>('[data-project-tile]');
    if (reduce || cards.length === 0) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.05 }
    );
  }, [selectedCategory, selectedStage]);

  return (
    <div className="w-full bg-[var(--canvas-alt)]">
      {/* PAGE HEADER */}
      <section className="bg-[var(--canvas)] text-[var(--ink)] py-14 sm:py-20 border-b border-[var(--line)]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-4">
          <div className="vh-eyebrow">
            <HardHat className="w-3.5 h-3.5" />
            <span>Site Execution Portfolio</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-[var(--ink)] tracking-tight leading-[1.0]">
            Our Projects in Bhadohi
          </h1>

          <p className="text-sm sm:text-base text-[var(--ink-soft)] max-w-3xl leading-relaxed">
            Real residential duplex homes, commercial retail complexes, and custom villas executed with engineering precision across Harirampur, Aurai Road, Gyanpur, and Bhadohi town.
          </p>
        </div>
      </section>

      {/* FILTER STRIP */}
      <section className="bg-[var(--canvas)] border-b border-[var(--line)] sticky top-16 z-30">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="vh-scroll-hint flex-1 min-w-0">
          <div className="vh-scroll-fade flex items-center gap-2 overflow-x-auto">
            <div className="flex items-center gap-1 text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider mr-2">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-lg border ${
                  selectedCategory === cat
                    ? 'bg-[var(--ink)] text-white border-[var(--ink)] shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)]'
                    : 'bg-[var(--canvas-alt)] text-[var(--ink-soft)] border-[var(--line)] hover:bg-[var(--line)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">Status:</span>
            {stages.map((stg) => (
              <button
                key={stg}
                onClick={() => setSelectedStage(stg)}
                className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-lg border ${
                  selectedStage === stg
                    ? 'bg-[var(--brick)] text-white border-[var(--brick)] shadow-[0_20px_60px_-20px_rgba(15,20,32,0.25)]'
                    : 'bg-[var(--canvas-alt)] text-[var(--ink-soft)] border-[var(--line)] hover:bg-[var(--line)]'
                }`}
              >
                {stg}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="py-16 sm:py-20 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-12">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
            Showing <span className="text-[var(--ink)]">{filteredProjects.length}</span> Verified Projects
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 auto-rows-[minmax(0,1fr)]">
          {filteredProjects.map((project, idx) => {
            const isOngoing = project.stage === 'In Progress';
            const isFeatured = idx === 0;
            return (
              <div
                key={project.id}
                data-project-tile
                className={`bg-[var(--canvas)] border border-[var(--line)] overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-200 rounded-xl ${
                  isFeatured ? 'lg:col-span-7 lg:row-span-2 shadow-elevate' : 'lg:col-span-5 shadow-elevate'
                }`}
              >
                <div>
                  <div className={`relative overflow-hidden bg-gray-900 ${isFeatured ? 'aspect-16/9' : 'aspect-16/10'}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-black/80 text-white text-[10px] font-bold uppercase tracking-wider border border-white/20 rounded-md">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isOngoing ? 'bg-[var(--brick)] animate-pulse' : 'bg-emerald-400'
                        }`}
                      />
                      <span>{project.stage}</span>
                    </div>

                    <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-[var(--ink)] text-[var(--brick)] text-[10px] font-mono font-bold rounded-md border border-[var(--brick)]/40">
                      {project.builtUpArea}
                    </div>

                    {isFeatured && (
                      <div className="absolute top-3 right-3 px-3 py-1.5 bg-[var(--brick)] text-white text-[10px] font-black uppercase tracking-wider rounded-md">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className={`space-y-4 ${isFeatured ? 'p-7 sm:p-8' : 'p-6'}`}>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-[var(--brick)] font-bold uppercase tracking-wider mb-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{project.location}</span>
                      </div>

                      <h3 className={`font-heading font-black text-[var(--ink)] group-hover:text-[var(--brick)] transition-colors leading-snug ${isFeatured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
                        {project.title}
                      </h3>

                      <p className={`text-[var(--ink-soft)] mt-2 leading-relaxed ${isFeatured ? 'text-sm line-clamp-3 max-w-xl' : 'text-xs line-clamp-3'}`}>
                        {project.overview}
                      </p>
                    </div>

                    <div className={`gap-2 pt-3 border-t border-[var(--line)] text-xs ${isFeatured ? 'grid grid-cols-4' : 'grid grid-cols-2'}`}>
                      <div className="p-2.5 bg-[var(--canvas-alt)] rounded-lg border border-[var(--line)]">
                        <span className="text-[10px] text-[var(--ink-soft)] block uppercase font-bold">Category</span>
                        <span className="font-bold text-[var(--ink)]">{project.category}</span>
                      </div>
                      <div className="p-2.5 bg-[var(--canvas-alt)] rounded-lg border border-[var(--line)]">
                        <span className="text-[10px] text-[var(--ink-soft)] block uppercase font-bold">Completion</span>
                        <span className="font-bold text-[var(--ink)]">{project.completionYear || 'Active'}</span>
                      </div>
                      {isFeatured && (
                        <>
                          <div className="p-2.5 bg-[var(--canvas-alt)] rounded-lg border border-[var(--line)]">
                            <span className="text-[10px] text-[var(--ink-soft)] block uppercase font-bold">Built-Up</span>
                            <span className="font-bold text-[var(--ink)]">{project.builtUpArea}</span>
                          </div>
                          <div className="p-2.5 bg-[var(--canvas-alt)] rounded-lg border border-[var(--line)]">
                            <span className="text-[10px] text-[var(--ink-soft)] block uppercase font-bold">Stage</span>
                            <span className="font-bold text-[var(--ink)]">{project.stage}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`pt-0 ${isFeatured ? 'p-7 sm:p-8' : 'p-6'}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-between"
                    showArrow
                    onClick={() => onNavigate(`/projects/${project.id}`)}
                  >
                    View Case Study & Specs
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-[var(--canvas)] border border-[var(--line)] p-8 rounded-xl shadow-elevate">
            <HardHat className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg text-[var(--ink)]">No Projects Found</h3>
            <p className="text-xs text-[var(--ink-soft)] mt-1">Try resetting your category or status filters above.</p>
            <div className="mt-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedStage('All');
                }}
              >
                Reset All Filters
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* SITE VISIT CTA */}
      <section className="bg-[var(--canvas-alt)] text-[var(--ink)] py-14 px-4 sm:px-6 lg:px-8 border-t border-[var(--line)]">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-[var(--ink)] tracking-tight">
            Want to Inspect One of Our Live Construction Sites in Bhadohi?
          </h2>
          <p className="text-xs sm:text-sm text-[var(--ink-soft)] max-w-xl mx-auto leading-relaxed">
            We regularly coordinate client visits to active RCC casting sites and masonry works along Aurai Road and Harirampur so you can witness our structural quality first-hand.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="md"
              showArrow
              onClick={onOpenConsultationModal}
            >
              SCHEDULE A SITE WALKTHROUGH
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
