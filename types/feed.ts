export type MoonPhaseData = {
  imageUrl: string
}
export type WeatherData = {
  main: string
  description: string
  icon: string
  id: number
  sunset: Date
  sunrise: Date
}

export type APODData = {
  copyright: string
  date: string
  explanation: string
  hdurl: string
  media_type: string
  service_version: string
  title: string
  url: string
}
