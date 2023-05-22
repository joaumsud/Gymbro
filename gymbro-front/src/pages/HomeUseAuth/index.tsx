import './style.css'
import MapEvents from '../../components/MapEvents';
import "leaflet/dist/leaflet.css";
import { useUserAuth } from '../../hooks/userProvider';
import { Box, Button, CssBaseline, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar, Typography, styled, useTheme } from '@mui/material';
import OnlineFriends from '../../components/OnlineFriends';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import ListIcon from '@mui/icons-material/List';
import React, { useState } from 'react';
import SideBarFilters from '../../components/SidebarFIltersMap';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

const Dash = () => {
    const { user } = useUserAuth()

    const theme = useTheme();

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Grid container style={{
            }}>
                <Grid item lg={1} md={1} sm={12} xs={12}>
                    <OnlineFriends />
                </Grid>
                <Grid item lg={11} md={11} sm={12} xs={12} sx={{position:'relative'}}>
                    <MapEvents />
                    <SideBarFilters/>
                </Grid>
            </Grid>
        </>
    );
}

export default Dash;
