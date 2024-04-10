import Fraction from 'fraction.js';
import { GroceryItem } from 'types';

export const compactGroceries = (groceries: GroceryItem[]) =>
    groceries.reduce((acc, val) => {
        const match = acc.find((g) => g.itemId === val.itemId && g.uomId === val.uomId && val.isAldi === g.isAldi);
        if (!match) return [...acc, val];

        acc.splice(acc.indexOf(match), 1);
        return [...acc, { ...match, quantity: new Fraction(val.quantity).add(match.quantity).toFraction(true) }];
    }, [] as GroceryItem[]);
