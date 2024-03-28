import { isEmpty } from 'lodash';
import partition from 'lodash/fp/partition';
import { GroceryItem } from 'types';
import { GroceryItems } from './GroceryItems';
import { AccordionSummary } from '../../components/AccordionSummary';

export type GroceryLineItemProps = {
    groceryItem: GroceryItem;
    deleteGroceryItem?: (item: GroceryItem) => void;
    itemId: string;
};

export default function GroceryMasterList({ groceries }: { groceries: GroceryItem[] }) {
    const [aldi, schnucks] = partition('isAldi', groceries);

    return (
        <div className="divide-y-2">
            {!isEmpty(aldi) ? (
                <div className="px-6 py-4">
                    <AccordionSummary label={`Aldi: ${aldi.length}`}>
                        <GroceryItems items={aldi} />
                    </AccordionSummary>
                </div>
            ) : null}
            {!isEmpty(schnucks) ? (
                <div className="px-6 py-4">
                    <AccordionSummary label={`Schnucks: ${schnucks.length}`}>
                        <GroceryItems items={schnucks} />
                    </AccordionSummary>
                </div>
            ) : null}
        </div>
    );
}
