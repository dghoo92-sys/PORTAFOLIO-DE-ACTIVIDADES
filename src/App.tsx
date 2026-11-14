import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bot,
  Check,
  ExternalLink,
  FileText,
  ImagePlus,
  Layers,
  Maximize2,
  MessageCircle,
  MessageSquareHeart,
  ShieldCheck,
  Sparkles,
  Users,
  Volume2,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import {
  BotanicalSprig,
  EthicsCardIllustration,
  FloatingStar,
  HandDrawnDoodleArrow,
  HandDrawnUnderline,
  ResilientImage,
} from './components/OrganicDecorations';
import {
  Activity2PresentationModal,
  CoCreationWorkshopModal,
  ContactModal,
  DetailModal,
  MuroQrModal,
} from './components/InteractiveModals';
import { MuroQrActivity } from './components/MuroQrActivity';
import { EthicsMiniGameWindow } from './components/EthicsMiniGameWindow';
import { FloatingVirtualAssistant } from './components/FloatingVirtualAssistant';
import { usePortfolioProgress } from './hooks/usePortfolioProgress';
import {
  ACTIVITY_2_STEPS,
  CLASSROOM_AI_TOOLS,
  CANVA_CONDUCT_EMBED_URL,
  CANVA_CONDUCT_SLIDES,
  CANVA_CONDUCT_TITLE,
  DIAGNOSTIC_ANALYSIS_VIDEO,
  DIAGNOSTIC_PRESENTATION,
  DIAGNOSTIC_SURVEY_PDF,
  ETHICS_ACTIVITIES,
  ETHICS_CARDS,
  ETHICS_CODE_PDF,
  ETHICS_CODE_PRESENTATION,
  EthicsActivity,
  EthicsCard,
  EthicsDocument,
  IMAGES,
  MURO_QR_RETOS_URL,
  MURO_QR_URL,
  PORTFOLIO_USED_TOOLS,
  UDIFY_AGENT_URL,
} from './data/siteContent';

