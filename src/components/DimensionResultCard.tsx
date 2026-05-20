import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { DimensionScore } from '../lib/scoring'
import { dimensions } from '../data/surveyContent'

interface Props {
  result: DimensionScore
  index: number
}

const levelIcons: Record<string, string> = {
  'בסיס בהתפתחות': '🌱',
  'ניהול מסתגל': '⚡',
  'מנהיגות אנושית מובילה': '🏆',
  'בתחילת האימוץ': '🌱',
  'שילוב מתפתח': '⚡',
  'מוביל/ת עבודה היברידית': '🏆',
}

export default function DimensionResultCard({ result, index }: Props) {
  const dim = dimensions.find((d) => d.id === result.dimension) ?? dimensions[0]
  const isHuman = result.dimension === 'human'
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.setProperty('--score-width', `${result.percentage}%`)
    }
  }, [result.percentage])

  const scoreBarColor = isHuman
    ? 'linear-gradient(90deg, #9333ea, #e879f9)'
    : 'linear-gradient(90deg, #0ea5e9, #38bdf8)'

  const accentClass = isHuman ? 'neon-text-magenta' : 'neon-text-blue'
  const borderColor = isHuman ? 'rgba(232, 121, 249, 0.25)' : 'rgba(56, 189, 248, 0.25)'
  const bgGlow = isHuman
    ? 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(147, 51, 234, 0.12) 0%, transparent 70%)'
    : 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(14, 165, 233, 0.12) 0%, transparent 70%)'

  const icon = levelIcons[result.range.level] ?? '✦'

  const descParagraphs = result.range.description
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
      className={`glass-card rounded-2xl overflow-hidden print-bg-${isHuman ? 'human' : 'ai'}`}
      style={{ borderColor }}
    >
      {/* Header glow overlay */}
      <div className="relative" style={{ background: bgGlow }}>
        <div className="p-5 sm:p-6">
          {/* Dimension name + score */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-xs text-white/40 font-medium mb-0.5 tracking-wide uppercase">
                ממד
              </p>
              <h3 className={`text-lg sm:text-xl font-bold ${accentClass}`}>{dim.name}</h3>
            </div>
            <div className="text-left flex-shrink-0">
              <p className="text-xs text-white/40 mb-0.5 text-right">ציון</p>
              <div className="flex items-baseline gap-1 justify-end">
                <span
                  className={`text-3xl font-black ${accentClass}`}
                  aria-label={`ציון ${result.score} מתוך 25`}
                >
                  {result.score}
                </span>
                <span className="text-white/30 text-sm">/25</span>
              </div>
            </div>
          </div>

          {/* Score bar */}
          <div className="mb-4">
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.07)' }}
              role="progressbar"
              aria-valuenow={result.score}
              aria-valuemin={5}
              aria-valuemax={25}
              aria-label={`ציון ${result.score} מתוך 25`}
            >
              <div
                ref={barRef}
                className="h-full rounded-full score-bar-animated"
                style={{
                  background: scoreBarColor,
                  boxShadow: isHuman
                    ? '0 0 12px rgba(232, 121, 249, 0.6)'
                    : '0 0 12px rgba(56, 189, 248, 0.6)',
                  width: `${result.percentage}%`,
                }}
              />
            </div>
            {/* Scale markers */}
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-white/25">5</span>
              <span className="text-[10px] text-white/25">15</span>
              <span className="text-[10px] text-white/25">25</span>
            </div>
          </div>

          {/* Level badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{
              background: isHuman
                ? 'rgba(147, 51, 234, 0.2)'
                : 'rgba(14, 165, 233, 0.2)',
              border: `1px solid ${borderColor}`,
            }}
          >
            <span className="text-sm">{icon}</span>
            <span className={`text-sm font-bold ${accentClass}`}>{result.range.level}</span>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-4"
            style={{ background: 'rgba(255,255,255,0.07)' }}
          />

          {/* Description */}
          <div className="space-y-2">
            {descParagraphs.map((para, i) => (
              <p key={i} className="text-white/70 text-sm leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
