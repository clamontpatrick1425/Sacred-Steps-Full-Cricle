import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FooterLegalBar } from './LegalModals.tsx';
import {
  Users,
  Heart,
  CheckCircle2,
  Sparkles,
  Send,
  Plus,
  ArrowLeft,
  X,
  Shield,
  HelpCircle,
  MessageSquareHeart,
  UserCheck
} from 'lucide-react';

interface RelationalConnectionsProps {
  initialScreen?: 'carry_mat' | 'stayed_list';
  onBack?: () => void;
}

interface StayedPerson {
  id: string;
  name: string;
  note: string;
  thanked: boolean;
}

export default function RelationalConnections({
  initialScreen = 'carry_mat',
  onBack
}: RelationalConnectionsProps) {
  const [activeTab, setActiveTab] = useState<'carry_mat' | 'stayed_list'>(initialScreen);

  // Screen A: Carry the Mat State
  const [reachStatus, setReachStatus] = useState<
    'reached_out' | 'preparing' | 'need_help' | null
  >('preparing');
  const [connectionRequested, setConnectionRequested] = useState(false);

  // Screen B: The Stayed List State
  const [stayedEntries, setStayedEntries] = useState<StayedPerson[]>([
    {
      id: '1',
      name: 'Sarah',
      note: 'She answered my 2 AM phone calls in 2019.',
      thanked: false
    },
    {
      id: '2',
      name: 'Mark',
      note: 'He never stopped inviting me to coffee, even when I was messy.',
      thanked: false
    }
  ]);

  // Modal for adding someone to The Stayed List
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newNote, setNewNote] = useState('');

  // Micro-Thanks notification state
  const [microThanksRecipient, setMicroThanksRecipient] = useState<string | null>(null);

  const handleSendMicroThanks = (id: string, name: string) => {
    setStayedEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, thanked: true } : entry))
    );
    setMicroThanksRecipient(name);
    setTimeout(() => {
      setMicroThanksRecipient(null);
    }, 2800);
  };

  const handleAddStayedPerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newNote.trim()) return;

    const newEntry: StayedPerson = {
      id: Date.now().toString(),
      name: newName.trim(),
      note: newNote.trim(),
      thanked: false
    };

    setStayedEntries([newEntry, ...stayedEntries]);
    setNewName('');
    setNewNote('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#1C2A39] flex flex-col justify-between selection:bg-[#D4AF37]/20 font-sans relative overflow-x-hidden">
      {/* Top Bar with Navigation & Segmented Toggle Switch */}
      <header className="border-b border-[#D4AF37]/30 bg-[#FFFFFF]/80 backdrop-blur-sm sticky top-0 z-20 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {onBack ? (
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-1.5 text-xs text-[#7A8B7B] hover:text-[#1C2A39] transition-colors py-1 px-2.5 rounded-lg border border-[#7A8B7B]/20 bg-white cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Full Circle</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[#F9F6F0]">
                <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#7A8B7B]">
                Sacred Steps
              </span>
            </div>
          )}

          {/* Clean Top Toggle Switch */}
          <div className="bg-[#F9F6F0] p-1 rounded-full border border-[#D4AF37]/40 flex items-center shadow-inner">
            <button
              onClick={() => setActiveTab('carry_mat')}
              className={`px-3.5 py-1.5 text-xs rounded-full font-medium transition-all duration-300 flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'carry_mat'
                  ? 'bg-[#1C2A39] text-[#F9F6F0] shadow-sm'
                  : 'text-[#7A8B7B] hover:text-[#1C2A39]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Carry the Mat</span>
            </button>

            <button
              onClick={() => setActiveTab('stayed_list')}
              className={`px-3.5 py-1.5 text-xs rounded-full font-medium transition-all duration-300 flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'stayed_list'
                  ? 'bg-[#1C2A39] text-[#F9F6F0] shadow-sm'
                  : 'text-[#7A8B7B] hover:text-[#1C2A39]'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>The Stayed List</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area with Animated Transition */}
      <main className="max-w-2xl mx-auto w-full px-4 py-8 flex-1 flex flex-col justify-start">
        <AnimatePresence mode="wait">
          {/* SCREEN A: Carry the Mat (Week 30) */}
          {activeTab === 'carry_mat' && (
            <motion.div
              key="carry_mat"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="text-center md:text-left">
                <span className="text-[11px] uppercase tracking-widest font-semibold text-[#D4AF37] block">
                  Week 30 • Relational Courage
                </span>
                <h1 className="text-3xl md:text-4xl font-serif text-[#1C2A39] font-normal tracking-tight mt-1">
                  Carry the Mat
                </h1>
                <p className="mt-1.5 text-sm md:text-base text-[#7A8B7B] font-light leading-relaxed">
                  Week 30: Two are better than one. Who is carrying the mat for you today?
                </p>
              </div>

              {/* Status Check-in Card */}
              <div className="bg-[#FFFFFF] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-medium text-[#1C2A39]">
                    Weekly Relational Status Check-in
                  </h3>
                  <span className="text-xs text-[#7A8B7B] font-script text-base">
                    Mark 2:3-5
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Option 1: I reached out this week */}
                  <label
                    onClick={() => {
                      setReachStatus('reached_out');
                      setConnectionRequested(false);
                    }}
                    className={`flex items-center space-x-3.5 p-3.5 rounded-xl border transition-all cursor-pointer ${
                      reachStatus === 'reached_out'
                        ? 'border-[#D4AF37] bg-[#F9F6F0] ring-1 ring-[#D4AF37]'
                        : 'border-[#7A8B7B]/30 hover:border-[#D4AF37]/60 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reachStatus"
                      checked={reachStatus === 'reached_out'}
                      onChange={() => {}}
                      className="accent-[#D4AF37] w-4 h-4 cursor-pointer"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-[#1C2A39] block">
                        I reached out this week
                      </span>
                      <span className="text-xs text-[#7A8B7B]">
                        Shared an honest burden with a trusted brother, sister, or mentor.
                      </span>
                    </div>
                  </label>

                  {/* Option 2: I am preparing to reach out */}
                  <label
                    onClick={() => {
                      setReachStatus('preparing');
                      setConnectionRequested(false);
                    }}
                    className={`flex items-center space-x-3.5 p-3.5 rounded-xl border transition-all cursor-pointer ${
                      reachStatus === 'preparing'
                        ? 'border-[#D4AF37] bg-[#F9F6F0] ring-1 ring-[#D4AF37]'
                        : 'border-[#7A8B7B]/30 hover:border-[#D4AF37]/60 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reachStatus"
                      checked={reachStatus === 'preparing'}
                      onChange={() => {}}
                      className="accent-[#D4AF37] w-4 h-4 cursor-pointer"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-[#1C2A39] block">
                        I am preparing to reach out
                      </span>
                      <span className="text-xs text-[#7A8B7B]">
                        Praying through the courage to have the conversation before the crisis hits.
                      </span>
                    </div>
                  </label>

                  {/* Option 3: I need help finding someone */}
                  <label
                    onClick={() => setReachStatus('need_help')}
                    className={`flex items-center space-x-3.5 p-3.5 rounded-xl border transition-all cursor-pointer ${
                      reachStatus === 'need_help'
                        ? 'border-[#D4AF37] bg-[#F9F6F0] ring-1 ring-[#D4AF37]'
                        : 'border-[#7A8B7B]/30 hover:border-[#D4AF37]/60 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reachStatus"
                      checked={reachStatus === 'need_help'}
                      onChange={() => {}}
                      className="accent-[#D4AF37] w-4 h-4 cursor-pointer"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-[#1C2A39] block">
                        I need help finding someone
                      </span>
                      <span className="text-xs text-[#7A8B7B]">
                        I don't have anyone in my corner right now to hold the corner of the mat.
                      </span>
                    </div>
                  </label>
                </div>

                {/* Conditional UI: If Option 3 is Selected */}
                <AnimatePresence>
                  {reachStatus === 'need_help' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: 10, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden pt-2"
                    >
                      <div className="bg-[#FFFFFF] border-2 border-[#D4AF37] rounded-xl p-5 space-y-4 shadow-md relative">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] flex items-center justify-center shrink-0 text-[#D4AF37] mt-0.5">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm text-[#1C2A39] font-medium leading-relaxed">
                              Isolation is the enemy of recovery. Would you like to be anonymously matched with a verified peer for a 5-minute weekly check-in?
                            </p>
                            <span className="text-xs text-[#7A8B7B] mt-1 block">
                              Rooted in Ecclesiastes 4:9-10 & Galatians 6:2. Zero pressure, completely confidential.
                            </span>
                          </div>
                        </div>

                        {connectionRequested ? (
                          <div className="p-3.5 bg-[#7A8B7B]/15 border border-[#7A8B7B]/30 rounded-xl flex items-center space-x-2 text-xs text-[#1C2A39] font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                            <span>
                              Peer connection request submitted. Our pastoral care and peer guide will introduce a verified partner within 24 hours.
                            </span>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConnectionRequested(true)}
                            className="w-full py-3 px-5 rounded-full bg-[#1C2A39] text-[#F9F6F0] font-medium text-xs md:text-sm hover:bg-[#D4AF37] hover:text-[#1C2A39] transition-all duration-200 shadow flex items-center justify-center space-x-2 cursor-pointer"
                          >
                            <UserCheck className="w-4 h-4" />
                            <span>Request Peer Connection</span>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Biblical Anchor Quote for Screen A */}
              <div className="text-center py-2">
                <p className="font-script text-xl text-[#7A8B7B]">
                  "And when they could not come nigh unto him for the press, they uncovered the roof where he was..."
                </p>
                <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold mt-0.5 block">
                  Mark 2:4 (KJV)
                </span>
              </div>
            </motion.div>
          )}

          {/* SCREEN B: The Stayed List (Week 46) */}
          {activeTab === 'stayed_list' && (
            <motion.div
              key="stayed_list"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="text-center md:text-left">
                <span className="text-[11px] uppercase tracking-widest font-semibold text-[#D4AF37] block">
                  Week 46 • Gratitude in Recovery
                </span>
                <h1 className="text-3xl md:text-4xl font-serif text-[#1C2A39] font-normal tracking-tight mt-1">
                  The Stayed List
                </h1>
                <p className="mt-1.5 text-sm md:text-base text-[#7A8B7B] font-light leading-relaxed">
                  Week 46: Gratitude for the people who stayed when it would have been easier to leave.
                </p>
              </div>

              {/* Floating notification when Micro-Thanks sent */}
              <AnimatePresence>
                {microThanksRecipient && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="p-3 bg-[#1C2A39] text-[#F9F6F0] rounded-xl text-xs flex items-center justify-between shadow-lg border border-[#D4AF37]"
                  >
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      <span>
                        Micro-thanks message drafted and recorded for <strong>{microThanksRecipient}</strong>.
                      </span>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scrollable List Area */}
              <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
                {stayedEntries.map((person) => (
                  <motion.div
                    key={person.id}
                    layout
                    className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#D4AF37]/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-[#D4AF37]"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-serif text-xl font-medium text-[#1C2A39]">
                          {person.name}
                        </h3>
                        {person.thanked && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7A8B7B]/15 text-[#7A8B7B] font-semibold uppercase">
                            Thanked
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#1C2A39]/80 font-sans leading-relaxed">
                        "{person.note}"
                      </p>
                    </div>

                    <button
                      onClick={() => handleSendMicroThanks(person.id, person.name)}
                      className={`shrink-0 px-4 py-2 text-xs rounded-full font-medium transition-all duration-200 border cursor-pointer flex items-center justify-center space-x-1.5 ${
                        person.thanked
                          ? 'border-[#7A8B7B]/40 text-[#7A8B7B] bg-[#F9F6F0]'
                          : 'border-[#D4AF37] text-[#1C2A39] hover:bg-[#D4AF37] hover:text-[#1C2A39] bg-white shadow-xs'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{person.thanked ? 'Thanks Sent' : 'Send Micro-Thanks'}</span>
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Prominent Add Button */}
              <div>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="w-full py-3.5 px-6 rounded-full bg-[#7A8B7B] text-[#F9F6F0] font-medium text-sm hover:bg-[#687869] active:scale-[0.99] transition-all duration-200 shadow flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Someone to the List</span>
                </button>
              </div>

              {/* Footer Accent */}
              <div className="text-center pt-3 pb-1">
                <p className="font-script text-2xl text-[#7A8B7B]">
                  "True friendship is proven, specifically, in adversity."
                </p>
                <span className="text-[10px] tracking-wider uppercase text-[#D4AF37] font-semibold mt-0.5 block">
                  Proverbs 17:17 • Sacred Steps Reflection
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modal for Adding Someone to The Stayed List */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FFFFFF] border border-[#D4AF37] rounded-2xl w-full max-w-md p-6 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#F9F6F0] pb-3">
                <h3 className="font-serif text-xl text-[#1C2A39]">
                  Add Someone Who Stayed
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg text-[#7A8B7B] hover:text-[#1C2A39] hover:bg-[#F9F6F0] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddStayedPerson} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#D4AF37] mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rachel, Dad, Pastor John"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#7A8B7B]/40 focus:outline-none focus:border-[#D4AF37] bg-[#F9F6F0] text-[#1C2A39]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#D4AF37] mb-1">
                    How did they stand by you?
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="e.g. Never gave up on me during my darkest relapse in 2021..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#7A8B7B]/40 focus:outline-none focus:border-[#D4AF37] bg-[#F9F6F0] text-[#1C2A39] resize-none"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-xs rounded-lg text-[#7A8B7B] hover:text-[#1C2A39] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs rounded-full bg-[#1C2A39] text-[#F9F6F0] hover:bg-[#D4AF37] hover:text-[#1C2A39] font-medium transition-colors cursor-pointer"
                  >
                    Save to List
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Bottom Privacy & Legal Footer Bar */}
      <FooterLegalBar theme="light" />
    </div>
  );
}
