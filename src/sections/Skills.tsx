import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories } from '../constants/index';
import SkillIcon from '../components/SkillIcon';

gsap.registerPlugin(ScrollTrigger);

const SkillTile = ({ name, icon }: { name: string; icon: string }) => (
  <div className="skill-tile group flex items-center gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 rounded-md bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 cursor-default">
    <SkillIcon iconKey={icon} size={13} />
    <span className="text-white/70 text-[9px] sm:text-[10px] tracking-[0.1em] uppercase font-light group-hover:text-white/90 transition-colors duration-300">
      {name}
    </span>
  </div>
);

const totalSkills = skillCategories.reduce((acc: any, cat: any) => {
  if (cat?.skills) return acc + cat.skills.length;
  if (cat.subGroups) return acc + cat.subGroups.reduce((a, g) => a + g.skills.length, 0);
  return acc;
}, 0);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // ── 1. Section label line draw ──
      gsap.set('.skills-label-line', { scaleX: 0 });
      gsap.to('.skills-label-line', {
        scrollTrigger: { trigger: '.skills-label', start: 'top 95%' },
        scaleX: 1,
        duration: 1.4,
        ease: 'power3.inOut',
      });

      // ── 2. Status bar — split left/right slide ──
      gsap.set('.skills-status-left', { opacity: 0, x: -30 });
      gsap.to('.skills-status-left', {
        scrollTrigger: { trigger: '.skills-label', start: 'top 95%' },
        opacity: 1,
        x: 0,
        duration: 0.7,
        delay: 0.3,
        ease: 'power2.out',
      });

      gsap.set('.skills-status-right', { opacity: 0, x: 30 });
      gsap.to('.skills-status-right', {
        scrollTrigger: { trigger: '.skills-label', start: 'top 95%' },
        opacity: 1,
        x: 0,
        duration: 0.7,
        delay: 0.4,
        ease: 'power2.out',
      });

      // ── 3. Cards — staggered scale-up with glow flash ──
      gsap.utils.toArray<HTMLElement>('.skill-card').forEach((card, i) => {
        gsap.set(card, { opacity: 0, y: 50, scale: 0.95 });
        gsap.to(card, {
          scrollTrigger: { trigger: card, start: 'top 90%' },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: i * 0.12,
          ease: 'power3.out',
        });
      });

      // ── 4. Category headers — fade + clip reveal ──
      gsap.utils.toArray<HTMLElement>('.cat-header').forEach((el) => {
        gsap.set(el, { opacity: 0, clipPath: 'inset(0 100% 0 0)' });
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 90%' },
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.6,
          ease: 'power2.out',
        });
      });

      // ── 6. Sub-group labels — stagger with underline draw ──
      gsap.utils.toArray<HTMLElement>('.subgroup-label').forEach((el) => {
        gsap.set(el, { opacity: 0, x: -16 });
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 92%' },
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      gsap.utils.toArray<HTMLElement>('.subgroup-line').forEach((el) => {
        gsap.set(el, { scaleX: 0 });
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 92%' },
          scaleX: 1,
          duration: 0.6,
          delay: 0.15,
          ease: 'power2.inOut',
        });
      });

      // ── 7. Skill tiles — wave cascade within each card ──
      gsap.utils.toArray<HTMLElement>('.skill-card').forEach((card) => {
        const tiles = card.querySelectorAll<HTMLElement>('.skill-tile');
        tiles.forEach((tile, tIdx) => {
          gsap.set(tile, { opacity: 0, y: 14, scale: 0.92 });
          gsap.to(tile, {
            scrollTrigger: { trigger: card, start: 'top 95%' },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.35,
            delay: 0.3 + tIdx * 0.035,
            ease: 'power2.out',
          });
        });
      });

      // ── 8. Sub-group separators — draw in ──
      gsap.utils.toArray<HTMLElement>('.subgroup-divider').forEach((el) => {
        gsap.set(el, { scaleX: 0 });
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 92%' },
          scaleX: 1,
          duration: 0.5,
          ease: 'power2.inOut',
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="c-space my-20 sm:my-32" id="skills">
      <div className="skills-label flex items-center gap-4 mb-8 sm:mb-12">
        <span className="text-white/75 text-[11px] tracking-[0.4em] uppercase font-normal">// Tech Stack</span>
        <div className="skills-label-line flex-1 h-[1px] bg-gradient-to-r from-white/55 to-transparent origin-left" />
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between mb-6 sm:mb-10">
        <span className="skills-status-left text-white/60 text-xs tracking-[0.3em] uppercase font-medium">
          {totalSkills} Technologies
        </span>
        <div className="skills-status-right flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/70 animate-pulse" />
          <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase font-mono font-medium">
            Node.Status: Active
          </span>
        </div>
      </div>

      {/* 2x2 category grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {skillCategories.map((cat, catIdx) => (
          <div
            key={cat.category}
            className="skill-card relative border border-white/[0.10] rounded-lg overflow-hidden bg-black-200/30 transition-all duration-500">
            {/* Category header bar */}
            <div className="cat-header flex items-center justify-between px-5 py-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <span className="text-white/45 text-[10px] tracking-wider font-mono">
                  {String(catIdx + 1).padStart(2, '0')}
                </span>
                <span className="text-white/75 text-[10px] tracking-[0.35em] uppercase font-medium">
                  {cat.category}
                </span>
              </div>
              <span className="text-white/35 text-[9px] tracking-[0.2em] uppercase font-mono">[{cat.tag}]</span>
            </div>

            {/* Skills body */}
            <div className="p-3 sm:p-4">
              <div className="flex flex-col gap-3 sm:gap-4">
                {cat.subGroups!.map((group, groupIdx) => (
                  <div key={group.group}>
                    {groupIdx > 0 && (
                      <div className="subgroup-divider h-[1px] bg-white/[0.07] mb-3 sm:mb-4 origin-left" />
                    )}
                    <div className="flex items-center gap-3 mb-2">
                      <p className="subgroup-label text-white/45 text-[9px] tracking-[0.35em] uppercase font-mono">
                        {group.group}
                      </p>
                      <div className="subgroup-line flex-1 h-[1px] bg-gradient-to-r from-orange-400/30 to-transparent origin-left" />
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {group.skills.map((skill) => (
                        <SkillTile key={skill.name} name={skill.name} icon={skill.icon} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
