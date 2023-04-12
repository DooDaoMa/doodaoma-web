import Image from 'next/image'

import { MoonPhaseData } from '../../types'
import { Loading } from '../atoms/Loading'

import { Section } from './Section'

type MoonPhaseSectionProps = {
  content: MoonPhaseData
}

export const MoonPhaseSection = ({ content }: MoonPhaseSectionProps) => {
  return (
    <Section className="h-fit">
      <>
        <div className="feed-card-header">Moon Phase</div>
        {content.imageUrl ? (
          <Image
            src={content.imageUrl}
            width={200}
            height={260}
            alt="moon phase today"
            className="mx-auto"
          />
        ) : (
          <Loading />
        )}
      </>
    </Section>
  )
}
