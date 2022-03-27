import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import partition from 'lodash/fp/partition';
import sortBy from 'lodash/fp/sortBy';
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

type GroceryLineItemProps = {
    groceryItem: GroceryItem;
    deleteGroceryItem?: (id: string) => void;
};

function GroceryLineItem({ groceryItem, deleteGroceryItem }: GroceryLineItemProps) {
    return (
        <ListItem key={`${groceryItem.uom}|${groceryItem.item}|${String(groceryItem.isAldi)}`}>
            {!deleteGroceryItem ? <Checkbox /> : null}
            <ListItemText
                primary={startCase(groceryItem.item)}
                secondary={`${groceryItem.quantity} ${groceryItem.uom}`}
            />
            <ListItemSecondaryAction>
                {deleteGroceryItem && (
                    <IconButton edge="end" onClick={() => deleteGroceryItem(groceryItem.id)}>
                        <Icon>delete</Icon>
                    </IconButton>
                )}
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export function StoreList({
    items,
    label,
    deleteGroceryItem,
}: {
    items: GroceryItem[];
    label?: string;
    deleteGroceryItem?: (id: string) => void;
}) {
    return (
        <Grid item xs={2} sm={4}>
            <Accordion>
                <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                    <Typography>{label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        {sortBy('item', items).map((groceryItem) => (
                            <GroceryLineItem groceryItem={groceryItem} deleteGroceryItem={deleteGroceryItem} />
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        </Grid>
    );
}

export default function GroceryList({ groceries }: { groceries: GroceryItem[] }) {
    const [aldi, schnucks] = partition('isAldi', groceries);
    return (
        <Grid container columns={{ xs: 2, sm: 8 }}>
            <StoreList items={aldi} label="Aldi list" />
            <StoreList items={schnucks} label="Schnucks list" />
        </Grid>
    );
}
