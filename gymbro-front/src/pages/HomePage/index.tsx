import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar/';
import FormLogin from '../../components/FormLogin';
import styles from './index.module.scss';
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
                                <div className={styles.logo}>Logo</div>
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