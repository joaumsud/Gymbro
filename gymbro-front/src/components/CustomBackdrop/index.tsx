import {
    Backdrop,
    BackdropProps,
    CircularProgress,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import React from 'react';
// import useStyles from './styles';

interface CustomBackDropProps {
    open: boolean;
    message?: string;
}

const CustomBackdrop = ({
    open,
    message,
}: CustomBackDropProps) => {

    return (
        <Backdrop open={open} >
            <Paper >
                <Grid
                    container
                    alignContent="center"
                    direction="column"
                    style={{ padding: '100px' }}
                >
                    <CircularProgress />
                    <Typography >
                        {message ?? 'Aguarde...'}
                    </Typography>
                </Grid>
            </Paper>
        </Backdrop>
    )
}

export default CustomBackdrop