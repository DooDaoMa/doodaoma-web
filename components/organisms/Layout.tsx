import { ReactNode } from 'react'

import { Navigation } from './Navigation'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navigation />
      <main className="min-h-full sm:p-4 md:p-12">{children}</main>
    </>
  )
}
