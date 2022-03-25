import partition from 'lodash/fp/partition';
import sortBy from 'lodash/fp/sortBy';
import { GroceryItem } from './RecipeForm';

const StoreList = ({ items }: { items: GroceryItem[] }) => (
    <ul>
        {sortBy('item', items).map((i) => (
            <li key={`${i.uom}|${i.item}|${i.isAldi}`}>
                <em>{`${i.item}`}</em>
                {`, ${i.quantity} ${i.uom}`}
            </li>
        ))}
    </ul>
);

const GroceryList = ({ groceries }: { groceries: GroceryItem[]}) => {
    const [aldi, schnucks] = partition('isAldi', groceries);
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
