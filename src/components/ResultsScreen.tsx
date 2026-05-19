import { motion } from 'framer-motion'
import type { SurveyResults } from '../lib/scoring'
import DimensionResultCard from './DimensionResultCard'
import PrintSummary from './PrintSummary'

interface Props {
  results: SurveyResults
  onReset: () => void
}

export default function ResultsScreen({ results, onReset }: Props) {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-dvh ai-grid-bg relative">
      {/* Background ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-15"
          style={{
            background:
              'radial-gradient(ellipse, rgba(147,51,234,0.5) 0%, rgba(56,189,248,0.3) 50%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 no-print"
        >
          <div className="flex justify-center mb-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(147,51,234,0.4), rgba(232,121,249,0.3))',
                border: '1px solid rgba(232,121,249,0.3)',
                boxShadow: '0 0 30px rgba(232,121,249,0.2)',
              }}
            >
              <span className="text-2xl">✦</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">פענוח התוצאות</h1>
          <p className="text-white/40 text-sm">{results.completedAt}</p>
        </motion.div>

        {/* Result cards */}
        <div
          className="space-y-4 mb-6"
          aria-live="polite"
          aria-label="תוצאות השאלון"
        >
          <DimensionResultCard result={results.human} index={0} />
          <DimensionResultCard result={results.ai} index={1} />
        </div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 no-print"
        >
          <button
            onClick={handlePrint}
            className="btn-primary flex-1 flex items-center justify-center gap-2 text-white"
            aria-label="שמירה כ-PDF או הדפסה"
          >
            <span>🖨️</span>
            <span>שמירה כ־PDF / הדפסה</span>
          </button>
          <button
            onClick={onReset}
            className="btn-secondary flex items-center justify-center gap-2"
            aria-label="מילוי מחדש של השאלון"
          >
            <span>↺</span>
            <span>מילוי מחדש</span>
          </button>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-white/20 text-xs mt-6 no-print"
        >
          יום מנהלים · ניהול בעידן ה־AI
        </motion.p>
      </div>

      {/* Print-only version */}
      <PrintSummary results={results} />
    </div>
  )
}
