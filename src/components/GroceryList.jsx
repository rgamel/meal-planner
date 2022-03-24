import React from 'react';

const StoreList = ({ items }) => (
    <ul>
        {items.sort((a, b) => a.item > b.item).map((i) => <li key={`${i.uom}|${i.item}|${i.isAldi}`}>{`${i.quantity} ${i.uom} ${i.item}`}</li>)}
    </ul>
);

const GroceryList = ({ groceries }) => {
    const partition = (arr, predicate) => {
        const left = [];
        const right = [];
        arr.forEach(item => {
            if (predicate(item)) {
                left.push(item);
            } else {
                right.push(item);
            }
        });
        return [left, right];
    };

    const [aldi, schnucks] = partition(groceries, (i) => i.isAldi);
    return (
        <div>
            <h3>Aldi List</h3>
            <StoreList items={aldi} />
            <h3>Schnucks List</h3>
            <StoreList items={schnucks} />
        </div>
    );
};

export default GroceryList;