export default function App() {
  const prefersReduced = useReducedMotion();

  const [activity2Open, setActivity2Open] = useState(false);
  const [activity2Slide, setActivity2Slide] = useState(1);
  const [ethicsCodeSlide, setEthicsCodeSlide] = useState(1);
  const [canvaSlideIndex, setCanvaSlideIndex] = useState(0);
  const [canvaViewMode, setCanvaViewMode] = useState<'embed' | 'images'>('embed');
  const [customCanvaSlides, setCustomCanvaSlides] = useState<
    { id: string; title: string; caption: string; image: string; imageAlt: string }[] | null
  >(null);

  useEffect(() => {
    if (customCanvaSlides && customCanvaSlides.length > 0) {
      setCanvaViewMode('images');
    }
  }, [customCanvaSlides]);
  const [muroQrModalTab, setMuroQrModalTab] = useState<'mapas' | 'retos' | null>(null);
  const [isStandaloneMuro, setIsStandaloneMuro] = useState(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('vista') === 'muro-qr';
  });
  const [standaloneMuroTab] = useState<'mapas' | 'retos'>(() => {
    if (typeof window === 'undefined') return 'mapas';
    return window.location.hash === '#retos' ? 'retos' : 'mapas';
  });
  const [workshopOpen, setWorkshopOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [assistantSpeaking, setAssistantSpeaking] = useState(true);
  const [contactPrefill, setContactPrefill] = useState('');

  const [selectedEthics, setSelectedEthics] = useState<EthicsCard | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<EthicsActivity | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<EthicsDocument | null>(null);

  const [activeAiCategory, setActiveAiCategory] = useState<string>('Todas');

  const {
    milestones,
    completedIds,
    completedCount,
    totalCount,
    percentage: progressPercentage,
    resetProgress,
  } = usePortfolioProgress(!isStandaloneMuro);

  if (isStandaloneMuro) {
    return (
      <>
        <MuroQrActivity
          initialTab={standaloneMuroTab}
          isStandalonePage
          onBack={() => {
            try {
              window.history.replaceState(null, '', '/#co-creacion');
            } catch {
              // ignore history error
            }
            setIsStandaloneMuro(false);
          }}
        />
        <FloatingVirtualAssistant />
      </>
    );
  }

  const revealMotion = (delay = 0) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  const filteredClassroomTools =
    activeAiCategory === 'Todas'
      ? CLASSROOM_AI_TOOLS
      : CLASSROOM_AI_TOOLS.filter((tool) => tool.category === activeAiCategory);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#3E3028] overflow-x-clip">
      <Navbar
        onOpenContact={() => {
          setContactPrefill('');
          setContactOpen(true);
        }}
        progressPercentage={progressPercentage}
        completedCount={completedCount}
        totalCount={totalCount}
        completedIds={completedIds}
        milestones={milestones}
        onResetProgress={resetProgress}
      />

      <main>
        {/* INTRODUCCIÓN DE LA ACTIVIDAD */}
        <section
          id="introduccion"
          className="relative py-14 sm:py-16 bg-[#FFF0DE]/70 border-b border-[#3E3028]/8 overflow-x-clip"
        >
          <FloatingStar
            className="hidden sm:block absolute top-10 left-12"
            size={20}
            color="#F57923"
            delay={0.2}
          />
          <FloatingStar
            className="hidden sm:block absolute bottom-10 right-16"
            size={22}
            color="#F6B36A"
            delay={0.8}
          />
          <BotanicalSprig
            className="hidden lg:block pointer-events-none absolute -bottom-4 left-6 w-20 h-24 opacity-75"
            color="#F57923"
            accentColor="#3E3028"
          />

          <div className="relative z-10 max-w-[1140px] mx-auto px-5 sm:px-8 space-y-14">
            {/* PANTALLA FUTURISTA DE BIENVENIDA */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[2.25rem] p-[2px] bg-gradient-to-r from-[#F57923] via-[#EC4899] via-[#8B5CF6] to-[#06B6D4] shadow-2xl shadow-[#3E3028]/20"
            >
              <div className="relative overflow-hidden rounded-[2.15rem] bg-gradient-to-br from-[#161124] via-[#221738] to-[#131C31] px-6 py-10 sm:px-12 sm:py-14 text-center">
                {/* Fondo cuadriculado futurista y destellos de color */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(56, 189, 248, 0.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(245, 121, 35, 0.25) 1px, transparent 1px)',
                    backgroundSize: '42px 42px',
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 -left-16 w-72 h-72 rounded-full bg-[#F57923]/30 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-24 -right-12 w-80 h-80 rounded-full bg-[#06B6D4]/25 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-44 rounded-full bg-[#EC4899]/20 blur-3xl"
                />

                {/* Esquinas luminosas tipo visor futurista */}
                <span aria-hidden="true" className="pointer-events-none absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 border-[#22D3EE]/75 rounded-tl-lg" />
                <span aria-hidden="true" className="pointer-events-none absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 border-[#F57923]/80 rounded-tr-lg" />
                <span aria-hidden="true" className="pointer-events-none absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 border-[#F472B6]/75 rounded-bl-lg" />
                <span aria-hidden="true" className="pointer-events-none absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 border-[#A78BFA]/75 rounded-br-lg" />

                <div className="relative z-10 max-w-4xl mx-auto space-y-6">
                  {/* Barra superior decorativa de pantalla */}
                  <div className="flex items-center justify-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#FDE68A]">
                      <Sparkles className="w-4 h-4 text-[#22D3EE]" />
                      Portafolio Digital Interactivo
                    </span>
                  </div>

                  <h1 className="font-serif text-[clamp(2.2rem,5vw,4.05rem)] font-extrabold leading-[1.08] tracking-tight">
                    <span className="block text-[#FAF7F0] drop-shadow-[0_2px_18px_rgba(255,255,255,0.18)]">
                      ¡Bienvenidos al aula del futuro
                    </span>
                    <span className="block mt-1 bg-gradient-to-r from-[#FF8A3D] via-[#FF5E99] via-[#C084FC] to-[#22D3EE] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(236,72,153,0.28)]">
                      con Inteligencia Artificial!
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg text-[#EDE9FE]/90 leading-relaxed max-w-[66ch] mx-auto">
                    Descubre una experiencia interactiva donde la pedagogía humana y la tecnología avanzada se unen en cuatro etapas vivas: diagnóstico, co-creación, ética y herramientas de IA para potenciar el aprendizaje.
                  </p>

                  {/* Módulos de colores estilo pantalla */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl mx-auto pt-1">
                    {[
                      { label: '01 · Diagnóstico', href: '#diagnostico', border: 'border-[#F57923]/55 hover:bg-[#F57923]/20 text-[#FDBA74]' },
                      { label: '02 · Co-creación', href: '#co-creacion', border: 'border-[#EC4899]/55 hover:bg-[#EC4899]/20 text-[#F9A8D4]' },
                      { label: '03 · Ética IA', href: '#etica', border: 'border-[#A855F7]/55 hover:bg-[#A855F7]/20 text-[#D8B4FE]' },
                      { label: '04 · Herramientas', href: '#agente-ia', border: 'border-[#06B6D4]/55 hover:bg-[#06B6D4]/20 text-[#67E8F9]' },
                    ].map((chip) => (
                      <a
                        key={chip.label}
                        href={chip.href}
                        className={`rounded-2xl bg-white/6 backdrop-blur-xs border ${chip.border} px-3 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5`}
                      >
                        {chip.label}
                      </a>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                    <a
                      href="#intro-contenido"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F57923] via-[#EC4899] to-[#8B5CF6] hover:brightness-110 text-white font-bold text-sm sm:text-base px-7 py-3.5 shadow-lg shadow-[#EC4899]/30 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
                    >
                      <span>Explorar introducción</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="#contacto"
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/18 text-[#FAF7F0] border border-[#22D3EE]/45 font-semibold text-sm sm:text-base px-6 py-3.5 backdrop-blur-xs transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
                    >
                      <Bot className="w-4 h-4 text-[#22D3EE]" />
                      <span>Ir al Agente virtual</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* INTRODUCCIÓN DE LA ACTIVIDAD */}
            <div id="intro-contenido" className="max-w-[1040px] mx-auto text-center space-y-5 scroll-mt-24">
              <p className="relative inline-block pb-2 font-serif text-xl sm:text-2xl font-bold italic uppercase tracking-wide text-[#F57923]">
                Introducción de la actividad
                <HandDrawnUnderline className="absolute bottom-0 left-0 w-full h-3" />
              </p>
              <h2 className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.12] text-[#3E3028]">
                La inteligencia artificial en la docencia
              </h2>
            <p className="text-base sm:text-lg text-[#6C584C] leading-relaxed max-w-[74ch] mx-auto">
              Esta ruta guía la integración de la inteligencia artificial en la práctica docente a través de cuatro etapas fundamentadas: inicia con un diagnóstico inicial para identificar las necesidades y brechas tecnológicas del cuerpo docente mediante el análisis cuantitativo y cualitativo de encuestas; continúa con laboratorios de cocreación didáctica orientados al diseño práctico de recursos visuales y juegos educativos con herramientas como Canva IA y Wordwall; incorpora un análisis ético y código de conducta centrado en la evaluación de casos reales sobre privacidad y plagio para construir acuerdos institucionales claros; y finaliza con la exploración de agentes multimodales y la declaración final, consolidando un marco institucional colaborativo para el uso responsable y formalizado de IA.
            </p>
            <div className="pt-3 max-w-4xl mx-auto">
              <div className="overflow-hidden rounded-3xl border border-[#F7C99D] bg-[#FAF7F0] shadow-md shadow-[#3E3028]/8">
                <img
                  src={IMAGES.rutaIntegracion}
                  alt="Ruta futurista e interactiva de integración de la inteligencia artificial en la docencia: diagnóstico, cocreación didáctica, análisis ético y agentes multimodales"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block mx-auto"
                />
              </div>
            </div>

            {/* Video trasladado debajo de Introducción de la actividad */}
            <div className="pt-4 max-w-3xl mx-auto text-left">
              <div className="rounded-[2rem] bg-[#FAF7F0] border border-[#F7C99D] p-4 sm:p-5 space-y-3 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-[#F57923]">
                    Video · Diagnóstico en el aula
                  </p>
                  <a
                    href="https://www.youtube.com/watch?v=Mhv2Cz-Omik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3E3028] hover:text-[#F57923] transition-colors"
                  >
                    Ver en YouTube
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="overflow-hidden rounded-2xl border border-[#3E3028]/10 bg-[#3E3028] aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/Mhv2Cz-Omik?rel=0"
                    title="Video del apartado de Diagnóstico"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 1 — DIAGNÓSTICO (HERO) */}
        <section
          id="diagnostico"
          className="relative pt-10 pb-20 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28 overflow-x-clip"
        >
          {/* Edge-bleeding organic orange blobs */}
          <svg
            aria-hidden="true"
            viewBox="0 0 320 420"
            className="pointer-events-none absolute -left-28 top-12 w-60 sm:w-72 text-[#F7C99D]/45 -z-0"
          >
            <path
              fill="currentColor"
              d="M66.2,34.4C118.4,-9.5,201.6,-11.2,249.5,33.7C297.4,78.6,310,170.2,272.7,242.8C235.4,315.4,148.2,369,75.4,347.9C2.6,326.8,-55.8,231,-45.2,147.6C-34.6,64.2,14,78.3,66.2,34.4Z"
              transform="translate(10 40)"
            />
          </svg>
          <svg
            aria-hidden="true"
            viewBox="0 0 360 440"
            className="pointer-events-none absolute -right-24 -top-8 w-64 sm:w-80 lg:w-96 text-[#F57923]/16 -z-0"
          >
            <path
              fill="currentColor"
              d="M179.4,29.5C236.2,48.9,294.7,89.4,312.6,149.8C330.5,210.2,307.8,290.5,253.7,341.2C199.6,391.9,114.1,413,56.3,372.4C-1.5,331.8,-31.6,229.5,-13.7,149.6C4.2,69.7,122.6,10.1,179.4,29.5Z"
            />
          </svg>

          <div className="relative z-10 max-w-[1260px] mx-auto px-5 sm:px-8 space-y-10">
            {/* Cabecera centrada y horizontal */}
            <div className="max-w-4xl mx-auto text-center space-y-5">
              <p className="relative inline-block pb-2 font-serif text-xl sm:text-2xl font-bold italic uppercase tracking-wide text-[#F57923]">
                Diagnóstico pedagógico
                <HandDrawnUnderline className="absolute bottom-0 left-0 w-full h-3" />
              </p>

              <h1 className="font-serif text-[clamp(2.25rem,4.2vw,3.65rem)] font-bold leading-[1.08] tracking-tight text-[#3E3028]">
                Integra la IA en tu aula desde un{' '}
                <span className="relative inline-block text-[#F57923] italic uppercase">
                  diagnóstico
                  <HandDrawnUnderline className="absolute -bottom-2 left-0 w-full h-3.5" />
                </span>{' '}
                claro y humano
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm sm:text-base font-medium text-[#3E3028]">
                <span>Jessica Hoyos</span>
                <span aria-hidden="true" className="text-[#F57923]">•</span>
                <span>Erika Salcedo</span>
                <span aria-hidden="true" className="text-[#F57923]">•</span>
                <span>Donobang Gonzalez</span>
                <span aria-hidden="true" className="text-[#F57923]">•</span>
                <span>Gilberto Africano</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
                <a
                  href={DIAGNOSTIC_PRESENTATION.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] font-semibold text-base px-7 py-3.5 transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-[#F57923]/25 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3E3028]"
                >
                  Nuestro diagnóstico
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#co-creacion"
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#3E3028] hover:text-[#F57923] transition-colors px-2 py-2 underline decoration-[#F6B36A] decoration-2 underline-offset-8 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F57923] rounded-sm"
                >
                  Ver ruta de co-creación
                </a>
              </div>
            </div>

            {/* Fila horizontal 1: Encuesta + Contexto a la izquierda, Ilustración docente a la derecha */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="bg-[#FFF0DE] rounded-3xl p-5 sm:p-6 border border-[#3E3028]/10 hover:border-[#F57923]/45 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="shrink-0">
                      <EthicsCardIllustration iconKey="declaration" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-[#F57923]">
                        Documento · PDF
                      </p>
                      <h3 className="font-serif text-lg font-bold text-[#3E3028] leading-snug">
                        Encuesta realizada
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6C584C] leading-relaxed">
                        Encuesta de Diagnóstico: Uso de IA en la Práctica Docente.
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                    <a
                      href={DIAGNOSTIC_SURVEY_PDF.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] text-xs font-semibold px-4 py-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3E3028]"
                    >
                      Abrir PDF
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setSelectedDocument(DIAGNOSTIC_SURVEY_PDF)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F0] hover:bg-[#F7C99D]/45 text-[#3E3028] border border-[#3E3028]/12 text-xs font-semibold px-4 py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F57923]"
                    >
                      Vista previa
                    </button>
                  </div>
                </div>

                <div className="rounded-3xl bg-[#FFF0DE]/65 border border-[#3E3028]/10 p-5 sm:p-6 space-y-2">
                  <h2 className="font-serif text-sm font-bold tracking-wide text-[#F57923]">
                    CONTEXTO:
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6C584C] leading-relaxed">
                    Portafolio de actividades de proyecto de integración de IA en educación que se proyecta para ser desarrollado en el Gimnasio Fontana, una institución educativa de Calendario B ubicada en el sector de Guaymaral, al norte de Bogotá. El estudio se enmarca en las dinámicas del departamento de Tecnología y en el contexto de la integración de espacios de innovación y laboratorios de fabricación digital (como el espacio Aluna Tech).
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 relative flex justify-center">
                <div className="relative w-full max-w-[600px]">
                  {/* Soft organic backing shape */}
                  <div
                    aria-hidden="true"
                    className="absolute -inset-3 sm:-inset-4 rounded-[3rem] bg-[#FFF0DE] -rotate-2 border border-[#F7C99D]/60"
                  />

                  <FloatingStar
                    className="hidden sm:block absolute -top-6 left-8 z-20"
                    size={26}
                    color="#F57923"
                    delay={0}
                  />
                  <FloatingStar
                    className="hidden sm:block absolute top-14 -right-5 z-20"
                    size={18}
                    color="#3E3028"
                    delay={1.2}
                  />
                  <FloatingStar
                    className="hidden sm:block absolute -bottom-5 left-14 z-20"
                    size={20}
                    color="#F6B36A"
                    delay={0.6}
                  />
                  <BotanicalSprig
                    className="hidden sm:block absolute -bottom-10 -right-8 w-24 h-28 z-20 pointer-events-none"
                    color="#F57923"
                    accentColor="#3E3028"
                  />

                  <div className="relative z-10 overflow-hidden rounded-[2.25rem] border border-[#3E3028]/10 bg-[#FAF7F0] shadow-lg shadow-[#3E3028]/8 aspect-[4/3]">
                    <ResilientImage
                      src={IMAGES.heroTeacher}
                      alt="Ilustración editorial de una profesora trabajando en su escritorio frente al computador rodeada de libros, plantas y destellos creativos"
                      className="w-full h-full object-cover"
                      containerClassName="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Fila horizontal 2: Video de análisis y Presentación anclada lado a lado */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <div className="bg-[#FFF0DE] rounded-3xl p-5 border border-[#3E3028]/10 hover:border-[#F57923]/45 transition-all duration-200 flex flex-col justify-between gap-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div className="shrink-0">
                      <EthicsCardIllustration iconKey="interactive" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-[#F57923]">
                        Análisis · Video anclado
                      </p>
                      <h3 className="font-serif text-lg font-bold text-[#3E3028] leading-snug">
                        Análisis de la encuesta realizada
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6C584C] leading-relaxed">
                        Resultados y hallazgos principales de la encuesta diagnóstica.
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                    <a
                      href={DIAGNOSTIC_ANALYSIS_VIDEO.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] text-xs font-semibold px-4 py-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3E3028]"
                    >
                      Ver en YouTube
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setSelectedActivity(DIAGNOSTIC_ANALYSIS_VIDEO)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F0] hover:bg-[#F7C99D]/45 text-[#3E3028] border border-[#3E3028]/12 text-xs font-semibold px-4 py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F57923]"
                    >
                      <Maximize2 className="w-3 h-3 text-[#F57923]" />
                      Ampliar vista
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-[#3E3028]/12 bg-[#3E3028] aspect-video shadow-xs">
                  <iframe
                    src={DIAGNOSTIC_ANALYSIS_VIDEO.embedUrl}
                    title={DIAGNOSTIC_ANALYSIS_VIDEO.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full border-0"
                  />
                </div>
              </div>

              <div className="rounded-3xl bg-[#FFF0DE] border border-[#F7C99D] p-5 shadow-sm flex flex-col justify-between gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#3E3028]/10">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#F57923]">
                      Presentación anclada
                    </p>
                    <p className="font-serif text-base sm:text-lg font-bold text-[#3E3028]">
                      {DIAGNOSTIC_PRESENTATION.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedActivity(DIAGNOSTIC_PRESENTATION)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F0] hover:bg-[#F7C99D]/55 text-[#3E3028] border border-[#3E3028]/12 text-xs font-semibold px-3.5 py-1.5 transition-colors cursor-pointer"
                    >
                      <Maximize2 className="w-3 h-3 text-[#F57923]" />
                      Ampliar vista
                    </button>
                    <a
                      href={DIAGNOSTIC_PRESENTATION.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] text-xs font-semibold px-3.5 py-1.5 transition-colors"
                    >
                      Abrir aparte
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-[#3E3028]/12 bg-white aspect-video">
                  <iframe
                    src={DIAGNOSTIC_PRESENTATION.embedUrl}
                    title={DIAGNOSTIC_PRESENTATION.title}
                    allow="fullscreen"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 2 — CO-CREACIÓN */}
        <section
          id="co-creacion"
          className="relative py-20 sm:py-24 bg-[#FFF0DE] overflow-x-clip"
        >
          {/* Decorative top organic curve */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 48"
            preserveAspectRatio="none"
            className="absolute top-0 left-0 w-full h-8 sm:h-12 text-[#FAF7F0] fill-current"
          >
            <path d="M0,0 L1440,0 L1440,18 C1120,52 440,-8 0,34 Z" />
          </svg>

          {/* Left-edge organic orange accent */}
          <svg
            aria-hidden="true"
            viewBox="0 0 240 300"
            className="pointer-events-none absolute -left-20 bottom-8 w-44 sm:w-56 text-[#F57923]/20"
          >
            <path
              fill="currentColor"
              d="M92,16C146,12,208,58,214,122C220,186,170,268,104,274C38,280,-12,210,-10,140C-8,70,38,20,92,16Z"
            />
          </svg>

          <div className="relative z-10 max-w-[1260px] mx-auto px-5 sm:px-8 pt-4">
            <motion.div
              {...revealMotion()}
              className="max-w-2xl mx-auto text-center space-y-3 mb-12 sm:mb-14"
            >
              <p className="relative inline-block pb-2 font-serif text-xl sm:text-2xl font-bold italic uppercase tracking-wide text-[#F57923]">
                Co-creación pedagógica
                <HandDrawnUnderline className="absolute bottom-0 left-0 w-full h-3" />
              </p>
              <h2 className="font-serif text-[clamp(1.95rem,3.2vw,2.85rem)] font-bold leading-[1.14] text-[#3E3028]">
                Tu criterio docente dirige cada conversación con la tecnología
              </h2>
              <p className="text-base text-[#6C584C] leading-relaxed">
                Diseñamos flujos donde el profesorado no recibe respuestas genéricas, sino borradores vivos para adaptar, enriquecer y contextualizar según la realidad de sus estudiantes.
              </p>
            </motion.div>

            {/* Single column for activities */}
            <motion.div {...revealMotion(0.08)} className="max-w-4xl mx-auto space-y-5">
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F0] border border-[#3E3028]/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#FFF0DE] text-[#F57923] flex items-center justify-center shrink-0">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#3E3028] leading-snug">
                        ACTIVIDAD 1: Actividad exploratoria: Inteligencia artificial en el aula a través de Mentimeter
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6C584C] leading-relaxed mt-1">
                        Escanea el código QR para acceder a la dinámica interactiva y consulta ambos tutoriales docentes.
                      </p>
                    </div>
                  </div>

                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-2 border border-[#3E3028]/12 shadow-xs shrink-0 self-start sm:self-center">
                    <img
                      src="/assets/aistudio/QR__Actividad_1_5781ada2.png"
                      alt="Código QR de la Actividad 1 en Mentimeter"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1.5">
                    <div className="overflow-hidden rounded-xl border border-[#3E3028]/10 bg-[#3E3028] aspect-video">
                      <iframe
                        src="https://www.youtube.com/embed/pZ65CvkdkyE?rel=0"
                        title="Tutorial 1: Uso de Mentimeter en el aula"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full border-0"
                      />
                    </div>
                    <a
                      href="https://www.youtube.com/watch?v=pZ65CvkdkyE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F57923] hover:text-[#DF6613] transition-colors"
                    >
                      Tutorial 1 · Ver en YouTube
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="space-y-1.5">
                    <div className="overflow-hidden rounded-xl border border-[#3E3028]/10 bg-[#3E3028] aspect-video">
                      <iframe
                        src="https://www.youtube.com/embed/79Tu4KQ2XZA?rel=0"
                        title="Tutorial 2: Guía práctica de Mentimeter para docentes"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full border-0"
                      />
                    </div>
                    <a
                      href="https://www.youtube.com/watch?v=79Tu4KQ2XZA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F57923] hover:text-[#DF6613] transition-colors"
                    >
                      Tutorial 2 · Ver en YouTube
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F0] border border-[#3E3028]/10 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#FFF0DE] text-[#F57923] flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-bold text-[#3E3028] leading-snug">
                        ACTIVIDAD 2: Mapa mental y reto con IA
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6C584C] leading-relaxed">
                        Presentación interactiva. Usa los controles para recorrer los 6 pasos del equipo.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActivity2Open(true)}
                    aria-label="Ampliar presentación de Actividad 2"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0DE] hover:bg-[#F7C99D]/55 text-[#3E3028] text-xs font-semibold px-3 py-1.5 transition-colors shrink-0 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#F57923]" />
                    Ampliar
                  </button>
                </div>

                {/* Presentación interactiva integrada en el apartado */}
                <div className="rounded-2xl bg-[#FFF0DE] border border-[#F7C99D] p-4 sm:p-5 space-y-4">
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#3E3028]/10">
                    <span className="text-xs font-semibold text-[#F57923] tabular-nums">
                      Diapositiva {activity2Slide} de 9
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setActivity2Slide(2)}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                          activity2Slide === 2
                            ? 'bg-[#3E3028] text-[#FAF7F0]'
                            : 'bg-[#FAF7F0] text-[#3E3028] hover:bg-[#F7C99D]/55'
                        }`}
                      >
                        Menú
                      </button>
                    </div>
                  </div>

                  {activity2Slide === 1 && (
                    <div className="py-2 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                      <div className="md:col-span-6 space-y-3 text-center md:text-left">
                        <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#3E3028]">
                          Actividad 2: Mapa mental y reto con IA
                        </h4>
                        <p className="text-xs sm:text-sm text-[#6C584C] max-w-md mx-auto md:mx-0 leading-relaxed">
                          Presentación interactiva. Haz clic en empezar o elige un paso para avanzar.
                        </p>
                        <button
                          type="button"
                          onClick={() => setActivity2Slide(2)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] text-xs font-semibold px-5 py-2.5 transition-colors cursor-pointer"
                        >
                          Empezar
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="md:col-span-6">
                        <div className="overflow-hidden rounded-2xl border border-[#3E3028]/10 bg-[#FAF7F0] aspect-[4/3] shadow-xs">
                          <ResilientImage
                            src={IMAGES.cocreationWorkshop}
                            alt="Docentes co-creando en taller colaborativo con mapas mentales e inteligencia artificial"
                            className="w-full h-full object-cover"
                            containerClassName="w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activity2Slide === 2 && (
                    <div className="space-y-3">
                      <h4 className="font-serif text-base sm:text-lg font-bold text-[#3E3028]">
                        Menú: elige un paso
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          { label: '1. Ubícate en tu mesa', target: 3, stepIndex: 0, qrHref: null },
                          { label: '2. Mapa mental en Mapify', target: 4, stepIndex: 1, qrHref: null },
                          { label: '3. Publica en Muro', target: 5, stepIndex: 2, qrHref: MURO_QR_URL },
                          { label: '4. Abre tu reto', target: 6, stepIndex: 3, qrHref: MURO_QR_RETOS_URL },
                          { label: '5. Resuelve el reto con IA', target: 7, stepIndex: 4, qrHref: null },
                          { label: '6. Sube el resultado final', target: 8, stepIndex: 5, qrHref: null },
                        ].map((item) => {
                          const stepData = ACTIVITY_2_STEPS[item.stepIndex];
                          return (
                            <div
                              key={item.target}
                              className="rounded-xl bg-[#FAF7F0] hover:bg-[#F7C99D]/45 border border-[#3E3028]/10 transition-colors flex items-center justify-between gap-2 pr-2.5"
                            >
                              <button
                                type="button"
                                onClick={() => setActivity2Slide(item.target)}
                                className="flex-1 min-w-0 text-left p-2.5 text-xs font-semibold text-[#3E3028] flex items-center gap-2.5 cursor-pointer"
                              >
                                <div className="w-12 h-9 rounded-lg overflow-hidden border border-[#3E3028]/10 bg-[#FFF0DE] shrink-0">
                                  <ResilientImage
                                    src={stepData.image}
                                    alt={stepData.imageAlt}
                                    className="w-full h-full object-cover"
                                    containerClassName="w-full h-full"
                                  />
                                </div>
                                <span className="truncate">{item.label}</span>
                              </button>
                              {item.qrHref && (
                                <a
                                  href={item.qrHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 rounded-full bg-[#FFF0DE] hover:bg-[#F57923] text-[#F57923] hover:text-[#FAF7F0] border border-[#F57923]/30 px-2 py-0.5 text-[11px] font-bold transition-colors shrink-0"
                                >
                                  QR
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                              <button
                                type="button"
                                onClick={() => setActivity2Slide(item.target)}
                                aria-label={`Ir a ${item.label}`}
                                className="text-[#F57923] shrink-0 cursor-pointer"
                              >
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {activity2Slide >= 3 && activity2Slide <= 8 && (
                    <div className="space-y-4">
                      {(() => {
                        const current = ACTIVITY_2_STEPS[activity2Slide - 3];
                        const bodyParts = current.body.split(/(QR)/g);
                        const isQrStep = current.slideNumber === 5 || current.slideNumber === 6;
                        const stepTab: 'mapas' | 'retos' =
                          current.slideNumber === 6 ? 'retos' : 'mapas';
                        const stepQrUrl =
                          current.slideNumber === 6 ? MURO_QR_RETOS_URL : MURO_QR_URL;
                        return (
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-center">
                            <div className="md:col-span-6 space-y-2.5">
                              <span className="text-xs font-semibold text-[#F57923] block">
                                {current.stepLabel} de 6
                              </span>
                              <h4 className="font-serif text-lg sm:text-xl font-bold text-[#3E3028]">
                                {current.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-[#6C584C] leading-relaxed">
                                {bodyParts.map((part, idx) =>
                                  part === 'QR' ? (
                                    <a
                                      key={idx}
                                      href={stepQrUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-0.5 font-semibold text-[#F57923] hover:text-[#DF6613] underline underline-offset-4"
                                    >
                                      QR
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  ) : (
                                    <React.Fragment key={idx}>{part}</React.Fragment>
                                  )
                                )}
                              </p>
                              <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                                {current.link && (
                                  <a
                                    href={current.link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#F57923] hover:text-[#DF6613] underline underline-offset-4"
                                  >
                                    {current.link.label}
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                )}
                                {isQrStep && (
                                  <button
                                    type="button"
                                    onClick={() => setMuroQrModalTab(stepTab)}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F0] hover:bg-[#F7C99D]/55 border border-[#3E3028]/12 text-[#3E3028] text-xs font-semibold px-3 py-1 transition-colors cursor-pointer"
                                  >
                                    Abrir aquí
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="md:col-span-6">
                              <div className="overflow-hidden rounded-2xl border border-[#3E3028]/10 bg-[#FAF7F0] aspect-[4/3] shadow-xs">
                                <ResilientImage
                                  key={current.image}
                                  src={current.image}
                                  alt={current.imageAlt}
                                  className="w-full h-full object-cover"
                                  containerClassName="w-full h-full"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setActivity2Slide(2)}
                          className="rounded-full bg-[#FAF7F0] hover:bg-[#F7C99D]/55 text-[#3E3028] border border-[#3E3028]/10 text-xs font-semibold px-4 py-2 transition-colors cursor-pointer"
                        >
                          Volver al menú
                        </button>
                        <button
                          type="button"
                          onClick={() => setActivity2Slide((s) => s + 1)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] text-xs font-semibold px-4 py-2 transition-colors cursor-pointer"
                        >
                          {activity2Slide === 8 ? 'Terminar' : 'Siguiente paso'}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {activity2Slide === 9 && (
                    <div className="py-2 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                      <div className="md:col-span-7 text-center md:text-left space-y-3">
                        <div className="w-10 h-10 mx-auto md:mx-0 rounded-full bg-[#FAF7F0] border border-[#F57923]/30 flex items-center justify-center text-[#F57923]">
                          <Check className="w-5 h-5" />
                        </div>
                        <h4 className="font-serif text-lg sm:text-xl font-bold text-[#3E3028]">
                          ¡Actividad completada!
                        </h4>
                        <p className="text-xs sm:text-sm text-[#6C584C] max-w-md mx-auto md:mx-0 leading-relaxed">
                          Su equipo terminó los 6 pasos. Revisen que el mapa esté en el Muro y el reto en la carpeta.
                        </p>
                        <button
                          type="button"
                          onClick={() => setActivity2Slide(2)}
                          className="rounded-full bg-[#3E3028] hover:bg-[#3E3028]/90 text-[#FAF7F0] text-xs font-semibold px-4 py-2 transition-colors cursor-pointer"
                        >
                          Volver al menú
                        </button>
                      </div>
                      <div className="md:col-span-5">
                        <div className="overflow-hidden rounded-2xl border border-[#3E3028]/10 bg-[#FAF7F0] aspect-[4/3] shadow-xs">
                          <ResilientImage
                            src={IMAGES.step6UploadFinal}
                            alt="Producto final entregado y verificado en la carpeta del reto"
                            className="w-full h-full object-cover"
                            containerClassName="w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navegador rápido de diapositivas 1–9 */}
                  <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-[#3E3028]/10">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setActivity2Slide(num)}
                        aria-label={`Ir a diapositiva ${num}`}
                        className={`w-6 h-6 rounded-full text-[11px] font-semibold tabular-nums transition-colors cursor-pointer ${
                          activity2Slide === num
                            ? 'bg-[#F57923] text-[#FAF7F0]'
                            : 'bg-[#FAF7F0] text-[#6C584C] hover:text-[#3E3028]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-0.5">
                  <a
                    href="https://mapify.so/es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0DE] hover:bg-[#F7C99D]/55 text-[#3E3028] text-xs font-semibold px-4 py-2 transition-colors"
                  >
                    Abrir Mapify
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="/assets/aistudio/Actividad_2__Mapa_mental_y_reto_con_IA_724774ff"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#6C584C] hover:text-[#3E3028] underline underline-offset-4"
                  >
                    Ver guía en texto
                  </a>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F0] border border-[#3E3028]/10 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#FFF0DE] text-[#F57923] flex items-center justify-center shrink-0">
                    <MessageSquareHeart className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg font-bold text-[#3E3028] leading-snug">
                      ACTIVIDAD 2.1: Cómo usar Mapify
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6C584C] leading-relaxed">
                      <strong className="text-[#3E3028]">Orientación docente:</strong> Antes de abrir la plataforma, conversen en grupo sobre la herramienta de IA que desean emplear e inviten a realizar primero un boceto propio del mapa mental en papel o tablero. Así, Mapify actúa como apoyo para estructurar sus ideas y no como único creador.
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 pl-0 sm:pl-14">
                  <div className="overflow-hidden rounded-xl border border-[#3E3028]/10 bg-[#3E3028] aspect-video">
                    <iframe
                      src="https://www.youtube.com/embed/tZSmimJ_hMo?rel=0"
                      title="Actividad 2.1: Tutorial de cómo usar Mapify"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      loading="lazy"
                      className="w-full h-full border-0"
                    />
                  </div>
                  <a
                    href="https://www.youtube.com/watch?v=tZSmimJ_hMo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F57923] hover:text-[#DF6613] transition-colors"
                  >
                    Tutorial de Mapify · Ver en YouTube
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F0] border border-[#3E3028]/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#FFF0DE] text-[#F57923] flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-serif text-lg font-bold text-[#3E3028] leading-snug">
                        ACTIVIDAD 3: ¿Qué pasaría si nuestros materiales de clase fueran más visuales, atractivos y accesibles para los estudiantes?
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6C584C] leading-relaxed">
                        En este apartado se presenta a los docentes la herramienta Canva IA y algunas de sus funcionalidades (Magic Design, Magic Media y Generador de Imágenes).
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://canva.link/i650n7lq7ppiit9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] text-xs font-semibold px-4 py-2 transition-colors whitespace-nowrap shrink-0 self-start sm:self-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3E3028]"
                  >
                    Abrir guía en Canva
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="space-y-1.5 pl-0 sm:pl-14">
                  <div className="overflow-hidden rounded-xl border border-[#3E3028]/10 bg-[#3E3028] aspect-video">
                    <iframe
                      src="https://www.youtube.com/embed/pIl-JKvHj3A?start=14&rel=0"
                      title="Actividad 3: Tutorial de Canva IA para docentes"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      loading="lazy"
                      className="w-full h-full border-0"
                    />
                  </div>
                  <a
                    href="https://www.youtube.com/watch?v=pIl-JKvHj3A&t=14s"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F57923] hover:text-[#DF6613] transition-colors"
                  >
                    Tutorial de Canva IA · Ver en YouTube
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F0] border border-[#3E3028]/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#FFF0DE] text-[#F57923] flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-serif text-lg font-bold text-[#3E3028] leading-snug">
                        ACTIVIDAD 4: Diseño de juegos educativos con Wordwall
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6C584C] leading-relaxed">
                        Actividad interactiva para evaluar lo dialogado y aprendido a lo largo del proceso de co-creación docente.
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://wordwall.net/es/resource/123006119?wwmethod=link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] text-xs font-semibold px-4 py-2 transition-colors whitespace-nowrap shrink-0 self-start sm:self-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3E3028]"
                  >
                    Abrir juego en Wordwall
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="space-y-1.5 pl-0 sm:pl-14">
                  <div className="overflow-hidden rounded-xl border border-[#3E3028]/10 bg-[#3E3028] aspect-video">
                    <iframe
                      src="https://www.youtube.com/embed/jumK4UfHXOI?start=1&rel=0"
                      title="Actividad 4: Tutorial de cómo usar Wordwall"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      loading="lazy"
                      className="w-full h-full border-0"
                    />
                  </div>
                  <a
                    href="https://www.youtube.com/watch?v=jumK4UfHXOI&t=1s"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F57923] hover:text-[#DF6613] transition-colors"
                  >
                    Tutorial de Wordwall · Ver en YouTube
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setWorkshopOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] font-semibold text-sm sm:text-base px-7 py-3.5 transition-all duration-200 hover:-translate-y-0.5 shadow-sm shadow-[#F57923]/25 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3E3028]"
                >
                  Probar taller de co-creación
                  <ArrowRight className="w-4 h-4" />
                </button>
                <HandDrawnDoodleArrow className="hidden sm:block w-20 h-9 opacity-80" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECCIÓN 3 — ÉTICA Y ACUERDOS */}
        <section
          id="etica"
          className="relative py-20 sm:py-24 bg-[#FAF7F0] overflow-x-clip"
        >
          <FloatingStar
            className="hidden md:block absolute top-16 right-16"
            size={22}
            color="#F6B36A"
            delay={0.3}
          />
          <FloatingStar
            className="hidden md:block absolute bottom-16 left-12"
            size={18}
            color="#F57923"
            delay={1.1}
          />

          <div className="max-w-[1260px] mx-auto px-5 sm:px-8">
            <div className="max-w-2xl mx-auto text-center space-y-3 mb-12 sm:mb-14">
              <p className="relative inline-block pb-2 font-serif text-xl sm:text-2xl font-bold italic uppercase tracking-wide text-[#F57923]">
                Ética y acuerdos
                <HandDrawnUnderline className="absolute bottom-0 left-0 w-full h-3" />
              </p>
              <h2 className="font-serif text-[clamp(1.95rem,3.2vw,2.85rem)] font-bold leading-tight text-[#3E3028]">
                Pactos claros para cuidar la integridad y el aprendizaje
              </h2>
              <p className="text-base text-[#6C584C] leading-relaxed">
                Cada comunidad construye reglas visibles y comprensibles antes de abrir herramientas generativas en clase. Selecciona un pilar para revisar sus cláusulas prácticas.
              </p>
            </div>

            <motion.div
              {...revealMotion(0.04)}
              className="mb-5 rounded-3xl bg-gradient-to-br from-[#FFF0DE] via-[#FFF0DE] to-[#F7C99D]/35 border border-[#F7C99D] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-start"
            >
              {/* Lado izquierdo: texto descriptivo + botones del documento */}
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF7F0] border border-[#F7C99D] text-[#F57923] flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[#F57923]">
                      {ETHICS_CODE_PDF.kicker}
                    </p>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3E3028] leading-snug">
                      {ETHICS_CODE_PDF.title}
                    </h3>
                    <p className="text-sm text-[#6C584C] leading-relaxed whitespace-pre-line">
                      {ETHICS_CODE_PDF.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pl-0 sm:pl-16">
                  <a
                    href={ETHICS_CODE_PDF.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] text-sm font-semibold px-5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 shadow-sm shadow-[#F57923]/20 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3E3028]"
                  >
                    Abrir PDF en nueva pestaña
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedDocument(ETHICS_CODE_PDF)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#FAF7F0] hover:bg-[#F7C99D]/45 text-[#3E3028] border border-[#3E3028]/12 text-xs font-semibold px-5 py-2.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F57923]"
                  >
                    Vista previa del documento
                  </button>
                </div>
              </div>

              {/* Lado derecho: presentación interactiva con el contenido exacto del documento */}
              <div className="lg:col-span-7 rounded-2xl bg-[#FAF7F0] border border-[#3E3028]/12 p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#3E3028]/10">
                  <div>
                    <p className="text-xs font-semibold text-[#F57923] tabular-nums">
                      Presentación del código · Diapositiva {ethicsCodeSlide} de 6
                    </p>
                    <p className="text-[11px] text-[#6C584C]">
                      {ETHICS_CODE_PRESENTATION.headerSubtitle}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1">
                    {[
                      { num: 1, label: '1. Principios' },
                      { num: 2, label: '2. Badges' },
                      { num: 3, label: '3. Tabla' },
                      { num: 4, label: '4. Docentes' },
                      { num: 5, label: '5. Estudiantes' },
                      { num: 6, label: '6. Recomendaciones' },
                    ].map((tab) => (
                      <button
                        key={tab.num}
                        type="button"
                        onClick={() => setEthicsCodeSlide(tab.num)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                          ethicsCodeSlide === tab.num
                            ? 'bg-[#3E3028] text-[#FAF7F0]'
                            : 'bg-[#FFF0DE] text-[#3E3028] hover:bg-[#F7C99D]/60'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Diapositiva 1: Principios clave */}
                {ethicsCodeSlide === 1 && (
                  <div className="space-y-3">
                    <div className="space-y-0.5">
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#F57923]">
                        1 · Principios clave
                      </span>
                      <h4 className="font-serif text-lg font-bold text-[#3E3028]">
                        {ETHICS_CODE_PRESENTATION.headerTitle}
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {ETHICS_CODE_PRESENTATION.principiosClave.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-xl bg-[#FFF0DE]/70 border border-[#F7C99D] p-3 text-xs sm:text-sm leading-snug"
                        >
                          <span className="font-bold text-[#3E3028]">{item.label}: </span>
                          <span className="text-[#6C584C]">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Diapositiva 2: Badges de declaración de uso esperado de IA */}
                {ethicsCodeSlide === 2 && (
                  <div className="space-y-3">
                    <div className="space-y-0.5">
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#F57923]">
                        2 · Badges de declaración de uso esperado de IA
                      </span>
                      <p className="text-xs text-[#6C584C]">
                        {ETHICS_CODE_PRESENTATION.badgesIntro}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {ETHICS_CODE_PRESENTATION.badges.map((badge) => {
                        const statusStyles = {
                          teal: 'bg-[#0F766E] text-white',
                          blue: 'bg-[#1D4ED8] text-white',
                          amber: 'bg-[#D97706] text-white',
                          red: 'bg-[#DC2626] text-white',
                        }[badge.accent];
                        const cardBorder = {
                          teal: 'border-[#0F766E]/35',
                          blue: 'border-[#1D4ED8]/35',
                          amber: 'border-[#D97706]/40',
                          red: 'border-[#DC2626]/35',
                        }[badge.accent];
                        return (
                          <div
                            key={badge.num}
                            className={`rounded-xl bg-white border ${cardBorder} p-3 flex flex-col justify-between gap-2`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[11px] font-bold text-[#3E3028] tabular-nums">
                                  {badge.num} · {badge.name}
                                </span>
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusStyles}`}>
                                  {badge.status}
                                </span>
                              </div>
                              <p className="text-xs font-semibold text-[#3E3028]">{badge.subtitle}</p>
                              <p className="text-[11px] text-[#6C584C] leading-relaxed">
                                {badge.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Diapositiva 3: Tabla de badges (Página 2 del documento) */}
                {ethicsCodeSlide === 3 && (
                  <div className="space-y-3">
                    <div className="space-y-0.5">
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#F57923]">
                        Badges para declaración de uso esperado de IA
                      </span>
                      <p className="text-xs text-[#6C584C]">
                        {ETHICS_CODE_PRESENTATION.badgesIntro}
                      </p>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-[#3E3028]/12 bg-white">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-[#FFF0DE] text-[#3E3028] border-b border-[#3E3028]/10">
                            <th className="py-2 px-3 font-bold">Badges</th>
                            <th className="py-2 px-3 font-bold">Uso pedagógico sugerido</th>
                            <th className="py-2 px-3 font-bold whitespace-nowrap">Estado</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#3E3028]/10">
                          {ETHICS_CODE_PRESENTATION.badges.map((badge) => {
                            const statusStyles = {
                              teal: 'bg-[#0F766E] text-white',
                              blue: 'bg-[#1D4ED8] text-white',
                              amber: 'bg-[#D97706] text-white',
                              red: 'bg-[#DC2626] text-white',
                            }[badge.accent];
                            return (
                              <tr key={badge.num} className="align-top">
                                <td className="py-2.5 px-3 font-semibold text-[#3E3028]">
                                  <span className="block font-bold">{badge.name}</span>
                                  <span className="text-[11px] font-normal text-[#6C584C]">
                                    {badge.subtitle}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 text-[11px] text-[#6C584C] leading-relaxed">
                                  {badge.description}
                                </td>
                                <td className="py-2.5 px-3 whitespace-nowrap">
                                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${statusStyles}`}>
                                    {badge.status}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Diapositiva 4: Compromisos de docentes */}
                {ethicsCodeSlide === 4 && (
                  <div className="space-y-3">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#F57923]">
                      3 · Compromisos de docentes
                    </span>
                    <ul className="space-y-2 rounded-xl bg-[#FFF0DE]/65 border border-[#F7C99D] p-4">
                      {ETHICS_CODE_PRESENTATION.compromisosDocentes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3E3028]">
                          <Check className="w-4 h-4 text-[#F57923] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Diapositiva 5: Compromisos de estudiantes */}
                {ethicsCodeSlide === 5 && (
                  <div className="space-y-3">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#F57923]">
                      4 · Compromisos de estudiantes
                    </span>
                    <ul className="space-y-2 rounded-xl bg-[#FFF0DE]/65 border border-[#F7C99D] p-4">
                      {ETHICS_CODE_PRESENTATION.compromisosEstudiantes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3E3028]">
                          <Check className="w-4 h-4 text-[#F57923] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Diapositiva 6: Recomendaciones */}
                {ethicsCodeSlide === 6 && (
                  <div className="space-y-3">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#F57923]">
                      5 · Recomendaciones
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {ETHICS_CODE_PRESENTATION.recomendaciones.map((item, idx) => (
                        <div
                          key={item}
                          className="rounded-xl bg-[#FFF0DE]/70 border border-[#F7C99D] p-3 flex items-start gap-2.5 text-xs sm:text-sm text-[#3E3028]"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#F57923] text-[#FAF7F0] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                            {idx + 1}
                          </span>
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className="rounded-xl bg-[#3E3028] text-[#FAF7F0] px-3.5 py-2.5 text-xs font-medium leading-relaxed">
                      {ETHICS_CODE_PRESENTATION.footerNote}
                    </p>
                  </div>
                )}

                {/* Controles de navegación de la presentación */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#3E3028]/10">
                  <button
                    type="button"
                    onClick={() => setEthicsCodeSlide((s) => (s > 1 ? s - 1 : 6))}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0DE] hover:bg-[#F7C99D]/55 text-[#3E3028] text-xs font-semibold px-3.5 py-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Anterior
                  </button>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setEthicsCodeSlide(num)}
                        aria-label={`Ir a diapositiva ${num} del código de conducta`}
                        className={`w-6 h-6 rounded-full text-[11px] font-semibold tabular-nums transition-colors cursor-pointer ${
                          ethicsCodeSlide === num
                            ? 'bg-[#F57923] text-[#FAF7F0]'
                            : 'bg-[#FFF0DE] text-[#6C584C] hover:text-[#3E3028]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setEthicsCodeSlide((s) => (s < 6 ? s + 1 : 1))}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] text-xs font-semibold px-3.5 py-1.5 transition-colors cursor-pointer"
                  >
                    Siguiente
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...revealMotion(0.06)}
              className="mb-8 rounded-3xl bg-gradient-to-br from-[#FFF0DE] via-[#FFF0DE] to-[#F7C99D]/35 border border-[#F7C99D] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-center"
            >
              {/* Lado izquierdo: descripción + botones */}
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF7F0] border border-[#F7C99D] text-[#F57923] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[#F57923]">
                      Actividad 2.1 · Canva
                    </p>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3E3028] leading-snug">
                      Diseño de nuestro código de conducta sobre IA
                    </h3>
                    <p className="text-sm text-[#6C584C] leading-relaxed whitespace-pre-line">
                      {'Segundo paso. Con base en la lectura y el análisis del documento anterior, ingresa al recurso en Canva y elabora en equipo la propuesta visual para tu comunidad educativa.\nEste recurso deberá contener los principios, compromisos y recomendaciones clave que orienten el uso responsable, seguro y ético de la inteligencia artificial tanto para docentes como para estudiantes dentro de la institución.'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pl-0 sm:pl-16">
                  <a
                    href="https://canva.link/trp4jcgmkwhbcbj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] text-sm font-semibold px-5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 shadow-sm shadow-[#F57923]/20 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3E3028]"
                  >
                    Abrir recurso en Canva
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <label className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F0] hover:bg-[#F7C99D]/45 text-[#3E3028] border border-[#3E3028]/12 text-xs font-semibold px-4 py-2.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer">
                    <ImagePlus className="w-3.5 h-3.5 text-[#F57923]" />
                    <span>Cargar imágenes de Canva</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="sr-only"
                      onChange={(e) => {
                        const files = Array.from(e.target.files ?? []);
                        if (files.length === 0) return;
                        const loaded = files.map((file, idx) => ({
                          id: `custom-canva-${idx}-${file.name}`,
                          title: `Diapositiva ${idx + 1}`,
                          caption: file.name.replace(/\.[^/.]+$/, ''),
                          image: URL.createObjectURL(file),
                          imageAlt: `Diapositiva de Canva ${idx + 1}: ${file.name}`,
                        }));
                        setCustomCanvaSlides(loaded);
                        setCanvaSlideIndex(0);
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Lado derecho: presentación exacta de Canva + vista en imágenes */}
              <div className="lg:col-span-7 rounded-2xl bg-[#FAF7F0] border border-[#3E3028]/12 p-4 sm:p-5 shadow-xs space-y-3">
                {(() => {
                  const activeSlides = customCanvaSlides ?? CANVA_CONDUCT_SLIDES;
                  const safeIndex = Math.min(canvaSlideIndex, activeSlides.length - 1);
                  const currentSlide = activeSlides[safeIndex];
                  return (
                    <>
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#3E3028]/10">
                        <div>
                          <p className="text-xs font-semibold text-[#F57923] tabular-nums">
                            {canvaViewMode === 'embed'
                              ? `Presentación Canva · ${CANVA_CONDUCT_TITLE}`
                              : `Presentación de imágenes · Diapositiva ${safeIndex + 1} de ${activeSlides.length}`}
                          </p>
                          <p className="text-xs font-medium text-[#3E3028]">
                            {canvaViewMode === 'embed'
                              ? 'Vista interactiva directa del diseño original en Canva'
                              : currentSlide.title}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          <div
                            className="inline-flex rounded-full bg-[#FFF0DE] p-0.5 border border-[#F7C99D]"
                            role="tablist"
                            aria-label="Modo de visualización de Canva"
                          >
                            <button
                              type="button"
                              role="tab"
                              aria-selected={canvaViewMode === 'embed'}
                              onClick={() => setCanvaViewMode('embed')}
                              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors cursor-pointer ${
                                canvaViewMode === 'embed'
                                  ? 'bg-[#F57923] text-[#FAF7F0]'
                                  : 'text-[#6C584C] hover:text-[#3E3028]'
                              }`}
                            >
                              Canva en vivo
                            </button>
                            <button
                              type="button"
                              role="tab"
                              aria-selected={canvaViewMode === 'images'}
                              onClick={() => setCanvaViewMode('images')}
                              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors cursor-pointer ${
                                canvaViewMode === 'images'
                                  ? 'bg-[#F57923] text-[#FAF7F0]'
                                  : 'text-[#6C584C] hover:text-[#3E3028]'
                              }`}
                            >
                              Imágenes ({activeSlides.length})
                            </button>
                          </div>

                          {customCanvaSlides && canvaViewMode === 'images' && (
                            <button
                              type="button"
                              onClick={() => {
                                setCustomCanvaSlides(null);
                                setCanvaSlideIndex(0);
                              }}
                              className="rounded-full bg-[#FFF0DE] hover:bg-[#F7C99D]/55 text-[#3E3028] text-[11px] font-semibold px-3 py-1 transition-colors cursor-pointer"
                            >
                              Ver diapositivas guía
                            </button>
                          )}
                        </div>
                      </div>

                      {canvaViewMode === 'embed' ? (
                        <>
                          <div className="relative overflow-hidden rounded-xl border border-[#3E3028]/10 bg-white aspect-[16/9]">
                            <iframe
                              src={CANVA_CONDUCT_EMBED_URL}
                              title={`${CANVA_CONDUCT_TITLE} — Presentación en Canva`}
                              className="w-full h-full border-0"
                              allow="fullscreen"
                              allowFullScreen
                              loading="lazy"
                            />
                          </div>
                          <p className="text-xs text-[#6C584C] leading-relaxed">
                            Vista incrustada del diseño original{' '}
                            <span className="font-semibold text-[#3E3028]">{CANVA_CONDUCT_TITLE}</span>. Si Canva solicita permisos de acceso, asegúrate de compartir el diseño como{' '}
                            <span className="font-semibold text-[#3E3028]">Cualquier persona con el enlace puede ver</span> o exporta tus diapositivas en PNG/JPG desde Canva y cárgalas en{' '}
                            <span className="font-semibold text-[#3E3028]">Cargar imágenes de Canva</span>.
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="relative overflow-hidden rounded-xl border border-[#3E3028]/10 bg-white aspect-[16/9]">
                            <ResilientImage
                              key={currentSlide.image}
                              src={currentSlide.image}
                              alt={currentSlide.imageAlt}
                              className={`w-full h-full ${customCanvaSlides ? 'object-contain' : 'object-cover'}`}
                              containerClassName="w-full h-full"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setCanvaSlideIndex((i) => (i > 0 ? i - 1 : activeSlides.length - 1))
                              }
                              aria-label="Diapositiva anterior de Canva"
                              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FAF7F0]/90 hover:bg-[#F57923] text-[#3E3028] hover:text-[#FAF7F0] border border-[#3E3028]/15 flex items-center justify-center shadow-sm transition-colors cursor-pointer"
                            >
                              <ArrowLeft className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setCanvaSlideIndex((i) => (i < activeSlides.length - 1 ? i + 1 : 0))
                              }
                              aria-label="Siguiente diapositiva de Canva"
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FAF7F0]/90 hover:bg-[#F57923] text-[#3E3028] hover:text-[#FAF7F0] border border-[#3E3028]/15 flex items-center justify-center shadow-sm transition-colors cursor-pointer"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>

                          <p className="text-xs text-[#6C584C] leading-relaxed">
                            {currentSlide.caption}
                          </p>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                            {activeSlides.map((slideItem, idx) => (
                              <button
                                key={slideItem.id}
                                type="button"
                                onClick={() => setCanvaSlideIndex(idx)}
                                aria-label={`Ver ${slideItem.title}`}
                                className={`overflow-hidden rounded-lg border-2 aspect-[16/9] bg-white transition-all cursor-pointer ${
                                  safeIndex === idx
                                    ? 'border-[#F57923] ring-2 ring-[#F57923]/25'
                                    : 'border-[#3E3028]/10 opacity-75 hover:opacity-100'
                                }`}
                              >
                                <ResilientImage
                                  src={slideItem.image}
                                  alt={slideItem.imageAlt}
                                  className="w-full h-full object-cover"
                                  containerClassName="w-full h-full"
                                />
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  );
                })()}
              </div>
            </motion.div>

            <div className="max-w-3xl mx-auto text-center space-y-2.5 pt-2 mb-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#F57923]">
                Del código a la práctica en el aula
              </p>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3E3028] leading-snug">
                Cuatro pilares clave para construir y aplicar tus acuerdos
              </h3>
              <p className="text-sm sm:text-base text-[#6C584C] leading-relaxed">
                Después de revisar el documento guía en la <strong className="text-[#3E3028]">Actividad 2</strong> y diseñar su código de conducta en la <strong className="text-[#3E3028]">Actividad 2.1</strong>, apóyense en estos cuatro ejes para revisar acuerdos modelo por cada tema. Estos criterios serán la base para resolver los casos del recorrido interactivo en Genially y redactar la declaración final de uso de IA en la <strong className="text-[#3E3028]">Actividad 4</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ETHICS_CARDS.map((card, index) => (
                <motion.button
                  key={card.id}
                  type="button"
                  {...revealMotion(index * 0.06)}
                  onClick={() => setSelectedEthics(card)}
                  className="group text-left bg-[#FFF0DE] hover:bg-[#FFF0DE]/90 rounded-3xl p-6 sm:p-7 border border-[#3E3028]/8 hover:border-[#F57923]/45 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F57923]"
                >
                  <div>
                    <div className="mb-5 transition-transform duration-200 group-hover:scale-105 origin-left">
                      <EthicsCardIllustration iconKey={card.iconKey} />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#3E3028] mb-2.5">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#6C584C] leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#F57923] group-hover:gap-2.5 transition-all">
                    Ver acuerdo modelo
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </motion.button>
              ))}
            </div>

            <EthicsMiniGameWindow />

            <div className="space-y-5 mt-8">
              {ETHICS_ACTIVITIES.map((activity, index) => {
                const isGamma = activity.id === 'actividad-4-declaracion-ia';
                return (
                  <motion.div
                    key={activity.id}
                    {...revealMotion(index * 0.08)}
                    className="rounded-3xl bg-gradient-to-br from-[#FFF0DE] via-[#FFF0DE] to-[#F7C99D]/35 border border-[#F7C99D] hover:border-[#F57923]/60 p-6 sm:p-8 transition-all duration-200 space-y-6"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-center">
                      <div className="lg:col-span-5 space-y-5">
                        <div className="flex items-start gap-4">
                          <a
                            href={activity.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Abrir ${activity.title}`}
                            aria-label={`Abrir ${activity.title}`}
                            className="shrink-0 transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F57923] rounded-full"
                          >
                            <EthicsCardIllustration iconKey={activity.iconKey} />
                          </a>
                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-[#F57923]">
                              {activity.platform}
                            </p>
                            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3E3028] leading-snug">
                              {activity.title}
                            </h3>
                            <p className="text-sm text-[#6C584C] leading-relaxed">
                              {activity.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pl-0 sm:pl-16">
                          <a
                            href={activity.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] text-sm font-semibold px-5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 shadow-sm shadow-[#F57923]/20 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3E3028]"
                          >
                            Ir a la actividad
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            type="button"
                            onClick={() => setSelectedActivity(activity)}
                            className="inline-flex items-center gap-2 rounded-full bg-[#FAF7F0] hover:bg-[#F7C99D]/45 text-[#3E3028] border border-[#3E3028]/12 text-xs font-semibold px-4 py-2.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F57923]"
                          >
                            <Maximize2 className="w-3.5 h-3.5 text-[#F57923]" />
                            Ampliar vista
                          </button>
                        </div>
                      </div>

                      <div className="lg:col-span-7 rounded-2xl bg-[#FAF7F0] border border-[#3E3028]/12 p-3 sm:p-4 shadow-xs space-y-2.5">
                        <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-[#3E3028]/10">
                          <span className="text-xs font-semibold text-[#F57923]">
                            {activity.previewImage
                              ? 'Presentación Gamma · Haz clic en la imagen para abrir'
                              : isGamma
                                ? 'Presentación Gamma · Explora sin salir de la página'
                                : 'Genially interactivo · Explora sin salir de la página'}
                          </span>
                          {activity.previewImage ? (
                            <a
                              href={activity.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3E3028] hover:text-[#F57923] transition-colors"
                            >
                              Abrir en Gamma
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setSelectedActivity(activity)}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3E3028] hover:text-[#F57923] transition-colors cursor-pointer"
                            >
                              <Maximize2 className="w-3 h-3" />
                              Pantalla ampliada
                            </button>
                          )}
                        </div>
                        {activity.previewImage ? (
                          <a
                            href={activity.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Abrir presentación de Gamma: ${activity.title}`}
                            className="group/img relative block overflow-hidden rounded-xl border border-[#3E3028]/10 bg-[#FFF0DE] aspect-video focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F57923]"
                          >
                            <ResilientImage
                              src={activity.previewImage}
                              alt={activity.previewImageAlt ?? activity.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-[1.02]"
                              containerClassName="w-full h-full"
                            />
                            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[#F57923] group-hover/img:bg-[#DF6613] text-[#FAF7F0] text-xs font-semibold px-3.5 py-1.5 shadow-md transition-colors">
                              Explorar en Gamma
                              <ExternalLink className="w-3.5 h-3.5" />
                            </span>
                          </a>
                        ) : (
                          <div className="overflow-hidden rounded-xl border border-[#3E3028]/10 bg-[#FFF0DE] aspect-video">
                            <iframe
                              src={activity.embedUrl}
                              title={activity.title}
                              allow="fullscreen"
                              allowFullScreen
                              loading="lazy"
                              className="w-full h-full border-0"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                  {activity.toolLinks && activity.toolLinks.length > 0 && (
                    <div className="pt-5 border-t border-[#3E3028]/10 space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#F57923]">
                        Ruta de herramientas en orden de la presentación
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {activity.toolLinks.map((item) => (
                          <a
                            key={item.step}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between gap-3 rounded-2xl bg-[#FAF7F0] hover:bg-[#F57923] border border-[#3E3028]/12 hover:border-[#F57923] px-4 py-3 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3E3028]"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="w-7 h-7 rounded-full bg-[#FFF0DE] group-hover:bg-[#FAF7F0] text-[#F57923] text-xs font-bold flex items-center justify-center shrink-0 tabular-nums transition-colors">
                                {item.step}
                              </span>
                              <div className="min-w-0">
                                <span className="block text-xs font-bold text-[#3E3028] group-hover:text-[#FAF7F0] truncate transition-colors">
                                  {item.label}
                                </span>
                                <span className="block text-[11px] font-semibold text-[#F57923] group-hover:text-[#FFF0DE] truncate transition-colors">
                                  {item.tool}
                                </span>
                              </div>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-[#6C584C] group-hover:text-[#FAF7F0] shrink-0 transition-colors" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECCIÓN 5 — HERRAMIENTAS IA PARA USAR EN CLASE (COLLAGE INTERACTIVO) */}
        <section
          id="agente-ia"
          className="relative py-20 sm:py-24 bg-[#FFF0DE]/65 overflow-x-clip"
        >
          {/* Right edge organic orange blotch */}
          <svg
            aria-hidden="true"
            viewBox="0 0 260 320"
            className="pointer-events-none absolute -right-24 top-20 w-52 sm:w-64 text-[#F6B36A]/28"
          >
            <path
              fill="currentColor"
              d="M126,20C188,12,240,68,242,134C244,200,192,278,122,284C52,290,12,216,14,148C16,80,64,28,126,20Z"
            />
          </svg>

          <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
              <div className="max-w-2xl space-y-2.5">
                <p className="relative inline-block pb-2 font-serif text-xl sm:text-2xl font-bold italic uppercase tracking-wide text-[#F57923]">
                  HERRAMIENTAS IA PARA USAR EN CLASE
                  <HandDrawnUnderline className="absolute bottom-0 left-0 w-full h-3" />
                </p>
                <h2 className="font-serif text-[clamp(1.95rem,3.2vw,2.85rem)] font-bold leading-tight text-[#3E3028]">
                  Collage visual de inteligencias artificiales educativas
                </h2>
                <p className="text-sm sm:text-base text-[#6C584C] leading-relaxed">
                  Haz clic en cualquier imagen del collage para ir directamente a la herramienta y consulta debajo para qué sirve y cómo aprovecharla con tus estudiantes.
                </p>
              </div>

              {/* Filtros por enfoque de uso en clase */}
              <div
                role="tablist"
                aria-label="Filtrar herramientas de IA para clase"
                className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-[#FAF7F0] border border-[#3E3028]/10 self-start lg:self-auto"
              >
                {[
                  'Todas',
                  'Planeación y guías',
                  'Diseño y presentaciones',
                  'Investigación y estudio',
                ].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={activeAiCategory === tab}
                    onClick={() => setActiveAiCategory(tab)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      activeAiCategory === tab
                        ? 'bg-[#F57923] text-[#FAF7F0]'
                        : 'text-[#6C584C] hover:text-[#3E3028]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Collage asimétrico de imágenes con hipervínculo directo + explicación debajo */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
              {filteredClassroomTools.map((tool, idx) => (
                <motion.article
                  key={tool.id}
                  {...revealMotion(idx * 0.05)}
                  className={`group bg-[#FAF7F0] rounded-3xl overflow-hidden border border-[#3E3028]/10 hover:border-[#F57923]/55 shadow-sm hover:shadow-md hover:shadow-[#3E3028]/8 transition-all duration-200 flex flex-col ${
                    activeAiCategory === 'Todas' ? tool.collageSpan : 'lg:col-span-6'
                  }`}
                >
                  {/* Imagen clicable con hipervínculo directo a la IA */}
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Abrir ${tool.name} en una nueva pestaña`}
                    aria-label={`Ir a ${tool.name}: ${tool.category}`}
                    className={`relative block overflow-hidden bg-[#FFF0DE] ${
                      activeAiCategory === 'Todas'
                        ? 'aspect-[16/10] lg:aspect-auto lg:h-[260px]'
                        : 'aspect-[16/9]'
                    } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F57923]`}
                  >
                    <ResilientImage
                      src={tool.image}
                      alt={tool.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      containerClassName="w-full h-full"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-[#FAF7F0]/92 backdrop-blur-xs border border-[#3E3028]/10 px-3 py-1 text-[11px] font-semibold text-[#3E3028]">
                      {tool.category}
                    </span>
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[#F57923] group-hover:bg-[#DF6613] text-[#FAF7F0] px-3.5 py-1.5 text-xs font-semibold shadow-md transition-all">
                      Ir a {tool.name}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </a>

                  {/* Explicación breve debajo de la imagen: para qué sirve y cómo usarla */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-3">
                    <div className="space-y-2.5">
                      <h3 className="font-serif text-xl font-bold text-[#3E3028] leading-snug">
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#F57923] transition-colors inline-flex items-center gap-1.5"
                        >
                          {tool.name}
                          <ExternalLink className="w-3.5 h-3.5 text-[#F57923]" />
                        </a>
                      </h3>

                      <p className="text-xs sm:text-sm text-[#3E3028] leading-relaxed">
                        <strong className="text-[#F57923] font-semibold">Para qué sirve: </strong>
                        {tool.purpose}
                      </p>
                      <p className="text-xs sm:text-sm text-[#6C584C] leading-relaxed">
                        <strong className="text-[#3E3028] font-semibold">Cómo usarla en clase: </strong>
                        {tool.howToUse}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* APARTADO — LISTADO COMPLETO DE HERRAMIENTAS DE IA USADAS EN EL PORTAFOLIO */}
        <section
          id="herramientas-portafolio"
          className="relative py-16 sm:py-20 bg-[#FAF7F0] border-t border-[#3E3028]/10 overflow-x-clip"
        >
          <div className="relative z-10 max-w-[1260px] mx-auto px-5 sm:px-8 space-y-10">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <p className="relative inline-block pb-2 font-serif text-xl sm:text-2xl font-bold italic uppercase tracking-wide text-[#F57923]">
                Inventario de herramientas
                <HandDrawnUnderline className="absolute bottom-0 left-0 w-full h-3" />
              </p>
              <h2 className="font-serif text-[clamp(1.85rem,3vw,2.65rem)] font-bold leading-tight text-[#3E3028]">
                Todas las herramientas de IA usadas en el portafolio y para qué
              </h2>
              <p className="text-sm sm:text-base text-[#6C584C] leading-relaxed">
                Resumen completo de cada plataforma empleada a lo largo de las actividades, la etapa donde se utilizó y su propósito pedagógico.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {PORTFOLIO_USED_TOOLS.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl bg-[#FFF0DE]/70 hover:bg-[#FFF0DE] border border-[#3E3028]/10 hover:border-[#F57923]/45 p-5 sm:p-6 transition-all duration-200 flex items-start gap-4"
                >
                  <span className="w-10 h-10 rounded-2xl bg-[#FAF7F0] border border-[#F7C99D] text-[#F57923] font-serif font-bold text-sm flex items-center justify-center shrink-0 tabular-nums shadow-xs">
                    {item.number}
                  </span>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3E3028] leading-snug">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 hover:text-[#F57923] transition-colors"
                        >
                          <span>{item.name}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#F57923] shrink-0" />
                        </a>
                      </h3>
                      <a
                        href={item.stageHref}
                        className="inline-flex items-center rounded-full bg-[#FAF7F0] hover:bg-[#F7C99D]/45 border border-[#3E3028]/10 px-3 py-1 text-[11px] font-semibold text-[#6C584C] hover:text-[#3E3028] transition-colors whitespace-nowrap"
                      >
                        {item.stage}
                      </a>
                    </div>

                    <p className="text-xs sm:text-sm text-[#6C584C] leading-relaxed">
                      <strong className="text-[#3E3028] font-semibold">Para qué se usó: </strong>
                      {item.usedFor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN 7 — CONTACTO (FRANJA NARANJA INTENSA) */}
        <section
          id="contacto"
          className="relative bg-[#F57923] text-[#FAF7F0] py-20 sm:py-24 overflow-x-clip"
        >
          {/* Protruding decorative organic illustrations */}
          <svg
            aria-hidden="true"
            viewBox="0 0 280 280"
            className="pointer-events-none absolute -left-16 -top-12 w-48 sm:w-64 text-[#F6B36A]/45"
          >
            <path
              fill="currentColor"
              d="M90,22C146,12,216,46,232,108C248,170,210,248,144,256C78,264,14,202,12,134C10,66,34,32,90,22Z"
            />
          </svg>
          <BotanicalSprig
            className="hidden sm:block pointer-events-none absolute right-6 -top-10 w-28 h-32 rotate-12"
            color="#FFF0DE"
            accentColor="#3E3028"
          />
          <FloatingStar
            className="hidden md:block absolute bottom-10 left-20"
            size={24}
            color="#FFF0DE"
            delay={0.2}
          />
          <FloatingStar
            className="hidden md:block absolute top-14 left-1/4"
            size={16}
            color="#F7C99D"
            delay={0.9}
          />

          <div className="relative z-10 max-w-[1220px] mx-auto px-5 sm:px-8">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <p className="relative inline-block pb-2 font-serif text-xl sm:text-2xl font-bold italic uppercase tracking-wide text-[#FAF7F0]">
                Asistente virtual · Contacto
                <HandDrawnUnderline color="#FFF0DE" className="absolute bottom-0 left-0 w-full h-3" />
              </p>
              <h2 className="font-serif text-[clamp(2rem,3.6vw,3.15rem)] font-bold leading-[1.12] text-[#FAF7F0]">
                Conversa con nuestro asistente virtual sobre IA ética en el aula
              </h2>
              <p className="text-base sm:text-lg text-[#FFF0DE] leading-relaxed">
                Resuelve dudas en tiempo real en el chat conectado a Udify o agenda una sesión de acompañamiento para tu comunidad educativa.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
              {/* Lado izquierdo: imagen del asistente simulando hablar + acciones */}
              <div className="lg:col-span-5 rounded-3xl bg-[#FAF7F0] text-[#3E3028] border border-[#FFF0DE]/90 shadow-xl p-6 sm:p-7 flex flex-col justify-between gap-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF0DE] border border-[#F7C99D] px-3 py-1 text-xs font-semibold text-[#F57923]">
                      <span className="relative flex h-2.5 w-2.5">
                        {assistantSpeaking && !prefersReduced && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        )}
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                      {assistantSpeaking ? 'Asistente hablando...' : 'Asistente en espera'}
                    </span>

                    <button
                      type="button"
                      onClick={() => setAssistantSpeaking((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0DE] hover:bg-[#F7C99D]/60 text-[#3E3028] text-xs font-semibold px-3 py-1 transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-[#F57923]" />
                      {assistantSpeaking ? 'Pausar voz' : 'Simular voz'}
                    </button>
                  </div>

                  {/* Retrato animado del asistente simulando hablar */}
                  <div className="relative mx-auto max-w-[290px] w-full aspect-square flex items-center justify-center">
                    {assistantSpeaking && !prefersReduced && (
                      <>
                        <motion.div
                          aria-hidden="true"
                          animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.15, 0.55] }}
                          transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute inset-0 rounded-[2rem] border-2 border-[#F57923]/45 bg-[#F57923]/8"
                        />
                        <motion.div
                          aria-hidden="true"
                          animate={{ scale: [1.02, 1.13, 1.02], opacity: [0.35, 0.05, 0.35] }}
                          transition={{ duration: 2.1, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute inset-0 rounded-[2rem] border border-[#F6B36A]/55"
                        />
                      </>
                    )}

                    <motion.div
                      animate={
                        assistantSpeaking && !prefersReduced
                          ? { y: [0, -4, 0], scale: [1, 1.015, 1] }
                          : { y: 0, scale: 1 }
                      }
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative w-full h-full rounded-[1.75rem] overflow-hidden border-2 border-[#F7C99D] bg-[#FFF0DE] shadow-md"
                    >
                      <ResilientImage
                        src={IMAGES.virtualAssistant}
                        alt="Asistente virtual pedagógico conversando con ondas de voz"
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                      />

                      {/* Ecualizador animado simulando habla */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-[#3E3028]/88 backdrop-blur-xs text-[#FAF7F0] px-3.5 py-1.5 shadow-md">
                        <span className="flex items-end gap-0.5 h-3.5" aria-hidden="true">
                          {[0, 0.15, 0.3, 0.1, 0.25].map((delay, idx) => (
                            <motion.span
                              key={idx}
                              animate={
                                assistantSpeaking && !prefersReduced
                                  ? { height: ['35%', '100%', '45%', '90%', '35%'] }
                                  : { height: '40%' }
                              }
                              transition={{
                                duration: 0.9,
                                delay,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                              className="w-0.5 rounded-full bg-[#F57923]"
                            />
                          ))}
                        </span>
                        <span className="text-[11px] font-semibold whitespace-nowrap">
                          {assistantSpeaking ? 'Listo para conversar' : 'En pausa'}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Burbuja de diálogo del asistente */}
                  <div className="relative rounded-2xl bg-[#FFF0DE] border border-[#F7C99D] p-4 text-left space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#F57923]">
                      Mensaje del asistente
                    </p>
                    <p className="text-sm text-[#3E3028] leading-relaxed">
                      “¡Hola! Soy el asistente virtual de Savia Docente. Escríbeme en el chat de al lado para resolver dudas sobre IA ética, retos de aula o el código de conducta.”
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#3E3028]/10 flex flex-wrap items-center justify-between gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setContactPrefill('');
                      setContactOpen(true);
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] font-semibold text-xs sm:text-sm px-4 py-2.5 transition-all duration-200 hover:-translate-y-0.5 shadow-sm shadow-[#F57923]/25 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3E3028]"
                  >
                    Solicitar acompañamiento
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href={UDIFY_AGENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0DE] hover:bg-[#F7C99D]/55 text-[#3E3028] border border-[#3E3028]/12 font-semibold text-xs px-4 py-2.5 transition-colors whitespace-nowrap shrink-0"
                  >
                    Abrir en Udify
                    <ExternalLink className="w-3.5 h-3.5 text-[#F57923]" />
                  </a>
                </div>
              </div>

              {/* Lado derecho: chat en vivo enlazado a Udify */}
              <div className="lg:col-span-7 rounded-3xl bg-[#FAF7F0] text-[#3E3028] border border-[#FFF0DE]/90 shadow-xl overflow-hidden flex flex-col">
                <div className="bg-[#FFF0DE] border-b border-[#F7C99D] px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-[#F57923]/40 bg-white shrink-0">
                      <ResilientImage
                        src={IMAGES.virtualAssistant}
                        alt="Miniatura del asistente virtual"
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-serif text-sm sm:text-base font-bold text-[#3E3028] leading-tight flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4 text-[#F57923]" />
                        Chat en vivo · Asistente Virtual
                      </p>
                      <p className="text-[11px] text-[#6C584C]">
                        Enlazado directamente con Udify
                      </p>
                    </div>
                  </div>
                  <a
                    href={UDIFY_AGENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F0] hover:bg-[#F57923] text-[#3E3028] hover:text-[#FAF7F0] border border-[#3E3028]/12 text-xs font-semibold px-3.5 py-1.5 transition-colors"
                  >
                    Abrir aparte
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <iframe
                  src={UDIFY_AGENT_URL}
                  title="Asistente Virtual Savia Docente — Chat Udify"
                  allow="microphone; clipboard-write"
                  loading="lazy"
                  className="w-full flex-1 min-h-[500px] lg:min-h-[560px] border-0 bg-white"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET EDITORIAL FOOTER */}
      <footer className="bg-[#FAF7F0] border-t border-[#3E3028]/10 py-10">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#6C584C]">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-bold text-[#3E3028]">Savia Docente</span>
            <span aria-hidden="true">·</span>
            <span>Pedagogía, ética y co-creación en el aula</span>
          </div>
          <nav aria-label="Pie de página" className="flex flex-wrap items-center gap-5">
            <a href="#diagnostico" className="hover:text-[#3E3028] transition-colors">
              Diagnóstico
            </a>
            <a href="#co-creacion" className="hover:text-[#3E3028] transition-colors">
              Co-creación
            </a>
            <a href="#etica" className="hover:text-[#3E3028] transition-colors">
              Ética
            </a>
            <a href="#agente-ia" className="hover:text-[#3E3028] transition-colors">
              Herramientas IA
            </a>
          </nav>
        </div>
      </footer>

      {/* INTERACTIVE MODALS */}
      <Activity2PresentationModal
        isOpen={activity2Open}
        onClose={() => setActivity2Open(false)}
      />

      <MuroQrModal
        isOpen={muroQrModalTab !== null}
        initialTab={muroQrModalTab ?? 'mapas'}
        onClose={() => setMuroQrModalTab(null)}
      />

      <CoCreationWorkshopModal
        isOpen={workshopOpen}
        onClose={() => setWorkshopOpen(false)}
      />

      <DetailModal
        ethicsItem={selectedEthics}
        ethicsActivity={selectedActivity}
        ethicsDocument={selectedDocument}
        agentItem={null}
        onClose={() => {
          setSelectedEthics(null);
          setSelectedActivity(null);
          setSelectedDocument(null);
        }}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        initialNote={contactPrefill}
      />

      <FloatingVirtualAssistant />
    </div>
  );
}
