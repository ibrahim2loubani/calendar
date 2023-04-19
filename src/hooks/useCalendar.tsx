import { useState } from 'react'
import { INITIAL_EVENTS } from '../store/utils'
import { EventInput } from '@fullcalendar/core'

interface CalendarState {
  currentEvents: EventInput[]
}

const useCalendar = () => {
  const [state, setState] = useState<CalendarState>({
    currentEvents: localStorage.getItem('events')
      ? JSON.parse(localStorage.getItem('events') as string)
      : INITIAL_EVENTS,
  })

  const setCurrentEvents = (events: EventInput[]) => {
    const convertedEvents = events.map((event) => ({
      ...event,
      start: new Date(event.start as Date),
    }))
    setState({ currentEvents: convertedEvents })
    localStorage.setItem('events', JSON.stringify(convertedEvents))
  }

  return { ...state, setCurrentEvents }
}

export default useCalendar
