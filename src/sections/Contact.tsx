import { useRef, useState, ChangeEvent, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useGSAP(
    () => {
      // Label line draw
      gsap.from('.contact-label-line', {
        scrollTrigger: { trigger: '.contact-label', start: 'top 85%' },
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.inOut',
      });

      // Heading + description
      gsap.from('.contact-heading', {
        scrollTrigger: { trigger: '.contact-content', start: 'top 82%' },
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power2.out',
      });

      // Form panel
      gsap.from('.contact-form-panel', {
        scrollTrigger: { trigger: '.contact-content', start: 'top 78%' },
        opacity: 0,
        y: 32,
        duration: 0.8,
        delay: 0.15,
        ease: 'power2.out',
      });

      // Info panel staggered items
      gsap.from('.contact-info-item', {
        scrollTrigger: { trigger: '.contact-info-panel', start: 'top 82%' },
        opacity: 0,
        x: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });
    },
    { scope: sectionRef },
  );

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        'service_4obi3og',
        'template_qral9n6',
        { name: form.name, email: form.email, message: form.message },
        { publicKey: 'pMwNacOp7BIOVNqSL' },
      );

      setSent(true);
    } catch (error) {
      console.error(error);
      showAlert({ text: 'Transmission failed. Please try again.', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} className="c-space my-20 sm:my-32" id="contact">
      {alert.show && <Alert {...alert} />}

      <div className="contact-label flex items-center gap-4 mb-16">
        <span className="text-white/75 text-[11px] tracking-[0.4em] uppercase font-normal">// Contact</span>
        <div className="contact-label-line flex-1 h-[1px] bg-gradient-to-r from-white/55 to-transparent origin-left" />
      </div>

      <div className="contact-content max-w-5xl mx-auto">
        <div className="contact-heading mb-8 sm:mb-12">
          <h3 className="text-white/95 text-2xl sm:text-3xl md:text-4xl font-light tracking-wide mb-4">Let&apos;s Connect</h3>
          <p className="text-white/65 text-base font-light leading-relaxed max-w-2xl">
            Whether you&apos;re looking to build a new product, improve your existing platform, or bring a unique
            project to life, I&apos;m here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* ── Left: Contact Form / Success State ── */}
          <div className="contact-form-panel lg:col-span-3 relative">
            <div className="absolute -top-3 -left-3 w-5 h-5 border-l border-t border-white/[0.14]" />
            <div className="absolute -top-3 -right-3 w-5 h-5 border-r border-t border-white/[0.14]" />
            <div className="absolute -bottom-3 -left-3 w-5 h-5 border-l border-b border-white/[0.14]" />
            <div className="absolute -bottom-3 -right-3 w-5 h-5 border-r border-b border-white/[0.14]" />
            <div className="absolute inset-0 bridge-grid opacity-[0.015] pointer-events-none" />

            {sent ? (
              /* ── Success State ── */
              <div className="relative z-10 border border-emerald-400/20 rounded-lg p-6 sm:p-10 bg-emerald-500/[0.04] flex flex-col items-center justify-center text-center min-h-[420px] gap-6 animate-slide-up">
                <div className="w-16 h-16 rounded-full border border-emerald-400/30 bg-emerald-500/10 flex items-center justify-center">
                  <svg className="w-7 h-7 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white/90 text-xl font-light tracking-wide mb-2">Message Transmitted</h4>
                  <p className="text-white/50 text-sm font-light leading-relaxed">
                    Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                  </p>
                </div>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                  className="px-6 py-2.5 border border-white/[0.12] rounded text-white/60 text-xs tracking-[0.2em] uppercase font-light hover:border-white/25 hover:text-white/85 transition-all duration-300">
                  Send Another
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="relative z-10 border border-white/[0.10] rounded-lg p-6 sm:p-10 space-y-6 bg-black-200/50">
                <p className="text-white/50 text-[9px] tracking-[0.4em] uppercase font-light mb-4">TRANSMISSION.FORM</p>

                <label className="block space-y-2">
                  <span className="text-white/65 text-xs tracking-[0.15em] uppercase font-light">Name</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border border-white/[0.14] px-4 py-3 text-white/85 text-sm font-light tracking-wide rounded focus:outline-none focus:border-white/25 transition-colors placeholder:text-white/30"
                    placeholder="Your name"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-white/65 text-xs tracking-[0.15em] uppercase font-light">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border border-white/[0.14] px-4 py-3 text-white/85 text-sm font-light tracking-wide rounded focus:outline-none focus:border-white/25 transition-colors placeholder:text-white/30"
                    placeholder="your@email.com"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-white/65 text-xs tracking-[0.15em] uppercase font-light">Message</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-transparent border border-white/[0.14] px-4 py-3 text-white/85 text-sm font-light tracking-wide rounded focus:outline-none focus:border-white/25 transition-colors resize-none placeholder:text-white/30"
                    placeholder="Share your thoughts or project details..."
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 border border-white/[0.12] py-3.5 text-white/70 text-xs tracking-[0.25em] uppercase font-light rounded hover:border-white/25 hover:text-white/95 transition-all duration-300 disabled:opacity-50">
                  {loading ? (
                    <>
                      <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Transmitting...
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 2L11 13" />
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── Right: Contact Info + Social Links ── */}
          <div className="contact-info-panel lg:col-span-2 flex flex-col gap-10">
            {/* Contact Information */}
            <div>
              <h4 className="contact-info-item text-white/90 text-sm tracking-[0.2em] uppercase font-light mb-6">Contact Information</h4>
              <div className="space-y-5">
                {/* Email */}
                <a
                  href="mailto:mthk97.dev@gmail.com"
                  className="contact-info-item flex items-center gap-4 group">
                  <div className="w-9 h-9 rounded-full border border-white/[0.12] flex items-center justify-center group-hover:border-white/25 transition-colors">
                    <svg className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 4L12 13L2 4" />
                    </svg>
                  </div>
                  <span className="text-white/60 text-sm font-light tracking-wide group-hover:text-white/85 transition-colors">
                    mthk97.dev@gmail.com
                  </span>
                </a>

                {/* Phone */}
                <a
                  href="tel:+66927033226"
                  className="contact-info-item flex items-center gap-4 group">
                  <div className="w-9 h-9 rounded-full border border-white/[0.12] flex items-center justify-center group-hover:border-white/25 transition-colors">
                    <svg className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.97C20.17 21.03 19.33 21 18.5 20.88C15.59 20.37 12.85 19.13 10.5 17.34C8.31 15.69 6.5 13.59 5.19 11.18C4.12 9.15 3.42 6.94 3.12 4.64C3.06 4.12 3.47 3.66 4 3.58L7.01 3.06C7.5 2.98 7.97 3.28 8.13 3.76L9.17 7.01C9.31 7.44 9.15 7.91 8.77 8.17L7.59 9.04C8.76 11.26 10.51 13.15 12.6 14.5L13.63 13.36C13.91 13.02 14.38 12.89 14.8 13.05L18.01 14.27C18.47 14.44 18.75 14.9 18.68 15.38L18.25 17.89" />
                    </svg>
                  </div>
                  <span className="text-white/60 text-sm font-light tracking-wide group-hover:text-white/85 transition-colors">
                    +66 927 033 226
                  </span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/myo-thiha-kyaw-ba036a187"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-item flex items-center gap-4 group">
                  <div className="w-9 h-9 rounded-full border border-white/[0.12] flex items-center justify-center group-hover:border-white/25 transition-colors">
                    <svg className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/60 text-sm font-light tracking-wide group-hover:text-white/85 transition-colors">
                      Myo Thiha Kyaw
                    </span>
                    <span className="text-white/45 text-xs tracking-wider font-light">
                      linkedin.com/in
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="contact-info-item flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full border border-white/[0.12] flex items-center justify-center">
                    <svg className="w-4 h-4 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <span className="text-white/60 text-sm font-light tracking-wide">
                    Bangkok, Thailand
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-gradient-to-r from-white/[0.10] via-white/[0.05] to-transparent" />

            {/* Social Links */}
            <div className="contact-info-item">
              <h4 className="text-white/90 text-sm tracking-[0.2em] uppercase font-light mb-6">Social Links</h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/myothiha97"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/[0.12] flex items-center justify-center hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300 group">
                  <img src="/assets/github.svg" alt="GitHub" className="w-4 h-4 opacity-50 group-hover:opacity-80 transition-opacity" />
                </a>
                <a
                  href="https://www.linkedin.com/in/myo-thiha-kyaw-ba036a187"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/[0.12] flex items-center justify-center hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300 group">
                  <svg className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
