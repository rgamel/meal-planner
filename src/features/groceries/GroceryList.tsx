import { isEmpty } from 'lodash';
import partition from 'lodash/fp/partition';
import { GroceryItem } from 'types';
import { StoreListAccordion } from './StoreListAccordion';
import { GroceryItems } from './GroceryItems';

export type GroceryLineItemProps = {
    groceryItem: GroceryItem;
    deleteGroceryItem?: (item: GroceryItem) => void;
    itemId: string;
};

export default function GroceryMasterList({ groceries }: { groceries: GroceryItem[] }) {
    const [aldi, schnucks] = partition('isAldi', groceries);

    return (
        <div className="space-y-2">
            {!isEmpty(aldi) ? (
                <StoreListAccordion count={aldi.length} label="Aldi">
                    <GroceryItems items={aldi} />
                </StoreListAccordion>
            ) : null}
            {!isEmpty(schnucks) ? (
                <StoreListAccordion count={schnucks.length} label="Schnucks">
                    <GroceryItems items={schnucks} />
                </StoreListAccordion>
            ) : null}
        </div>
    );
}
