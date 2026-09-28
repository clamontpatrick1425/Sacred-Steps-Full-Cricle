import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AmendsPlanner from './components/AmendsPlanner.tsx';
import RelationalConnections from './components/RelationalConnections.tsx';
import StrongholdIdentifier from './components/StrongholdIdentifier.tsx';
import GraceBreathModal from './components/GraceBreathModal.tsx';
import { FooterLegalBar } from './components/LegalModals.tsx';
import {
  Handshake,
  Users,
  Sun,
  Lock,
  ChevronRight,
  Shield,
  Sparkles,
  Plus,
  CheckCircle2,
  Heart,
  MessageCircle,
  HelpCircle,
  AlertTriangle,
  X,
  Compass,
  ArrowRight,
  BookOpen,
  Send,
  Wind,
  ShieldAlert
} from 'lucide-react';

// Foundation Stages Data strictly mapped according to Sacred Steps System
export interface FoundationStageData {
  foundation_stage: number;
  stage_title: string;
  relational_feature: string;
  metaphor_meaning: string;
  monthly_focus: string;
  scripture_ref: string;
  scripture_text: string;
}

const FOUNDATION_STAGES: FoundationStageData[] = [
  {
    foundation_stage: 1,
    stage_title: "Clearing the Ground & The Cornerstone",
    relational_feature: "Amends Planner (Weeks 20 & 28)",
    metaphor_meaning: "You cannot build on broken ground. Amends clear the debris of the past and lay the cornerstone of integrity.",
    monthly_focus: "Q1 & Q2 (Identity, Grace, Faith, Freedom, Healing, Discipline)",
    scripture_ref: "Matthew 7:24 & 1 Corinthians 3:11",
    scripture_text: "Whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock."
  },
  {
    foundation_stage: 2,
    stage_title: "Laying the Stones & The Walls",
    relational_feature: "'Carry the Mat' Peer Matching (Week 30)",
    metaphor_meaning: "Walls require support to stand. Asking for help and bringing in a peer partner provides the structural support for the walls of recovery.",
    monthly_focus: "Q2 & Q3 (Discipline, Courage, Forgiveness)",
    scripture_ref: "Mark 2:3-5 & Ecclesiastes 4:9-10",
    scripture_text: "Two are better than one... if they fall, the one will lift up his fellow. Jesus saw their faith."
  },
  {
    foundation_stage: 3,
    stage_title: "The Framework & The Shelter",
    relational_feature: "Forgiveness & Boundary Setting (Weeks 31-34)",
    metaphor_meaning: "The framework protects the inside from the storm. Forgiveness and wise boundaries create the shelter of peace.",
    monthly_focus: "Q3 (Courage, Forgiveness, Peace)",
    scripture_ref: "Colossians 3:13 & Proverbs 4:23",
    scripture_text: "Forbearing one another, and forgiving one another... Keep thy heart with all diligence; for out of it are the issues of life."
  },
  {
    foundation_stage: 4,
    stage_title: "The Light Inside & The Storm Tested",
    relational_feature: "Gratitude & The 'Stayed' List (Week 46)",
    metaphor_meaning: "The light inside the house is fueled by gratitude. The people who stayed are the warmth and light that make the house a home.",
    monthly_focus: "Q4 (Purpose, Gratitude, Redemption)",
    scripture_ref: "Ruth 1:16 & Matthew 5:14-16",
    scripture_text: "Whither thou goest, I will go... Ye are the light of the world. Let your light shine before men."
  }
];

export interface FullCircleDashboardProps {
  /** The current stage of foundation building (1 to 4) */
  relationalStage?: 1 | 2 | 3 | 4;
  /** Optional callback when user changes stage */
  onStageChange?: (stage: 1 | 2 | 3 | 4) => void;
}

