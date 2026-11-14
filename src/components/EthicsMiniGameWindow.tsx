import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Gamepad2,
  Maximize2,
  Minimize2,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  X,
  XCircle,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export type EthicsPillarKey = 'todos' | 'autoria' | 'privacidad' | 'verificacion' | 'acuerdos';

interface GameOption {
  id: string;
  label: string;
  isCorrect: boolean;
  feedback: string;
}

interface GameScenario {
  id: string;
  pillar: Exclude<EthicsPillarKey, 'todos'>;
  pillarLabel: string;
  badgeTag: string;
  situation: string;
  options: GameOption[];
}

const PILLAR_TABS: { key: EthicsPillarKey; label: string }[] = [
  { key: 'todos', label: 'Todos (6)' },
  { key: 'autoria', label: 'Autoría y voz' },
  { key: 'privacidad', label: 'Privacidad' },
  { key: 'verificacion', label: 'Verificación' },
  { key: 'acuerdos', label: 'Acuerdos' },
];

const GAME_SCENARIOS: GameScenario[] = [
  {
    id: 'caso-autoria-1',
    pillar: 'autoria',
    pillarLabel: 'Autoría y voz propia',
    badgeTag: 'Caso 1 · Autoría',
    situation:
      'Un estudiante quiere usar un asistente de IA para preparar un ensayo argumentativo sobre energías limpias. ¿Qué práctica respeta la autoría y su voz propia?',
    options: [
      {
        id: 'a',
        label: 'Pedir el texto completo a la IA, cambiar algunas palabras y entregarlo sin avisar.',
        isCorrect: false,
        feedback:
          'Sustituye la reflexión personal y oculta el uso de la herramienta, rompiendo la integridad académica.',
      },
      {
        id: 'b',
        label: 'Crear su esquema propio, usar la IA para recibir sugerencias de estructura y declarar en qué fase la consultó.',
        isCorrect: true,
        feedback:
          '¡Correcto! Conserva sus borradores previos, mantiene el criterio propio y declara con transparencia el apoyo recibido.',
      },
      {
        id: 'c',
        label: 'Usar únicamente un detector automático de IA como única prueba de evaluación.',
        isCorrect: false,
        feedback:
          'Los detectores automáticos generan falsos positivos; lo clave es valorar el proceso, borradores y defensa oral.',
      },
    ],
  },
  {
    id: 'caso-privacidad-1',
    pillar: 'privacidad',
    pillarLabel: 'Privacidad escolar',
    badgeTag: 'Caso 2 · Privacidad',
    situation:
      'Antes de clase, deseas pedirle a una herramienta generativa sugerencias de retroalimentación sobre los trabajos escritos de tu grupo. ¿Qué debes hacer primero?',
    options: [
      {
        id: 'a',
        label: 'Subir el listado completo con nombres, apellidos y calificaciones para que sea más preciso.',
        isCorrect: false,
        feedback:
          'Riesgo de privacidad: nunca deben ingresarse datos identificables ni calificaciones reales en modelos externos.',
      },
      {
        id: 'b',
        label: 'Anonimizar los textos usando códigos o alias (ej. "Estudiante A") antes de solicitar sugerencias.',
        isCorrect: true,
        feedback:
          '¡Excelente decisión! Anonimizar trabajos y usar códigos protege los datos personales del alumnado.',
      },
      {
        id: 'c',
        label: 'Compartir solo el correo institucional y el número de documento de cada estudiante.',
        isCorrect: false,
        feedback:
          'Tanto los correos como los documentos son datos personales sensibles que deben resguardarse.',
      },
    ],
  },
  {
    id: 'caso-verificacion-1',
    pillar: 'verificacion',
    pillarLabel: 'Verificación crítica',
    badgeTag: 'Caso 3 · Verificación',
    situation:
      'Durante una investigación de historia local, la IA entrega tres fechas y cita un libro que parece convincente. ¿Cuál es el paso correcto en el aula?',
    options: [
      {
        id: 'a',
        label: 'Aceptar las fechas porque el texto está redactado con seguridad y tono académico.',
        isCorrect: false,
        feedback:
          'Las herramientas generativas pueden producir "alucinaciones" con tono convincente pero datos inventados.',
      },
      {
        id: 'b',
        label: 'Contrastar los datos con al menos dos fuentes primarias o bibliográficas confiables antes de validarlos.',
        isCorrect: true,
        feedback:
          '¡Muy bien! Toda respuesta automatizada es una hipótesis inicial sujeta a contraste bibliográfico.',
      },
      {
        id: 'c',
        label: 'Preguntarle a la misma IA si está segura de su respuesta y copiarla sin revisar fuentes externas.',
        isCorrect: false,
        feedback:
          'Validar una IA con la misma IA no garantiza veracidad; se requiere contraste externo riguroso.',
      },
    ],
  },
  {
    id: 'caso-acuerdos-1',
    pillar: 'acuerdos',
    pillarLabel: 'Acuerdos visibles',
    badgeTag: 'Caso 4 · Acuerdos',
    situation:
      'Vas a iniciar un proyecto trimestral en equipo y quieres evitar confusiones sobre cuándo se permite usar IA. ¿Cómo aplicas el pilar de acuerdos visibles?',
    options: [
      {
        id: 'a',
        label: 'Definir al inicio el nivel permitido por fase (sin IA, guiado o co-creación) e incluir nota de transparencia.',
        isCorrect: true,
        feedback:
          '¡Exacto! Acordar las reglas antes del proyecto y señalar el badge permitido da claridad a toda la comunidad.',
      },
      {
        id: 'b',
        label: 'No mencionar la IA durante el proyecto y decidir al final si estuvo permitido usarla.',
        isCorrect: false,
        feedback:
          'La falta de reglas previas genera incertidumbre; los acuerdos deben ser visibles desde el inicio.',
      },
      {
        id: 'c',
        label: 'Permitir su uso libre sin registro ni diálogo en clase sobre el proceso seguido.',
        isCorrect: false,
        feedback:
          'Incluso en uso asistido se requiere transparencia y reflexión compartida sobre lo aprendido.',
      },
    ],
  },
  {
    id: 'caso-autoria-2',
    pillar: 'autoria',
    pillarLabel: 'Autoría y voz propia',
    badgeTag: 'Caso 5 · Bitácora y voz',
    situation:
      'En una actividad con badge "AI Co-Creation", un equipo usó prompts para explorar ideas de una maqueta científica. ¿Qué evidencia refuerza su autoría?',
    options: [
      {
        id: 'a',
        label: 'Adjuntar la bitácora de prompts usados y explicar oralmente cómo adaptaron las ideas al contexto del aula.',
        isCorrect: true,
        feedback:
          '¡Acertaste! La bitácora de prompts y la sustentación oral evidencian pensamiento crítico y autoría real.',
      },
      {
        id: 'b',
        label: 'Borrar el historial de prompts para entregar únicamente las imágenes finales.',
        isCorrect: false,
        feedback:
          'En co-creación es indispensable conservar y declarar la bitácora de prompts como parte del proceso.',
      },
      {
        id: 'c',
        label: 'Entregar las respuestas literales de la IA sin adaptarlas al problema real del curso.',
        isCorrect: false,
        feedback:
          'El valor pedagógico está en apropiarse, adaptar y argumentar con criterio propio.',
      },
    ],
  },
  {
    id: 'caso-privacidad-2',
    pillar: 'privacidad',
    pillarLabel: 'Privacidad escolar',
    badgeTag: 'Caso 6 · Cuidado de datos',
    situation:
      'Un estudiante quiere resumir una entrevista realizada a un familiar con un chatbot gratuito en línea. ¿Qué precaución ética debe tomar?',
    options: [
      {
        id: 'a',
        label: 'Incluir nombre completo, dirección y teléfono del entrevistado para dar más contexto.',
        isCorrect: false,
        feedback:
          'Nunca se deben exponer datos personales propios ni de terceros en plataformas sin verificación.',
      },
      {
        id: 'b',
        label: 'Eliminar nombres propios y referencias personales, y revisar primero la política de retención de datos.',
        isCorrect: true,
        feedback:
          '¡Correcto! Proteger la identidad de terceros y verificar las políticas de privacidad cuida a toda la comunidad.',
      },
      {
        id: 'c',
        label: 'Subir el audio original con rostro y voz del familiar sin consentimiento.',
        isCorrect: false,
        feedback:
          'Los archivos audiovisuales identificables requieren consentimiento explícito y resguardo de privacidad.',
      },
    ],
  },
];

