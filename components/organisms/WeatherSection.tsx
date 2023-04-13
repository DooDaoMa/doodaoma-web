import { format } from 'date-fns'
import Image from 'next/image'
import { TbSunrise, TbSunset } from 'react-icons/tb'

import { WeatherData } from '../../types'
import { Loading } from '../atoms/Loading'

import { Section } from './Section'

type WeatherSectionProps = {
  content: WeatherData | null
}

export const WeatherSection = ({ content }: WeatherSectionProps) => {
  return (
    <Section>
      <>
        {content ? (
          <>
            <div className="feed-card-header">Weather Today</div>
            <div className="flex items-center">
              <p>{content?.main}</p>
              <Image
                src={`http://openweathermap.org/img/w/${content?.icon}.png`}
                width={32}
                height={32}
                alt="weather icon"
              />
            </div>
            <p className="italic">{content?.description}</p>
            <div className="flex flex-wrap gap-x-2 gap-y-2">
              <p className="flex items-center gap-x-2">
                <TbSunset className="h-6 w-6 text-red-400" />
                {format(content?.sunset, 'HH:mm aa')}
              </p>
              <p className="flex items-center gap-x-2">
                <TbSunrise className="h-6 w-6 text-red-400" />
                {format(content?.sunrise, 'HH:mm aa')}
              </p>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </>
    </Section>
  )
}
