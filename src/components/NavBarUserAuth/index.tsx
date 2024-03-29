import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Button,
    Tooltip,
    Avatar
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import React from "react";
import { useHistory } from "react-router-dom";
import { logout } from "../../services/auth.service";

const pages = ['Início', 'Eventos', 'Amigos'];
const settings = ['Perfil', 'Sair'];

const NavBarUserAuth = () => {
    const history = useHistory()

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (

        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <FitnessCenterIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/dash"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        GymBroz
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={() => {
                                handleCloseNavMenu()
                                history.push('/dash')
                                window.location.reload()
                            }}>
                                <Typography
                                    textAlign="center"
                                >
                                    {pages[0]}
                                </Typography>
                            </MenuItem>

                            <MenuItem onClick={() => {
                                handleCloseNavMenu()
                                history.push('/events')
                                window.location.reload()
                            }}>
                                <Typography
                                    textAlign="center"
                                >
                                    {pages[1]}
                                </Typography>
                            </MenuItem>

                            <MenuItem onClick={() => {
                                handleCloseNavMenu()
                            }}>
                                <Typography
                                    textAlign="center">
                                    {pages[2]}
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <FitnessCenterIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        GymBroz
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'info.main', display: 'block' }}
                            href="/dash"
                        >
                            {pages[0]}
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'info.main', display: 'block' }}
                            href="/events"
                        >
                            {pages[1]}
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'info.main', display: 'block' }}
                        >
                            {pages[2]}
                        </Button>
                    </Box>
                    <Box>
                        <MessageIcon sx={{ marginRight: '13px', fontSize: '30px' }} />
                        <NotificationsIcon sx={{ marginRight: '13px', fontSize: '30px' }} />
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>

                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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

                            <MenuItem onClick={handleCloseUserMenu}>
                            <Typography onClick={(e)=> {
                               history.push('/perfil')
                               window.location.reload() 
                            }} textAlign="center">{settings[0]}</Typography>
                            </MenuItem>

                            <MenuItem onClick={() => {
                                handleCloseUserMenu()
                                logout()
                                history.push('/') /*colocar o endereço do perfil*/ 
                                window.location.reload()
                            }}>
                                <Typography
                                    textAlign="center"
                                >{settings[1]}</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    )
}

export default NavBarUserAuth;