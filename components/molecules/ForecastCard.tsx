import { format } from 'date-fns'
import Image from 'next/image'

import { WeatherData } from '../../types'

type ForecastCardProps = {
  data: WeatherData
}

export const ForecastCard = ({ data }: ForecastCardProps) => {
  return (
    <>
      <div
        key={data.id}
        className="mb-2 box-content min-w-[125px] rounded-md bg-slate-700 px-2 py-3">
        <div>
          <p className="text-center font-semibold">{data.main}&nbsp;</p>
          <p className="text-center font-light italic">{data?.description}</p>
        </div>
        <Image
          src={`http://openweathermap.org/img/w/${data.icon}.png`}
          width={64}
          height={64}
          alt="weather icon"
          className="mx-auto"
        />
        <p className="text-center">{format(data.time, 'hh:mm aaaa')}</p>
      </div>
    </>
  )
}
