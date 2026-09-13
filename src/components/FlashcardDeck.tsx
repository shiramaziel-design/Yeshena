import { useMemo, useState } from 'react'
import type { Term } from '../types/content'
import { useProgress } from '../hooks/ProgressContext'
import { Button, Pill } from './ui'

export default function FlashcardDeck({ terms }: { terms: Term[] }) {
  const { state, markFlashcard } = useProgress()
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const deck = useMemo(() => terms, [terms])
  const current = deck[index]

  if (!deck.length) {
    return <p style={{ color: 'var(--text-soft)' }}>לא נמצאו מושגים בסינון הנוכחי.</p>
  }

  const next = () => {
    setFlipped(false)
    setIndex((i) => (i + 1) % deck.length)
  }

  const mark = (status: 'known' | 'unknown') => {
    markFlashcard(current.id, status)
    next()
  }

  const status = state.flashcards[current.id]

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-3 text-sm" style={{ color: 'var(--text-soft)' }}>
        <span>
          כרטיס {index + 1} מתוך {deck.length}
        </span>
        {status && <Pill tone={status === 'known' ? 'accent-2' : 'accent'}>{status === 'known' ? 'ידוע' : 'לחזור עליו'}</Pill>}
      </div>

      <div
        className="flip-card w-full max-w-md h-64 cursor-pointer select-none"
        onClick={() => setFlipped((f) => !f)}
      >
        <div className={`flip-inner relative w-full h-full ${flipped ? 'is-flipped' : ''}`}>
          <div
            className="flip-face absolute inset-0 rounded-2xl border flex flex-col items-center justify-center p-6 text-center"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
          >
            <span className="text-xs mb-3" style={{ color: 'var(--text-soft)' }}>
              {current.category}
            </span>
            <h3 className="font-serif-he text-2xl font-bold" style={{ color: 'var(--text)' }}>
              {current.term}
            </h3>
            <p className="mt-4 text-xs" style={{ color: 'var(--text-soft)' }}>
              לחצו לגילוי ההגדרה
            </p>
          </div>
          <div
            className="flip-face flip-face-back absolute inset-0 rounded-2xl border flex flex-col items-center justify-center p-6 text-center overflow-y-auto"
            style={{ background: 'var(--accent-soft)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
          >
            <p style={{ color: 'var(--text)' }}>{current.definition}</p>
            <p className="mt-3 text-sm italic" style={{ color: 'var(--text-soft)' }}>
              {current.example}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <Button variant="secondary" onClick={() => mark('known')}>
          ✓ ידעתי
        </Button>
        <Button variant="ghost" onClick={() => mark('unknown')}>
          ✗ לא ידעתי
        </Button>
        <Button onClick={next}>הבא ←</Button>
      </div>
    </div>
  )
}
