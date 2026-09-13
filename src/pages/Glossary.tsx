import { useMemo, useState } from 'react'
import { terms } from '../data/terms'
import type { TermCategory } from '../types/content'
import { PageHeader, Card, Pill, Button } from '../components/ui'
import FlashcardDeck from '../components/FlashcardDeck'
import TermQuiz from '../components/TermQuiz'
import { useProgress } from '../hooks/ProgressContext'

const categories: TermCategory[] = ['שירה', 'סיפורת', 'רטוריקה ולשון', 'פרשנות ומשמעות']

type Mode = 'list' | 'flashcards' | 'quiz'

export default function Glossary() {
  const [mode, setMode] = useState<Mode>('list')
  const [category, setCategory] = useState<TermCategory | 'הכל'>('הכל')
  const [search, setSearch] = useState('')
  const { state } = useProgress()

  const filtered = useMemo(() => {
    return terms.filter((t) => {
      const matchesCategory = category === 'הכל' || t.category === category
      const matchesSearch =
        !search.trim() ||
        t.term.includes(search.trim()) ||
        t.definition.includes(search.trim())
      return matchesCategory && matchesSearch
    })
  }, [category, search])

  return (
    <div>
      <PageHeader
        title="מושגי יסוד בספרות"
        subtitle="מילון מונחים לצד תרגול כרטיסיות זיכרון וחידון — כדי לשנן ולבדוק את עצמכם"
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {(['list', 'flashcards', 'quiz'] as Mode[]).map((m) => (
          <Button key={m} variant={mode === m ? 'primary' : 'ghost'} onClick={() => setMode(m)}>
            {m === 'list' ? 'רשימת מושגים' : m === 'flashcards' ? 'כרטיסיות זיכרון' : 'חידון'}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          onClick={() => setCategory('הכל')}
          className="focus:outline-none"
        >
          <Pill tone={category === 'הכל' ? 'accent' : 'accent-2'}>הכל ({terms.length})</Pill>
        </button>
        {categories.map((c) => (
          <button key={c} onClick={() => setCategory(c)} className="focus:outline-none">
            <Pill tone={category === c ? 'accent' : 'accent-2'}>
              {c} ({terms.filter((t) => t.category === c).length})
            </Pill>
          </button>
        ))}

        {mode === 'list' && (
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="חיפוש מושג..."
            className="mr-auto rounded-full border px-4 py-1.5 text-sm outline-none"
            style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
          />
        )}
      </div>

      {mode === 'list' && (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((t) => {
            const status = state.flashcards[t.id]
            return (
              <Card key={t.id}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-serif-he text-xl font-bold" style={{ color: 'var(--text)' }}>
                    {t.term}
                  </h3>
                  <Pill tone={status === 'known' ? 'accent-2' : 'accent'}>{t.category}</Pill>
                </div>
                <p style={{ color: 'var(--text)' }}>{t.definition}</p>
                <p className="mt-2 text-sm italic" style={{ color: 'var(--text-soft)' }}>
                  {t.example}
                </p>
              </Card>
            )
          })}
          {filtered.length === 0 && (
            <p style={{ color: 'var(--text-soft)' }}>לא נמצאו מושגים התואמים את החיפוש.</p>
          )}
        </div>
      )}

      {mode === 'flashcards' && <FlashcardDeck terms={filtered} />}
      {mode === 'quiz' && <TermQuiz terms={filtered} />}
    </div>
  )
}
