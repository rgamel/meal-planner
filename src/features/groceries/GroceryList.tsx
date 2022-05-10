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
import {
    DragDropContext,
    Draggable,
    DraggingStyle,
    Droppable,
    DropResult,
    NotDraggingStyle,
} from 'react-beautiful-dnd';
import { GroceryItem } from 'types';
import { useIngredients, useShoppedItems, useUoms } from 'app/hooks';
import { Dispatch, SetStateAction } from 'react';

type GroceryLineItemProps = {
    groceryItem: GroceryItem;
    deleteGroceryItem?: (item: GroceryItem) => void;
    itemId: string;
};

function move(array: any[], fromIndex: number, toIndex: number) {
    const item = array[fromIndex];
    const { length } = array;
    const diff = fromIndex - toIndex;

    if (diff > 0) {
        return [
            ...array.slice(0, toIndex),
            item,
            ...array.slice(toIndex, fromIndex),
            ...array.slice(fromIndex + 1, length),
        ];
    }

    if (diff < 0) {
        const targetIndex = toIndex + 1;
        return [
            ...array.slice(0, fromIndex),
            ...array.slice(fromIndex + 1, targetIndex),
            item,
            ...array.slice(targetIndex, length),
        ];
    }

    return array;
}

function GroceryLineItem({ groceryItem, deleteGroceryItem, itemId }: GroceryLineItemProps) {
    const { uoms } = useUoms();
    const { ingredients } = useIngredients();

    const { shoppedItems, handleToggleShopped } = useShoppedItems();

    return (
        <ListItem disableGutters key={`${groceryItem.uomId}|${groceryItem.itemId}|${String(groceryItem.isAldi)}`}>
            {!deleteGroceryItem ? (
                <Checkbox checked={shoppedItems.includes(itemId)} onClick={() => handleToggleShopped(itemId)} />
            ) : (
                <Icon sx={{ ml: -1, opacity: 0.5 }}>drag_indicator</Icon>
            )}
            <ListItemText
                primary={
                    <span>
                        <strong>{startCase(ingredients[groceryItem.itemId]?.name)}</strong>
                        <em>{`, ${groceryItem.quantity} ${uoms[groceryItem.uomId]?.name}`}</em>
                    </span>
                }
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
    setItems?: Dispatch<SetStateAction<GroceryItem[]>>;
    deleteGroceryItem?: (item: GroceryItem) => void;
};

export function GroceryItems({ items, setItems, deleteGroceryItem }: GroceryItemsProps) {
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        setItems?.(move(items, result.source.index, result.destination.index));
    };

    const getListStyle = (isDraggingOver: boolean) => ({
        backgroundColor: isDraggingOver ? 'rgb(21, 101, 192, 0.1)' : '#FFF',
    });

    const getItemStyle = (_: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
        padding: 16,
        margin: `0 0 16 0`,
        background: '#FFF',
        ...draggableStyle,
    });

    return (
        <List>
            <div style={{ overflow: 'auto' }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="groceries">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {items.map((groceryItem: GroceryItem, i: number) => {
                                    const itemId = `${groceryItem.uomId}|${groceryItem.itemId}`;
                                    return (
                                        <Draggable key={itemId} draggableId={itemId} index={i}>
                                            {(providedDraggable, snapshotDraggable) => (
                                                <div
                                                    ref={providedDraggable.innerRef}
                                                    {...providedDraggable.draggableProps}
                                                    {...providedDraggable.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshotDraggable.isDragging,
                                                        providedDraggable.draggableProps.style,
                                                    )}
                                                >
                                                    <GroceryLineItem
                                                        groceryItem={groceryItem}
                                                        deleteGroceryItem={deleteGroceryItem}
                                                        itemId={itemId}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
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
