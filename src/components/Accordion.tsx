import { clsx } from 'clsx'
import { useState } from 'react'

import { ChevronDownIcon } from './icons/ChevronDown'
import { ChevronUpIcon } from './icons/ChevronUp'

type AccordionProps = {
  heading: React.ReactNode
  content: React.ReactNode
}

export function Accordion({ heading, content }: AccordionProps) {
  const [open, setOpen] = useState(true)
  function toggleOpen() {
    setOpen((prev) => !prev)
  }
  const icon = open ? <ChevronUpIcon /> : <ChevronDownIcon />
  return (
    <div>
      <button
        type="button"
        className="flew-row flex w-full items-center justify-between active:bg-slate-200"
        onClick={toggleOpen}
      >
        {heading}
        <span className="material-symbols-outlined">{icon}</span>
      </button>
      <div className={clsx('overflow-hidden', open ? 'max-h-none' : 'max-h-0 ')}>{content}</div>
    </div>
  )
}
