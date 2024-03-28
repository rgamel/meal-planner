import { useIngredients, useShoppedItems, useUoms } from 'app/hooks';
import { IconButton } from 'components/Button';
import { Delete } from 'components/icons/Delete';
import { DragHandle } from 'components/icons/DragHandle';
import { titleCase } from 'helpers';
import { GroceryLineItemProps } from './GroceryList';

export function GroceryLineItem({ groceryItem, deleteGroceryItem, itemId }: GroceryLineItemProps) {
    const { uoms } = useUoms();
    const { ingredients } = useIngredients();
    const { shoppedItems, handleToggleShopped } = useShoppedItems();
    const toggleShopped = () => handleToggleShopped(itemId);

    return (
        <li className="flex justify-between py-4">
            <span className="flex items-center">
                {!deleteGroceryItem ? (
                    <input
                        id="item_shopped"
                        type="checkbox"
                        className="mr-2"
                        checked={shoppedItems.includes(itemId)}
                        onChange={toggleShopped}
                    />
                ) : (
                    <div className="opacity-50">
                        <DragHandle />
                    </div>
                )}
                <span onClick={toggleShopped}>
                    <strong className="align-middle">{titleCase(ingredients[groceryItem.itemId]?.name)}</strong>
                    <em className="align-middle">{`, ${groceryItem.quantity} ${uoms[groceryItem.uomId]?.name}`}</em>
                </span>
            </span>
            {deleteGroceryItem && (
                <div className="mb-2 flex items-center">
                    <IconButton className="pr-2 opacity-50" onClick={() => deleteGroceryItem(groceryItem)}>
                        <Delete />
                    </IconButton>
                </div>
            )}
        </li>
    );
}
