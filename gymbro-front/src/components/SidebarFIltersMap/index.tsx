import {
    Box,
    Button,
    Divider,
    Fab,
    Grid,
    Popover,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import useStyles from './styles';
import { Controller, useForm } from 'react-hook-form';


const SideBarFilters: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [title, setTitle] = useState<string>('')
    const classes = useStyles()

    const { handleSubmit, control, reset } = useForm();

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
                className={classes.popOver}
            >
                <Typography textAlign='left' py={1} variant="h6">
                    Filtre
                </Typography>
                <Divider  />
                <form>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                // className={classes.inputsStyle}
                                label="Título"
                                variant="outlined"
                                value={title}
                            // onChange={handleTitle}
                            />
                        )}
                        name="title"
                    />
                    <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button className={classes.btnFilter} type='submit'>Pesquisar</Button>
                    </Grid>
                </form>
            </Popover>
        </Box>
    )
}

export default SideBarFilters;