import { ReactNode } from 'react'
import '../styles/globals.css'

type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <h1>Nav</h1>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
