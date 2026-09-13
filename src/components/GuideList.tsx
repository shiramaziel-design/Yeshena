import type { GuideSection } from '../types/content'
import { Card } from './ui'

export default function GuideList({ sections }: { sections: GuideSection[] }) {
  return (
    <div className="flex flex-col gap-5">
      {sections.map((s, i) => (
        <Card key={s.id}>
          <div className="flex items-start gap-3">
            <span
              className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full font-serif-he font-bold text-sm"
              style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
            >
              {i + 1}
            </span>
            <div>
              <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>
                {s.title}
              </h2>
              <div className="flex flex-col gap-2">
                {s.body.map((p, j) => (
                  <p key={j} style={{ color: 'var(--text-soft)' }}>
                    {p}
                  </p>
                ))}
              </div>
              {s.tip && (
                <div
                  className="mt-3 rounded-xl px-4 py-3 text-sm"
                  style={{ background: 'var(--accent-2-soft)', color: 'var(--accent-2)' }}
                >
                  💡 {s.tip}
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
