import { examGuide } from '../data/examGuide'
import { PageHeader } from '../components/ui'
import GuideList from '../components/GuideList'

export default function ExamGuide() {
  return (
    <div>
      <PageHeader
        title="מבנה הבחינה"
        subtitle="הכירו את מבנה המבחן, סוגי השאלות וטיפים לניהול זמן"
      />
      <GuideList sections={examGuide} />
    </div>
  )
}
