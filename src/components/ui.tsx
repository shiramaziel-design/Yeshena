import type { ReactNode } from 'react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border p-5 ${className}`}
      style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
    >
      {children}
    </div>
  )
}

export function Pill({ children, tone = 'accent' }: { children: ReactNode; tone?: 'accent' | 'accent-2' | 'gold' }) {
  const bg = tone === 'accent' ? 'var(--accent-soft)' : tone === 'accent-2' ? 'var(--accent-2-soft)' : 'var(--accent-soft)'
  const fg = tone === 'accent' ? 'var(--accent)' : tone === 'accent-2' ? 'var(--accent-2)' : 'var(--gold)'
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ background: bg, color: fg }}
    >
      {children}
    </span>
  )
}

/** Keeps a numeric fraction like "3 / 20" in the correct visual order inside RTL text. */
export function Fraction({ value, total }: { value: number; total: number }) {
  return (
    <span dir="ltr" className="inline-block">
      {value} / {total}
    </span>
  )
}

export function ProgressBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)))
  return (
    <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-soft)' }}>
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${pct}%`, background: 'var(--accent)' }}
      />
    </div>
  )
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h1 className="font-serif-he text-3xl md:text-4xl font-bold" style={{ color: 'var(--text)' }}>
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-base" style={{ color: 'var(--text-soft)' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled,
  className = '',
}: {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}) {
  const styles =
    variant === 'primary'
      ? { background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' }
      : variant === 'secondary'
        ? { background: 'var(--accent-2-soft)', color: 'var(--accent-2)', borderColor: 'var(--accent-2-soft)' }
        : { background: 'transparent', color: 'var(--text)', borderColor: 'var(--border)' }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-opacity disabled:opacity-40 hover:opacity-85 ${className}`}
      style={styles}
    >
      {children}
    </button>
  )
}
