import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import IntroScreen from './components/IntroScreen'
import QuestionCard from './components/QuestionCard'
import ResultsScreen from './components/ResultsScreen'
import { calculateResults, isComplete, type SurveyResults } from './lib/scoring'
import { STORAGE_KEY } from './data/surveyContent'

type Screen = 'intro' | 'survey' | 'results'

interface SavedState {
  screen: Screen
  currentIndex: number
  answers: Record<number, number>
}

function loadState(): SavedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as SavedState
  } catch {
    return null
  }
}

function saveState(state: SavedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Silently ignore storage errors
  }
}

function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Silently ignore storage errors
  }
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [results, setResults] = useState<SurveyResults | null>(null)

  // Restore saved state on mount
  useEffect(() => {
    const saved = loadState()
    if (saved) {
      setScreen(saved.screen)
      setCurrentIndex(saved.currentIndex)
      setAnswers(saved.answers)
      if (saved.screen === 'results' && isComplete(saved.answers)) {
        setResults(calculateResults(saved.answers))
      }
    }
  }, [])

  // Persist state on changes
  useEffect(() => {
    if (screen !== 'intro' || Object.keys(answers).length > 0) {
      saveState({ screen, currentIndex, answers })
    }
  }, [screen, currentIndex, answers])

  const handleStart = () => {
    setScreen('survey')
    setCurrentIndex(0)
  }

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentIndex < 9) {
      setCurrentIndex((i) => i + 1)
    } else {
      const computed = calculateResults(answers)
      setResults(computed)
      setScreen('results')
    }
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1)
    }
  }

  const handleReset = () => {
    clearState()
    setScreen('intro')
    setCurrentIndex(0)
    setAnswers({})
    setResults(null)
  }

  return (
    <AnimatePresence mode="wait">
      {screen === 'intro' && (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <IntroScreen onStart={handleStart} />
        </motion.div>
      )}

      {screen === 'survey' && (
        <motion.div
          key="survey"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <QuestionCard
            currentIndex={currentIndex}
            answers={answers}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onBack={handleBack}
          />
        </motion.div>
      )}

      {screen === 'results' && results && (
        <motion.div
          key="results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ResultsScreen results={results} onReset={handleReset} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
