import { addDays, format, parseJSON, startOfToday } from 'date-fns'
import { useEffect, useState } from 'react'

import { loadTimeSlot } from '../../services/apis'
import { userSelector } from '../../store/features/user'
import { useAppSelector } from '../../store/hooks'
import { ITimeSlot } from '../../types'

import { Section } from './Section'

export const UpcomingSection = () => {
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
    <>
      {upcoming ? (
        <Section>
          <>
            <div>Upcoming</div>
            <p>
              Start: {format(parseJSON(upcoming[0]?.startTime), 'HH:mm aa')}
            </p>
            <p>
              End:{' '}
              {format(
                parseJSON(upcoming[upcoming.length - 1]?.endTime),
                'HH:mm aa',
              )}
            </p>
          </>
        </Section>
      ) : null}
    </>
  )
}
