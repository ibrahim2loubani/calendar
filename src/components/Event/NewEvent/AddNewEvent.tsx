import React, { FC, KeyboardEvent, useRef } from 'react'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'
import css from './AddNewEvent.module.css'

interface AddNewEventProps {
  visible: boolean
  onClose: () => void
  handleCardAdd: (title: string) => void
}

const AddNewEvent: FC<AddNewEventProps> = ({
  visible,
  onClose,
  handleCardAdd,
}) => {
  const [title, setTitle] = React.useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const customStyles = {
    background: 'rgb(58 58 58)',
    padding: '20px',
    width: '50%',
    top: '-3rem',
    height: 'fit-content',
    maxWidth: '40rem',
  }

  const handleModalInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCardAdd(title)
      setTitle('')
    }
  }

  return (
    <Rodal
      customStyles={customStyles}
      visible={visible}
      onClose={onClose}
      onAnimationEnd={() => {
        setTimeout(() => {
          if (visible && inputRef.current) {
            inputRef.current.focus()
          }
        }, 100)
      }}
    >
      <div className={css.container}>
        <div>
          <span className={css.label}>New Event Title</span>
          <input
            type='text'
            ref={inputRef}
            className={css.input}
            value={title}
            onKeyDown={handleModalInputKeyDown}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button
          disabled={title === ''}
          className={css.saveButton}
          onClick={() => {
            handleCardAdd(title)
            setTitle('')
          }}
        >
          Add
        </button>
      </div>
    </Rodal>
  )
}

export default AddNewEvent
