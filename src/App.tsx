import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Glossary from './pages/Glossary'
import ExamGuide from './pages/ExamGuide'
import WritingGuide from './pages/WritingGuide'
import Practice from './pages/Practice'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="glossary" element={<Glossary />} />
        <Route path="exam-guide" element={<ExamGuide />} />
        <Route path="writing-guide" element={<WritingGuide />} />
        <Route path="practice" element={<Practice />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
