import { Box } from "@mui/material";
import { Droppable } from 'react-beautiful-dnd';
import DoingIcon from "../../../components/mainlayout/DoingIcon";
import DoneIcon from "../../../components/mainlayout/DoneIcon";
import ToDoIcon from "../../../components/mainlayout/ToDoIcon";
import { ItemListType, LISTTYPE } from "../../../store/features/cards/card.state";
import Item from "./Item";

const ItemList = ({ itemList, Id }: { itemList: ItemListType, Id: string }) => {

    const listToIcon: { [key in LISTTYPE]: JSX.Element } = {
        [LISTTYPE.toDo]: <ToDoIcon />,
        [LISTTYPE.doing]: <DoingIcon />,
        [LISTTYPE.done]: <DoneIcon />
    }

    const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: '16px',
        margin: `0 0 8px 0`,

        // change background colour if dragging
        background: '#212529 ',

        borderRadius: 1,

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver: boolean) => ({
        background: 'transparent',
        padding: '8px',
        width: 400,
        display: 'flex',
        flexDirection: 'column'
    });

    return (
        <Droppable droppableId={Id}>
            {(provided, snapshot) => (
                <>
                    <Box
                        ref={provided.innerRef}
                        sx={getListStyle(snapshot.isDraggingOver)
                        }>
                        <Box
                            sx={{
                                ...getItemStyle(false, {}), 
                                font: '18px/21px HelveticaNeue', 
                                display: 'flex',
                                gap: 3,
                                alignItems: 'center',
                            }}>
                            {listToIcon[Id as LISTTYPE]}{itemList.name}
                        </Box>
                        <Box className='no-scrollbar' sx={{
                            overflow: 'auto',
                            transition: 'height 0.4s linear',
                            height: 'fit-content',
                            maxHeight: '100%',
                            paddingBottom: '30px'
                        }}>
                            {itemList.items.map((item, index) => (
                                <Item getItemStyle={getItemStyle} index={index} item={item} key={item.id} />
                            ))}
                            {provided.placeholder}
                        </Box>
                    </Box>
                </>

            )}
        </Droppable>)
};

export default ItemList