import { format } from 'date-fns'
import Image from 'next/image'

import { ForecastData, WeatherData } from '../../types'
import { Loading } from '../atoms/Loading'

import { Section } from './Section'

type WeatherSectionProps = {
  content: ForecastData | null
}

type ForecastCardProps = {
  date: string
  data: WeatherData[]
}

const ForecastCard = ({ date, data }: ForecastCardProps) => {
  return (
    <div key={date} className="flex flex-col">
      <div className="">{date}</div>
      <div className="flex flex-nowrap gap-4 overflow-scroll ">
        {data.map((ele) => (
          <>
            <div
              key={ele.id}
              className="mb-2 box-content min-w-[200px] rounded-md bg-slate-700">
              <div className="flex items-center ">
                <p>{ele.main}</p>
                <Image
                  src={`http://openweathermap.org/img/w/${ele?.icon}.png`}
                  width={32}
                  height={32}
                  alt="weather icon"
                />
              </div>
              <p>{format(ele.time, 'hh:mm aaaa')}</p>
              <p className="italic">{ele?.description}</p>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

export const ForecastSection = ({ content }: WeatherSectionProps) => {
  return (
    <Section className="col-span-2">
      <>
        <div className="feed-card-header">Forecast</div>
        <div className="flex flex-col flex-nowrap gap-4 overflow-hidden">
          {content?.weatherList ? (
            <>
              {Object.entries(content.weatherList).map(([key, value]) => {
                return <ForecastCard key={key} date={key} data={value} />
              })}
            </>
          ) : (
            <Loading />
          )}
        </div>
      </>
    </Section>
  )
}
