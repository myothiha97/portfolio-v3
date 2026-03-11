import emailjs from '@emailjs/browser';
import { useRef, useState, ChangeEvent, FormEvent } from 'react';
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
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useGSAP(
    () => {
      gsap.from('.contact-label-line', {
        scrollTrigger: { trigger: '.contact-label', start: 'top 85%' },
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.inOut',
      });

      gsap.from('.contact-reveal', {
        scrollTrigger: { trigger: '.contact-content', start: 'top 80%' },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
      });
    },
    { scope: sectionRef },
  );

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Myo Thiha Kyaw',
          from_email: form.email,
          to_email: 'mthk97.dev@gmail.com',
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setLoading(false);
          showAlert({ text: 'Message transmitted successfully.', type: 'success' });
          setTimeout(() => {
            hideAlert();
            setForm({ name: '', email: '', message: '' });
          }, 3000);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          showAlert({ text: 'Transmission failed. Please try again.', type: 'danger' });
        },
      );
  };

  return (
    <section ref={sectionRef} className="c-space my-20 sm:my-32" id="contact">
      {alert.show && <Alert {...alert} />}

      <div className="contact-label flex items-center gap-4 mb-16">
        <span className="text-white/70 text-[11px] tracking-[0.4em] uppercase font-light">// Contact</span>
        <div className="contact-label-line flex-1 h-[1px] bg-gradient-to-r from-white/25 to-transparent origin-left" />
      </div>

      <div className="contact-content max-w-2xl mx-auto">
        <div className="contact-reveal mb-12">
          <h3 className="text-white/95 text-3xl sm:text-4xl font-light tracking-wide mb-4">Let&apos;s Connect</h3>
          <p className="text-white/65 text-base font-light leading-relaxed">
            Whether you&apos;re looking to build a new product, improve your existing platform, or bring a unique
            project to life — I&apos;m here to help.
          </p>
        </div>

        <div className="contact-reveal relative">
          <div className="absolute -top-3 -left-3 w-5 h-5 border-l border-t border-white/[0.14]" />
          <div className="absolute -top-3 -right-3 w-5 h-5 border-r border-t border-white/[0.14]" />
          <div className="absolute -bottom-3 -left-3 w-5 h-5 border-l border-b border-white/[0.14]" />
          <div className="absolute -bottom-3 -right-3 w-5 h-5 border-r border-b border-white/[0.14]" />

          <div className="absolute inset-0 bridge-grid opacity-[0.015] pointer-events-none" />

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative z-10 border border-white/[0.10] rounded-lg p-6 sm:p-10 space-y-6 bg-black-200/50">
            <p className="text-white/35 text-[9px] tracking-[0.4em] uppercase font-light mb-4">TRANSMISSION.FORM</p>

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
              className="w-full border border-white/[0.12] py-3 text-white/70 text-xs tracking-[0.25em] uppercase font-light rounded hover:border-white/25 hover:text-white/95 transition-all duration-300 disabled:opacity-30">
              {loading ? 'Transmitting...' : 'Transmit'}
            </button>
          </form>
        </div>

        <div className="contact-reveal mt-8 text-center">
          <p className="text-white/45 text-xs tracking-wider">
            or reach me directly at{' '}
            <a href="mailto:mthk97.dev@gmail.com" className="text-white/65 hover:text-white/85 transition-colors">
              mthk97.dev@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
