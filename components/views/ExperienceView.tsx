import type { ExperienceItem } from '@/types'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

interface Props {
  experience: ExperienceItem[]
}

const typeLabel: Record<string, string> = {
  education: 'edu',
  work: 'work',
  achievement: 'award',
  project: 'project',
}

export function ExperienceView({ experience }: Props) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-6">
        <span className="font-mono text-xs text-violet-500">&gt;</span>
        <span className="font-mono text-xs text-zinc-300">experience</span>
      </div>

      <div className="space-y-0">
        {experience.map((exp, i) => {
          const isLast = i === experience.length - 1
          return (
            <AnimatedSection key={`${exp.organization}-${exp.role}`} delay={i * 0.07} direction="left">
              <div className={`flex gap-6 ${isLast ? '' : 'mb-4'}`}>
                <div className="flex-shrink-0 flex flex-col items-center" style={{ width: '44px' }}>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase flex-shrink-0 pt-1"
                    style={{ letterSpacing: '0.08em' }}>
                    {typeLabel[exp.type] ?? exp.type}
                  </span>
                  {!isLast && (
                    <div className="flex-1 mt-2"
                      style={{ width: '1px', background: 'rgba(255,255,255,0.05)', minHeight: '32px' }} />
                  )}
                </div>

                <div
                  className="min-w-0 flex-1 rounded-lg p-4"
                  style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <div>
                      <span className="text-zinc-200 text-sm font-medium">{exp.role}</span>
                      <span className="text-zinc-500 text-sm"> · {exp.organization}</span>
                    </div>
                    <span className="font-mono text-xs text-zinc-500">{exp.duration}</span>
                  </div>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-3">{exp.description}</p>

                  {exp.highlights.length > 0 && (
                    <ul className="space-y-1">
                      {exp.highlights.map((h) => (
                        <li key={h} className="flex gap-2 text-xs text-zinc-400">
                          <span className="font-mono text-emerald-500/80 flex-shrink-0">+</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </AnimatedSection>
          )
        })}
      </div>
    </div>
  )
}
