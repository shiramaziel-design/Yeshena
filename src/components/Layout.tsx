import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'

const navItems = [
  { to: '/', label: 'בית' },
  { to: '/glossary', label: 'מושגי יסוד' },
  { to: '/exam-guide', label: 'מבנה הבחינה' },
  { to: '/writing-guide', label: 'מדריך כתיבה' },
  { to: '/practice', label: 'תרגול' },
  { to: '/settings', label: 'התקדמות' },
]

export default function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <header
        className="sticky top-0 z-20 border-b backdrop-blur"
        style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--bg) 88%, transparent)' }}
      >
        <div className="mx-auto max-w-5xl px-4 flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2 shrink-0">
            <span
              className="font-serif-he text-2xl font-bold"
              style={{ color: 'var(--accent)' }}
            >
              יֶשֶׁנָה
            </span>
            <span className="hidden sm:inline text-sm" style={{ color: 'var(--text-soft)' }}>
              הכנה לבגרות בספרות
            </span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive ? '' : 'hover:opacity-70'
                  }`
                }
                style={({ isActive }: { isActive: boolean }) => ({
                  color: isActive ? 'var(--accent)' : 'var(--text)',
                  background: isActive ? 'var(--accent-soft)' : 'transparent',
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            aria-label="פתיחת תפריט"
            className="md:hidden p-2 rounded-lg"
            style={{ color: 'var(--text)' }}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {open && (
          <nav className="md:hidden flex flex-col gap-1 px-4 pb-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium"
                style={({ isActive }: { isActive: boolean }) => ({
                  color: isActive ? 'var(--accent)' : 'var(--text)',
                  background: isActive ? 'var(--accent-soft)' : 'transparent',
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t py-6 text-center text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text-soft)' }}>
        ישנה · אפליקציית תרגול עצמאית להכנה לבגרות בספרות. יש להיצמד להנחיות המורה ולמבנה המבחן העדכני.
      </footer>
    </div>
  )
}
