import { format } from 'date-fns'
import { TbSunrise, TbSunset } from 'react-icons/tb'

import { ForecastData } from '../../types'
import { Loading } from '../atoms/Loading'

import { Section } from './Section'

type WeatherSectionProps = {
  content: ForecastData | null
}

export const WeatherSection = ({ content }: WeatherSectionProps) => {
  return (
    <Section>
      <>
        {content ? (
          <>
            <div className="feed-card-header">Weather Today</div>
            {/* {content?.weatherList.map((ele, i) => (
              <div key={i} className="mb-2 rounded-md bg-slate-700">
                <div className="flex items-center">
                  <p>{ele.main}</p>
                  <p>{format(ele.time, 'dd E hh:mm aaaa')}</p>
                  <Image
                    src={`http://openweathermap.org/img/w/${ele?.icon}.png`}
                    width={32}
                    height={32}
                    alt="weather icon"
                  />
                </div>
                <p className="italic">{ele?.description}</p>
              </div>
            ))} */}
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
