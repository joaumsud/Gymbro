import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar/';
import FormLogin from '../../components/FormLogin';
import styles from './index.module.scss';
import logoHome from '../../img/logoGymbro.png'
import { Box, Grid, Typography } from '@mui/material';

const HomePage = () => {
    const history = useHistory()
    return (
        <>
            <div className={styles.container}>
                <Navbar />
                <main className={styles.main}>
                    <Grid container>
                        <Grid item lg={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'center',alignItems:'center' }}>
                                <img src={logoHome} />
                            </Box>
                        </Grid>
                        <Grid item lg={6} sm={12} xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <FormLogin />
                            </Box>
                        </Grid>
                    </Grid>
                </main>
                <footer className={styles.footer}> 
                    <Typography>GymBro Todos os direitos resevados.</Typography>
                </footer>
            </div>
        </>
    )
}

export default HomePage;