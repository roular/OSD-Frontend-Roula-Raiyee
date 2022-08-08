import { useState } from 'react';

import { Alert, Box, Button, Collapse, IconButton, Stack, Typography } from '@mui/material';
import Logo from '../../../components/ui-elements/Logo';
import ShowQuoteIcon from '../../../components/mainlayout/ShowQuoteIcon';
import DeleteIcon from '../../../components/mainlayout/DeleteIcon';

export default function Quote({ handleQuoteOpen, open }: { open: boolean, handleQuoteOpen: CallableFunction }) {
    const [showX, setShowX] = useState(false);

    return (
        <Box sx={{ width: '100%'}} onMouseEnter={() => setShowX(true)} onMouseLeave={() => setShowX(false)}>
            <Collapse in={open}>
                <Box
                    sx={{height: '69px', p: 3, lineHeight: '21px', fontSize: '18px', fontStyle: 'italic', display: 'flex', background: 'transparent linear-gradient(180deg, #6E4C85 0%, #2D2B52 100%) 0% 0% no-repeat padding-box' }}
                >
                    <Typography component={'q'} sx={{ flexGrow: 1 }}>
                        Anything that can go wrong, will go wrong!
                    </Typography>
                    {showX && <IconButton disableRipple
                        onClick={() => {
                            handleQuoteOpen(false);
                        }}
                        sx={{
                            flexGrow: 0,
                            py: 0,
                            px: '10px'
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>}
                </Box>
            </Collapse>
            <IconButton disableRipple
                disabled={open}
                onClick={() => {
                    handleQuoteOpen(true);
                }}
                sx={{
                    position: 'absolute',
                    px: 4,
                    right: 0,
                    display: open ? 'none' : 'block'
                }}
            >
                <ShowQuoteIcon />
            </IconButton>
        </Box>
    );
}
