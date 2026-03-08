const Footer = () => {
  return (
    <footer className="c-space py-8 border-t border-white/[0.08]">
      <div className="flex justify-between items-center flex-wrap gap-5">
        <p className="text-white/40 text-xs tracking-[0.15em] uppercase font-light">
          &copy; 2026 Myo Thiha Kyaw
        </p>

        <div className="flex gap-4">
          <a
            href="https://github.com/myothiha97"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 border border-white/[0.10] rounded flex items-center justify-center hover:border-white/25 transition-colors">
            <img src="/assets/github.svg" alt="github" className="w-4 h-4 opacity-60" />
          </a>
          <a
            href="https://www.linkedin.com/in/myo-thiha-kyaw-ba036a187"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 border border-white/[0.10] rounded flex items-center justify-center hover:border-white/25 transition-colors">
            <img src="/assets/twitter.svg" alt="linkedin" className="w-4 h-4 opacity-60" />
          </a>
        </div>

        <p className="text-white/30 text-[10px] tracking-wider font-light">Built with React + TypeScript</p>
      </div>
    </footer>
  );
};

export default Footer;
