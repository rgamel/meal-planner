import { usePlannedQuantity } from 'app/hooks';
import { useCallback, useState } from 'react';

const MULTIPLIERS = ['0.5', '1', '2'];

type QuantitySelectProps = {
    recipeWithQuantity: {
        id: string;
        quantity: string;
    };
};

export function QuantitySelect({ recipeWithQuantity: { id, quantity } }: QuantitySelectProps): JSX.Element {
    const [q, setQ] = useState(quantity);
    const updatePlannedQuantity = usePlannedQuantity();

    const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setQ(e.target.value);
        updatePlannedQuantity(id, e.target.value);
    }, []);

    return (
        <select value={q} onChange={handleChange}>
            {MULTIPLIERS.map((value) => (
                <option key={value} value={value} label={value} />
            ))}
        </select>
    );
}