function EthicsGameContent({
  compact = false,
  selectedPillar,
  onSelectPillar,
}: {
  compact?: boolean;
  selectedPillar: EthicsPillarKey;
  onSelectPillar: (pillar: EthicsPillarKey) => void;
}) {
  const scenarios = useMemo(
    () =>
      selectedPillar === 'todos'
        ? GAME_SCENARIOS
        : GAME_SCENARIOS.filter((item) => item.pillar === selectedPillar),
    [selectedPillar]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [chosenOptionId, setChosenOptionId] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredIds, setAnsweredIds] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);

  const safeIndex = Math.min(currentIndex, Math.max(0, scenarios.length - 1));
  const currentScenario = scenarios[safeIndex];
  const chosenOption = currentScenario?.options.find((opt) => opt.id === chosenOptionId) ?? null;

  const handleFilterChange = (pillar: EthicsPillarKey) => {
    onSelectPillar(pillar);
    setCurrentIndex(0);
    setChosenOptionId(null);
    setCorrectCount(0);
    setAnsweredIds({});
    setFinished(false);
  };

  const handleChooseOption = (option: GameOption) => {
    if (chosenOptionId || !currentScenario) return;
    setChosenOptionId(option.id);
    if (!answeredIds[currentScenario.id]) {
      setAnsweredIds((prev) => ({ ...prev, [currentScenario.id]: option.isCorrect }));
      if (option.isCorrect) {
        setCorrectCount((c) => c + 1);
      }
    }
  };

  const handleNext = () => {
    if (safeIndex + 1 < scenarios.length) {
      setCurrentIndex((i) => i + 1);
      setChosenOptionId(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setChosenOptionId(null);
    setCorrectCount(0);
    setAnsweredIds({});
    setFinished(false);
  };

  const progressPct = scenarios.length
    ? Math.round(((finished ? scenarios.length : safeIndex + (chosenOptionId ? 1 : 0)) / scenarios.length) * 100)
    : 0;

  return (
    <div className="space-y-4">
      {/* Filtros por pilar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filtrar casos por pilar">
          {PILLAR_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={selectedPillar === tab.key}
              onClick={() => handleFilterChange(tab.key)}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors cursor-pointer ${
                selectedPillar === tab.key
                  ? 'bg-[#3E3028] text-[#FAF7F0]'
                  : 'bg-[#FFF0DE] text-[#6C584C] hover:text-[#3E3028] hover:bg-[#F7C99D]/55'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3E3028] tabular-nums">
          <span className="rounded-full bg-[#FFF0DE] border border-[#F7C99D] px-3 py-1">
            Aciertos: <strong className="text-[#F57923]">{correctCount}</strong> / {scenarios.length}
          </span>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="h-1.5 w-full rounded-full bg-[#FFF0DE] overflow-hidden">
        <div
          className="h-full rounded-full bg-[#F57923] transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {!finished && currentScenario ? (
        <div className="space-y-3.5">
          <div className="rounded-2xl bg-[#FFF0DE]/70 border border-[#F7C99D] p-4 space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#F57923]">
                <ShieldCheck className="w-3.5 h-3.5" />
                {currentScenario.pillarLabel}
              </span>
              <span className="text-[11px] font-semibold text-[#6C584C] tabular-nums">
                {currentScenario.badgeTag} · {safeIndex + 1} de {scenarios.length}
              </span>
            </div>
            <p className={`font-serif font-semibold text-[#3E3028] leading-snug ${compact ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}`}>
              {currentScenario.situation}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {currentScenario.options.map((option, idx) => {
              const isSelected = chosenOptionId === option.id;
              const showOutcome = Boolean(chosenOptionId);
              let cardStyle =
                'bg-white hover:bg-[#FFF0DE]/65 border-[#3E3028]/12 hover:border-[#F57923]/60 text-[#3E3028]';

              if (showOutcome) {
                if (option.isCorrect) {
                  cardStyle = 'bg-emerald-50 border-emerald-500 text-[#3E3028]';
                } else if (isSelected && !option.isCorrect) {
                  cardStyle = 'bg-rose-50 border-rose-400 text-[#3E3028]';
                } else {
                  cardStyle = 'bg-white/60 border-[#3E3028]/10 text-[#6C584C] opacity-75';
                }
              }

              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={showOutcome}
                  onClick={() => handleChooseOption(option)}
                  className={`w-full text-left rounded-xl border px-3.5 py-2.5 transition-all flex items-start gap-2.5 ${
                    showOutcome ? 'cursor-default' : 'cursor-pointer'
                  } ${cardStyle}`}
                >
                  <span className="w-5 h-5 rounded-full bg-[#FFF0DE] border border-[#F7C99D] text-[11px] font-bold text-[#3E3028] flex items-center justify-center shrink-0 mt-0.5 uppercase">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-xs sm:text-sm leading-snug flex-1">{option.label}</span>
                  {showOutcome && option.isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {showOutcome && isSelected && !option.isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {chosenOption && (
            <div
              className={`rounded-xl border p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                chosenOption.isCorrect
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50/90 border-[#F7C99D] text-[#3E3028]'
              }`}
            >
              <p className="text-xs sm:text-sm leading-relaxed">
                <strong className="font-semibold">
                  {chosenOption.isCorrect ? 'Criterio ético logrado: ' : 'Reflexión para el aula: '}
                </strong>
                {chosenOption.feedback}
              </p>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] text-xs font-semibold px-4 py-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              >
                {safeIndex + 1 < scenarios.length ? 'Siguiente caso' : 'Ver resultado'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-2xl bg-[#FFF0DE] border border-[#F7C99D] p-5 text-center space-y-3">
          <div className="w-11 h-11 rounded-full bg-[#F57923] text-[#FAF7F0] flex items-center justify-center mx-auto">
            <Award className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-[#F57923]">
              Reto completado
            </p>
            <h4 className="font-serif text-xl font-bold text-[#3E3028]">
              {correctCount === scenarios.length
                ? 'Insignia: Guardián del Pacto Ético'
                : correctCount >= Math.ceil(scenarios.length / 2)
                ? 'Insignia: Constructor de Acuerdos'
                : 'Insignia: Explorador de Ética en IA'}
            </h4>
            <p className="text-xs sm:text-sm text-[#6C584C] max-w-lg mx-auto leading-relaxed">
              Resolviste correctamente {correctCount} de {scenarios.length} situaciones prácticas sobre autoría, privacidad escolar, verificación crítica y acuerdos visibles en el aula.
            </p>
          </div>
          <div className="pt-1 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] text-xs font-semibold px-5 py-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Volver a jugar
            </button>
            {selectedPillar !== 'todos' && (
              <button
                type="button"
                onClick={() => handleFilterChange('todos')}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F0] hover:bg-[#F7C99D]/55 text-[#3E3028] border border-[#3E3028]/12 text-xs font-semibold px-4 py-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F57923]" />
                Jugar los 6 casos
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function EthicsMiniGameWindow() {
  const prefersReduced = useReducedMotion();
  const [selectedPillar, setSelectedPillar] = useState<EthicsPillarKey>('todos');
  const [isExpandedWindow, setIsExpandedWindow] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <>
      {/* Pequeña ventana integrada en el apartado de los 4 pilares */}
      <div className="mt-7 max-w-4xl mx-auto rounded-2xl bg-[#FAF7F0] border border-[#3E3028]/15 shadow-sm overflow-hidden">
        {/* Barra superior estilo pequeña ventana */}
        <div className="bg-[#FFF0DE] border-b border-[#F7C99D] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F57923]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F6B36A]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3E3028]/25" />
            </div>
            <div className="flex items-center gap-1.5">
              <Gamepad2 className="w-4 h-4 text-[#F57923]" />
              <span className="text-xs sm:text-sm font-serif font-bold text-[#3E3028]">
                Mini-juego · Decisiones Éticas en el Aula
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsMinimized((m) => !m)}
              aria-label={isMinimized ? 'Expandir pequeña ventana del juego' : 'Minimizar pequeña ventana del juego'}
              className="inline-flex items-center gap-1 rounded-full bg-[#FAF7F0] hover:bg-[#F7C99D]/50 text-[#3E3028] border border-[#3E3028]/12 text-[11px] font-semibold px-2.5 py-1 transition-colors cursor-pointer"
            >
              {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
              <span>{isMinimized ? 'Mostrar juego' : 'Minimizar'}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsExpandedWindow(true)}
              className="inline-flex items-center gap-1 rounded-full bg-[#F57923] hover:bg-[#DF6613] text-[#FAF7F0] text-[11px] font-semibold px-3 py-1 transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Abrir ventana</span>
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="p-4 sm:p-5">
            <EthicsGameContent
              compact
              selectedPillar={selectedPillar}
              onSelectPillar={setSelectedPillar}
            />
          </div>
        )}
      </div>

      {/* Ventana flotante ampliada opcional */}
      <AnimatePresence>
        {isExpandedWindow && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ethics-game-modal-title"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.2 }}
              onClick={() => setIsExpandedWindow(false)}
              className="fixed inset-0 bg-[#3E3028]/55 backdrop-blur-xs"
            />
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: prefersReduced ? 0 : 0.22 }}
              className="relative w-full max-w-2xl bg-[#FAF7F0] rounded-3xl border border-[#3E3028]/15 shadow-2xl overflow-hidden my-auto"
            >
              <div className="bg-[#FFF0DE] border-b border-[#F7C99D] px-5 py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F57923]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F6B36A]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3E3028]/25" />
                  </div>
                  <Gamepad2 className="w-4 h-4 text-[#F57923]" />
                  <h3 id="ethics-game-modal-title" className="font-serif text-base sm:text-lg font-bold text-[#3E3028]">
                    Mini-juego · Decisiones Éticas en el Aula
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsExpandedWindow(false)}
                  aria-label="Cerrar ventana del juego"
                  className="w-8 h-8 rounded-full bg-[#FAF7F0] hover:bg-[#F7C99D]/60 text-[#3E3028] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 sm:p-6">
                <EthicsGameContent
                  selectedPillar={selectedPillar}
                  onSelectPillar={setSelectedPillar}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
