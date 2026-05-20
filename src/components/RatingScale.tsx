import { motion } from 'framer-motion'
import { ratingLabels } from '../data/surveyContent'

interface Props {
  value: number | undefined
  onChange: (value: number) => void
  questionId: number
  isHuman: boolean
}

export default function RatingScale({ value, onChange, questionId, isHuman }: Props) {
  const selectedBg = isHuman
    ? 'bg-gradient-to-l from-purple-600/40 to-pink-500/30 border border-pink-400/60 shadow-lg shadow-pink-500/20'
    : 'bg-gradient-to-l from-sky-600/40 to-cyan-500/30 border border-sky-400/60 shadow-lg shadow-sky-500/20'

  const selectedNumBg = isHuman
    ? 'linear-gradient(135deg, #9333ea, #e879f9)'
    : 'linear-gradient(135deg, #0ea5e9, #38bdf8)'

  const selectedNumShadow = isHuman
    ? '0 4px 12px rgba(232, 121, 249, 0.4)'
    : '0 4px 12px rgba(56, 189, 248, 0.4)'

  return (
    <div className="w-full" role="group" aria-label="סולם דירוג 1 עד 5">
      {/* Mobile: vertical stacked */}
      <div className="flex flex-col gap-2 sm:hidden">
        {[1, 2, 3, 4, 5].map((rating) => {
          const selected = value === rating
          return (
            <motion.button
              key={rating}
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(rating)}
              className={`rating-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-right ${
                selected ? selectedBg : 'glass-card text-white/60 hover:text-white hover:border-white/20'
              }`}
              aria-pressed={selected}
              aria-label={`${rating} — ${ratingLabels[rating]}`}
            >
              <span
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-base font-bold transition-all duration-200 text-white"
                style={{
                  background: selected ? selectedNumBg : 'rgba(255,255,255,0.06)',
                  boxShadow: selected ? selectedNumShadow : 'none',
                  color: selected ? 'white' : 'rgba(255,255,255,0.5)',
                }}
              >
                {rating}
              </span>
              <span className={selected ? 'text-white' : ''}>{ratingLabels[rating]}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Desktop: horizontal */}
      <div className="hidden sm:block">
        <div className="flex gap-2 justify-between">
          {[1, 2, 3, 4, 5].map((rating) => {
            const selected = value === rating
            return (
              <motion.button
                key={rating}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onChange(rating)}
                className={`rating-btn flex-1 flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                  selected
                    ? isHuman
                      ? 'bg-gradient-to-b from-purple-600/50 to-pink-500/40 border border-pink-400/60 text-white shadow-lg shadow-pink-500/20'
                      : 'bg-gradient-to-b from-sky-600/50 to-cyan-500/40 border border-sky-400/60 text-white shadow-lg shadow-sky-500/20'
                    : 'glass-card text-white/55 hover:text-white hover:border-white/20'
                }`}
                aria-pressed={selected}
                aria-label={`${rating} — ${ratingLabels[rating]}`}
              >
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold transition-all duration-200"
                  style={{
                    background: selected ? selectedNumBg : 'rgba(255,255,255,0.06)',
                    boxShadow: selected ? selectedNumShadow : 'none',
                    color: selected ? 'white' : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {rating}
                </span>
                <span className="text-center leading-tight text-[11px]">{ratingLabels[rating]}</span>
              </motion.button>
            )
          })}
        </div>
        <div className="flex justify-between mt-1.5 px-1">
          <span className="text-[10px] text-white/25">כלל לא</span>
          <span className="text-[10px] text-white/25">במידה רבה מאוד</span>
        </div>
      </div>

      <div className="sr-only" aria-live="polite">
        {value ? `נבחר: ${value} — ${ratingLabels[value]} לשאלה ${questionId}` : ''}
      </div>
    </div>
  )
}
