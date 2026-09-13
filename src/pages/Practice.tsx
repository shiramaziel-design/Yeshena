import { useMemo, useState } from 'react'
import { practiceBank } from '../data/practiceBank'
import type { PracticeSkill } from '../types/content'
import { PageHeader, Pill } from '../components/ui'
import PracticeCard from '../components/PracticeCard'

const skills: PracticeSkill[] = [
  'ניתוח שיר',
  'ניתוח סיפור',
  'השוואה בין יצירות',
  'מושגי יסוד בהקשר',
  'כתיבת מוקד/פתיח',
]

export default function Practice() {
  const [skill, setSkill] = useState<PracticeSkill | 'הכל'>('הכל')

  const filtered = useMemo(
    () => practiceBank.filter((p) => skill === 'הכל' || p.skill === skill),
    [skill],
  )

  return (
    <div>
      <PageHeader
        title="בנק תרגול"
        subtitle="שאלות תרגול לפי מיומנות, עם הכוונה ומחוון לבדיקה עצמית"
      />

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setSkill('הכל')} className="focus:outline-none">
          <Pill tone={skill === 'הכל' ? 'accent' : 'accent-2'}>הכל ({practiceBank.length})</Pill>
        </button>
        {skills.map((s) => (
          <button key={s} onClick={() => setSkill(s)} className="focus:outline-none">
            <Pill tone={skill === s ? 'accent' : 'accent-2'}>
              {s} ({practiceBank.filter((p) => p.skill === s).length})
            </Pill>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((p) => (
          <PracticeCard key={p.id} prompt={p} />
        ))}
      </div>
    </div>
  )
}
