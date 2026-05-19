import { useState, useEffect } from 'react'
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
    // ignore
  }
}

function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [results, setResults] = useState<SurveyResults | null>(null)

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

  if (screen === 'survey') {
    return (
      <QuestionCard
        currentIndex={currentIndex}
        answers={answers}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onBack={handleBack}
      />
    )
  }

  if (screen === 'results' && results) {
    return <ResultsScreen results={results} onReset={handleReset} />
  }

  return <IntroScreen onStart={handleStart} />
}
