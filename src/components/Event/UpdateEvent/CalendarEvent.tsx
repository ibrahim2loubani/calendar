import { KeyboardEvent, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EventInput } from '@fullcalendar/core'
import css from './CalendarEvent.module.css'
import DeleteEvent from '../DeleteEvent/DeleteEvent'

const CalendarEvent = () => {
  const { eventId } = useParams()
  const [event, setEvent] = useState<EventInput | null>(null)
  const [title, setTitle] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<boolean>(false)
  const [modalOpened, setModalOpened] = useState<boolean>(false)

  const events: EventInput[] = useMemo(
    () => JSON.parse(localStorage.getItem('events') || '[]'),
    []
  )

  useEffect(() => {
    const filteredEvent = events.find((e) => e.id === eventId)
    if (!filteredEvent) {
      setEvent(null)
      console.log(
        '🚀 ~ file: CalendarEvent.tsx:18 ~ useEffect ~ filteredEvent:',
        filteredEvent
      )
      return
    }
    setEvent(filteredEvent)
  }, [eventId, events])

  const updateEventTitle = () => {
    if (title) {
      const storedEvents = JSON.parse(localStorage.getItem('events') || '[]')

      const updatedEvents = storedEvents.map((event: EventInput) => {
        if (event.id === eventId) {
          return {
            ...event,
            title: title,
          }
        } else {
          return event
        }
      })
      setTitle('')
      setSuccessMessage(true)
      localStorage.setItem('events', JSON.stringify(updatedEvents))
      setTimeout(() => {
        setSuccessMessage(false)
      }, 2000)
    }
  }

  const handleModalInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateEventTitle()
    }
  }

  return (
    <div className={css.container}>
      <div className={css.box}>
        <h1>Calendar Event</h1>
        {event ? (
          <div className={css.form}>
            <div className={css.wrapper}>
              <span className={css.label}>Event Title</span>
              <input
                type='text'
                autoFocus
                className={css.input}
                value={title}
                onKeyDown={handleModalInputKeyDown}
                onChange={(e) => setTitle(e.target.value)}
              />
              {successMessage && (
                <p className={css.success}>Event title updated successfully!</p>
              )}
            </div>
            <div className={css.buttons}>
              <button
                // disabled={title === ''}
                className={css.deleteButton}
                onClick={() => {
                  setModalOpened(true)
                }}
              >
                Delete
              </button>
              <button
                disabled={title === ''}
                className={css.eventButton}
                onClick={updateEventTitle}
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <div>nooo</div>
        )}
      </div>
      <DeleteEvent
        visible={modalOpened}
        eventId={eventId ?? ''}
        onClose={() => setModalOpened(false)}
      />
    </div>
  )
}

export default CalendarEvent
