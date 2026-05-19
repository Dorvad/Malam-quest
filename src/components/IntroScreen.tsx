import { motion } from 'framer-motion'
import { intro, dimensions, ratingLabels } from '../data/surveyContent'

interface Props {
  onStart: () => void
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] },
  }),
}

export default function IntroScreen({ onStart }: Props) {
  const openingParagraphs = intro.opening.split('\n\n').map((p) => p.trim()).filter(Boolean)

  return (
    <div className="min-h-dvh ai-grid-bg relative">
      {/* Background ambient blobs */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(ellipse, rgba(147, 51, 234, 0.5) 0%, rgba(56, 189, 248, 0.2) 50%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[300px] opacity-10"
          style={{
            background:
              'radial-gradient(ellipse, rgba(232, 121, 249, 0.6) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Logo / brand chip */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex justify-center mb-6"
        >
          <div
            className="text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.15em',
            }}
          >
            יום מנהלים
          </div>
        </motion.div>

        {/* Main title */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 leading-tight">
            {intro.title}
          </h1>
          <h2
            className="text-xl sm:text-2xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #e879f9, #818cf8, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {intro.subtitle}
          </h2>
        </motion.div>

        {/* Opening text */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="glass-card rounded-2xl p-5 sm:p-6 mb-5"
        >
          {openingParagraphs.map((para, i) => (
            <p
              key={i}
              className={`text-white/75 text-sm sm:text-base leading-relaxed ${
                i < openingParagraphs.length - 1 ? 'mb-3' : 'mb-0'
              }`}
            >
              {para}
            </p>
          ))}
        </motion.div>

        {/* Dimension cards */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5"
        >
          {dimensions.map((dim) => {
            const isHuman = dim.id === 'human'
            return (
              <div
                key={dim.id}
                className="glass-card rounded-2xl p-4"
                style={{
                  borderColor: isHuman
                    ? 'rgba(232, 121, 249, 0.2)'
                    : 'rgba(56, 189, 248, 0.2)',
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: isHuman
                        ? 'linear-gradient(135deg, rgba(147,51,234,0.4), rgba(232,121,249,0.3))'
                        : 'linear-gradient(135deg, rgba(14,165,233,0.4), rgba(56,189,248,0.3))',
                      border: `1px solid ${isHuman ? 'rgba(232,121,249,0.3)' : 'rgba(56,189,248,0.3)'}`,
                    }}
                  >
                    <span className="text-base">{isHuman ? '👥' : '🤖'}</span>
                  </div>
                  <div>
                    <h3
                      className={`text-sm font-bold mb-1 ${
                        isHuman ? 'neon-text-magenta' : 'neon-text-blue'
                      }`}
                    >
                      {dim.name}
                    </h3>
                    <p className="text-white/55 text-xs leading-relaxed">{dim.subtitle}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-5"
        >
          <div
            className="rounded-xl px-4 py-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-xs text-white/35 leading-relaxed">
              <span className="font-semibold text-white/50">חשוב לדעת — </span>
              {intro.disclaimer}
            </p>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="glass-card rounded-2xl p-5 mb-6"
        >
          <h4 className="text-sm font-bold text-white/80 mb-3">הנחיות למענה</h4>
          <p className="text-white/60 text-xs mb-3">{intro.instructions}</p>
          <div className="space-y-1.5">
            {Object.entries(ratingLabels).map(([num, label]) => (
              <div key={num} className="flex items-center gap-2.5">
                <span
                  className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(147,51,234,0.35), rgba(232,121,249,0.25))',
                    border: '1px solid rgba(232,121,249,0.25)',
                    color: '#e879f9',
                  }}
                >
                  {num}
                </span>
                <span className="text-white/55 text-xs">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <button
            onClick={onStart}
            className="btn-primary w-full sm:w-auto sm:px-16 text-white font-bold text-base"
            aria-label="התחלת מילוי השאלון"
          >
            מתחילים
          </button>
          <p className="text-white/25 text-xs mt-3">10 שאלות · כ־3 דקות</p>
        </motion.div>
      </div>
    </div>
  )
}
