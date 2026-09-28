import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FooterLegalBar } from './LegalModals.tsx';
import {
  ShieldAlert,
  ArrowLeft,
  Sparkles,
  Volume2,
  VolumeX,
  Plus,
  Trash2,
  CheckCircle2,
  Lock,
  BookOpen,
  ArrowRight,
  Shield,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

interface StrongholdEntry {
  id: string;
  category: string;
  strongholdName: string;
  coreLie: string;
  scriptureText: string;
  scriptureRef: string;
  declaration: string;
  demolished: boolean;
  createdAt: string;
}

interface StrongholdIdentifierProps {
  onBack?: () => void;
  onOpenBreath?: () => void;
}

interface StrongholdArchetype {
  id: string;
  category: string;
  title: string;
  typicalLie: string;
  scriptureText: string;
  scriptureRef: string;
  defaultDeclaration: string;
}

const PRESET_ARCHETYPES: StrongholdArchetype[] = [
  {
    id: 'shame',
    category: 'Identity',
    title: 'Toxic Shame & Unworthiness',
    typicalLie: 'I am fundamentally defective, filthy, and permanently broken beyond God’s reach.',
    scriptureText: 'Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.',
    scriptureRef: '2 Corinthians 5:17',
    defaultDeclaration: 'I am clean, fully forgiven, and transformed into a new creation by the blood of Christ.'
  },
  {
    id: 'abandonment',
    category: 'Relational',
    title: 'Fear of Abandonment & Rejection',
    typicalLie: 'Everyone leaves eventually. If I am truly honest about my weakness, I will be cast out.',
    scriptureText: 'For he hath said, I will never leave thee, nor forsake thee. So that we may boldly say, The Lord is my helper, and I will not fear.',
    scriptureRef: 'Hebrews 13:5-6',
    defaultDeclaration: 'I am securely held by God, unconditionally loved, and will never be abandoned in my recovery.'
  },
  {
    id: 'isolation',
    category: 'Behavioral',
    title: 'Secret Isolation & Hiding',
    typicalLie: 'It is safer to suffer in the dark alone than risk the humiliation of asking for help.',
    scriptureText: 'Confess your faults one to another, and pray one for another, that ye may be healed.',
    scriptureRef: 'James 5:16',
    defaultDeclaration: 'I step out of darkness into the light. My vulnerability is where God’s healing power begins.'
  },
  {
    id: 'control',
    category: 'Mindset',
    title: 'Compulsive Control & Performance',
    typicalLie: 'My security depends on my ability to manage every outcome. If I slip, everything falls apart.',
    scriptureText: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
    scriptureRef: 'Proverbs 3:5-6',
    defaultDeclaration: 'I release control into God’s sovereign hands. My worth is anchored in His grace, not my performance.'
  },
  {
    id: 'numbing',
    category: 'Coping',
    title: 'False Comfort & Immediate Escape',
    typicalLie: 'Emotional pain is unbearable and will destroy me if I do not numb it right now.',
    scriptureText: 'God is our refuge and strength, a very present help in trouble.',
    scriptureRef: 'Psalm 46:1',
    defaultDeclaration: 'Pain cannot destroy me when God is my refuge. I can endure this moment with His strength.'
  }
];

export default function StrongholdIdentifier({ onBack, onOpenBreath }: StrongholdIdentifierProps) {
  // Vault state stored in localStorage
  const [vault, setVault] = useState<StrongholdEntry[]>(() => {
    try {
      const saved = localStorage.getItem('sacred_steps_strongholds');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'seed-1',
        category: 'Identity',
        strongholdName: 'Toxic Shame & Unworthiness',
        coreLie: 'My past relapses prove that I am a hopeless hypocrite who will never stay clean.',
        scriptureText: 'There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.',
        scriptureRef: 'Romans 8:1',
        declaration: 'I am no longer defined by my worst mistake. Christ’s blood canceled my condemnation once and for all.',
        demolished: true,
        createdAt: '2026-09-20'
      },
      {
        id: 'seed-2',
        category: 'Relational',
        strongholdName: 'Secret Isolation & Hiding',
        coreLie: 'If my sponsor or family knows I had an urge yesterday, they will lose all respect for me.',
        scriptureText: 'And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness.',
        scriptureRef: '2 Corinthians 12:9',
        declaration: 'I do not hide in fear. My weakness is the exact place where Christ’s supernatural strength rests upon me.',
        demolished: true,
        createdAt: '2026-09-24'
      }
    ];
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sacred_steps_strongholds', JSON.stringify(vault));
    } catch {
      // storage unavailable
    }
  }, [vault]);

  // Active View: 'vault' | 'creator'
  const [viewMode, setViewMode] = useState<'vault' | 'creator'>('vault');

  // Creator Form State
  const [selectedArchetype, setSelectedArchetype] = useState<StrongholdArchetype | null>(null);
  const [stepNumber, setStepNumber] = useState<1 | 2 | 3 | 4>(1);
  const [customName, setCustomName] = useState('');
  const [customCategory, setCustomCategory] = useState('Identity');
  const [coreLie, setCoreLie] = useState('');
  const [scriptureText, setScriptureText] = useState('');
  const [scriptureRef, setScriptureRef] = useState('');
  const [declaration, setDeclaration] = useState('');

  // Speech recitation state
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const startNewStronghold = (archetype?: StrongholdArchetype) => {
    if (archetype) {
      setSelectedArchetype(archetype);
      setCustomName(archetype.title);
      setCustomCategory(archetype.category);
      setCoreLie(archetype.typicalLie);
      setScriptureText(archetype.scriptureText);
      setScriptureRef(archetype.scriptureRef);
      setDeclaration(archetype.defaultDeclaration);
    } else {
      setSelectedArchetype(null);
      setCustomName('');
      setCustomCategory('Identity');
      setCoreLie('');
      setScriptureText('For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.');
      setScriptureRef('2 Timothy 1:7');
      setDeclaration('I am filled with power, love, and a sound mind through Christ who lives in me.');
    }
    setStepNumber(1);
    setViewMode('creator');
  };

  const handleSaveStronghold = () => {
    if (!customName.trim() || !coreLie.trim() || !declaration.trim()) return;

    const newEntry: StrongholdEntry = {
      id: Date.now().toString(),
      category: customCategory,
      strongholdName: customName.trim(),
      coreLie: coreLie.trim(),
      scriptureText: scriptureText.trim(),
      scriptureRef: scriptureRef.trim(),
      declaration: declaration.trim(),
      demolished: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setVault([newEntry, ...vault]);
    setViewMode('vault');
  };

  const handleDelete = (id: string) => {
    setVault((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleDemolished = (id: string) => {
    setVault((prev) =>
      prev.map((item) => (item.id === id ? { ...item, demolished: !item.demolished } : item))
    );
  };

  // Text-to-speech recitation using Web Speech API
  const handleReciteDeclaration = (id: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeakingId === id) {
      window.speechSynthesis.cancel();
      setIsSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeakingId(null);
    utterance.onerror = () => setIsSpeakingId(null);

    setIsSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#1C2A39] flex flex-col justify-between selection:bg-[#D4AF37]/20 font-sans relative overflow-x-hidden">
      {/* Top Header */}
      <header className="border-b border-[#D4AF37]/30 bg-[#FFFFFF]/80 backdrop-blur-sm sticky top-0 z-20 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {onBack ? (
              <button
                onClick={onBack}
                className="inline-flex items-center space-x-1.5 text-xs text-[#7A8B7B] hover:text-[#1C2A39] transition-colors py-1 px-2.5 rounded-lg border border-[#7A8B7B]/20 bg-white cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Full Circle</span>
              </button>
            ) : (
              <div className="w-7 h-7 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[#F9F6F0]">
                <ShieldAlert className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
            )}
            <span className="text-xs uppercase tracking-wider font-semibold text-[#7A8B7B]">
              Week 14 • Spiritual Warfare
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {onOpenBreath && (
              <button
                onClick={onOpenBreath}
                className="inline-flex items-center space-x-1 text-xs text-[#1C2A39] py-1 px-2.5 rounded-full border border-[#D4AF37] bg-white hover:bg-[#D4AF37]/20 transition-colors cursor-pointer"
                title="60-Second Somatic Breath"
              >
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span className="hidden sm:inline">Grace Breath</span>
              </button>
            )}

            {viewMode === 'vault' ? (
              <button
                onClick={() => startNewStronghold()}
                className="inline-flex items-center space-x-1 text-xs bg-[#1C2A39] text-[#F9F6F0] py-1.5 px-3 rounded-full hover:bg-[#D4AF37] hover:text-[#1C2A39] transition-all cursor-pointer font-medium shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Dismantle Stronghold</span>
              </button>
            ) : (
              <button
                onClick={() => setViewMode('vault')}
                className="inline-flex items-center space-x-1 text-xs text-[#7A8B7B] hover:text-[#1C2A39] py-1 px-2.5 rounded-lg border border-[#7A8B7B]/30 bg-white cursor-pointer"
              >
                <span>View Vault ({vault.length})</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto w-full px-4 py-8 flex-1 flex flex-col justify-start">
        {/* Biblical Banner */}
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-widest font-semibold text-[#D4AF37] block">
            Stage 2 • Week 14
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#1C2A39] font-normal tracking-tight mt-1">
            Stronghold Identifier & Renaming
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-[#7A8B7B] font-light max-w-lg mx-auto leading-relaxed">
            "For the weapons of our warfare are not carnal, but mighty through God to the pulling down of strong holds; Casting down imaginations..." — 2 Corinthians 10:4-5
          </p>
        </div>

        {/* VIEW 1: Stronghold Vault */}
        {viewMode === 'vault' && (
          <div className="space-y-6">
            {/* Quick Archetype Suggestion Chips */}
            <div className="bg-[#FFFFFF] border border-[#D4AF37]/30 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
                  Common Stronghold Archetypes (Tap to Dismantle)
                </span>
                <span className="text-[11px] text-[#D4AF37] font-medium">Guided Templates</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {PRESET_ARCHETYPES.map((arch) => (
                  <button
                    key={arch.id}
                    onClick={() => startNewStronghold(arch)}
                    className="text-left p-3 rounded-xl border border-[#7A8B7B]/20 hover:border-[#D4AF37] hover:bg-[#F9F6F0] transition-all bg-white group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-semibold text-[#D4AF37]">
                        {arch.category}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#7A8B7B] group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <h4 className="text-sm font-serif font-medium text-[#1C2A39] mt-1 line-clamp-1">
                      {arch.title}
                    </h4>
                    <p className="text-[11px] text-[#7A8B7B] mt-1 line-clamp-2 italic">
                      "{arch.typicalLie}"
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* List of Saved Renamed Strongholds */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-serif font-semibold text-[#1C2A39] flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-[#D4AF37]" />
                  <span>Your Renamed Strongholds Vault</span>
                </h3>
                <span className="text-xs text-[#7A8B7B]">
                  {vault.filter((v) => v.demolished).length} of {vault.length} Demolished
                </span>
              </div>

              {vault.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-[#D4AF37]/50 text-xs text-[#7A8B7B] space-y-2">
                  <p>Your stronghold vault is currently empty.</p>
                  <button
                    onClick={() => startNewStronghold()}
                    className="text-[#1C2A39] font-medium underline underline-offset-2 hover:text-[#D4AF37] cursor-pointer"
                  >
                    Expose and dismantle your first stronghold
                  </button>
                </div>
              ) : (
                vault.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="bg-[#FFFFFF] rounded-2xl border border-[#D4AF37]/40 p-5 shadow-sm space-y-4 transition-all hover:border-[#D4AF37]"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[#F9F6F0] text-[#7A8B7B] border border-[#7A8B7B]/20">
                            {item.category}
                          </span>
                          {item.demolished && (
                            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center space-x-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Demolished by Grace</span>
                            </span>
                          )}
                        </div>
                        <h4 className="text-xl font-serif text-[#1C2A39] font-medium mt-1">
                          {item.strongholdName}
                        </h4>
                      </div>

                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleCopy(item.id, item.declaration)}
                          className="p-1.5 rounded-lg text-[#7A8B7B] hover:text-[#1C2A39] hover:bg-[#F9F6F0] cursor-pointer transition-colors"
                          title="Copy declaration"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleReciteDeclaration(item.id, item.declaration)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isSpeakingId === item.id
                              ? 'text-[#D4AF37] bg-[#D4AF37]/15'
                              : 'text-[#7A8B7B] hover:text-[#1C2A39] hover:bg-[#F9F6F0]'
                          }`}
                          title="Proclaim aloud (listen)"
                        >
                          {isSpeakingId === item.id ? (
                            <VolumeX className="w-4 h-4" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg text-[#7A8B7B] hover:text-red-700 hover:bg-red-50 cursor-pointer transition-colors"
                          title="Delete from vault"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* The Lie (Struck through / exposed) */}
                    <div className="p-3 bg-red-50/60 rounded-xl border border-red-200 text-xs space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block">
                        Exposed Core Lie
                      </span>
                      <p className="text-red-950/80 italic font-sans leading-relaxed">
                        "{item.coreLie}"
                      </p>
                    </div>

                    {/* God's Word & Spoken Truth */}
                    <div className="p-3.5 bg-[#F9F6F0] rounded-xl border border-[#D4AF37]/30 space-y-2">
                      <div className="flex items-center justify-between text-[10px] uppercase font-bold text-[#D4AF37]">
                        <span>Scripture Weapon</span>
                        <span className="font-mono">{item.scriptureRef}</span>
                      </div>
                      <p className="font-serif italic text-sm text-[#1C2A39]">
                        "{item.scriptureText}"
                      </p>
                    </div>

                    {/* New "I Am" Declaration Card */}
                    <div className="p-4 bg-gradient-to-br from-[#1C2A39] to-[#25394E] rounded-xl text-[#F9F6F0] space-y-1.5 shadow-xs border border-[#D4AF37]/40">
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-[#D4AF37] block">
                        Spoken "I Am" Declaration
                      </span>
                      <p className="font-script text-xl sm:text-2xl text-white leading-snug">
                        "{item.declaration}"
                      </p>
                    </div>

                    {/* Footer Status Switch */}
                    <div className="flex items-center justify-between pt-1 text-xs text-[#7A8B7B]">
                      <span>Inscribed on {item.createdAt}</span>
                      <button
                        onClick={() => handleToggleDemolished(item.id)}
                        className="text-[11px] underline underline-offset-2 hover:text-[#1C2A39] cursor-pointer"
                      >
                        {item.demolished ? 'Mark Active Struggle' : 'Mark Demolished by Grace'}
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: 4-Step Interactive Renaming Creator */}
        {viewMode === 'creator' && (
          <div className="bg-[#FFFFFF] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
            {/* Step Progress Indicator */}
            <div className="flex items-center justify-between border-b border-[#F9F6F0] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#D4AF37]">
                  Step {stepNumber} of 4 • Sacred S.T.E.P. Alignment
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#1C2A39]">
                  {stepNumber === 1 && '1. Identify the Stronghold Pattern'}
                  {stepNumber === 2 && '2. Expose the Core Lie'}
                  {stepNumber === 3 && '3. Anchor in God’s Word'}
                  {stepNumber === 4 && '4. Inscribe Your "I Am" Declaration'}
                </h3>
              </div>
              <button
                onClick={() => setViewMode('vault')}
                className="text-xs text-[#7A8B7B] hover:text-[#1C2A39] cursor-pointer"
              >
                Cancel
              </button>
            </div>

            {/* STEP 1: Name and Category */}
            {stepNumber === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
                    Stronghold Pattern Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fear of Rejection, Toxic Shame, False Self-Sufficiency..."
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#7A8B7B]/40 focus:outline-none focus:border-[#D4AF37] bg-[#F9F6F0] text-[#1C2A39]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
                    Life Domain
                  </label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#7A8B7B]/40 focus:outline-none focus:border-[#D4AF37] bg-[#F9F6F0] text-[#1C2A39]"
                  >
                    <option value="Identity">Identity & Worth</option>
                    <option value="Relational">Relational Trust & Family</option>
                    <option value="Behavioral">Behavioral Cravings & Habits</option>
                    <option value="Mindset">Fear, Control & Striving</option>
                    <option value="Spiritual">Spiritual Doubt & God's Character</option>
                  </select>
                </div>

                <div className="p-4 rounded-xl bg-[#F9F6F0] border border-[#D4AF37]/30 text-xs text-[#7A8B7B] flex items-start space-x-2.5">
                  <BookOpen className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>
                    A stronghold is not just a bad habit; it is a mental fortress built out of repeated lies that prevents you from receiving God’s unconditional grace.
                  </span>
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    disabled={!customName.trim()}
                    onClick={() => setStepNumber(2)}
                    className="px-6 py-2.5 rounded-full bg-[#1C2A39] text-[#F9F6F0] text-xs font-medium hover:bg-[#D4AF37] hover:text-[#1C2A39] transition-all disabled:opacity-40 cursor-pointer flex items-center space-x-1.5"
                  >
                    <span>Next: Expose the Lie</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Expose the Lie */}
            {stepNumber === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-red-700 mb-1">
                    What is the exact lie this stronghold whispers when you feel vulnerable?
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="e.g. 'I am permanently flawed, nobody will ever stay, I have to hide my real thoughts...'"
                    value={coreLie}
                    onChange={(e) => setCoreLie(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-red-300 focus:outline-none focus:border-red-500 bg-red-50/30 text-red-950 resize-none font-sans"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#7A8B7B]/30 text-xs text-[#7A8B7B]">
                  <strong>Prompt:</strong> Complete this sentence honestly: <em>"Whenever I make a mistake or feel exposed, I tell myself that I am..."</em>
                </div>

                <div className="flex justify-between pt-3">
                  <button
                    onClick={() => setStepNumber(1)}
                    className="px-4 py-2 text-xs text-[#7A8B7B] hover:text-[#1C2A39] cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    disabled={!coreLie.trim()}
                    onClick={() => setStepNumber(3)}
                    className="px-6 py-2.5 rounded-full bg-[#1C2A39] text-[#F9F6F0] text-xs font-medium hover:bg-[#D4AF37] hover:text-[#1C2A39] transition-all disabled:opacity-40 cursor-pointer flex items-center space-x-1.5"
                  >
                    <span>Next: Dismantle with Scripture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Scripture Weapon */}
            {stepNumber === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
                    God's Counter-Truth (Scripture Text)
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="e.g. 'My grace is sufficient for thee: for my strength is made perfect in weakness...'"
                    value={scriptureText}
                    onChange={(e) => setScriptureText(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#7A8B7B]/40 focus:outline-none focus:border-[#D4AF37] bg-[#F9F6F0] text-[#1C2A39] resize-none font-serif text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
                    Scripture Reference
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Romans 8:38-39 or Psalm 139:14"
                    value={scriptureRef}
                    onChange={(e) => setScriptureRef(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#7A8B7B]/40 focus:outline-none focus:border-[#D4AF37] bg-[#F9F6F0] text-[#1C2A39]"
                  />
                </div>

                <div className="flex justify-between pt-3">
                  <button
                    onClick={() => setStepNumber(2)}
                    className="px-4 py-2 text-xs text-[#7A8B7B] hover:text-[#1C2A39] cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    disabled={!scriptureText.trim() || !scriptureRef.trim()}
                    onClick={() => setStepNumber(4)}
                    className="px-6 py-2.5 rounded-full bg-[#1C2A39] text-[#F9F6F0] text-xs font-medium hover:bg-[#D4AF37] hover:text-[#1C2A39] transition-all disabled:opacity-40 cursor-pointer flex items-center space-x-1.5"
                  >
                    <span>Next: Inscribe Declaration</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Spoken "I Am" Declaration */}
            {stepNumber === 4 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
                    First-Person "I Am" Declaration
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="e.g. 'I am not defined by the wreckage of my past. I am a child of God, clothed in righteousness, free to walk in the light.'"
                    value={declaration}
                    onChange={(e) => setDeclaration(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D4AF37] focus:outline-none bg-[#F9F6F0] text-[#1C2A39] resize-none font-script text-xl"
                  />
                </div>

                {/* Live Card Preview */}
                <div className="p-4 bg-gradient-to-br from-[#1C2A39] to-[#25394E] rounded-xl text-[#F9F6F0] space-y-1.5 border border-[#D4AF37]/50 shadow-md">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-[#D4AF37] block">
                    Card Preview • Speak this aloud
                  </span>
                  <p className="font-script text-2xl text-white">
                    "{declaration || 'Your declaration will appear here...'}"
                  </p>
                </div>

                <div className="flex justify-between pt-3">
                  <button
                    onClick={() => setStepNumber(3)}
                    className="px-4 py-2 text-xs text-[#7A8B7B] hover:text-[#1C2A39] cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    disabled={!declaration.trim()}
                    onClick={handleSaveStronghold}
                    className="px-6 py-2.5 rounded-full bg-[#1C2A39] text-[#F9F6F0] text-xs font-medium hover:bg-[#D4AF37] hover:text-[#1C2A39] transition-all disabled:opacity-40 cursor-pointer flex items-center space-x-1.5 shadow"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Inscribe to Private Vault</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Global Legal Footer Bar */}
      <FooterLegalBar theme="light" />
    </div>
  );
}
