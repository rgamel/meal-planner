import clsx from 'clsx';

const variants = ['text', 'contained', 'outlined'] as const;

type Variant = (typeof variants)[number];

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant };

export function Button({ className, variant = 'text', ...rest }: Props) {
    const textStyles = 'border-none bg-none text-blue-700 shadow-none'; // text styles
    const containedStyles = 'bg-blue-700 text-white shadow hover:bg-blue-800 hover:shadow-md'; // contained styles
    const outlinedStyles = 'border-2 border-blue-700 bg-none text-blue-700 shadow-none'; // outlined styles

    return (
        <button
            className={clsx(
                'text-md relative mb-2 inline-flex cursor-pointer items-center justify-center rounded-md px-8 py-2 font-semibold uppercase leading-6 tracking-wide',
                'transition',
                'focus:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-300 focus-visible:ring-2',
                'disabled:cursor-not-allowed disabled:opacity-30',
                variant === 'text' && textStyles,
                variant === 'contained' && containedStyles,
                variant === 'outlined' && outlinedStyles,
                className,
            )}
            {...rest}
        />
    );
}

export function DeleteButton({ className, ...rest }: Props) {
    return (
        <Button
            className={clsx('text-center text-sm font-medium uppercase text-red-700 underline', className)}
            {...rest}
        />
    );
}

export function IconButton({ className, ...rest }: Props) {
    return <Button className={clsx('-mb-2 ml-0 mr-0 mt-0 px-0 py-0', className)} {...rest} />;
}
