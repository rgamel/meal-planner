import { Plan } from 'types';

export function planNameComparator(a: Plan, b: Plan) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA > nameB) {
        return 1;
    }
    if (nameA < nameB) {
        return -1;
    }
    return 0;
}
