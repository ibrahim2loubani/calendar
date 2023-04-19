import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import './Calendar.css'
import useCalendar from '../../hooks/useCalendar'
import { createEventId } from '../../store/utils'
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventInput,
  EventChangeArg,
} from '@fullcalendar/core'
import { useNavigate } from 'react-router-dom'
import AddNewEvent from '../../components/Event/NewEvent/AddNewEvent'

const Calendar = () => {
  const { currentEvents, setCurrentEvents } = useCalendar()
  const navigate = useNavigate()
  const [modalOpened, setModalOpened] = useState<boolean>(false)
  const [newEventTitle, setNewEventTitle] = useState<string>('')
  const [eventInfo, setEventInfo] = useState<DateSelectArg>()

  const handleEvents = async (events: EventApi[]) => {
    const mappedEvents = events.map((event) => ({
      id: event.id,
      title: event.title,
      start: event.start!,
    }))
    await Promise.resolve(setCurrentEvents(mappedEvents))
  }

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setEventInfo(selectInfo)
    setModalOpened(true)
  }

  useEffect(() => {
    if (eventInfo && newEventTitle) {
      let calendarApi = eventInfo.view.calendar

      calendarApi.unselect()

      if (newEventTitle) {
        calendarApi.addEvent({
          id: createEventId(),
          title: newEventTitle,
          start: eventInfo.start,
          end: eventInfo.end,
          allDay: eventInfo.allDay,
        })
        setNewEventTitle('')
        setModalOpened(false)
      }
    }
  }, [newEventTitle])

  const handleEventClick = (clickInfo: EventClickArg) => {
    const eventId = clickInfo.event.id
    navigate(`/calendar/${eventId}`)
  }

  const handleEventChange = (changeInfo: EventChangeArg) => {
    const oldEvent = changeInfo.oldEvent
    const newEvent = changeInfo.event

    const updatedEvents: EventInput[] = currentEvents.map((event) => {
      if (event.id === oldEvent.id) {
        return {
          ...event,
          start: newEvent.start!,
          title: newEvent.title,
        }
      }
      return event
    })

    setCurrentEvents(updatedEvents)
  }

  const handleCardAdd = (title: string) => {
    setNewEventTitle(title)
  }

  return (
    <div className='calendar-container'>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          allDaySlot={false}
          initialView='timeGridWeek'
          slotDuration={'01:00:00'}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          nowIndicator={true}
          initialEvents={currentEvents}
          eventsSet={handleEvents}
          select={handleDateSelect}
          eventClick={handleEventClick}
        />
      </div>
      <AddNewEvent
        visible={modalOpened}
        handleCardAdd={handleCardAdd}
        onClose={() => setModalOpened(false)}
      />
    </div>
  )
}

export default Calendar
