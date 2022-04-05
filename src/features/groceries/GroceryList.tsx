import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import partition from 'lodash/fp/partition';
import { startCase } from 'lodash';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import { ListItemSecondaryAction, ListItemText } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { GroceryItem } from 'types';
import { useIngredients, useUoms } from 'app/hooks';

type GroceryLineItemProps = {
    groceryItem: GroceryItem;
    deleteGroceryItem?: (item: GroceryItem) => void;
};

function GroceryLineItem({ groceryItem, deleteGroceryItem }: GroceryLineItemProps) {
    const { uoms } = useUoms();
    const { ingredients } = useIngredients();
    return (
        <ListItem key={`${groceryItem.uomId}|${groceryItem.itemId}|${String(groceryItem.isAldi)}`}>
            {!deleteGroceryItem ? <Checkbox /> : null}
            <ListItemText
                primary={startCase(ingredients[groceryItem.itemId]?.name)}
                secondary={`${groceryItem.quantity} ${uoms[groceryItem.uomId]?.name}`}
            />
            <ListItemSecondaryAction>
                {deleteGroceryItem && (
                    <IconButton edge="end" onClick={() => deleteGroceryItem(groceryItem)}>
                        <Icon>delete</Icon>
                    </IconButton>
                )}
            </ListItemSecondaryAction>
        </ListItem>
    );
}

type GroceryItemsProps = {
    items: GroceryItem[];
    deleteGroceryItem?: (item: GroceryItem) => void;
};

export function GroceryItems({ items, deleteGroceryItem }: GroceryItemsProps) {
    // const sortedItems = useMemo(() => sortBy('item.name', items), [items]); // TODO - do we even need this?
    return (
        <List>
            {items.map((groceryItem: GroceryItem) => (
                <GroceryLineItem
                    key={`${groceryItem.uomId}|${groceryItem.itemId}`}
                    groceryItem={groceryItem}
                    deleteGroceryItem={deleteGroceryItem}
                />
            ))}
        </List>
    );
}

export function StoreListAccordion({ label, children }: { label?: string; children: JSX.Element | JSX.Element[] }) {
    return (
        <Grid item xs={2} sm={4}>
            <Accordion>
                <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                    <Typography>{label}</Typography>
                </AccordionSummary>
                <AccordionDetails>{children}</AccordionDetails>
            </Accordion>
        </Grid>
    );
}

export default function GroceryMasterList({ groceries }: { groceries: GroceryItem[] }) {
    const [aldi, schnucks] = partition('isAldi', groceries);
    return (
        <Grid container columns={{ xs: 2, sm: 8 }}>
            <StoreListAccordion label="Aldi list">
                <GroceryItems items={aldi} />
            </StoreListAccordion>
            <StoreListAccordion label="Schnucks list">
                <GroceryItems items={schnucks} />
            </StoreListAccordion>
        </Grid>
    );
}
