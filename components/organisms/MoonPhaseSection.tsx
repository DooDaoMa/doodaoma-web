import Image from 'next/image'
import { useEffect, useState } from 'react'

import { loadMoonPhase } from '../../services/apis'

import { Section } from './Section'

export const MoonPhaseSection = () => {
  const [imgUrl, setImgUrl] = useState()

  useEffect(() => {
    const load = async () => {
      const res = await loadMoonPhase()
      setImgUrl(res.data.data.imageUrl)
    }
    load()
  }, [])

  return (
    <Section className="">
      <>
        <div>Moon Phase</div>
        {imgUrl ? (
          <Image
            src={imgUrl}
            width={200}
            height={260}
            alt="moon phase today"
            className="mx-auto"
          />
        ) : (
          <div>loading </div>
        )}
      </>
    </Section>
  )
}
