import { Link } from 'react-router-dom'
import { useProgress } from '../hooks/ProgressContext'
import { Card, Pill, ProgressBar, Button, Fraction } from '../components/ui'

const links = [
  {
    to: '/glossary',
    title: 'מושגי יסוד',
    desc: 'מילון מונחים ספרותיים עם כרטיסיות זיכרון וחידון תרגול',
    tone: 'accent' as const,
  },
  {
    to: '/exam-guide',
    title: 'מבנה הבחינה',
    desc: 'איך בנוי המבחן, סוגי השאלות, וניהול זמן',
    tone: 'accent-2' as const,
  },
  {
    to: '/writing-guide',
    title: 'מדריך כתיבה',
    desc: 'איך בונים תשובה ספרותית: טענה, ציטוט, הסבר',
    tone: 'gold' as const,
  },
  {
    to: '/practice',
    title: 'בנק תרגול',
    desc: 'שאלות תרגול לפי מיומנות, עם מחוון לבדיקה עצמית',
    tone: 'accent' as const,
  },
]

export default function Home() {
  const { stats } = useProgress()
  const knownPct = stats.totalTerms ? stats.knownTerms / stats.totalTerms : 0
  const practicePct = stats.totalPractice ? stats.completedPractice / stats.totalPractice : 0

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="font-serif-he text-4xl md:text-5xl font-bold" style={{ color: 'var(--text)' }}>
          ברוכים הבאים ל<span style={{ color: 'var(--accent)' }}>יֶשֶׁנָה</span>
        </h1>
        <p className="mt-3 text-lg" style={{ color: 'var(--text-soft)' }}>
          מרחב תרגול והכנה עצמאי לבחינת הבגרות בספרות — מושגים, ניתוח, כתיבה ותרגול
        </p>
      </div>

      <Card className="mb-8">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>
          ההתקדמות שלי
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-1.5 text-sm">
              <span style={{ color: 'var(--text-soft)' }}>מושגים שהוכרו כ"ידוע"</span>
              <span style={{ color: 'var(--text)' }}>
                <Fraction value={stats.knownTerms} total={stats.totalTerms} />
              </span>
            </div>
            <ProgressBar value={knownPct} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5 text-sm">
              <span style={{ color: 'var(--text-soft)' }}>שאלות תרגול שהושלמו</span>
              <span style={{ color: 'var(--text)' }}>
                <Fraction value={stats.completedPractice} total={stats.totalPractice} />
              </span>
            </div>
            <ProgressBar value={practicePct} />
          </div>
        </div>
        {stats.bestQuizScore !== null && (
          <p className="mt-4 text-sm" style={{ color: 'var(--text-soft)' }}>
            הציון הטוב ביותר בחידון המושגים: <strong style={{ color: 'var(--accent)' }}>{Math.round(stats.bestQuizScore * 100)}%</strong>
            {' '}({stats.quizAttemptsCount} ניסיונות)
          </p>
        )}
        <div className="mt-4">
          <Link to="/settings">
            <Button variant="ghost">צפייה מפורטת בהתקדמות</Button>
          </Link>
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        {links.map((l) => (
          <Link key={l.to} to={l.to}>
            <Card className="h-full transition-transform hover:-translate-y-0.5 cursor-pointer">
              <div className="mb-3">
                <Pill tone={l.tone}>{l.title}</Pill>
              </div>
              <p style={{ color: 'var(--text-soft)' }}>{l.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
