import clsx from 'clsx';

type Props = React.HTMLAttributes<HTMLHeadingElement>;

export function DialogTitle({ className, ...rest }: Props) {
    return (
        <h2 className={clsx('text-xl font-medium tracking-wide text-gray-800', className)} {...rest}>
            {rest.children}
        </h2>
    );
}
