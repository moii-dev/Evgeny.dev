import { usePrefersReducedMotion as useReducedMotion } from '../hooks/usePrefersReducedMotion';
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Check, Github, Mail, Loader2, AlertCircle } from 'lucide-react';
import { motion, useScroll, useTransform, type Variants } from 'motion/react';
import { SphericalVisual } from './contact/SphericalVisual';
import { CONTACT_CONFIG } from '../config/contactConfig';
import { withDeadline } from '../utils/request';
import { scrollToElement } from '../utils/scrollController';

interface Props {
  email?: string;
}

export const ContactSection: React.FC<Props> = ({ email = CONTACT_CONFIG.socialLinks.email }) => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'fallback' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormHighlighted, setIsFormHighlighted] = useState(false);
  const requestRef = useRef<AbortController | null>(null);
  const highlightTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    requestRef.current?.abort();
    if (highlightTimeout.current) clearTimeout(highlightTimeout.current);
    if (focusTimeout.current) clearTimeout(focusTimeout.current);
  }, []);

  // Parallax scroll on decorative spheres
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const visualY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['-3%', '3%']
  );

  // Focus and highlight form from "Start a conversation" button
  const handleStartConversation = () => {
    if (nameInputRef.current) {
      scrollToElement(nameInputRef.current, true);
      nameInputRef.current.focus({ preventScroll: true });
      setIsFormHighlighted(true);
      if (highlightTimeout.current) clearTimeout(highlightTimeout.current);
      highlightTimeout.current = setTimeout(() => setIsFormHighlighted(false), 1600);
    }
  };

  // Scroll smoothly down to the form
  const handleScrollToForm = () => {
    if (formCardRef.current) {
      scrollToElement(formCardRef.current, true);
      if (nameInputRef.current) {
        if (focusTimeout.current) clearTimeout(focusTimeout.current);
        focusTimeout.current = setTimeout(() => nameInputRef.current?.focus(), 400);
      }
    }
  };

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formName.trim()) {
      newErrors.name = 'Please provide your name';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formEmail.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!emailRegex.test(formEmail.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formMsg.trim()) {
      newErrors.message = 'Please tell me a little about your project or idea';
    } else if (formMsg.trim().length < 8) {
      newErrors.message = 'Please write at least a few words (min 8 characters)';
    }
    setErrors(newErrors);
    const first = Object.keys(newErrors)[0];
    if (first) document.getElementById(`contact-${first}`)?.focus();
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (requestRef.current) return;
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    const endpoint = CONTACT_CONFIG.form.endpoint;

    if (endpoint) {
      const controller = new AbortController();
      requestRef.current = controller;
      try {
        const response = await withDeadline(signal => fetch(endpoint, {
          signal,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formName,
            email: formEmail,
            message: formMsg,
            source: 'Evgeny.dev Contact Form',
          }),
        }), 12_000, controller.signal);

        if (response.ok) {
          setSubmitStatus('success');
          setFormName('');
          setFormEmail('');
          setFormMsg('');
        } else {
          setSubmitStatus('error');
          setErrorMessage('Could not send message via form endpoint. Please use direct email.');
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        setSubmitStatus('error');
        setErrorMessage(error instanceof Error && error.message.includes('timed out') ? error.message : 'Network error while sending. Please reach out via direct email.');
      } finally {
        requestRef.current = null;
        if (!controller.signal.aborted) setIsSubmitting(false);
      }
    } else {
      // No server endpoint configured: provide clear honest messaging and direct mailto delivery option
      setIsSubmitting(false);
      setSubmitStatus('fallback');
    }
  };

  const handleOpenMailto = () => {
    const subject = encodeURIComponent(
      `Inquiry from ${formName || 'Evgeny.dev Visitor'} — ${CONTACT_CONFIG.form.defaultSubject}`
    );
    const body = encodeURIComponent(
      `Name: ${formName}\nEmail: ${formEmail}\n\nMessage:\n${formMsg}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleResetForm = () => {
    setSubmitStatus('idle');
    setFormName('');
    setFormEmail('');
    setFormMsg('');
    setErrors({});
  };

  // Telegram SVG Icon
  const TelegramIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24"
    >
      {/* 1. Header: 05 / GET IN TOUCH */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
      >
        <div>
          {/* Section Kicker */}
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-400 uppercase font-mono block mb-3">
            05 / GET IN TOUCH
          </span>

          {/* Large Two-Line Editorial Headline */}
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.03] tracking-tight font-normal mb-5">
            <span className="text-neutral-950 block">Have an idea?</span>
            <span className="text-[#9ca3af] block">Let's make it real.</span>
          </h2>

          {/* Description matching exact brief */}
          <p className="text-neutral-600 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
            Whether it's a new project, an interesting collaboration, or just a conversation — I'd love to hear from you.
          </p>
        </div>

        {/* Top-Right Minimalist Round Arrow Button */}
        <div className="self-start md:self-end pt-2 md:pt-0">
          <button
            onClick={handleScrollToForm}
            aria-label="Scroll to contact form"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-neutral-300 hover:border-black bg-white hover:bg-neutral-50 text-neutral-800 hover:text-black transition-all duration-300 flex items-center justify-center shadow-2xs hover:scale-105 active:scale-95 cursor-pointer group"
          >
            <ArrowUpRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </motion.div>

      {/* 2. Main Composition: Two Cards Grid (Left 60% / Right 40%) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-10 sm:mb-14"
      >
        {/* Left Card: LET'S CONNECT (Black container with abstract spherical forms) */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-7 bg-[#101114] text-white rounded-[28px] sm:rounded-[32px] p-8 sm:p-12 lg:p-14 relative overflow-hidden flex flex-col justify-between min-h-[460px] sm:min-h-[500px] border border-neutral-800/80 shadow-xl group"
        >
          {/* Abstract Spherical Metallic Background with Parallax */}
          <motion.div style={{ y: visualY }} className="absolute inset-0">
            <SphericalVisual />
          </motion.div>

          {/* Top Content */}
          <div className="relative z-10">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-neutral-400 font-mono block mb-4">
              LET'S CONNECT
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.08] font-normal tracking-tight text-white mb-4">
              Great things start
              <br />
              with a conversation.
            </h3>

            <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-md font-normal">
              Have a project in mind? I'm always interested in meaningful ideas, creative challenges, and new opportunities.
            </p>
          </div>

          {/* Bottom Action Controls */}
          <div className="relative z-10 flex flex-wrap items-center gap-3 sm:gap-4 mt-8 sm:mt-12">
            {/* Start a conversation button */}
            <button
              onClick={handleStartConversation}
              className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white hover:bg-neutral-100 text-black text-xs sm:text-sm font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center gap-2 group/btn cursor-pointer"
            >
              <span>Start a conversation</span>
              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              />
            </button>

            {/* Translucent glass indicator: Available for collaborations */}
            <div className="px-4 py-2.5 sm:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs sm:text-sm font-medium flex items-center gap-2.5 select-none shadow-2xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  CONTACT_CONFIG.availability.isAvailable ? 'bg-neutral-200' : 'bg-neutral-400'
                }`}
              />
              <span>{CONTACT_CONFIG.availability.statusText}</span>
            </div>
          </div>
        </motion.div>

        {/* Right Card: Contact Form (Light container) */}
        <motion.div
          ref={formCardRef}
          variants={itemVariants}
          className={`lg:col-span-5 bg-[#f4f3f0] border rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-all duration-500 shadow-2xs ${
            isFormHighlighted
              ? 'border-neutral-900 ring-2 ring-neutral-900/10 bg-[#f8f7f4]'
              : 'border-neutral-200/90'
          }`}
        >
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-normal tracking-tight">
              Drop me a message.
            </h3>
            <p className="text-neutral-500 text-xs sm:text-sm mt-1 mb-6 font-normal">
              Tell me a little about your idea.
            </p>

            {/* Success State */}
            {submitStatus === 'success' && (
              <div className="p-6 rounded-2xl bg-white border border-neutral-200 text-center space-y-3 my-4">
                <div className="w-10 h-10 rounded-full bg-black text-white mx-auto flex items-center justify-center">
                  <Check size={18} />
                </div>
                <h4 role="status" className="text-sm font-semibold text-neutral-900">Message sent successfully!</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Thank you for reaching out. I'll get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="mt-2 text-xs font-semibold text-neutral-800 underline hover:text-black cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            )}

            {/* Fallback State (when no remote API configured) */}
            {submitStatus === 'fallback' && (
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200 space-y-3 my-4 text-left">
                <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs sm:text-sm">
                  <Mail size={16} />
                  <span role="status">Message ready to send</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Your inquiry has been formulated. Click below to deliver it directly to <strong className="font-semibold text-neutral-900">{email}</strong> via your email app.
                </p>
                <div className="pt-1 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleOpenMailto}
                    className="w-full py-3 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Open in Email App</span>
                    <ArrowUpRight size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSubmitStatus('idle'); setErrors({}); }}
                    className="w-full py-2 text-xs font-medium text-neutral-500 hover:text-neutral-800 cursor-pointer"
                  >
                    Edit message
                  </button>
                </div>
              </div>
            )}

            {/* Error Message banner */}
            {submitStatus === 'error' && errorMessage && (
              <div role="alert" className="p-3.5 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Active Form */}
            {submitStatus !== 'success' && submitStatus !== 'fallback' && (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <p role="alert" className="sr-only">{Object.values(errors).filter(Boolean).join('. ')}</p>
                {/* Field: Your name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Your name
                  </label>
                  <input
                    ref={nameInputRef}
                    id="contact-name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    type="text"
                    required
                    placeholder="How should I call you?"
                    value={formName}
                    onChange={(e) => {
                      setFormName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 text-xs sm:text-sm bg-[#edece8] border rounded-xl focus:bg-white focus:outline-none transition-all duration-200 placeholder:text-neutral-400 text-neutral-900 ${
                      errors.name
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-neutral-300/60 focus:border-neutral-900'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-[11px] text-red-600 font-medium" id="contact-name-error">{errors.name}</p>
                  )}
                </div>

                {/* Field: Email address */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formEmail}
                    onChange={(e) => {
                      setFormEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 text-xs sm:text-sm bg-[#edece8] border rounded-xl focus:bg-white focus:outline-none transition-all duration-200 placeholder:text-neutral-400 text-neutral-900 ${
                      errors.email
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-neutral-300/60 focus:border-neutral-900'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-red-600 font-medium" id="contact-email-error">{errors.email}</p>
                  )}
                </div>

                {/* Field: What's on your mind? */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-neutral-700 mb-1.5">
                    What's on your mind?
                  </label>
                  <textarea
                    id="contact-message"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    rows={4}
                    required
                    placeholder="Tell me about your project..."
                    value={formMsg}
                    onChange={(e) => {
                      setFormMsg(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 text-xs sm:text-sm bg-[#edece8] border rounded-xl focus:bg-white focus:outline-none transition-all duration-200 placeholder:text-neutral-400 text-neutral-900 resize-none min-h-[96px] ${
                      errors.message
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-neutral-300/60 focus:border-neutral-900'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11px] text-red-600 font-medium" id="contact-message-error">{errors.message}</p>
                  )}
                </div>

                {/* Submit button: Send message ↗ */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3.5 sm:py-4 rounded-xl bg-[#18181b] hover:bg-black text-white text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed group/submit"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send message</span>
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-200 group-hover/submit:translate-x-0.5 group-hover/submit:-translate-y-0.5"
                      />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* 3. Social Links Bar: FIND ME ONLINE */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-neutral-200/80"
      >
        {/* Left: Label & horizontal line */}
        <div className="flex items-center gap-4 flex-1">
          <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-neutral-500 uppercase whitespace-nowrap">
            FIND ME ONLINE
          </span>
          <div className="hidden sm:block flex-1 h-px bg-neutral-200" />
        </div>

        {/* Right: Three Minimalist Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* GitHub ↗ */}
          {CONTACT_CONFIG.socialLinks.github && (
            <a
              href={CONTACT_CONFIG.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-400 text-neutral-800 text-xs sm:text-sm font-medium flex items-center gap-2 transition-all duration-200 group shadow-2xs"
            >
              <Github size={15} className="text-neutral-700 group-hover:text-black transition-colors" />
              <span>GitHub</span>
              <ArrowUpRight size={13} className="text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}

          {/* Telegram ↗ */}
          {CONTACT_CONFIG.socialLinks.telegram && (
            <a
              href={CONTACT_CONFIG.socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-400 text-neutral-800 text-xs sm:text-sm font-medium flex items-center gap-2 transition-all duration-200 group shadow-2xs"
            >
              <TelegramIcon />
              <span>Telegram</span>
              <ArrowUpRight size={13} className="text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}

          {/* Email ↗ */}
          {email && (
            <a
              href={`mailto:${email}`}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-400 text-neutral-800 text-xs sm:text-sm font-medium flex items-center gap-2 transition-all duration-200 group shadow-2xs"
            >
              <Mail size={15} className="text-neutral-700 group-hover:text-black transition-colors" />
              <span>Email</span>
              <ArrowUpRight size={13} className="text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
};
