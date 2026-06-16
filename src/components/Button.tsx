import { clsx } from 'clsx'

const variants = ['text', 'contained', 'outlined'] as const
type Variant = (typeof variants)[number]

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export function Button({ className, variant = 'text', ...rest }: Props) {
  const textStyles = 'border-none bg-none text-blue-600 shadow-none' // text styles
  const containedStyles = 'bg-blue-600 text-white shadow-sm hover:bg-blue-800 hover:shadow-md' // contained styles
  const outlinedStyles = 'border-2 border-blue-600 bg-none text-blue-600 shadow-none' // outlined styles

  return (
    <button
      type="button"
      className={clsx({
        'mb-2 cursor-pointer px-8 py-2 uppercase': true,
        transition: true,
        'focus:scale-[0.98] focus:outline-hidden focus:ring-2 focus:ring-blue-300 focus-visible:ring-2': true,
        'disabled:cursor-not-allowed disabled:opacity-30': true,
        [textStyles]: variant === 'text',
        [containedStyles]: variant === 'contained',
        [outlinedStyles]: variant === 'outlined',
        [className ?? '']: className,
      })}
      {...rest}
    />
  )
}

export function DeleteButton({ className, ...rest }: Props) {
  return <Button className={clsx('text-red-200 bg-red-600', className)} {...rest} />
}

export function IconButton({ className, ...rest }: Props) {
  return <Button className={clsx('mb-0 ml-0 mr-0 mt-0 px-0 py-0', className)} {...rest} />
}
