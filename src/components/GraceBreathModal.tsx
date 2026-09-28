import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Volume2,
  VolumeX,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Shield,
  Heart
} from 'lucide-react';

interface GraceBreathModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'rest';

interface PacingMode {
  id: string;
  name: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
  rest: number;
}

const PACING_MODES: PacingMode[] = [
  {
    id: 'box',
    name: 'Grace Box (4-4-4-4)',
    description: 'Calms acute panic & adrenaline',
    inhale: 4,
    hold: 4,
    exhale: 4,
    rest: 4
  },
  {
    id: 'calm',
    name: 'Peace Sigh (4-2-6)',
    description: 'Long exhale for parasympathetic rest',
    inhale: 4,
    hold: 2,
    exhale: 6,
    rest: 2
  }
];

const SCRIPTURE_PROMPTS: Record<BreathPhase, { scripture: string; text: string; action: string }> = {
  inhale: {
    action: 'Breathe In Grace',
    text: '"Be still, and know that I am God."',
    scripture: 'Psalm 46:10'
  },
  hold: {
    action: 'Rest in Truth',
    text: '"There is now no condemnation for those in Christ."',
    scripture: 'Romans 8:1'
  },
  exhale: {
    action: 'Release the Lie & Tension',
    text: '"Cast all your anxiety on Him, because He cares for you."',
    scripture: '1 Peter 5:7'
  },
  rest: {
    action: 'Settle in Stillness',
    text: '"My grace is sufficient for thee: my strength is made perfect in weakness."',
    scripture: '2 Corinthians 12:9'
  }
};

