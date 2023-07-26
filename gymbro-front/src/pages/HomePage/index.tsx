import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Navbar from '../../components/organisms/NavbarHome';
import FormLogin from '../../components/organisms/CardLogin';
import styles from './index.module.scss';
import logoHome from '../../img/logoGymbro.png'
import { Box, Grid, Typography } from '@mui/material';
import ImgHome from '../../components/atoms/ImgHome';
import MainHome from '../../components/organisms/MainHome';

const HomePage = () => {
    const history = useHistory()
    const [widthWindow, setWidthWindow] = useState<number>(0)

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    return (
        <>
            <div className={styles.container}>
                <Navbar />
                <MainHome />
            </div>
        </>
    )
}

export default HomePage;