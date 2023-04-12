import {
  addDays,
  format,
  formatDistanceToNow,
  parseJSON,
  startOfToday,
} from 'date-fns'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { loadTimeSlot } from '../../services/apis'
import { userSelector } from '../../store/features/user'
import { useAppSelector } from '../../store/hooks'
import { ITimeSlot } from '../../types'
import { Button } from '../atoms/Button'

import { Section } from './Section'

export const UpcomingSection = () => {
  const router = useRouter()
  const { currentUser } = useAppSelector(userSelector)
  const [upcoming, setUpcoming] = useState<ITimeSlot[]>([])

  useEffect(() => {
    if (currentUser?.username) {
      const loadUpcoming = async () => {
        const res = await loadTimeSlot({
          startTime: startOfToday(),
          endTime: addDays(startOfToday(), 7),
          username: currentUser?.username,
          status: 'reserved',
        })
        setUpcoming(res.data.data)
      }
      loadUpcoming()
    }
  }, [])
  return (
    <Section>
      <>
        <div className="feed-card-header">Upcoming Reservation</div>
        {upcoming.length > 0 ? (
          <>
            <p>
              next in {formatDistanceToNow(parseJSON(upcoming[0]?.startTime))}
            </p>
            <p>
              {format(parseJSON(upcoming[0]?.startTime), 'dd E HH:mm aa')} to{' '}
              <br />
              {format(
                parseJSON(upcoming[upcoming.length - 1]?.endTime),
                'dd E HH:mm aa',
              )}
            </p>
          </>
        ) : (
          <>
            <p className="my-4 text-center dark:text-slate-200">
              no upcoming reservation
            </p>
            <Button onClick={() => router.push('/reservation')}>reserve</Button>
          </>
        )}
      </>
    </Section>
  )
}
