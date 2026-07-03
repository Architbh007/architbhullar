import type { SkillGroup } from '@/types'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'

interface Props {
  skills: SkillGroup[]
}

export function SkillsView({ skills }: Props) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-8">
        <span className="font-mono text-xs text-violet-500">&gt;</span>
        <span className="font-mono text-xs text-zinc-600">skills</span>
      </div>

      <div className="grid gap-3">
        {skills.map((group, i) => {
          const hasAnyProficiency = group.skills.some((s) => s.proficiency)
          return (
            <AnimatedSection key={group.category} delay={i * 0.05}>
              <div
                className="rounded-lg p-4 sm:p-5 transition-colors duration-300"
                style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
              >
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-8">
                  <span
                    className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest flex-shrink-0 pt-0.5"
                    style={{ width: '140px' }}
                  >
                    {group.category}
                  </span>
                  <div className="min-w-0 flex-1">
                    {hasAnyProficiency ? (
                      <div className="space-y-4">
                        {group.skills.map((skill) => (
                          <div key={skill.name}>
                            <p className="text-zinc-200 text-sm font-medium mb-1">{skill.name}</p>
                            {skill.proficiency && (
                              <p className="text-zinc-500 text-xs leading-relaxed">{skill.proficiency}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {group.skills.map((s) => (
                          <Badge key={s.name} variant="default" size="sm">{s.name}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )
        })}
      </div>
    </div>
  )
}
