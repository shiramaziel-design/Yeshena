export type TermCategory =
  | 'שירה'
  | 'סיפורת'
  | 'רטוריקה ולשון'
  | 'פרשנות ומשמעות'

export interface Term {
  id: string
  term: string
  category: TermCategory
  definition: string
  example: string
}

export type PracticeSkill =
  | 'ניתוח שיר'
  | 'ניתוח סיפור'
  | 'השוואה בין יצירות'
  | 'מושגי יסוד בהקשר'
  | 'כתיבת מוקד/פתיח'

export interface PracticeChecklistItem {
  id: string
  text: string
}

export interface PracticePrompt {
  id: string
  skill: PracticeSkill
  difficulty: 'קל' | 'בינוני' | 'מאתגר'
  prompt: string
  guidance: string
  checklist: PracticeChecklistItem[]
}

export interface GuideSection {
  id: string
  title: string
  body: string[]
  tip?: string
}
