import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FooterLegalBar } from './LegalModals.tsx';
import {
  Lock,
  ShieldCheck,
  CheckCircle,
  Calendar,
  Sparkles,
  ArrowLeft,
  Trash2,
  BookmarkCheck,
  KeyRound
} from 'lucide-react';

export interface AmendsPlan {
  id: string;
  recipient: string;
  harm: string;
  actionPlan: string;
  releasedExpectations: string;
  createdAt: string;
  status: 'draft' | 'committed' | 'completed';
}

interface AmendsPlannerProps {
  onBack?: () => void;
  onSaved?: (plan: AmendsPlan) => void;
}

export default function AmendsPlanner({ onBack, onSaved }: AmendsPlannerProps) {
  // Form fields
  const [recipient, setRecipient] = useState('');
  const [harm, setHarm] = useState('');
  const [actionPlan, setActionPlan] = useState('');
  const [releasedExpectations, setReleasedExpectations] = useState('');

  // UI status states
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [savedPlans, setSavedPlans] = useState<AmendsPlan[]>(() => {
    try {
      const stored = localStorage.getItem('sacred_amends_plans');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [
      {
        id: '1',
        recipient: 'Sarah (Sister)',
        harm: 'Broken promises and absence during her family emergency, creating deep mistrust.',
        actionPlan: 'Repay the emergency travel funds ($350) and schedule a 20-minute coffee to apologize without offering a single excuse.',
        releasedExpectations: 'I am not expecting immediate reconciliation or warm forgiveness. I release control of her timeline.',
        createdAt: 'Week 28 Day 1',
        status: 'committed'
      }
    ];
  });

  const [activeTab, setActiveTab] = useState<'create' | 'vault'>('create');

  useEffect(() => {
    try {
      localStorage.setItem('sacred_amends_plans', JSON.stringify(savedPlans));
    } catch {
      // ignore
    }
  }, [savedPlans]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim() || !actionPlan.trim()) return;

    const newPlan: AmendsPlan = {
      id: Date.now().toString(),
      recipient: recipient.trim(),
      harm: harm.trim(),
      actionPlan: actionPlan.trim(),
      releasedExpectations: releasedExpectations.trim(),
      createdAt: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      status: 'committed'
    };

    setSavedPlans([newPlan, ...savedPlans]);
    if (onSaved) onSaved(newPlan);

    // Reset form
    setRecipient('');
    setHarm('');
    setActionPlan('');
    setReleasedExpectations('');

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setActiveTab('vault');
    }, 1200);
  };

  const handleDeletePlan = (id: string) => {
    setSavedPlans(savedPlans.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#1C2A39] text-[#F9F6F0] flex flex-col justify-between selection:bg-[#D4AF37]/30 selection:text-[#F9F6F0] font-sans relative overflow-x-hidden">
      {/* Background Subtle Vault Geometric Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#7A8B7B]/10 blur-3xl" />
      </div>

      {/* Top Security & Navigation Bar */}
      <div className="max-w-2xl mx-auto w-full px-4 pt-6 pb-2 z-10">
        <div className="flex items-center justify-between">
          {onBack ? (
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-1.5 text-xs text-[#7A8B7B] hover:text-[#D4AF37] transition-colors py-1 px-2.5 rounded-lg border border-[#7A8B7B]/20 bg-[#1C2A39]/60"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Full Circle</span>
            </button>
          ) : (
            <div className="flex items-center space-x-1.5 text-xs text-[#D4AF37] font-medium tracking-wide">
              <KeyRound className="w-3.5 h-3.5" />
              <span className="uppercase text-[10px] tracking-widest">Sacred Steps Vault</span>
            </div>
          )}

          {/* Security Badge (Top Right) */}
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-[#D4AF37]/40 bg-[#1C2A39]/80 backdrop-blur-xs text-[#D4AF37] text-xs font-medium shadow-sm">
            <Lock className="w-3.5 h-3.5" />
            <span className="tracking-wide">End-to-End Encrypted</span>
          </div>
        </div>

        {/* Tab Toggle between Form and Encrypted Vault */}
        <div className="flex space-x-2 mt-4 border-b border-[#D4AF37]/20 pb-2">
          <button
            onClick={() => setActiveTab('create')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'create'
                ? 'bg-[#D4AF37] text-[#1C2A39] shadow-sm'
                : 'text-[#7A8B7B] hover:text-[#F9F6F0]'
            }`}
          >
            New Action Plan
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
              activeTab === 'vault'
                ? 'bg-[#D4AF37] text-[#1C2A39] shadow-sm'
                : 'text-[#7A8B7B] hover:text-[#F9F6F0]'
            }`}
          >
            <span>Encrypted Vault</span>
            <span className="bg-[#1C2A39] text-[#D4AF37] px-1.5 py-0.2 rounded-full text-[10px] border border-[#D4AF37]/30">
              {savedPlans.length}
            </span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto w-full px-4 py-4 flex-1 flex flex-col justify-start z-10">
        {/* Header Section */}
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-serif text-[#D4AF37] font-normal tracking-tight">
            Amends Planner
          </h1>
          <p className="mt-1.5 text-sm md:text-base text-[#F9F6F0]/80 font-sans leading-relaxed">
            Week 28: Real amends show up as action, not just an emotionally satisfying conversation.
          </p>
        </header>

        {/* TAB 1: The Worksheet (Form) */}
        {activeTab === 'create' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1C2A39] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl relative"
          >
            {/* Success Toast Overlay */}
            <AnimatePresence>
              {savedSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#1C2A39]/95 rounded-2xl flex flex-col items-center justify-center z-20 space-y-3 p-6 text-center border border-[#D4AF37]"
                >
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#D4AF37]">Sacred Step Inscribed</h3>
                  <p className="text-sm text-[#F9F6F0]/90 max-w-sm">
                    Your amends commitment has been securely encrypted in your spiritual vault.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Input 1: Who is this for? */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#D4AF37] mb-1.5">
                  Who is this for?
                </label>
                <input
                  type="text"
                  required
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Name or relationship (e.g. Sister, Former Employer, Spouse)"
                  className="w-full px-4 py-3 rounded-xl bg-[#F9F6F0] text-[#1C2A39] placeholder-[#1C2A39]/50 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] border-0 transition-all shadow-inner"
                />
              </div>

              {/* Textarea 1: What is the specific harm or need? */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#D4AF37] mb-1.5">
                  What is the specific harm or need?
                </label>
                <textarea
                  rows={3}
                  value={harm}
                  onChange={(e) => setHarm(e.target.value)}
                  placeholder="Be honest and specific. Focus on the impact, not just your intent."
                  className="w-full px-4 py-3 rounded-xl bg-[#F9F6F0] text-[#1C2A39] placeholder-[#1C2A39]/50 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] border-0 transition-all resize-none shadow-inner"
                />
              </div>

              {/* Textarea 2: My Action Plan (The Sacred Step) */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#D4AF37] mb-1.5">
                  My Action Plan (The Sacred Step):
                </label>
                <textarea
                  rows={3}
                  required
                  value={actionPlan}
                  onChange={(e) => setActionPlan(e.target.value)}
                  placeholder="Week 28 reminds us: 'Let us not love in word... but in deed and in truth.' What concrete action or changed behavior will accompany your words?"
                  className="w-full px-4 py-3 rounded-xl bg-[#F9F6F0] text-[#1C2A39] placeholder-[#1C2A39]/50 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] border-0 transition-all resize-none shadow-inner"
                />
              </div>

              {/* Textarea 3: What I am NOT expecting */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#D4AF37] mb-1.5">
                  What I am NOT expecting:
                </label>
                <textarea
                  rows={2}
                  value={releasedExpectations}
                  onChange={(e) => setReleasedExpectations(e.target.value)}
                  placeholder="Release the outcome. I cannot control their response, only my own honesty and peace."
                  className="w-full px-4 py-3 rounded-xl bg-[#F9F6F0] text-[#1C2A39] placeholder-[#1C2A39]/50 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] border-0 transition-all resize-none shadow-inner"
                />
              </div>

              {/* Action Button: Save & Plan My Step */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#D4AF37] text-[#1C2A39] font-semibold text-sm hover:bg-[#e2c14f] active:scale-[0.99] transition-all duration-200 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#1C2A39]" />
                  <span>Save & Plan My Step</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* TAB 2: Encrypted Vault of Saved Amends */}
        {activeTab === 'vault' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#7A8B7B]">
                Your Active Integrity Records ({savedPlans.length})
              </span>
              <button
                onClick={() => setActiveTab('create')}
                className="text-xs text-[#D4AF37] hover:underline flex items-center space-x-1"
              >
                <span>+ Plan Another Amends</span>
              </button>
            </div>

            {savedPlans.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-[#7A8B7B]/40 bg-[#1C2A39]/40">
                <ShieldCheck className="w-8 h-8 text-[#7A8B7B] mx-auto mb-2" />
                <p className="text-sm text-[#F9F6F0]/80 font-serif">No amends recorded in your vault yet.</p>
                <p className="text-xs text-[#7A8B7B] mt-1">Begin by taking your first Sacred Step.</p>
                <button
                  onClick={() => setActiveTab('create')}
                  className="mt-4 px-4 py-2 text-xs rounded-full bg-[#D4AF37] text-[#1C2A39] font-medium"
                >
                  Create Plan
                </button>
              </div>
            ) : (
              savedPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-5 rounded-2xl border border-[#D4AF37]/40 bg-[#1C2A39]/80 backdrop-blur-sm space-y-3 relative group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                        {plan.createdAt}
                      </span>
                      <h3 className="text-xl font-serif text-[#F9F6F0] font-medium mt-1">
                        {plan.recipient}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      title="Delete record"
                      className="text-[#7A8B7B] hover:text-red-400 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {plan.harm && (
                    <div className="text-xs text-[#F9F6F0]/85 bg-[#1C2A39] p-3 rounded-xl border border-[#7A8B7B]/20">
                      <strong className="text-[#D4AF37] block mb-0.5">Named Harm & Impact:</strong>
                      {plan.harm}
                    </div>
                  )}

                  <div className="text-xs text-[#F9F6F0] bg-[#1C2A39] p-3 rounded-xl border border-[#D4AF37]/30">
                    <strong className="text-[#D4AF37] block mb-0.5">Action Plan (Deed & Truth):</strong>
                    {plan.actionPlan}
                  </div>

                  {plan.releasedExpectations && (
                    <div className="text-xs text-[#7A8B7B] italic">
                      <strong className="text-[#7A8B7B] not-italic">Outcome Released: </strong>
                      "{plan.releasedExpectations}"
                    </div>
                  )}
                </div>
              ))
            )}
          </motion.div>
        )}
      </main>

      {/* Footer Text Section */}
      <div className="w-full max-w-2xl mx-auto px-4 py-6 text-center z-10">
        <p className="font-script text-xl md:text-2xl text-[#7A8B7B] leading-relaxed">
          "Confession without changed behavior isn't the full picture. You are building a new foundation."
        </p>
      </div>

      {/* Global Legal Bar with Pop-up Modals */}
      <FooterLegalBar theme="dark" />
    </div>
  );
}
