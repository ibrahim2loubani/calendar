import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Calendar from './pages/Calendar/Calendar'
import CalendarEvent from './components/Event/UpdateEvent/CalendarEvent'

const App = () => {
  return (
    <div id='dashboard'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='calendar' element={<Calendar />} />
            <Route path='calendar/:eventId' element={<CalendarEvent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
