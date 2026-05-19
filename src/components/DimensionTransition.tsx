import { motion } from 'framer-motion'

interface Props {
  onContinue: () => void
}

export default function DimensionTransition({ onContinue }: Props) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 relative overflow-hidden ai-grid-bg">
      {/* Background glow — blue theme for AI dimension */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(14, 165, 233, 0.18) 0%, rgba(56, 189, 248, 0.08) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className="fixed bottom-0 left-0 w-[500px] h-[300px] pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(ellipse, rgba(129,140,248,0.6) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Part indicator */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(56,189,248,0.3)' }} />
          <span
            className="text-xs font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
            style={{
              background: 'rgba(14,165,233,0.12)',
              border: '1px solid rgba(56,189,248,0.3)',
              color: '#38bdf8',
            }}
          >
            חלק ב׳ מתוך 2
          </span>
          <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(56,189,248,0.3)' }} />
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex justify-center mb-6"
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
            style={{
              background: 'linear-gradient(135deg, rgba(14,165,233,0.35), rgba(56,189,248,0.2))',
              border: '1px solid rgba(56,189,248,0.4)',
              boxShadow: '0 0 40px rgba(56,189,248,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            🤖
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="mb-4"
        >
          <p className="text-white/45 text-sm font-medium mb-2">עכשיו עוברים ל</p>
          <h2
            className="text-3xl sm:text-4xl font-black mb-1"
            style={{
              background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AI & Hybrid Work
          </h2>
          <p className="text-white/35 text-sm">שאלות 6–10</p>
        </motion.div>

        {/* Description card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
          className="glass-card rounded-2xl p-5 mb-8 text-right"
          style={{ borderColor: 'rgba(56,189,248,0.18)' }}
        >
          <p className="text-white/65 text-sm leading-relaxed">
            היכולת לשלב AI, דאטה וכלים טכנולוגיים בתוך שגרות העבודה, תהליכי קבלת החלטות ועבודת הצוות.
          </p>
        </motion.div>

        {/* Progress visual — part 1 done, part 2 active */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex gap-2 justify-center mb-8"
        >
          {[1, 2].map((part) => {
            const isDone = part === 1
            return (
              <div key={part} className="flex items-center gap-2">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{
                    background: isDone
                      ? 'rgba(232,121,249,0.12)'
                      : 'rgba(56,189,248,0.15)',
                    border: `1px solid ${isDone ? 'rgba(232,121,249,0.25)' : 'rgba(56,189,248,0.4)'}`,
                    color: isDone ? 'rgba(232,121,249,0.6)' : '#38bdf8',
                  }}
                >
                  {isDone && <span className="text-[10px]">✓</span>}
                  <span>{isDone ? 'Human Leadership' : 'AI & Hybrid Work'}</span>
                </div>
                {part === 1 && (
                  <div className="w-4 h-px" style={{ background: 'rgba(255,255,255,0.15)' }} />
                )}
              </div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
        >
          <button
            onClick={onContinue}
            className="btn-primary w-full sm:w-auto sm:px-14 text-white font-bold text-base"
            style={{
              background: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 50%, #818cf8 100%)',
              boxShadow: '0 4px 24px rgba(56,189,248,0.35)',
            }}
          >
            המשך לחלק ב׳ ←
          </button>
        </motion.div>
      </div>
    </div>
  )
}