export default function GraceBreathModal({ isOpen, onClose }: GraceBreathModalProps) {
  const [selectedPacing, setSelectedPacing] = useState<PacingMode>(PACING_MODES[0]);
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [secondsLeftInPhase, setSecondsLeftInPhase] = useState(PACING_MODES[0].inhale);
  const [cycleCount, setCycleCount] = useState(0);
  const [targetCycles] = useState(4); // approx 60 seconds (16s x 4 = 64s)
  const [isCompleted, setIsCompleted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Gentle Web Audio API synthesizer tone (no external files required)
  const playGentleTone = (freq: number, duration: number = 0.5) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio not supported or blocked by user gesture policy
    }
  };

  // Vibrate mobile device subtly if supported
  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(40);
      } catch {
        // Ignored
      }
    }
  };

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setPhase('inhale');
      setSecondsLeftInPhase(selectedPacing.inhale);
      setCycleCount(0);
      setIsCompleted(false);
      playGentleTone(440, 0.4);
    }
  }, [isOpen, selectedPacing]);

  // Timer loop
  useEffect(() => {
    if (!isOpen || isCompleted) return;

    const timer = setInterval(() => {
      setSecondsLeftInPhase((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Phase transitions
        if (phase === 'inhale') {
          setPhase('hold');
          playGentleTone(523.25, 0.4); // C5
          triggerHaptic();
          return selectedPacing.hold;
        } else if (phase === 'hold') {
          setPhase('exhale');
          playGentleTone(392.0, 0.6); // G4
          triggerHaptic();
          return selectedPacing.exhale;
        } else if (phase === 'exhale') {
          if (selectedPacing.rest > 0) {
            setPhase('rest');
            playGentleTone(329.63, 0.4); // E4
            triggerHaptic();
            return selectedPacing.rest;
          } else {
            // Next cycle
            const nextCycle = cycleCount + 1;
            setCycleCount(nextCycle);
            if (nextCycle >= targetCycles) {
              setIsCompleted(true);
              playGentleTone(659.25, 0.8); // E5
              return 0;
            }
            setPhase('inhale');
            playGentleTone(440, 0.5);
            triggerHaptic();
            return selectedPacing.inhale;
          }
        } else {
          // Resting finished, next cycle
          const nextCycle = cycleCount + 1;
          setCycleCount(nextCycle);
          if (nextCycle >= targetCycles) {
            setIsCompleted(true);
            playGentleTone(659.25, 0.8);
            return 0;
          }
          setPhase('inhale');
          playGentleTone(440, 0.5);
          triggerHaptic();
          return selectedPacing.inhale;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, phase, selectedPacing, cycleCount, targetCycles, isCompleted]);

  if (!isOpen) return null;

  const currentPrompt = SCRIPTURE_PROMPTS[phase];

  // Visual orb scale and glow based on breathing phase
  const getOrbScale = () => {
    switch (phase) {
      case 'inhale':
        return 1.45;
      case 'hold':
        return 1.45;
      case 'exhale':
        return 0.85;
      case 'rest':
        return 0.85;
      default:
        return 1;
    }
  };

  const getTransitionDuration = () => {
    switch (phase) {
      case 'inhale':
        return selectedPacing.inhale;
      case 'hold':
        return 0.4;
      case 'exhale':
        return selectedPacing.exhale;
      case 'rest':
        return 0.4;
      default:
        return 1;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C2A39]/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.3 }}
        className="bg-[#FFFFFF] border-2 border-[#D4AF37]/60 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col items-center text-center selection:bg-[#D4AF37]/20"
      >
        {/* Top Controls Bar */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-[#F9F6F0]">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
              Somatic Anchor • 60 Seconds
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Audio chime toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playGentleTone(440, 0.2);
              }}
              className="p-1.5 rounded-lg text-[#7A8B7B] hover:text-[#1C2A39] hover:bg-[#F9F6F0] transition-colors cursor-pointer"
              title={soundEnabled ? 'Mute chimes' : 'Enable gentle chimes'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#D4AF37]" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#7A8B7B]" />
              )}
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#7A8B7B] hover:text-[#1C2A39] hover:bg-[#F9F6F0] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Header Title */}
        <div className="mt-4 mb-2">
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1C2A39]">
            The Grace Breath
          </h2>
          <p className="text-xs sm:text-sm text-[#7A8B7B] font-light max-w-sm mx-auto">
            Regulate your nervous system. When anxiety or cravings peak, let God's breath ground your body.
          </p>
        </div>

        {/* Pacing Mode Selector (Minimal Pills) */}
        <div className="flex gap-2 my-3 p-1 rounded-full bg-[#F9F6F0] border border-[#D4AF37]/30 text-xs">
          {PACING_MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedPacing(mode)}
              className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                selectedPacing.id === mode.id
                  ? 'bg-[#1C2A39] text-[#F9F6F0] shadow-xs'
                  : 'text-[#7A8B7B] hover:text-[#1C2A39]'
              }`}
            >
              {mode.name}
            </button>
          ))}
        </div>

        {/* Central Somatic Breathing Orb */}
        {!isCompleted ? (
          <div className="my-6 relative w-64 h-64 flex items-center justify-center">
            {/* Outer Soft Halo Pulse */}
            <motion.div
              animate={{
                scale: getOrbScale() * 1.15,
                opacity: phase === 'inhale' || phase === 'hold' ? 0.35 : 0.15
              }}
              transition={{
                duration: getTransitionDuration(),
                ease: 'easeInOut'
              }}
              className="absolute w-52 h-52 rounded-full bg-[#D4AF37]/30 blur-xl pointer-events-none"
            />

            {/* Sage Wave Ring */}
            <motion.div
              animate={{
                scale: getOrbScale() * 1.05,
                opacity: phase === 'inhale' || phase === 'hold' ? 0.4 : 0.2
              }}
              transition={{
                duration: getTransitionDuration(),
                ease: 'easeInOut'
              }}
              className="absolute w-44 h-44 rounded-full border-2 border-[#7A8B7B]/40"
            />

            {/* Primary Breathing Circle */}
            <motion.div
              animate={{
                scale: getOrbScale()
              }}
              transition={{
                duration: getTransitionDuration(),
                ease: 'easeInOut'
              }}
              className="w-36 h-36 rounded-full bg-gradient-to-tr from-[#1C2A39] via-[#2A3F55] to-[#D4AF37] shadow-xl flex flex-col items-center justify-center text-white border-2 border-[#D4AF37]/80 relative z-10"
            >
              <span className="text-[11px] uppercase tracking-widest font-semibold text-[#D4AF37]">
                {currentPrompt.action}
              </span>
              <span className="text-3xl font-serif font-light mt-0.5">
                {secondsLeftInPhase}s
              </span>
              <span className="text-[10px] text-white/70 font-sans mt-0.5">
                Cycle {cycleCount + 1} of {targetCycles}
              </span>
            </motion.div>
          </div>
        ) : (
          /* Completion State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="my-8 p-6 rounded-2xl bg-[#F9F6F0] border-2 border-[#D4AF37] max-w-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] mx-auto flex items-center justify-center text-[#1C2A39]">
              <CheckCircle2 className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-2xl text-[#1C2A39]">
              Your Nervous System Has Settled
            </h3>
            <p className="text-xs text-[#7A8B7B] leading-relaxed">
              Your breath has anchored you in God's presence. The craving or fear does not define your next minute. Walk forward in His unmerited grace.
            </p>
            <div className="pt-2 flex justify-center gap-2">
              <button
                onClick={() => {
                  setCycleCount(0);
                  setIsCompleted(false);
                  setPhase('inhale');
                  setSecondsLeftInPhase(selectedPacing.inhale);
                }}
                className="px-4 py-2 rounded-full border border-[#D4AF37] text-xs text-[#1C2A39] hover:bg-[#D4AF37]/20 font-medium flex items-center space-x-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Repeat 60 Seconds</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#1C2A39] text-[#F9F6F0] text-xs hover:bg-[#D4AF37] hover:text-[#1C2A39] font-medium transition-colors cursor-pointer"
              >
                Return to Steps
              </button>
            </div>
          </motion.div>
        )}

        {/* Anchoring Scripture & Action Text */}
        {!isCompleted && (
          <div className="space-y-1.5 max-w-sm mb-4">
            <motion.p
              key={phase + '-text'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-script text-xl sm:text-2xl text-[#1C2A39] leading-snug"
            >
              {currentPrompt.text}
            </motion.p>
            <motion.span
              key={phase + '-ref'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold block"
            >
              {currentPrompt.scripture}
            </motion.span>
          </div>
        )}

        {/* Footer Guidance */}
        <div className="w-full pt-3 border-t border-[#F9F6F0] flex items-center justify-between text-[11px] text-[#7A8B7B]">
          <div className="flex items-center space-x-1.5">
            <Heart className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Physiological Grace Regulation</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Shield className="w-3.5 h-3.5 text-[#7A8B7B]" />
            <span>Crisis? Call or text 988</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
