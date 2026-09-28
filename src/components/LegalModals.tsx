import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Lock,
  FileText,
  AlertTriangle,
  X,
  CheckCircle2,
  ExternalLink,
  PhoneCall,
  Scale
} from 'lucide-react';

export type LegalDocType = 'privacy' | 'terms' | null;

interface LegalModalProps {
  isOpen: boolean;
  docType: LegalDocType;
  onClose: () => void;
}

export function LegalModal({ isOpen, docType, onClose }: LegalModalProps) {
  if (!isOpen || !docType) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25 }}
          className="bg-[#FFFFFF] border-2 border-[#D4AF37] rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        >
          {/* Modal Header */}
          <div className="p-4 sm:p-5 border-b border-[#D4AF37]/30 bg-[#F9F6F0] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#1C2A39] text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]">
                {docType === 'privacy' ? (
                  <Shield className="w-5 h-5" />
                ) : (
                  <Scale className="w-5 h-5" />
                )}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#7A8B7B] block">
                  Sacred Steps to Redemption
                </span>
                <h2 className="text-xl sm:text-2xl font-serif text-[#1C2A39] font-semibold leading-tight">
                  {docType === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#7A8B7B] hover:text-[#1C2A39] hover:bg-white/80 transition-colors cursor-pointer border border-[#7A8B7B]/20"
              title="Close window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-[#1C2A39] font-sans text-sm leading-relaxed selection:bg-[#D4AF37]/20">
            {docType === 'privacy' ? (
              <PrivacyPolicyContent />
            ) : (
              <TermsAndConditionsContent />
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-[#F9F6F0] bg-[#F9F6F0]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A8B7B]">
            <div className="flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Sacred Steps Recovery System • Confidential & Protected</span>
            </div>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 rounded-full bg-[#1C2A39] text-[#F9F6F0] font-medium hover:bg-[#D4AF37] hover:text-[#1C2A39] transition-all cursor-pointer shadow-xs"
            >
              I Understand & Acknowledge
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function PrivacyPolicyContent() {
  return (
    <div className="space-y-5">
      <div className="p-3.5 rounded-xl bg-[#F9F6F0] border border-[#D4AF37]/40 text-xs text-[#1C2A39] space-y-1">
        <p className="font-semibold text-[#1C2A39]">
          Effective Date: Version 1.0 (2026 Edition)
        </p>
        <p className="text-[#7A8B7B]">
          Governed by Kya Daisy Publishing & Author C. Lamont Patrick. Contact:{' '}
          <a
            href="mailto:scaredstepstoredemption@gmail.com"
            className="text-[#1C2A39] underline hover:text-[#D4AF37]"
          >
            scaredstepstoredemption@gmail.com
          </a>
        </p>
      </div>

      <section className="space-y-2">
        <h3 className="font-serif text-lg font-semibold text-[#1C2A39] flex items-center space-x-2">
          <span className="text-[#D4AF37]">1.</span>
          <span>Sacred Confidentiality of Recovery & Spiritual Data</span>
        </h3>
        <p className="text-[#2B2B2B]">
          We recognize that the journey out of addiction, trauma, and emotional bondage is holy,
          vulnerable ground. Information entered into the <em>Sacred Steps to Redemption</em>{' '}
          application—including your <strong>Amends Planner</strong> commitments, personal
          reflections, naming of personal strongholds, prayers, and peer check-ins—is treated as
          confidential recovery sanctuary data.
        </p>
        <p className="text-[#2B2B2B]">
          <strong>Zero Commercialization Guarantee:</strong> We never sell, monetize, rent, or trade
          your recovery data, contact lists, or personal reflections to data brokers, advertisers,
          insurance firms, or external commercial entities.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-serif text-lg font-semibold text-[#1C2A39] flex items-center space-x-2">
          <span className="text-[#D4AF37]">2.</span>
          <span>Information We Collect & How It Is Handled</span>
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-[#2B2B2B]">
          <li>
            <strong>Locally Stored Vault Records:</strong> Your Amends worksheets, list of persons
            who stayed, and personal milestone notes are saved locally within client storage in your
            browser session, encrypted in transit and at rest.
          </li>
          <li>
            <strong>Peer Matching Data (Carry the Mat):</strong> If you opt in to "Carry the Mat"
            peer support, only the first name, sobriety timeline, and spiritual prayer focus you
            voluntarily provide will be visible to a verified recovery companion.
          </li>
          <li>
            <strong>The Guide Interaction Logs:</strong> Queries submitted to "The Guide" (Sacred
            S.T.E.P. Method™) are processed solely to generate real-time Scripture, Truth, Embrace,
            and Practice responses and are strictly isolated from advertising engines.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="font-serif text-lg font-semibold text-[#1C2A39] flex items-center space-x-2">
          <span className="text-[#D4AF37]">3.</span>
          <span>Health Data & Sensitive Regulations Alignment</span>
        </h3>
        <p className="text-[#2B2B2B]">
          While <em>Sacred Steps to Redemption</em> is a Christian devotional and self-directed
          recovery companion rather than a HIPAA-covered medical clinic, we voluntarily adhere to
          the spirit of <strong>42 CFR Part 2</strong> principles regarding substance use disorder
          record privacy. Your participation in spiritual recovery will never be shared without your
          affirmative, explicit directive.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-serif text-lg font-semibold text-[#1C2A39] flex items-center space-x-2">
          <span className="text-[#D4AF37]">4.</span>
          <span>Your Rights & Data Erasure</span>
        </h3>
        <p className="text-[#2B2B2B]">
          You possess full sovereignty over your vault. You may at any moment clear your browser
          cache, delete amends records individually using the trash icon in your vault, or email us
          at{' '}
          <a
            href="mailto:scaredstepstoredemption@gmail.com"
            className="text-[#1C2A39] underline font-medium"
          >
            scaredstepstoredemption@gmail.com
          </a>{' '}
          to request immediate removal of any peer matching registry.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-serif text-lg font-semibold text-[#1C2A39] flex items-center space-x-2">
          <span className="text-[#D4AF37]">5.</span>
          <span>Security Practices</span>
        </h3>
        <p className="text-[#2B2B2B]">
          All application data traffic is encrypted over modern TLS/SSL cryptographic protocols.
          Access to our administration infrastructure is restricted by role-based controls and
          multi-factor authentication.
        </p>
      </section>
    </div>
  );
}

function TermsAndConditionsContent() {
  return (
    <div className="space-y-5">
      {/* Critical Medical Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-amber-50 border-2 border-[#D4AF37] text-amber-950 space-y-2">
        <div className="flex items-center space-x-2 font-bold text-sm text-[#1C2A39]">
          <AlertTriangle className="w-4 h-4 text-[#D4AF37]" />
          <span>IMPORTANT MEDICAL & CLINICAL DISCLAIMER (NOT MEDICAL ADVICE)</span>
        </div>
        <p className="text-xs leading-relaxed text-[#1C2A39]">
          <em>Sacred Steps to Redemption</em> and "The Guide" are spiritual, faith-based self-help
          companions designed for encouragement, mindfulness, and Christian 12-step discipleship.
          <strong>
            {' '}
            THIS APP DOES NOT PROVIDE MEDICAL, PSYCHIATRIC, OR CLINICAL ADVICE, DIAGNOSIS, OR
            TREATMENT.
          </strong>
        </p>
        <p className="text-xs text-[#1C2A39]">
          Substance withdrawal and acute psychiatric distress can be life-threatening. Always
          consult a licensed physician, clinical addiction medicine specialist, or psychiatrist
          before initiating detox or altering prescribed medications.
        </p>
      </div>

      {/* Emergency Crisis Contact */}
      <div className="p-3.5 rounded-xl bg-[#1C2A39] text-[#F9F6F0] text-xs flex items-start space-x-3 border border-[#D4AF37]">
        <PhoneCall className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-[#D4AF37] block uppercase tracking-wider">
            Crisis Lifeline (24/7 Free & Confidential)
          </strong>
          <p>
            If you or someone you love is experiencing suicidal ideation, severe acute intoxication,
            or an emergency, call or text <strong>988</strong> immediately (Suicide & Crisis
            Lifeline) or proceed to the nearest emergency department.
          </p>
        </div>
      </div>

      <section className="space-y-2">
        <h3 className="font-serif text-lg font-semibold text-[#1C2A39] flex items-center space-x-2">
          <span className="text-[#D4AF37]">1.</span>
          <span>Agreement to Terms</span>
        </h3>
        <p className="text-[#2B2B2B]">
          By accessing or utilizing the <em>Sacred Steps to Redemption</em> application, you agree
          to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree,
          please discontinue use of this platform immediately.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-serif text-lg font-semibold text-[#1C2A39] flex items-center space-x-2">
          <span className="text-[#D4AF37]">2.</span>
          <span>Nature of the Sacred S.T.E.P. Method™</span>
        </h3>
        <p className="text-[#2B2B2B]">
          The Sacred S.T.E.P. Method™ (Scripture, Truth, Embrace, Practice) is an authored spiritual
          devotional framework created by C. Lamont Patrick and published by Kya Daisy Publishing
          (Copyright © 2025–2026). It is intended to renew the mind through biblical affirmations
          and concrete personal disciplines (Romans 12:2). It does not replace 12-Step fellowships,
          rehabilitation facilities, or clinical therapy.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-serif text-lg font-semibold text-[#1C2A39] flex items-center space-x-2">
          <span className="text-[#D4AF37]">3.</span>
          <span>Peer Matching ("Carry the Mat") Conduct</span>
        </h3>
        <p className="text-[#2B2B2B]">
          When connecting with peer partners:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-[#2B2B2B]">
          <li>You agree to treat every peer with Christian grace, dignity, and confidentiality.</li>
          <li>No harassment, abusive speech, or solicitation of substances will be tolerated.</li>
          <li>
            Peer partners are fellow walkers in recovery, not licensed mental health providers or
            crisis intervention specialists.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="font-serif text-lg font-semibold text-[#1C2A39] flex items-center space-x-2">
          <span className="text-[#D4AF37]">4.</span>
          <span>Intellectual Property Rights</span>
        </h3>
        <p className="text-[#2B2B2B]">
          All trademarks, book excerpts, design styles, the "Building a Foundation" visual metaphor,
          and proprietary audio devotional structures belong exclusively to C. Lamont Patrick and
          Kya Daisy Publishing. No reproduction or distribution without written consent is
          permitted.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-serif text-lg font-semibold text-[#1C2A39] flex items-center space-x-2">
          <span className="text-[#D4AF37]">5.</span>
          <span>Limitation of Liability</span>
        </h3>
        <p className="text-[#2B2B2B]">
          To the fullest extent permitted by applicable law, Kya Daisy Publishing, C. Lamont
          Patrick, and their affiliates shall not be liable for any direct, indirect, incidental,
          or consequential damages resulting from your use of the app, reliance on spiritual
          affirmations, or interpersonal relationships formed through peer tools.
        </p>
      </section>
    </div>
  );
}

/**
 * Reusable Footer Legal Bar Component with Clickable Tabs
 */
export function FooterLegalBar({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const [modalDoc, setModalDoc] = useState<LegalDocType>(null);
  const isDark = theme === 'dark';

  return (
    <>
      <footer
        className={`border-t py-4 px-4 select-none ${
          isDark
            ? 'border-[#D4AF37]/30 bg-[#1C2A39]/90 text-[#7A8B7B]'
            : 'border-[#D4AF37]/30 bg-white/70 backdrop-blur-xs text-[#7A8B7B]'
        }`}
      >
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {/* Encryption Badge */}
          <div className="flex items-center space-x-2">
            <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Private & Encrypted. Your relational work is sacred and secure.</span>
          </div>

          {/* Clickable Legal Tabs */}
          <div className="flex items-center space-x-3 text-[11px] font-medium">
            <button
              onClick={() => setModalDoc('privacy')}
              className={`underline decoration-[#D4AF37]/60 underline-offset-2 transition-colors cursor-pointer ${
                isDark
                  ? 'text-[#F9F6F0] hover:text-[#D4AF37]'
                  : 'text-[#1C2A39] hover:text-[#D4AF37]'
              }`}
            >
              Privacy Policy
            </button>
            <span className="text-[#D4AF37]">•</span>
            <button
              onClick={() => setModalDoc('terms')}
              className={`underline decoration-[#D4AF37]/60 underline-offset-2 transition-colors cursor-pointer ${
                isDark
                  ? 'text-[#F9F6F0] hover:text-[#D4AF37]'
                  : 'text-[#1C2A39] hover:text-[#D4AF37]'
              }`}
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </footer>

      {/* Pop-up Modal Window */}
      <LegalModal
        isOpen={modalDoc !== null}
        docType={modalDoc}
        onClose={() => setModalDoc(null)}
      />
    </>
  );
}
