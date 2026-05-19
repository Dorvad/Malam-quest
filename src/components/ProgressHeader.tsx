import { motion } from 'framer-motion'
import { questions } from '../data/surveyContent'

interface Props {
  currentIndex: number
}

export default function ProgressHeader({ currentIndex }: Props) {
  const total = questions.length
  const progress = ((currentIndex) / total) * 100
  const current = currentIndex + 1

  return (
    <div className="w-full px-4 pt-4 pb-2 no-print">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-white/40 tracking-wide">
            שאלון הערכה עצמית
          </span>
          <span className="text-xs font-semibold text-white/60">
            <span className="neon-text-magenta">{current}</span>
            <span className="text-white/30 mx-1">/</span>
            <span>{total}</span>
          </span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: `${((currentIndex - 1) / total) * 100}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>
    </div>
  )
}