export default function App({
  relationalStage: controlledStage,
  onStageChange
}: FullCircleDashboardProps) {
  // Support both controlled prop and internal standalone state
  const [internalStage, setInternalStage] = useState<1 | 2 | 3 | 4>(1);
  const currentStage = controlledStage ?? internalStage;
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'amends' | 'carry_mat' | 'stayed_list' | 'stronghold'>('dashboard');
  const [isBreathModalOpen, setIsBreathModalOpen] = useState(false);

  const handleSetStage = (s: 1 | 2 | 3 | 4) => {
    if (onStageChange) onStageChange(s);
    setInternalStage(s);
  };

  // Active Tool Modal View: null | 'amends' | 'carry_mat' | 'stayed_list' | 'guide'
  const [activeTool, setActiveTool] = useState<'amends' | 'carry_mat' | 'stayed_list' | 'guide' | null>(null);

  // Amends Planner sample items
  const [amendsList, setAmendsList] = useState([
    {
      id: '1',
      recipient: 'Sarah (Sister)',
      type: 'Direct Restitution',
      action: 'Return borrowed money and ask for 15 minutes of honest reconciliation without excuses.',
      status: 'Ready to Reach Out',
      verse: 'Matthew 5:23-24'
    },
    {
      id: '2',
      recipient: 'Pastor Michael',
      type: 'Living Amends',
      action: 'Demonstrate steady consistency by attending Sunday service on time for 3 consecutive months.',
      status: 'In Progress',
      verse: 'Luke 19:8'
    },
    {
      id: '3',
      recipient: 'Former Colleague Mark',
      type: 'Direct Amends',
      action: 'Acknowledge missing project deadlines during my hardest season and apologize for the strain placed on his family.',
      status: 'Reflecting in Prayer',
      verse: 'Romans 12:18'
    }
  ]);
  const [newRecipient, setNewRecipient] = useState('');
  const [newAction, setNewAction] = useState('');

  // Carry The Mat Peer Connections
  const [peers] = useState([
    {
      id: 'p1',
      name: 'Marcus T.',
      duration: '2.5 Years Walking in Grace',
      quote: 'Still learning to ask for help before the crisis hits.',
      status: 'Available to pray',
      week: 'Week 30 Partner'
    },
    {
      id: 'p2',
      name: 'David L.',
      duration: '4 Years Daily Freedom',
      quote: 'Ecclesiastes 4:9 changed how I view brotherhood.',
      status: 'Daily Mat Carrier',
      week: 'Week 30 Partner'
    }
  ]);
  const [burdenPrayerSent, setBurdenPrayerSent] = useState(false);

  // The Stayed List items
  const [stayedList, setStayedList] = useState([
    {
      id: 's1',
      name: 'Mom & Dad',
      sacrifice: 'Endured countless late-night calls and never changed their phone number.',
      stepTaken: 'Sent handwritten letter expressing unearned gratitude.'
    },
    {
      id: 's2',
      name: 'Elder Thomas',
      sacrifice: 'Drove 45 minutes every Tuesday morning to pray outside my apartment.',
      stepTaken: 'Scheduled lunch to thank him face to face.'
    }
  ]);
  const [newStayedName, setNewStayedName] = useState('');
  const [newStayedSacrifice, setNewStayedSacrifice] = useState('');

  // The Guide Companion State (S.T.E.P. Method)
  const [guideInput, setGuideInput] = useState('');
  const [guideResponse, setGuideResponse] = useState<{
    scripture: string;
    truth: string;
    embrace: string;
    practice: string;
    isCrisis?: boolean;
  } | null>(null);

  const stageData = FOUNDATION_STAGES[currentStage - 1];

  const handleAddAmends = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipient.trim() || !newAction.trim()) return;
    setAmendsList([
      ...amendsList,
      {
        id: Date.now().toString(),
        recipient: newRecipient.trim(),
        type: 'Living & Direct Amends',
        action: newAction.trim(),
        status: 'Reflecting in Prayer',
        verse: 'Proverbs 28:13'
      }
    ]);
    setNewRecipient('');
    setNewAction('');
  };

  const handleAddStayed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStayedName.trim()) return;
    setStayedList([
      ...stayedList,
      {
        id: Date.now().toString(),
        name: newStayedName.trim(),
        sacrifice: newStayedSacrifice.trim() || 'Stood faithful when leaving would have been easier.',
        stepTaken: 'Inscribed on Sacred Remembrance Wall'
      }
    ]);
    setNewStayedName('');
    setNewStayedSacrifice('');
  };

  const handleGuideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = guideInput.toLowerCase();
    
    // STRICT CRISIS PROTOCOL
    if (
      query.includes('kill myself') ||
      query.includes('suicide') ||
      query.includes('end it all') ||
      query.includes('hurt myself') ||
      query.includes('harm myself') ||
      query.includes('want to die')
    ) {
      setGuideResponse({
        isCrisis: true,
        scripture: "Psalm 34:18 — The Lord is nigh unto them that are of a broken heart.",
        truth: "I hear how much pain you are in, and you don't have to carry this alone right now.",
        embrace: "Please reach out to people who can help keep you safe: Call or text 988 (Suicide & Crisis Lifeline) or go to the nearest emergency room.",
        practice: "I am here to pray with you when you are safe. You are deeply loved and guarded."
      });
      return;
    }

    // Default S.T.E.P. Guidance
    setGuideResponse({
      scripture: stageData.scripture_ref + " — \"" + stageData.scripture_text + "\"",
      truth: "Fear tells you that relationships are fragile glass; grace reveals that honest foundations can withstand any storm.",
      embrace: "I am not building alone in my own strength; I am grounded in God's unshakeable grace and surrounded by faithful support.",
      practice: "Take 3 deep, quiet breaths. Send one brief, honest text of kindness to a person on your heart without asking for anything in return."
    });
  };

  // Return dedicated screens if selected
  if (currentScreen === 'amends') {
    return <AmendsPlanner onBack={() => setCurrentScreen('dashboard')} />;
  }

  if (currentScreen === 'carry_mat' || currentScreen === 'stayed_list') {
    return (
      <RelationalConnections
        initialScreen={currentScreen}
        onBack={() => setCurrentScreen('dashboard')}
      />
    );
  }

  if (currentScreen === 'stronghold') {
    return (
      <StrongholdIdentifier
        onBack={() => setCurrentScreen('dashboard')}
        onOpenBreath={() => setIsBreathModalOpen(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#1C2A39] flex flex-col justify-between selection:bg-[#D4AF37]/20">
      {/* Top Banner Navigation & Brand Indicator */}
      <header className="border-b border-[#D4AF37]/30 bg-[#FFFFFF]/80 backdrop-blur-sm sticky top-0 z-20 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[#F9F6F0]">
              <Shield className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <span className="text-xs tracking-widest uppercase font-semibold text-[#7A8B7B] block">
                Sacred Steps to Redemption
              </span>
              <span className="text-xs text-[#1C2A39] font-medium font-serif italic">
                A Path to Recovery, A Life in Grace
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Grace Breath Quick Regulation */}
            <button
              onClick={() => setIsBreathModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#D4AF37] text-[#1C2A39] bg-white hover:bg-[#D4AF37]/20 text-xs font-medium transition-all cursor-pointer shadow-xs"
              title="60-Second Somatic Grace Breath"
            >
              <Wind className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Grace Breath</span>
              <span className="sm:hidden">Breath</span>
            </button>

            <button
              onClick={() => setCurrentScreen('amends')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-[#D4AF37]/50 text-[#1C2A39] text-xs font-medium hover:bg-[#D4AF37]/20 transition-all cursor-pointer"
              title="Open Week 28 Encrypted Worksheet"
            >
              <Handshake className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Amends Planner</span>
              <span className="sm:hidden">Amends</span>
            </button>

            {/* S.T.E.P. Companion Trigger */}
            <button
              onClick={() => setActiveTool('guide')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#1C2A39] text-[#F9F6F0] text-xs font-medium hover:bg-[#D4AF37] hover:text-[#1C2A39] transition-all shadow-sm cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>The Guide</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto w-full px-4 py-8 flex-1 flex flex-col">
        {/* Header Section */}
        <section className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif text-[#1C2A39] tracking-tight font-normal"
          >
            Full Circle
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-2 text-base md:text-lg text-[#7A8B7B] font-light max-w-md mx-auto"
          >
            Recovery is not a solo journey. We build this house together.
          </motion.p>
          <p className="font-script text-lg text-[#D4AF37] mt-1">
            "Sustained Walking, Daily Freedom."
          </p>
        </section>

        {/* Centerpiece: The Building a Foundation Visual Metaphor */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#D4AF37] p-6 shadow-sm mb-8 transition-shadow hover:shadow-md">
          {/* Stage Progress Selector Pill Bar */}
          <div className="flex items-center justify-between pb-5 mb-5 border-b border-[#F9F6F0]">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#7A8B7B]">
              Foundation Stage
            </span>
            <div className="flex items-center space-x-1 sm:space-x-2">
              {([1, 2, 3, 4] as const).map((stageNum) => {
                const isActive = stageNum === currentStage;
                const isCompleted = stageNum <= currentStage;
                return (
                  <button
                    key={stageNum}
                    onClick={() => handleSetStage(stageNum)}
                    className={`px-3 py-1 text-xs rounded-full font-medium transition-all ${
                      isActive
                        ? 'bg-[#D4AF37] text-white shadow-sm ring-2 ring-[#D4AF37]/30'
                        : isCompleted
                        ? 'bg-[#7A8B7B]/15 text-[#1C2A39] hover:bg-[#D4AF37]/20'
                        : 'bg-[#F9F6F0] text-[#7A8B7B] hover:text-[#1C2A39]'
                    }`}
                    title={`Stage ${stageNum}: ${FOUNDATION_STAGES[stageNum - 1].stage_title}`}
                  >
                    Stage {stageNum}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Minimalist Geometric SVG Illustration */}
          <div className="relative w-full aspect-[16/9] max-h-72 mx-auto flex items-center justify-center bg-[#F9F6F0]/40 rounded-xl overflow-hidden p-2">
            <svg
              viewBox="0 0 500 320"
              className="w-full h-full max-w-md mx-auto select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Golden Radial Glow for Built State */}
                <radialGradient id="lightGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#7A8B7B" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Background Architectural Blueprint Grid Lines */}
              <g stroke="#7A8B7B" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="3 3">
                <line x1="50" y1="280" x2="450" y2="280" />
                <line x1="120" y1="40" x2="120" y2="280" />
                <line x1="250" y1="30" x2="250" y2="280" />
                <line x1="380" y1="40" x2="380" y2="280" />
              </g>

              {/* STAGE 1: Clearing the Ground & The Cornerstone */}
              <g id="layer-1-cornerstone" className="transition-all duration-700">
                {/* Bedrock Ground Clearing */}
                <rect
                  x="70"
                  y="260"
                  width="360"
                  height="22"
                  rx="3"
                  stroke={currentStage >= 1 ? '#D4AF37' : '#7A8B7B'}
                  strokeWidth={currentStage >= 1 ? '1.75' : '1.2'}
                  fill={currentStage >= 1 ? 'url(#groundGrad)' : 'transparent'}
                  strokeDasharray={currentStage >= 1 ? 'none' : '4 3'}
                />

                {/* Ground excavation bedrock hashes */}
                <path
                  d="M80 274 L95 264 M110 274 L125 264 M140 274 L155 264 M350 274 L365 264 M380 274 L395 264 M410 274 L425 264"
                  stroke={currentStage >= 1 ? '#D4AF37' : '#7A8B7B'}
                  strokeWidth="1"
                  strokeOpacity={currentStage >= 1 ? '0.7' : '0.4'}
                />

                {/* Primary Anchor Cornerstone (Foundation Block) */}
                <motion.g
                  animate={{
                    scale: currentStage >= 1 ? [0.98, 1] : 1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <rect
                    x="160"
                    y="242"
                    width="180"
                    height="24"
                    rx="3"
                    stroke={currentStage >= 1 ? '#D4AF37' : '#7A8B7B'}
                    strokeWidth={currentStage >= 1 ? '2' : '1.2'}
                    fill={currentStage >= 1 ? '#D4AF37' : 'transparent'}
                    fillOpacity={currentStage >= 1 ? '0.2' : '0'}
                  />
                  {/* Inscribed Cross / Anchor Line on Cornerstone */}
                  <line
                    x1="250"
                    y1="247"
                    x2="250"
                    y2="261"
                    stroke={currentStage >= 1 ? '#D4AF37' : '#7A8B7B'}
                    strokeWidth="1.5"
                  />
                  <line
                    x1="244"
                    y1="252"
                    x2="256"
                    y2="252"
                    stroke={currentStage >= 1 ? '#D4AF37' : '#7A8B7B'}
                    strokeWidth="1.5"
                  />
                </motion.g>
              </g>

              {/* STAGE 2: Laying the Stones & The Walls */}
              <g id="layer-2-walls" className="transition-all duration-700">
                {/* Left Wall Pillars */}
                <rect
                  x="160"
                  y="140"
                  width="28"
                  height="102"
                  rx="2"
                  stroke={currentStage >= 2 ? '#D4AF37' : '#7A8B7B'}
                  strokeWidth={currentStage >= 2 ? '1.75' : '1'}
                  fill={currentStage >= 2 ? '#D4AF37' : 'transparent'}
                  fillOpacity={currentStage >= 2 ? '0.25' : '0'}
                  strokeDasharray={currentStage >= 2 ? 'none' : '4 3'}
                />
                {/* Right Wall Pillars */}
                <rect
                  x="312"
                  y="140"
                  width="28"
                  height="102"
                  rx="2"
                  stroke={currentStage >= 2 ? '#D4AF37' : '#7A8B7B'}
                  strokeWidth={currentStage >= 2 ? '1.75' : '1'}
                  fill={currentStage >= 2 ? '#D4AF37' : 'transparent'}
                  fillOpacity={currentStage >= 2 ? '0.25' : '0'}
                  strokeDasharray={currentStage >= 2 ? 'none' : '4 3'}
                />

                {/* Inner Stone Rows (Staggered masonry lines) */}
                <g stroke={currentStage >= 2 ? '#D4AF37' : '#7A8B7B'} strokeWidth="1" strokeOpacity={currentStage >= 2 ? '0.8' : '0.4'}>
                  <line x1="160" y1="165" x2="188" y2="165" />
                  <line x1="160" y1="190" x2="188" y2="190" />
                  <line x1="160" y1="215" x2="188" y2="215" />
                  <line x1="312" y1="165" x2="340" y2="165" />
                  <line x1="312" y1="190" x2="340" y2="190" />
                  <line x1="312" y1="215" x2="340" y2="215" />
                </g>

                {/* Door Frame Pillars */}
                <path
                  d="M220 242 L220 185 Q250 170 280 185 L280 242"
                  stroke={currentStage >= 2 ? '#D4AF37' : '#7A8B7B'}
                  strokeWidth={currentStage >= 2 ? '1.5' : '1'}
                  strokeDasharray={currentStage >= 2 ? 'none' : '3 3'}
                  fill="none"
                />
              </g>

              {/* STAGE 3: The Framework & The Shelter */}
              <g id="layer-3-framework" className="transition-all duration-700">
                {/* Triangular Roof Rafters & Gable */}
                <polygon
                  points="250,55 140,140 360,140"
                  stroke={currentStage >= 3 ? '#D4AF37' : '#7A8B7B'}
                  strokeWidth={currentStage >= 3 ? '2' : '1.2'}
                  fill={currentStage >= 3 ? '#D4AF37' : 'transparent'}
                  fillOpacity={currentStage >= 3 ? '0.15' : '0'}
                  strokeDasharray={currentStage >= 3 ? 'none' : '4 3'}
                />

                {/* King Post & Strut Framework */}
                <line
                  x1="250"
                  y1="55"
                  x2="250"
                  y2="140"
                  stroke={currentStage >= 3 ? '#D4AF37' : '#7A8B7B'}
                  strokeWidth={currentStage >= 3 ? '1.5' : '0.9'}
                  strokeDasharray={currentStage >= 3 ? 'none' : '3 3'}
                />
                <line
                  x1="195"
                  y1="98"
                  x2="250"
                  y2="140"
                  stroke={currentStage >= 3 ? '#D4AF37' : '#7A8B7B'}
                  strokeWidth={currentStage >= 3 ? '1.2' : '0.8'}
                  strokeDasharray={currentStage >= 3 ? 'none' : '3 3'}
                />
                <line
                  x1="305"
                  y1="98"
                  x2="250"
                  y2="140"
                  stroke={currentStage >= 3 ? '#D4AF37' : '#7A8B7B'}
                  strokeWidth={currentStage >= 3 ? '1.2' : '0.8'}
                  strokeDasharray={currentStage >= 3 ? 'none' : '3 3'}
                />

                {/* Overhanging Shelter Eaves */}
                <line
                  x1="130"
                  y1="140"
                  x2="370"
                  y2="140"
                  stroke={currentStage >= 3 ? '#D4AF37' : '#7A8B7B'}
                  strokeWidth={currentStage >= 3 ? '2' : '1'}
                />
              </g>

              {/* STAGE 4: The Light Inside & The Storm Tested */}
              <g id="layer-4-light" className="transition-all duration-700">
                {/* Radiating Light Beam Glow Effect */}
                {currentStage >= 4 && (
                  <motion.circle
                    cx="250"
                    cy="185"
                    r="85"
                    fill="url(#lightGlow)"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [1, 1.08, 1], opacity: [0.7, 0.95, 0.7] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  />
                )}

                {/* Center Lantern / Heart Light Window */}
                <rect
                  x="235"
                  y="165"
                  width="30"
                  height="40"
                  rx="15"
                  stroke={currentStage >= 4 ? '#D4AF37' : '#7A8B7B'}
                  strokeWidth={currentStage >= 4 ? '2' : '1'}
                  fill={currentStage >= 4 ? '#D4AF37' : 'transparent'}
                  fillOpacity={currentStage >= 4 ? '0.75' : '0'}
                  strokeDasharray={currentStage >= 4 ? 'none' : '2 2'}
                />

                {/* Flame / Star of Hope inside the Lantern */}
                <path
                  d="M250 172 Q254 182 250 190 Q246 182 250 172 Z"
                  fill={currentStage >= 4 ? '#FFFFFF' : 'none'}
                  stroke={currentStage >= 4 ? '#D4AF37' : '#7A8B7B'}
                  strokeWidth="1.2"
                />

                {/* Light Ray Accents */}
                <g stroke={currentStage >= 4 ? '#D4AF37' : '#7A8B7B'} strokeWidth="1" strokeOpacity={currentStage >= 4 ? '0.9' : '0.3'}>
                  <line x1="250" y1="152" x2="250" y2="146" />
                  <line x1="270" y1="160" x2="276" y2="155" />
                  <line x1="230" y1="160" x2="224" y2="155" />
                  <line x1="280" y1="185" x2="288" y2="185" />
                  <line x1="220" y1="185" x2="212" y2="185" />
                </g>
              </g>
            </svg>
          </div>

          {/* Current Stage Information strictly from the JSON */}
          <div className="mt-5 text-center px-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F9F6F0] border border-[#D4AF37]/30 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#1C2A39]">
                {stageData.relational_feature}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-serif text-[#1C2A39] font-medium">
              {stageData.stage_title}
            </h3>

            <p className="mt-2 text-sm md:text-base text-[#1C2A39]/80 leading-relaxed max-w-lg mx-auto font-sans">
              {stageData.metaphor_meaning}
            </p>

            <div className="mt-3 pt-3 border-t border-[#F9F6F0] flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[#7A8B7B]">
              <span><strong>Monthly Focus:</strong> {stageData.monthly_focus}</span>
              <span className="hidden sm:inline">•</span>
              <span className="italic">{stageData.scripture_ref}</span>
            </div>
          </div>
        </div>

        {/* Feature Navigation: The 3 Core Tools */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif text-[#1C2A39] font-semibold">
              Relational Recovery Tools
            </h2>
            <span className="text-xs text-[#7A8B7B]">
              Click any tool to open practice
            </span>
          </div>

          <div className="space-y-3.5">
            {/* Tool 1: Amends Planner */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setCurrentScreen('amends')}
              className="w-full text-left bg-[#F9F6F0] border border-[#7A8B7B] hover:border-[#D4AF37] rounded-xl p-4.5 p-4 flex items-center justify-between transition-all duration-200 group shadow-sm hover:shadow cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#D4AF37]/40 flex items-center justify-center text-[#1C2A39] group-hover:bg-[#D4AF37] group-hover:text-white transition-colors">
                  <Handshake className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-serif text-lg font-medium text-[#1C2A39]">
                      Amends Planner
                    </h3>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-white text-[#7A8B7B] border border-[#D4AF37]/30">
                      Weeks 20 & 28
                    </span>
                  </div>
                  <p className="text-sm text-[#7A8B7B] mt-0.5 font-sans">
                    Focus on action, not just apology.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#7A8B7B] group-hover:text-[#D4AF37] transition-colors" />
            </motion.button>

            {/* Tool 2: Carry the Mat */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setCurrentScreen('carry_mat')}
              className="w-full text-left bg-[#F9F6F0] border border-[#7A8B7B] hover:border-[#D4AF37] rounded-xl p-4.5 p-4 flex items-center justify-between transition-all duration-200 group shadow-sm hover:shadow cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#D4AF37]/40 flex items-center justify-center text-[#1C2A39] group-hover:bg-[#D4AF37] group-hover:text-white transition-colors">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-serif text-lg font-medium text-[#1C2A39]">
                      Carry the Mat
                    </h3>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-white text-[#7A8B7B] border border-[#D4AF37]/30">
                      Week 30
                    </span>
                  </div>
                  <p className="text-sm text-[#7A8B7B] mt-0.5 font-sans">
                    Connect with a verified peer.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#7A8B7B] group-hover:text-[#D4AF37] transition-colors" />
            </motion.button>

            {/* Tool 3: The Stayed List */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setCurrentScreen('stayed_list')}
              className="w-full text-left bg-[#F9F6F0] border border-[#7A8B7B] hover:border-[#D4AF37] rounded-xl p-4.5 p-4 flex items-center justify-between transition-all duration-200 group shadow-sm hover:shadow cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#D4AF37]/40 flex items-center justify-center text-[#1C2A39] group-hover:bg-[#D4AF37] group-hover:text-white transition-colors">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-serif text-lg font-medium text-[#1C2A39]">
                      The Stayed List
                    </h3>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-white text-[#7A8B7B] border border-[#D4AF37]/30">
                      Week 46
                    </span>
                  </div>
                  <p className="text-sm text-[#7A8B7B] mt-0.5 font-sans">
                    Honor those who remained.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#7A8B7B] group-hover:text-[#D4AF37] transition-colors" />
            </motion.button>

            {/* Tool 4: Stronghold Identifier & Renaming (Week 14) */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setCurrentScreen('stronghold')}
              className="w-full text-left bg-[#F9F6F0] border border-[#7A8B7B] hover:border-[#D4AF37] rounded-xl p-4.5 p-4 flex items-center justify-between transition-all duration-200 group shadow-sm hover:shadow cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#D4AF37]/40 flex items-center justify-center text-[#1C2A39] group-hover:bg-[#D4AF37] group-hover:text-white transition-colors">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-serif text-lg font-medium text-[#1C2A39]">
                      Stronghold Identifier & Renaming
                    </h3>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-white text-[#7A8B7B] border border-[#D4AF37]/30">
                      Week 14
                    </span>
                  </div>
                  <p className="text-sm text-[#7A8B7B] mt-0.5 font-sans">
                    Dismantle lies, pull down strongholds, & proclaim "I Am" truth.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#7A8B7B] group-hover:text-[#D4AF37] transition-colors" />
            </motion.button>
          </div>
        </section>

        {/* Foundation Metaphor Scripture Card */}
        <section className="bg-white/60 border border-[#D4AF37]/30 rounded-xl p-5 mb-8 text-center">
          <p className="font-script text-xl text-[#1C2A39]">
            "{stageData.scripture_text}"
          </p>
          <span className="text-xs tracking-wider uppercase text-[#7A8B7B] font-semibold mt-1 block">
            {stageData.scripture_ref}
          </span>
        </section>
      </main>

      {/* Privacy Badge & Legal Tabs (Footer) */}
      <FooterLegalBar />

      {/* MODAL 1: Amends Planner (Weeks 20 & 28) */}
      <AnimatePresence>
        {activeTool === 'amends' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FFFFFF] border border-[#D4AF37] rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-xl"
            >
              <div className="flex items-start justify-between border-b border-[#F9F6F0] pb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37]">
                    Stage 1 • Weeks 20 & 28
                  </span>
                  <h2 className="text-2xl font-serif text-[#1C2A39]">
                    Amends Planner
                  </h2>
                  <p className="text-sm text-[#7A8B7B]">
                    Focus on action, not just apology. You cannot build on broken ground.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTool(null)}
                  className="p-1 rounded-lg text-[#7A8B7B] hover:text-[#1C2A39] hover:bg-[#F9F6F0]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scripture Reminder */}
              <div className="my-4 p-3 bg-[#F9F6F0] rounded-xl border border-[#D4AF37]/30 text-xs text-[#1C2A39] italic">
                "First be reconciled to thy brother, and then come and offer thy gift." — Matthew 5:24
              </div>

              {/* Existing Amends List */}
              <div className="space-y-3 my-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
                  Active Integrity Worksheets
                </h4>
                {amendsList.map((item) => (
                  <div key={item.id} className="p-3.5 rounded-xl border border-[#7A8B7B]/30 bg-[#F9F6F0]/60 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-medium text-[#1C2A39] text-base">
                        {item.recipient}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-white border border-[#D4AF37]/40 text-[#1C2A39] font-medium">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#1C2A39]/80 font-sans">
                      {item.action}
                    </p>
                    <span className="text-[10px] text-[#7A8B7B] block font-mono">
                      Ref: {item.verse}
                    </span>
                  </div>
                ))}
              </div>

              {/* Add New Amends Entry Form */}
              <form onSubmit={handleAddAmends} className="pt-4 border-t border-[#F9F6F0] space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
                  Add Amends Commitment
                </h4>
                <div>
                  <input
                    type="text"
                    placeholder="Person's name or relationship (e.g. John Doe, Former Employer)"
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#7A8B7B]/40 focus:outline-none focus:border-[#D4AF37] bg-[#F9F6F0]"
                  />
                </div>
                <div>
                  <textarea
                    rows={2}
                    placeholder="Specific micro-action (financial, practical, or behavioral restitution)..."
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#7A8B7B]/40 focus:outline-none focus:border-[#D4AF37] bg-[#F9F6F0]"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setActiveTool(null)}
                    className="px-4 py-2 text-xs rounded-lg text-[#7A8B7B] hover:text-[#1C2A39]"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs rounded-lg bg-[#1C2A39] text-white hover:bg-[#D4AF37] hover:text-[#1C2A39] transition-all font-medium flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Save Amends</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Carry the Mat (Week 30) */}
      <AnimatePresence>
        {activeTool === 'carry_mat' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FFFFFF] border border-[#D4AF37] rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-xl"
            >
              <div className="flex items-start justify-between border-b border-[#F9F6F0] pb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37]">
                    Stage 2 • Week 30
                  </span>
                  <h2 className="text-2xl font-serif text-[#1C2A39]">
                    Carry the Mat: Peer Matching
                  </h2>
                  <p className="text-sm text-[#7A8B7B]">
                    "Courage to Ask for Help" — You do not have to carry the stretcher alone.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTool(null)}
                  className="p-1 rounded-lg text-[#7A8B7B] hover:text-[#1C2A39] hover:bg-[#F9F6F0]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Biblical Context */}
              <div className="my-4 p-3 bg-[#F9F6F0] rounded-xl border border-[#D4AF37]/30 text-xs text-[#1C2A39] italic">
                "They uncovered the roof where he was: and when they had broken it up, they let down the bed... Jesus saw their faith." — Mark 2:4-5
              </div>

              {/* Verified Mat Carriers */}
              <div className="space-y-3 my-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
                  Your Mat Carrier Circle
                </h4>
                {peers.map((peer) => (
                  <div key={peer.id} className="p-4 rounded-xl border border-[#7A8B7B]/30 bg-[#F9F6F0]/60 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-serif font-medium text-[#1C2A39] text-base">
                          {peer.name}
                        </span>
                        <span className="text-[10px] bg-[#D4AF37]/20 text-[#1C2A39] font-medium px-2 py-0.5 rounded">
                          {peer.duration}
                        </span>
                      </div>
                      <p className="text-xs text-[#7A8B7B] mt-1 font-script text-sm">
                        "{peer.quote}"
                      </p>
                    </div>
                    <button
                      onClick={() => setBurdenPrayerSent(true)}
                      className="px-3 py-1.5 text-xs bg-white border border-[#D4AF37] text-[#1C2A39] hover:bg-[#D4AF37] hover:text-white rounded-lg transition-colors font-medium flex items-center space-x-1"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>Ask to Hold Mat</span>
                    </button>
                  </div>
                ))}
              </div>

              {burdenPrayerSent && (
                <div className="p-3 bg-[#7A8B7B]/15 text-[#1C2A39] rounded-xl text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Burden shared. Your peer partner has been notified to uphold you in prayer today.</span>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setActiveTool(null)}
                  className="px-4 py-2 text-xs rounded-lg bg-[#1C2A39] text-white hover:bg-[#D4AF37] hover:text-[#1C2A39] transition-all font-medium"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: The Stayed List (Week 46) */}
      <AnimatePresence>
        {activeTool === 'stayed_list' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FFFFFF] border border-[#D4AF37] rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-xl"
            >
              <div className="flex items-start justify-between border-b border-[#F9F6F0] pb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37]">
                    Stage 4 • Week 46
                  </span>
                  <h2 className="text-2xl font-serif text-[#1C2A39]">
                    The Stayed List
                  </h2>
                  <p className="text-sm text-[#7A8B7B]">
                    Honor the people who remained when it would have been easier to walk away.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTool(null)}
                  className="p-1 rounded-lg text-[#7A8B7B] hover:text-[#1C2A39] hover:bg-[#F9F6F0]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Biblical Context */}
              <div className="my-4 p-3 bg-[#F9F6F0] rounded-xl border border-[#D4AF37]/30 text-xs text-[#1C2A39] italic">
                "Whither thou goest, I will go... thy people shall be my people, and thy God my God." — Ruth 1:16
              </div>

              {/* List */}
              <div className="space-y-3 my-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
                  Those Who Stood in the Storm
                </h4>
                {stayedList.map((stayed) => (
                  <div key={stayed.id} className="p-3.5 rounded-xl border border-[#7A8B7B]/30 bg-[#F9F6F0]/60 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-medium text-[#1C2A39] text-base">
                        {stayed.name}
                      </span>
                      <span className="text-[10px] text-[#D4AF37] uppercase font-semibold">
                        Loyalty Honored
                      </span>
                    </div>
                    <p className="text-xs text-[#1C2A39]/80">
                      <strong>Sacrifice:</strong> {stayed.sacrifice}
                    </p>
                    <p className="text-xs text-[#7A8B7B]">
                      <strong>Action:</strong> {stayed.stepTaken}
                    </p>
                  </div>
                ))}
              </div>

              {/* Add form */}
              <form onSubmit={handleAddStayed} className="pt-4 border-t border-[#F9F6F0] space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
                  Add Someone Who Stayed
                </h4>
                <div>
                  <input
                    type="text"
                    placeholder="Name of loyal friend, spouse, or mentor"
                    value={newStayedName}
                    onChange={(e) => setNewStayedName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#7A8B7B]/40 focus:outline-none focus:border-[#D4AF37] bg-[#F9F6F0]"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="What did they sacrifice to stand by you?"
                    value={newStayedSacrifice}
                    onChange={(e) => setNewStayedSacrifice(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#7A8B7B]/40 focus:outline-none focus:border-[#D4AF37] bg-[#F9F6F0]"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setActiveTool(null)}
                    className="px-4 py-2 text-xs rounded-lg text-[#7A8B7B] hover:text-[#1C2A39]"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs rounded-lg bg-[#1C2A39] text-white hover:bg-[#D4AF37] hover:text-[#1C2A39] transition-all font-medium flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Inscribe Name</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 4: The Guide (Sacred S.T.E.P. Method Companion) */}
      <AnimatePresence>
        {activeTool === 'guide' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FFFFFF] border border-[#D4AF37] rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-xl"
            >
              <div className="flex items-start justify-between border-b border-[#F9F6F0] pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-[#1C2A39] text-[#D4AF37] flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif text-[#1C2A39]">
                      The Guide
                    </h2>
                    <p className="text-xs text-[#7A8B7B]">
                      Spiritual companion for dismantling lies, shame, & fear via the Sacred S.T.E.P. Method™
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTool(null)}
                  className="p-1 rounded-lg text-[#7A8B7B] hover:text-[#1C2A39] hover:bg-[#F9F6F0]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Prompt query input */}
              <form onSubmit={handleGuideSubmit} className="my-4 space-y-3">
                {/* Somatic grounding prompt */}
                <div className="p-3 bg-[#F9F6F0] rounded-xl border border-[#D4AF37]/40 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <Wind className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-[#1C2A39]">Overwhelmed by acute adrenaline or shame?</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsBreathModalOpen(true)}
                    className="px-2.5 py-1 bg-[#1C2A39] text-[#F9F6F0] hover:bg-[#D4AF37] hover:text-[#1C2A39] rounded-full font-medium transition-colors cursor-pointer"
                  >
                    Grace Breath (60s)
                  </button>
                </div>

                <label className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B] block">
                  What relational struggle, lie, or trigger are you facing right now?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={guideInput}
                    onChange={(e) => setGuideInput(e.target.value)}
                    placeholder="e.g. I feel unworthy of making amends, or fear reaching out..."
                    className="flex-1 px-3 py-2 text-sm rounded-lg border border-[#7A8B7B]/40 focus:outline-none focus:border-[#D4AF37] bg-[#F9F6F0]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1C2A39] text-white hover:bg-[#D4AF37] hover:text-[#1C2A39] text-xs font-medium rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <span>Seek Guide</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* S.T.E.P. Breakdown Display */}
              {guideResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border ${
                    guideResponse.isCrisis
                      ? 'border-red-400 bg-red-50 text-red-950'
                      : 'border-[#D4AF37]/50 bg-[#F9F6F0]/80 text-[#1C2A39]'
                  } space-y-3 text-sm`}
                >
                  {guideResponse.isCrisis ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-red-700 font-semibold">
                        <AlertTriangle className="w-5 h-5" />
                        <span>CRISIS PROTOCOL ACTIVE</span>
                      </div>
                      <p className="font-serif text-base italic">{guideResponse.truth}</p>
                      <p className="font-semibold text-red-900 bg-white p-3 rounded-lg border border-red-200">
                        {guideResponse.embrace}
                      </p>
                      <p className="text-xs">{guideResponse.practice}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <span className="font-bold text-[#D4AF37] block text-xs tracking-wider uppercase">
                          (S) Scripture
                        </span>
                        <p className="font-serif italic text-base mt-0.5">{guideResponse.scripture}</p>
                      </div>

                      <div>
                        <span className="font-bold text-[#D4AF37] block text-xs tracking-wider uppercase">
                          (T) Truth
                        </span>
                        <p className="mt-0.5">{guideResponse.truth}</p>
                      </div>

                      <div>
                        <span className="font-bold text-[#D4AF37] block text-xs tracking-wider uppercase">
                          (E) Embrace
                        </span>
                        <p className="font-script text-lg text-[#1C2A39] mt-0.5">
                          "{guideResponse.embrace}"
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-[#D4AF37] block text-xs tracking-wider uppercase">
                          (P) Practice
                        </span>
                        <p className="mt-0.5 font-medium">{guideResponse.practice}</p>
                      </div>

                      <div className="pt-2 text-xs font-serif italic text-[#7A8B7B] border-t border-[#D4AF37]/20">
                        I'm right here with you. Take the next step.
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              <div className="mt-4 pt-4 border-t border-[#F9F6F0] flex items-center justify-between text-xs text-[#7A8B7B]">
                <span>Note: The Guide points to scripture and is not a clinical therapy substitute.</span>
                <button
                  onClick={() => setActiveTool(null)}
                  className="px-3 py-1.5 rounded-lg bg-[#F9F6F0] hover:bg-[#D4AF37]/20 text-[#1C2A39] font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 60-Second Somatic Grace Breath Modal */}
      <GraceBreathModal
        isOpen={isBreathModalOpen}
        onClose={() => setIsBreathModalOpen(false)}
      />
    </div>
  );
}

export { AmendsPlanner, RelationalConnections, StrongholdIdentifier, GraceBreathModal };
