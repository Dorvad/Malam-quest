import { AnimatePresence, motion } from 'framer-motion'
import { questions, dimensions } from '../data/surveyContent'
import RatingScale from './RatingScale'
import ProgressHeader from './ProgressHeader'

interface Props {
  currentIndex: number
  direction: number
  answers: Record<number, number>
  onAnswer: (questionId: number, value: number) => void
  onNext: () => void
  onBack: () => void
}

const cardVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
}

export default function QuestionCard({ currentIndex, direction, answers, onAnswer, onNext, onBack }: Props) {
  const question = questions[currentIndex]
  const dim = dimensions.find((d) => d.id === question.dimension) ?? dimensions[0]
  const currentAnswer = answers[question.id]
  const isFirst = currentIndex === 0
  const isLast = currentIndex === questions.length - 1
  const isHuman = question.dimension === 'human'
  const questionNumberInDim = isHuman ? question.id : question.id - 5

  return (
    <div className="min-h-dvh flex flex-col ai-grid-bg">
      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: isHuman
            ? 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(147, 51, 234, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(14, 165, 233, 0.15) 0%, transparent 70%)',
          transition: 'background 0.6s ease',
        }}
      />

      <ProgressHeader currentIndex={currentIndex} />

      {/* Dimension badge */}
      <div className="px-4 pt-3 pb-1 no-print">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-500 ${
                isHuman
                  ? 'border-pink-500/40 bg-pink-500/10 text-pink-300'
                  : 'border-sky-500/40 bg-sky-500/10 text-sky-300'
              }`}
            >
              {dim.name}
            </span>
            <span className="text-xs text-white/35">
              שאלה {questionNumberInDim} מתוך 5
            </span>
          </div>
        </div>
      </div>

      {/* Question card */}
      <div className="flex-1 flex items-start px-4 py-3">
        <div className="w-full max-w-2xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={question.id}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="glass-card rounded-2xl p-5 sm:p-7"
            >
              <div className="mb-6">
                <p className="text-white text-base sm:text-lg font-medium leading-relaxed">
                  {question.text}
                </p>
              </div>
              <RatingScale
                value={currentAnswer}
                onChange={(val) => onAnswer(question.id, val)}
                questionId={question.id}
                isHuman={isHuman}
              />
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex gap-3 mt-4 no-print">
            {!isFirst && (
              <button onClick={onBack} className="btn-secondary">
                חזרה
              </button>
            )}
            <button
              onClick={onNext}
              disabled={currentAnswer === undefined}
              className={`btn-primary flex-1 text-white ${
                currentAnswer === undefined ? 'opacity-40 cursor-not-allowed' : ''
              }`}
              style={currentAnswer === undefined ? { boxShadow: 'none', transform: 'none' } : {}}
            >
              {isLast ? 'לתוצאות ←' : 'הבא ←'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
