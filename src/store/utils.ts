import { EventInput } from '@fullcalendar/core'
import moment from 'moment/moment'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
  },
  {
    id: createEventId(),
    title: 'Lunch Party',
    start: todayStr + 'T09:00:00',
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: moment(todayStr).add(1, 'days').format('YYYY-MM-DD') + 'T16:00:00',
  },
  {
    id: createEventId(),
    title: 'Head Meetup',
    start: moment(todayStr).add(2, 'days').format('YYYY-MM-DD') + 'T20:00:00',
  },
  {
    id: createEventId(),
    title: 'VC Meeting',
    start: moment(todayStr).add(3, 'days').format('YYYY-MM-DD') + 'T09:00:00',
  },
  {
    id: createEventId(),
    title: 'Payment Schedules',
    start: moment(todayStr).add(5, 'days').format('YYYY-MM-DD') + 'T13:00:00',
  },
  {
    id: createEventId(),
    title: 'VC Meeting',
    start: moment(todayStr).add(6, 'days').format('YYYY-MM-DD') + 'T13:00:00',
  },
]

export function createEventId() {
  return String(eventGuid++)
}
