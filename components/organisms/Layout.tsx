import { ReactNode } from 'react'

import { Navigation } from './Navigation'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  )
}
