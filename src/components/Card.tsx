import { clsx } from 'clsx'
import { PropsWithChildren } from 'react'

type Props = {
  className?: string
}

export function Card({ className, children }: Readonly<PropsWithChildren<Props>>) {
  return (
    <div className={clsx('m-2 flex flex-col bg-white border-gray-100 border-2 border-b-4', className)}>{children}</div>
  )
}
