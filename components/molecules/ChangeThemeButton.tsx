import { useTheme } from 'next-themes'
import { TbMoonStars, TbSun } from 'react-icons/tb'

export const ChangeThemeButton = () => {
  const { theme, setTheme } = useTheme()
  console.log(theme)
  const onChangeTheme = () => {
    theme == 'dark' ? setTheme('light') : setTheme('dark')
  }

  return theme === 'dark' ? (
    <TbMoonStars
      className="h-6 w-6 cursor-pointer text-slate-400"
      onClick={() => onChangeTheme()}
    />
  ) : (
    <TbSun
      className="h-6 w-6 cursor-pointer text-blue-600"
      onClick={() => onChangeTheme()}
    />
  )
}
