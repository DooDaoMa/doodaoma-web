import Link from 'next/link'
import { useEffect } from 'react'

import { feedSelector, fetchDSOData } from '../../store/features/feed'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Loading } from '../atoms/Loading'

import { Section } from './Section'

export const TargetSection = () => {
  const dispatch = useAppDispatch()

  const { dsoList } = useAppSelector(feedSelector)

  useEffect(() => {
    dispatch(
      fetchDSOData({
        type: 'Neb',
      }),
    )
  }, [])

  return (
    <Section>
      <>
        <div className="feed-card-header">Target</div>
        {dsoList && dsoList?.length > 0 ? (
          <div>
            {dsoList.map((ele) => (
              <Link
                href={{
                  pathname: '/imaging',
                  query: { ra: ele.ra, dec: ele.dec, name: ele.cat1 + ele.id },
                }}
                key={ele.id}>
                <div>
                  {ele.cat1}
                  {ele.id}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </>
    </Section>
  )
}
