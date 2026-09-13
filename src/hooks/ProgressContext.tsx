import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { terms } from '../data/terms'
import { practiceBank } from '../data/practiceBank'

type FlashcardStatus = 'known' | 'unknown'

interface QuizAttempt {
  score: number
  total: number
  date: string
}

interface ProgressState {
  flashcards: Record<string, FlashcardStatus>
  quizAttempts: QuizAttempt[]
  practiceCompleted: Record<string, boolean>
}

const emptyState: ProgressState = {
  flashcards: {},
  quizAttempts: [],
  practiceCompleted: {},
}

interface ProgressContextValue {
  state: ProgressState
  markFlashcard: (termId: string, status: FlashcardStatus) => void
  recordQuizAttempt: (score: number, total: number) => void
  togglePracticeComplete: (promptId: string) => void
  resetProgress: () => void
  stats: {
    knownTerms: number
    totalTerms: number
    bestQuizScore: number | null
    quizAttemptsCount: number
    completedPractice: number
    totalPractice: number
  }
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<ProgressState>('yeshena-progress-v1', emptyState)

  const markFlashcard = (termId: string, status: FlashcardStatus) => {
    setState((prev) => ({
      ...prev,
      flashcards: { ...prev.flashcards, [termId]: status },
    }))
  }

  const recordQuizAttempt = (score: number, total: number) => {
    setState((prev) => ({
      ...prev,
      quizAttempts: [
        ...prev.quizAttempts,
        { score, total, date: new Date().toISOString() },
      ].slice(-20),
    }))
  }

  const togglePracticeComplete = (promptId: string) => {
    setState((prev) => ({
      ...prev,
      practiceCompleted: {
        ...prev.practiceCompleted,
        [promptId]: !prev.practiceCompleted[promptId],
      },
    }))
  }

  const resetProgress = () => setState(emptyState)

  const stats = useMemo(() => {
    const knownTerms = Object.values(state.flashcards).filter((s) => s === 'known').length
    const bestQuizScore = state.quizAttempts.length
      ? Math.max(...state.quizAttempts.map((a) => a.score / a.total))
      : null
    const completedPractice = Object.values(state.practiceCompleted).filter(Boolean).length
    return {
      knownTerms,
      totalTerms: terms.length,
      bestQuizScore,
      quizAttemptsCount: state.quizAttempts.length,
      completedPractice,
      totalPractice: practiceBank.length,
    }
  }, [state])

  const value: ProgressContextValue = {
    state,
    markFlashcard,
    recordQuizAttempt,
    togglePracticeComplete,
    resetProgress,
    stats,
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
