import { useState } from 'react';
import { ArrowBack } from 'components/icons/ArrowBack';
import clsx from 'clsx';

type Props = { label: string; children: JSX.Element[] | JSX.Element };

export function AccordionSummary({ label, children }: Props) {
    const [show, setShow] = useState(false);

    return (
        <div>
            <span
                className="flex flex-row justify-between"
                role="button"
                onClick={() => {
                    setShow((prev) => !prev);
                }}
            >
                <h3>{label}</h3>
                <div
                    className={clsx({
                        '-rotate-90 opacity-50 transition-transform': true,
                        'rotate-90': show,
                    })}
                >
                    <ArrowBack />
                </div>
            </span>
            {show ? children : null}
        </div>
    );
}
