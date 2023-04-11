import Link from 'next/link'

import { APODData } from '../../types'
import { ReadMore } from '../atoms/ReadMore'

import { Section } from './Section'

type APODSectionProps = {
  content: APODData
}

export const APODSection = ({ content }: APODSectionProps) => {
  return (
    <Section className="md:col-span-2 md:row-span-2">
      <>
        <div className="feed-card-header">{content.title}</div>
        <Link href={content.hdurl} target="_blank">
          <div className="relative mb-2 w-full">
            <img src={content.url} alt="astronomy picture of the day" />
          </div>
        </Link>
        <p className="text-center text-sm italic text-gray-600">
          &#169; {content.copyright}
        </p>
        <ReadMore>{content.explanation}</ReadMore>
      </>
    </Section>
  )
}
