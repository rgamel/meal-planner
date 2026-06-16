import { Input as HeadlessInput, Label } from '@headlessui/react'
import { clsx } from 'clsx'
import { ChangeEventHandler } from 'react'

type Props = {
  name: string
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  invalid?: boolean
  disabled?: boolean
  required?: boolean
  fullwidth?: boolean
  labelClassName?: string
  inputClassName?: string
}

export function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  invalid,
  disabled = false,
  required = false,
  fullwidth = false,
  labelClassName = '',
  inputClassName = '',
}: Readonly<Props>) {
  return (
    <div className={clsx('', fullwidth ? 'w-full' : '')}>
      <Label className={clsx('', labelClassName)}>{label}</Label>
      <HeadlessInput
        invalid={invalid}
        type="text"
        name={name}
        className={clsx('', fullwidth ? 'w-full' : '', inputClassName)}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}
