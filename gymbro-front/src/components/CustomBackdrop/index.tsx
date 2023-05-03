import {
    Backdrop,
    BackdropProps,
    CircularProgress,
    Grid,
    Paper,
    Typography,
  } from '@mui/material';
  import React from 'react';
  import './styles.css'
  
  interface CustomBackDropProps extends BackdropProps {
    message?: string;
  }
  
  const CustomBackdrop: React.FC<CustomBackDropProps> = ({
    open,
    message,
  }: CustomBackDropProps) => {
  
    return (
      <Backdrop open={open} className='backdrop'>
        <Paper className='paperBackDrop'>
          <Grid
            container
            alignContent="center"
            direction="column"
            style={{ padding: '100px' }}
          >
            <CircularProgress className='circularProgressBackDrop'/>
            <Typography className='typographyBackdrop'>
              {message ?? 'Aguarde...'}
            </Typography>
          </Grid>
        </Paper>
      </Backdrop>
    );
  };
  
  export default CustomBackdrop;
  