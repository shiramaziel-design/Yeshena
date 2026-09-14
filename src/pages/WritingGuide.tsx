import { writingGuide } from '../data/writingGuide'
import { PageHeader } from '../components/ui'
import GuideList from '../components/GuideList'

export default function WritingGuide() {
  return (
    <div>
      <PageHeader
        title="מדריך כתיבת תשובה ספרותית"
        subtitle="עקרונות לבניית תשובה משכנעת ומבוססת טקסט"
      />
      <GuideList sections={writingGuide} />
    </div>
  )
}
