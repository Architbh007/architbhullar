'use client'

import { motion } from 'framer-motion'
import type { SkillGroup } from '@/types'

interface Props {
  skills: SkillGroup[]
  scrollRef: React.RefObject<HTMLElement>
}

export function SkillsView({ skills, scrollRef }: Props) {
  const vp = { root: scrollRef, once: true, amount: 0.1 }

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-8">
        <span className="font-mono text-xs text-violet-500">&gt;</span>
        <span className="font-mono text-xs text-zinc-600">skills</span>
      </div>

      <div
        className="flex gap-8 pb-3 mb-1"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-widest flex-shrink-0" style={{ width: '140px' }}>
          Category
        </span>
        <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-widest">Skills</span>
      </div>

      <div>
        {skills.map((group) => {
          const hasAnyProficiency = group.skills.some((s) => s.proficiency)
          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex gap-8 py-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
            >
              <span className="text-zinc-400 text-xs font-mono flex-shrink-0 pt-0.5" style={{ width: '140px' }}>
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
                  <span className="text-zinc-300 text-sm">
                    {group.skills.map((s) => s.name).join(', ')}
                  </span>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
