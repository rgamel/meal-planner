import { Dispatch, SetStateAction } from 'react';
import {
    DragDropContext,
    Draggable,
    DraggingStyle,
    DropResult,
    Droppable,
    NotDraggingStyle,
} from 'react-beautiful-dnd';
import { GroceryItem } from 'types';
import { GroceryLineItem } from './GroceryLineItem';
import { move } from './move';

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
        padding: 0,
        margin: `0 0 16 0`,
        background: '#FFF',
        ...draggableStyle,
    });

    return (
        <div style={{ overflow: 'auto' }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="groceries">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            <ul className="list-inside">
                                {items.map((groceryItem: GroceryItem, i: number) => {
                                    const itemId = `${groceryItem.uomId}|${groceryItem.itemId}/${groceryItem.isAldi}`;
                                    return (
                                        // eslint-disable-next-line react/no-array-index-key
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
                            </ul>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}
