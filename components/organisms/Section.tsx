import { ReactNode } from 'react'

type SectionProps = {
  children: ReactNode
  className?: string
}

export const Section = (props: SectionProps) => {
  const { children, className, ...rest } = props
  return (
    <section
      className={`rounded-md border border-gray-200 px-12 py-8 shadow-sm ${className}`}
      {...rest}>
      {children}
    </section>
  )
}
