import { useState } from 'react'
import { useProgress } from '../hooks/ProgressContext'
import { terms } from '../data/terms'
import { PageHeader, Card, ProgressBar, Button, Pill, Fraction } from '../components/ui'

export default function Settings() {
  const { state, stats, resetProgress } = useProgress()
  const [confirming, setConfirming] = useState(false)

  const knownPct = stats.totalTerms ? stats.knownTerms / stats.totalTerms : 0
  const practicePct = stats.totalPractice ? stats.completedPractice / stats.totalPractice : 0
  const unknownTerms = terms.filter((t) => state.flashcards[t.id] === 'unknown')

  const handleReset = () => {
    if (!confirming) {
      setConfirming(true)
      return
    }
    resetProgress()
    setConfirming(false)
  }

  return (
    <div>
      <PageHeader title="ההתקדמות שלי" subtitle="מעקב אחרי מה שלמדתם ותרגלתם — הנתונים נשמרים במכשיר שלכם בלבד" />

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Card>
          <h2 className="font-semibold mb-3" style={{ color: 'var(--text)' }}>
            מושגי יסוד
          </h2>
          <div className="flex items-center justify-between mb-1.5 text-sm">
            <span style={{ color: 'var(--text-soft)' }}>מושגים ידועים</span>
            <span style={{ color: 'var(--text)' }}>
              <Fraction value={stats.knownTerms} total={stats.totalTerms} />
            </span>
          </div>
          <ProgressBar value={knownPct} />
        </Card>

        <Card>
          <h2 className="font-semibold mb-3" style={{ color: 'var(--text)' }}>
            תרגול
          </h2>
          <div className="flex items-center justify-between mb-1.5 text-sm">
            <span style={{ color: 'var(--text-soft)' }}>שאלות שהושלמו</span>
            <span style={{ color: 'var(--text)' }}>
              <Fraction value={stats.completedPractice} total={stats.totalPractice} />
            </span>
          </div>
          <ProgressBar value={practicePct} />
        </Card>
      </div>

      <Card className="mb-6">
        <h2 className="font-semibold mb-3" style={{ color: 'var(--text)' }}>
          חידון מושגים
        </h2>
        {state.quizAttempts.length === 0 ? (
          <p style={{ color: 'var(--text-soft)' }}>עדיין לא ביצעתם חידון מושגים.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {state.quizAttempts
              .slice()
              .reverse()
              .map((a, i) => (
                <Pill key={i} tone={a.score / a.total >= 0.7 ? 'accent-2' : 'accent'}>
                  <Fraction value={a.score} total={a.total} />
                </Pill>
              ))}
          </div>
        )}
      </Card>

      {unknownTerms.length > 0 && (
        <Card className="mb-6">
          <h2 className="font-semibold mb-3" style={{ color: 'var(--text)' }}>
            מושגים לחזרה ({unknownTerms.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            {unknownTerms.map((t) => (
              <Pill key={t.id} tone="accent">
                {t.term}
              </Pill>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <h2 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
          איפוס התקדמות
        </h2>
        <p className="text-sm mb-3" style={{ color: 'var(--text-soft)' }}>
          פעולה זו תמחק את כל נתוני ההתקדמות השמורים במכשיר זה (כרטיסיות, חידונים ותרגול שהושלם). לא ניתן לשחזר.
        </p>
        <div className="flex items-center gap-3">
          <Button variant={confirming ? 'primary' : 'ghost'} onClick={handleReset}>
            {confirming ? 'לאישור: איפוס סופי' : 'איפוס כל ההתקדמות'}
          </Button>
          {confirming && (
            <Button variant="ghost" onClick={() => setConfirming(false)}>
              ביטול
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
