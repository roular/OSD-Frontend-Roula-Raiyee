import { Box, Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { IMPORTANCE, ItemType } from '../../../store/features/cards/card.state';

const Item = ({ item, index, getItemStyle }: { item: ItemType, index: number, getItemStyle: Function }) => {
    const importanceToColorMap: {[key in IMPORTANCE]: 'success' | 'warning' | 'error'} = {
        [IMPORTANCE.Low]: 'success',
        [IMPORTANCE.Medium]: 'warning',
        [IMPORTANCE.High]: 'error',
    }

    return (
        <Draggable
            draggableId={String(item.id)}
            index={index}>
            {(provided, snapshot) => (
                <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                    )}>
                    {item.description}
                    <Table sx={{
                        mt: 1
                    }}>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{color:'grey.500'}}>
                                    Category
                                </TableCell>
                                <TableCell>
                                    {item.category}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{color:'grey.500'}}>
                                    Due Date
                                </TableCell>
                                <TableCell>
                                    {item.dueDate}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{color:'grey.500'}}>
                                    Estimate
                                </TableCell>
                                <TableCell>
                                    {item.estimate}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{color:'grey.500'}}>
                                    Importance
                                </TableCell>
                                <TableCell>
                                <Chip label={item.importance} color={importanceToColorMap[item.importance]} sx={{borderRadius: 1}}/>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
            )}
        </Draggable>
    )
};

export default Item