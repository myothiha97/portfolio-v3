import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories } from '../constants/index';
import SkillIcon from '../components/SkillIcon';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SkillTile = ({ name, icon }: { name: string; icon: string }) => (
  <div className="skill-tile group flex items-center gap-2 px-3 py-2 rounded-md bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 cursor-default">
    <SkillIcon iconKey={icon} size={14} />
    <span className="text-white/50 text-[10px] tracking-[0.1em] uppercase font-light group-hover:text-white/80 transition-colors duration-300">
      {name}
    </span>
  </div>
);

const totalSkills = skillCategories.reduce((acc, cat) => {
  if (cat.skills) return acc + cat.skills.length;
  if (cat.subGroups) return acc + cat.subGroups.reduce((a, g) => a + g.skills.length, 0);
  return acc;
}, 0);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    const labelLine = section.querySelector('.skills-label-line');
    if (labelLine) {
      gsap.from(labelLine, {
        scrollTrigger: { trigger: section, start: 'top 80%' },
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.inOut',
      });
    }

    const cards = section.querySelectorAll<HTMLElement>('.skill-card');
    cards.forEach((card, i) => {
      const fromLeft = i % 2 === 0;
      gsap.set(card, { opacity: 0, x: fromLeft ? -60 : 60 });
      gsap.to(card, {
        scrollTrigger: { trigger: card, start: 'top 92%' },
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    });
  });

  return (
    <section ref={sectionRef} className="c-space my-20 sm:my-32" id="skills">
      <div className="flex items-center gap-4 mb-12">
        <span className="text-white/60 text-[11px] tracking-[0.4em] uppercase font-light">// Tech Stack</span>
        <div className="skills-label-line flex-1 h-[1px] bg-gradient-to-r from-white/15 to-transparent origin-left" />
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between mb-10">
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-light">
          {totalSkills} Technologies
        </span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/70 animate-pulse" />
          <span className="text-white/25 text-[9px] tracking-[0.2em] uppercase font-light">Node.Status: Active</span>
        </div>
      </div>

      {/* 2x2 category grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((cat, catIdx) => (
          <div
            key={cat.category}
            className="skill-card border border-white/[0.08] rounded-lg overflow-hidden bg-black-200/30">
            {/* Category header bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <span className="text-white/20 text-[10px] tracking-wider font-mono">
                  {String(catIdx + 1).padStart(2, '0')}
                </span>
                <span className="text-white/50 text-[10px] tracking-[0.35em] uppercase font-light">
                  {cat.category}
                </span>
              </div>
              <span className="text-white/15 text-[9px] tracking-[0.2em] uppercase font-mono">[{cat.tag}]</span>
            </div>

            {/* Skills body */}
            <div className="p-4">
              {cat.subGroups ? (
                /* Sub-grouped layout (Frontend) */
                <div className="flex flex-col gap-4">
                  {cat.subGroups.map((group, groupIdx) => (
                    <div key={group.group}>
                      {/* Sub-group separator + label */}
                      {groupIdx > 0 && <div className="h-[1px] bg-white/[0.05] mb-4" />}
                      <p className="text-white/20 text-[9px] tracking-[0.35em] uppercase font-mono mb-2.5">
                        {group.group}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                          <SkillTile key={skill.name} name={skill.name} icon={skill.icon} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Flat layout (all other categories) */
                <div className="flex flex-wrap gap-2">
                  {cat.skills!.map((skill) => (
                    <SkillTile key={skill.name} name={skill.name} icon={skill.icon} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
