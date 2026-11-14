import React, { useEffect, useRef, useState } from 'react';
import { Bot, CheckCircle2, Circle, Compass, Menu, RotateCcw, X } from 'lucide-react';
import type { ProgressMilestone } from '../hooks/usePortfolioProgress';

interface NavbarProps {
  onOpenContact: () => void;
  progressPercentage: number;
  completedCount: number;
  totalCount: number;
  completedIds: string[];
  milestones: ProgressMilestone[];
  onResetProgress: () => void;
}

const NAV_LINKS = [
  { href: '#diagnostico', label: 'Diagnóstico' },
  { href: '#co-creacion', label: 'Co-creación' },
  { href: '#etica', label: 'Ética' },
  { href: '#agente-ia', label: 'Herramientas IA' },
];

export function Navbar({
  onOpenContact,
  progressPercentage,
  completedCount,
  totalCount,
  completedIds,
  milestones,
  onResetProgress,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progressOpen, setProgressOpen] = useState(false);
  const progressContainerRef = useRef<HTMLDivElement | null>(null);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  useEffect(() => {
    if (!progressOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (
        progressContainerRef.current &&
        !progressContainerRef.current.contains(e.target as Node)
      ) {
        setProgressOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProgressOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [progressOpen]);

  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const navMilestones = milestones.filter((m) => m.group === 'navegacion');
  const activityMilestones = milestones.filter((m) => m.group === 'actividades');

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F0]/92 backdrop-blur-md border-b border-[#3E3028]/10">
      <div className="max-w-[1260px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4 lg:gap-6">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#diagnostico"
          className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#3E3028] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F57923] rounded-sm"
        >
          Portafolio personal
        </a>

        {/* Zone 2: 5 Single-Line Navigation Links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6C584C]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 hover:text-[#3E3028] transition-colors duration-200 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#F57923] after:rounded-full after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F57923] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Indicador automático de navegación y exploración + Mobile Drawer Toggle */}
        <div ref={progressContainerRef} className="relative flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setProgressOpen((prev) => !prev)}
            aria-expanded={progressOpen}
            aria-label={`Progreso de navegación y exploración: ${progressPercentage}%`}
            className="inline-flex items-center gap-2.5 rounded-full bg-[#FFF0DE] hover:bg-[#F7C99D]/55 text-[#3E3028] border border-[#F7C99D] font-semibold text-xs sm:text-sm px-3.5 py-1.5 transition-all duration-200 shadow-xs whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F57923]"
          >
            <span className="relative w-6 h-6 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 -rotate-90" viewBox="0 0 26 26" aria-hidden="true">
                <circle
                  cx="13"
                  cy="13"
                  r={radius}
                  fill="none"
                  stroke="#3E3028"
                  strokeOpacity="0.14"
                  strokeWidth="2.8"
                />
                <circle
                  cx="13"
                  cy="13"
                  r={radius}
                  fill="none"
                  stroke="#F57923"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-500 ease-out"
                />
              </svg>
            </span>
            <span className="hidden sm:inline text-[#3E3028]">Exploración</span>
            <span className="font-bold text-[#F57923] tabular-nums">{progressPercentage}%</span>
          </button>

          <a
            href="#contacto"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] font-semibold text-xs sm:text-sm px-4 py-2 transition-all duration-200 hover:-translate-y-0.5 shadow-sm shadow-[#F57923]/25 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3E3028]"
          >
            <Bot className="w-4 h-4 shrink-0" />
            <span>Agente virtual</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#FFF0DE] text-[#3E3028] hover:bg-[#F7C99D]/50 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F57923]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desplegable con detalle automático de secciones, links y videos */}
          {progressOpen && (
            <div
              role="region"
              aria-label="Detalle de navegación y exploración"
              className="absolute right-0 top-full mt-2.5 w-[min(92vw,370px)] rounded-2xl bg-[#FAF7F0] border border-[#3E3028]/15 shadow-2xl p-4 space-y-3.5 z-50"
            >
              <div className="space-y-2 pb-2.5 border-b border-[#3E3028]/10">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#F57923]" />
                    <p className="font-serif text-sm font-bold text-[#3E3028]">
                      Tu progreso en el portafolio
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#F57923] tabular-nums">
                    {progressPercentage}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#FFF0DE] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#F57923] transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#6C584C] tabular-nums">
                  {completedCount} de {totalCount} secciones, actividades, links y videos explorados automáticamente.
                </p>
              </div>

              <div className="max-h-[52vh] overflow-y-auto pr-1 space-y-3">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#F57923]">
                    Navegación ({navMilestones.filter((m) => completedIds.includes(m.id)).length}/{navMilestones.length})
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                    {navMilestones.map((item) => {
                      const done = completedIds.includes(item.id);
                      return (
                        <a
                          key={item.id}
                          href={item.href}
                          onClick={() => setProgressOpen(false)}
                          className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                            done
                              ? 'bg-[#FFF0DE]/70 text-[#3E3028] font-medium'
                              : 'text-[#6C584C] hover:bg-[#FFF0DE]/40 hover:text-[#3E3028]'
                          }`}
                        >
                          {done ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-[#3E3028]/25 shrink-0" />
                          )}
                          <span className="truncate">{item.label}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#F57923]">
                    Actividades, links y videos ({activityMilestones.filter((m) => completedIds.includes(m.id)).length}/{activityMilestones.length})
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                    {activityMilestones.map((item) => {
                      const done = completedIds.includes(item.id);
                      return (
                        <a
                          key={item.id}
                          href={item.href}
                          onClick={() => setProgressOpen(false)}
                          className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                            done
                              ? 'bg-[#FFF0DE]/70 text-[#3E3028] font-medium'
                              : 'text-[#6C584C] hover:bg-[#FFF0DE]/40 hover:text-[#3E3028]'
                          }`}
                        >
                          {done ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-[#3E3028]/25 shrink-0" />
                          )}
                          <span className="truncate">{item.label}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#3E3028]/10 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={onResetProgress}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#6C584C] hover:text-[#3E3028] px-2 py-1 rounded-full hover:bg-[#FFF0DE] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reiniciar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProgressOpen(false);
                    onOpenContact();
                  }}
                  className="rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] text-[11px] font-semibold px-3.5 py-1.5 transition-colors cursor-pointer"
                >
                  Contactar al equipo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#3E3028]/10 bg-[#FAF7F0] px-5 py-4 space-y-2">
          <nav aria-label="Navegación móvil" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2.5 rounded-xl text-base font-medium text-[#3E3028] hover:bg-[#FFF0DE] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 space-y-2">
            <a
              href="#contacto"
              onClick={handleLinkClick}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] font-semibold text-sm px-5 py-3 transition-colors"
            >
              <Bot className="w-4 h-4 shrink-0" />
              <span>Agente virtual</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenContact();
              }}
              className="w-full rounded-full bg-[#FFF0DE] hover:bg-[#F7C99D]/60 text-[#3E3028] border border-[#F7C99D] font-semibold text-sm px-5 py-3 transition-colors cursor-pointer"
            >
              Contactar al equipo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
