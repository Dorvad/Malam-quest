import { motion } from 'framer-motion'
import { questions } from '../data/surveyContent'

interface Props {
  currentIndex: number
}

export default function ProgressHeader({ currentIndex }: Props) {
  const total = questions.length
  const progressPct = ((currentIndex + 1) / total) * 100

  return (
    <div className="w-full px-4 pt-4 pb-2 no-print">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-white/40 tracking-wide">
            שאלון הערכה עצמית
          </span>
          <span className="text-xs font-semibold text-white/60">
            <span className="neon-text-magenta">{currentIndex + 1}</span>
            <span className="text-white/30 mx-1">/</span>
            <span>{total}</span>
          </span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>
    </div>
  )
}
