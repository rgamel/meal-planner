import React from 'react';
import partition from 'lodash/fp/partition';
import sortBy from 'lodash/fp/sortBy';
import { GroceryItem } from './RecipeForm';

function StoreList({ items }: { items: GroceryItem[] }) {
    return (
        <ul>
            {sortBy('item', items).map((i) => (
                <li key={`${i.uom}|${i.item}|${String(i.isAldi)}`}>
                    <em>{`${i.item}`}</em>
                    {`, ${i.quantity} ${i.uom}`}
                </li>
            ))}
        </ul>
    );
}

function GroceryList({ groceries }: { groceries: GroceryItem[] }) {
    const [aldi, schnucks] = partition('isAldi', groceries);
    return (
        <div>
            <h3>Aldi List</h3>
            <StoreList items={aldi} />
            <h3>Schnucks List</h3>
            <StoreList items={schnucks} />
        </div>
    );
}

export default GroceryList;
