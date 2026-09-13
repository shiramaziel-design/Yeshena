import { useState } from 'react'
import type { PracticePrompt } from '../types/content'
import { useProgress } from '../hooks/ProgressContext'
import { Button, Card, Fraction, Pill } from './ui'

const difficultyTone = {
  קל: 'accent-2' as const,
  בינוני: 'gold' as const,
  מאתגר: 'accent' as const,
}

export default function PracticeCard({ prompt }: { prompt: PracticePrompt }) {
  const { state, togglePracticeComplete } = useProgress()
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const isComplete = !!state.practiceCompleted[prompt.id]
  const checkedCount = Object.values(checked).filter(Boolean).length

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="accent-2">{prompt.skill}</Pill>
          <Pill tone={difficultyTone[prompt.difficulty]}>{prompt.difficulty}</Pill>
        </div>
        {isComplete && <Pill tone="accent-2">✓ הושלם</Pill>}
      </div>

      <p className="mt-3 font-medium" style={{ color: 'var(--text)' }}>
        {prompt.prompt}
      </p>

      <button
        onClick={() => setOpen((o) => !o)}
        className="mt-3 text-sm font-medium"
        style={{ color: 'var(--accent)' }}
      >
        {open ? 'הסתרת הכוונה ומחוון ▲' : 'הצגת הכוונה ומחוון בדיקה ▼'}
      </button>

      {open && (
        <div className="mt-4 flex flex-col gap-4 animate-card-in">
          <p className="text-sm rounded-xl px-4 py-3" style={{ background: 'var(--bg-soft)', color: 'var(--text-soft)' }}>
            {prompt.guidance}
          </p>

          <div>
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
              בדקו את עצמכם (<Fraction value={checkedCount} total={prompt.checklist.length} />):
            </p>
            <div className="flex flex-col gap-2">
              {prompt.checklist.map((item) => (
                <label key={item.id} className="flex items-start gap-2 text-sm cursor-pointer" style={{ color: 'var(--text-soft)' }}>
                  <input
                    type="checkbox"
                    checked={!!checked[item.id]}
                    onChange={(e) => setChecked((prev) => ({ ...prev, [item.id]: e.target.checked }))}
                    className="mt-0.5 accent-current"
                  />
                  {item.text}
                </label>
              ))}
            </div>
          </div>

          <div>
            <Button variant={isComplete ? 'ghost' : 'primary'} onClick={() => togglePracticeComplete(prompt.id)}>
              {isComplete ? 'הסרת סימון הושלם' : 'סימון כהושלם'}
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
