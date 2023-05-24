import {
    Box,
    Fab,
    Popover,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import useStyles from './styles';


const SideBarFilters: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const classes = useStyles()

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
                classes={{
                    paper: classes.popOver
                }
                }
                PaperProps={{
                    className: classes.popOver
                }}
            >
                <Typography sx={{ p: 2 }}>The content of the Popover lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll.</Typography>
            </Popover>
        </Box>
    )
}

export default SideBarFilters;