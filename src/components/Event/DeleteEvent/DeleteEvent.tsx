import { FC } from 'react'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'
import css from './DeleteEvent.module.css'
import { EventInput } from '@fullcalendar/core'
import { useNavigate } from 'react-router-dom'

interface DeleteEventProps {
  visible: boolean
  eventId: string
  onClose: () => void
}

const DeleteEvent: FC<DeleteEventProps> = ({ visible, onClose, eventId }) => {
  const navigate = useNavigate()
  const customStyles = {
    background: 'rgb(58 58 58)',
    padding: '20px',
    width: '50%',
    top: '-3rem',
    height: 'fit-content',
    maxWidth: '40rem',
  }

  const deleteEvent = () => {
    const events: EventInput[] = JSON.parse(
      localStorage.getItem('events') || '[]'
    )
    const newArray = events.filter((event) => event.id !== eventId)
    localStorage.setItem('events', JSON.stringify(newArray))
    navigate('/calendar')
  }

  return (
    <Rodal customStyles={customStyles} visible={visible} onClose={onClose}>
      <div className={css.container}>
        <div>
          <span className={css.label}>
            Are you sure you want to delete this Event?
          </span>
        </div>
        <div className={css.buttons}>
          <button
            className={css.formButton}
            onClick={() => {
              onClose()
            }}
          >
            cancel
          </button>
          <button
            className={css.formButton}
            style={{ background: 'red' }}
            onClick={() => {
              deleteEvent()
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </Rodal>
  )
}

export default DeleteEvent
