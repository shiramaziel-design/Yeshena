import { useState, type CSSProperties } from 'react'
import type { Term } from '../types/content'
import { useProgress } from '../hooks/ProgressContext'
import { Button, Card, Fraction, ProgressBar } from './ui'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface Question {
  term: Term
  options: Term[]
}

function buildQuestions(pool: Term[], count: number): Question[] {
  const chosen = shuffle(pool).slice(0, Math.min(count, pool.length))
  return chosen.map((term) => {
    const distractors = shuffle(pool.filter((t) => t.id !== term.id)).slice(0, 3)
    return { term, options: shuffle([term, ...distractors]) }
  })
}

export default function TermQuiz({ terms }: { terms: Term[] }) {
  const { recordQuizAttempt } = useProgress()
  const [questions, setQuestions] = useState<Question[]>(() => buildQuestions(terms, 10))
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const restart = () => {
    setQuestions(buildQuestions(terms, 10))
    setQIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  if (terms.length < 4) {
    return <p style={{ color: 'var(--text-soft)' }}>יש לבחור סינון עם לפחות 4 מושגים כדי להפעיל חידון.</p>
  }

  if (finished) {
    return (
      <Card className="text-center max-w-md mx-auto">
        <h3 className="font-serif-he text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
          סיימתם את החידון!
        </h3>
        <p className="text-3xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
          <Fraction value={score} total={questions.length} />
        </p>
        <Button onClick={restart}>חידון נוסף</Button>
      </Card>
    )
  }

  const q = questions[qIndex]

  const choose = (optionId: string) => {
    if (selected) return
    setSelected(optionId)
    if (optionId === q.term.id) setScore((s) => s + 1)
  }

  const next = () => {
    if (qIndex + 1 >= questions.length) {
      recordQuizAttempt(score, questions.length)
      setFinished(true)
      return
    }
    setQIndex((i) => i + 1)
    setSelected(null)
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-3 flex items-center justify-between text-sm" style={{ color: 'var(--text-soft)' }}>
        <span>
          שאלה {qIndex + 1} מתוך {questions.length}
        </span>
        <span>ניקוד: {score}</span>
      </div>
      <ProgressBar value={qIndex / questions.length} />

      <Card className="mt-4">
        <p className="text-sm mb-1" style={{ color: 'var(--text-soft)' }}>
          מה ההגדרה הנכונה של המושג:
        </p>
        <h3 className="font-serif-he text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
          {q.term.term}
        </h3>

        <div className="flex flex-col gap-2">
          {q.options.map((opt) => {
            const isCorrect = opt.id === q.term.id
            const isSelected = opt.id === selected
            let style: CSSProperties = { borderColor: 'var(--border)', background: 'var(--bg-soft)' }
            if (selected) {
              if (isCorrect) style = { borderColor: 'var(--accent-2)', background: 'var(--accent-2-soft)' }
              else if (isSelected) style = { borderColor: 'var(--accent)', background: 'var(--accent-soft)' }
            }
            return (
              <button
                key={opt.id}
                onClick={() => choose(opt.id)}
                disabled={!!selected}
                className="text-right rounded-xl border px-4 py-3 text-sm transition-colors disabled:cursor-default"
                style={style}
              >
                {opt.definition}
              </button>
            )
          })}
        </div>

        {selected && (
          <div className="mt-4 flex justify-end">
            <Button onClick={next}>{qIndex + 1 >= questions.length ? 'סיום' : 'שאלה הבאה'}</Button>
          </div>
        )}
      </Card>
    </div>
  )
}
