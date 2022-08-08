import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Avatar, Backdrop, Box, Button, CircularProgress, CssBaseline, Grid, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, useMediaQuery } from '@mui/material';
import Logo from '../../components/ui-elements/Logo';
import Quote from './Quote';
import ProfileAvatar from '../../components/mainlayout/ProfileAvatar';
import LogOutIcon from '../../components/mainlayout/LogOutIcon';
import { selectUserEmail } from '../../store/features/user/user.selectors';
import { resetUser } from '../../store/features/user/userSlice';

// project imports
// import Header from './Header';

// styles
const Main = styled('main')(({ theme }) => ({
}));

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userEmail = useSelector(selectUserEmail);

    useEffect(() => {
        if (!userEmail) navigate('/auth/login')
        return;
    }, [userEmail])

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [openQuote, setOpenQuote] = useState(true);


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    if (userEmail) return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <CssBaseline />
            {/* header */}
            <AppBar
                // enableColorOnDark
                // color="inherit"
                position='static'
                elevation={0}
            >
                <Toolbar sx={{ py: 0.5 }}>
                    {/* <Header handleLeftDrawerToggle={handleLeftDrawerToggle} /> */}
                    <Logo width={94} />

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Roula Raiyee">
                                    <ProfileAvatar width='100%' />
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <Grid container spacing={2}
                                justifyContent="space-around"
                                alignItems="center"
                                sx={{
                                    p: 2
                                }}>
                                <Grid item xs>
                                    <Avatar alt="Roula Raiyee">
                                        <ProfileAvatar width='100%' />
                                    </Avatar>
                                </Grid>
                                <Grid item container direction='column' xs justifyContent="space-around" alignItems="center">
                                    <Grid item xs>
                                        {userEmail}
                                    </Grid>
                                    <Grid item xs>
                                        <Button
                                            variant="text"
                                            disableFocusRipple
                                            sx={{ color: 'white' }}
                                            onClick={() => dispatch(resetUser(null))}>
                                            <span style={{ marginRight: '8px' }}>Logout</span>
                                            <LogOutIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Menu>
                    </Box>

                </Toolbar>
            </AppBar>

            {/* main content */}
            <Main theme={theme}>
                <Quote handleQuoteOpen={setOpenQuote} open={openQuote} />
                <Box sx={{ display: 'flex', height: `calc(100vh - 65px - ${openQuote ? '69px' : '0px'})` }}>
                    <Outlet />
                </Box>
            </Main>
        </Box>
    );
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
};

export default MainLayout;
