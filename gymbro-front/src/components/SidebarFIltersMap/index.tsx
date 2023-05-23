import {
    Box,
    Button,
    CssBaseline,
    Divider,
    Fab,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
    TextField,
    Typography,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React, { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import CloseIcon from '@mui/icons-material/Close';

// const drawerWidth = 240;

// const openedMixin = (theme: Theme): CSSObject => ({
//     width: drawerWidth,
//     transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//     }),
//     overflowX: 'hidden',
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//     transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     overflowX: 'hidden',
//     width: `calc(${theme.spacing(7)} + 1px)`,
//     [theme.breakpoints.up('sm')]: {
//         width: `calc(${theme.spacing(8)} + 1px)`,
//     },
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
// }));

// interface AppBarProps extends MuiAppBarProps {
//     open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     ...(open && {
//         marginLeft: drawerWidth,
//         width: `calc(100% - ${drawerWidth}px)`,
//         transition: theme.transitions.create(['width', 'margin'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//     }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//     ({ theme, open }) => ({
//         width: drawerWidth,
//         flexShrink: 0,
//         whiteSpace: 'nowrap',
//         boxSizing: 'border-box',
//         ...(open && {
//             ...openedMixin(theme),
//             '& .MuiDrawer-paper': openedMixin(theme),
//         }),
//         ...(!open && {
//             ...closedMixin(theme),
//             '& .MuiDrawer-paper': closedMixin(theme),
//         }),
//     }),
// );


const SideBarFilters: React.FC = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleButtonClick = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <Box sx={{ position: 'absolute', top: '10%', right: '5%' }}>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab
                    color={open ? 'secondary' : 'primary'}
                    aria-label="add"
                    // onClick={handleButtonClick}
                    onClick={handleClick}
                >
                    {open ? <CloseIcon /> : <AddIcon />}
                </Fab>
            </Box>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
            </Popover>
        </Box>
    )
}

// const SideBarFilters: React.FC = () => {
//     const theme = useTheme();
//     const [open, setOpen] = useState(false);

//     const handleDrawerOpen = () => {
//         setOpen(true);
//     };

//     const handleDrawerClose = () => {
//         setOpen(false);
//     };
//     return (
//         <>
//             <Box sx={{ display: 'flex' }}>
//                 {/* <CssBaseline /> */}
//                 <Drawer variant="permanent" open={open} anchor="right">
//                     <DrawerHeader>
//                         <IconButton
//                             // selected={open}
//                             onClick={() => {
//                                 setOpen(!open);
//                             }}>
//                             {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//                         </IconButton>
//                     </DrawerHeader>
//                     <Divider />
//                     <List>
//                         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//                             <ListItem key={text} disablePadding sx={{ display: 'block' }}>
//                                 <ListItemButton
//                                     sx={{
//                                         minHeight: 48,
//                                         justifyContent: open ? 'initial' : 'center',
//                                         px: 2.5,
//                                     }}
//                                 >
//                                     <ListItemIcon
//                                         sx={{
//                                             minWidth: 0,
//                                             mr: open ? 3 : 'auto',
//                                             justifyContent: 'center',
//                                         }}
//                                     >
//                                         {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                                     </ListItemIcon>
//                                     <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//                                 </ListItemButton>
//                             </ListItem>
//                         ))}
//                     </List>
//                     <Divider />
//                     <List>
//                         {['All mail', 'Trash', 'Spam'].map((text, index) => (
//                             <ListItem key={text} disablePadding sx={{ display: 'block' }}>
//                                 <ListItemButton
//                                     sx={{
//                                         minHeight: 48,
//                                         justifyContent: open ? 'initial' : 'center',
//                                         px: 2.5,
//                                     }}
//                                 >
//                                     <ListItemIcon
//                                         sx={{
//                                             minWidth: 0,
//                                             mr: open ? 3 : 'auto',
//                                             justifyContent: 'center',
//                                         }}
//                                     >
//                                         {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                                     </ListItemIcon>
//                                     <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//                                 </ListItemButton>
//                             </ListItem>
//                         ))}
//                     </List>
//                 </Drawer>
//                 {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//                     <DrawerHeader />
//                     <Typography paragraph>
//                         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//                         tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
//                         enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
//                         imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
//                         Convallis convallis tellus id interdum velit laoreet id donec ultrices.
//                         Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
//                         adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
//                         nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
//                         leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
//                         feugiat vivamus at augue. At augue eget arcu dictum varius duis at
//                         consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
//                         sapien faucibus et molestie ac.
//                     </Typography>
//                     <Typography paragraph>
//                         Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
//                         eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
//                         neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
//                         tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
//                         sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
//                         tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
//                         gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
//                         et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
//                         tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
//                         eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
//                         posuere sollicitudin aliquam ultrices sagittis orci a.
//                     </Typography>
//                 </Box> */}
//             </Box>
//         </>
//     )
// }

export default SideBarFilters;