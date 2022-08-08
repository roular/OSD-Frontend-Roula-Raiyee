import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { CardState, ItemListType, ItemType } from '../../store/features/cards/card.state';
import { selectCards } from '../../store/features/cards/cards.selectors';
import ItemList from './ItemList';

// a little function to help us with reordering the result
const reorder = (list: ItemType[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source: ItemListType, destination: ItemListType, droppableSource: any, droppableDestination: any): { [key: string]: ItemListType } => {
    const sourceClone = Array.from(source.items);
    const destClone = Array.from(destination.items);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    //@ts-ignore
    result[droppableSource.droppableId] = {
        ...source,
        items: sourceClone
    };
    //@ts-ignore
    result[droppableDestination.droppableId] = {
        ...destination,
        items: destClone
    };;

    return result;
};

const Dashboard = () => {
    const cards = useSelector(selectCards)
    const [state, setState] = useState<CardState>(cards);

    useEffect(() => {
        setState(cards);
    }, [cards])
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                //@ts-ignore
                state[source.droppableId as LISTTYPE].items,
                source.index,
                destination.index
            );

            // let newState: any = { items };

            // if (source.droppableId === 'droppable2') {
            //     newState = { selected: items };
            // }

            setState(state => ({
                ...state,
                [source.droppableId]: {
                    //@ts-ignore
                    ...state[source.droppableId as LISTTYPE],
                    items
                }
            }));
        } else {
            const result = move(
                //@ts-ignore
                state[source.droppableId as LISTTYPE],
                //@ts-ignore
                state[destination.droppableId as LISTTYPE],
                source,
                destination
            );

            setState(state => ({
                ...state,
                ...result
                // items: result.droppable,
                // selected: result.droppable2
            }));
        }
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                {Object.entries(state).map(([key, itemList]) =>
                    <ItemList Id={key} itemList={itemList} key={key} />
                )}
            </DragDropContext>
        </>
    );
}

export default Dashboard;
