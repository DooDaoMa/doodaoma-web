import { ForecastData } from '../../types'
import { Loading } from '../atoms/Loading'
import { ForecastCard } from '../molecules/ForecastCard'

import { Section } from './Section'

type WeatherSectionProps = {
  content: ForecastData | null
}

export const ForecastSection = ({ content }: WeatherSectionProps) => {
  return (
    <Section className="col-span-2 lg:col-start-4 lg:row-span-3 lg:row-start-1">
      <>
        <div className="feed-card-header">Forecast</div>
        <div className="flex flex-col flex-nowrap gap-4 overflow-hidden">
          {content?.weatherList ? (
            <>
              {Object.entries(content.weatherList).map(([key, value]) => {
                return (
                  <div key={key}>
                    <div className="mb-2 font-semibold">{key}</div>
                    <div className="flex flex-nowrap gap-4 overflow-scroll ">
                      {value.map((ele) => (
                        <ForecastCard key={key} data={ele} />
                      ))}
                    </div>
                  </div>
                )
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
