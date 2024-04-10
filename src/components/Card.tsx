import clsx from 'clsx';

type Props = React.HTMLAttributes<any>;

export function Card({ className, ...rest }: Props) {
    return (
        <div
            className={clsx('m-6 flex flex-col rounded-xl border-2 border-gray-200 bg-white shadow-sm', className)}
            {...rest}
        />
    );
}
