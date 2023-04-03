import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import  Navbar from '../../components/Navbar/';
import LoginCard from '../../components/LoginCard';
import styles from './index.module.scss';

const HomePage = () => {
    const history = useHistory()
    return (
        <>
            <div className={styles.container}>
                <Navbar />
                <main className={styles.main}>
                    <div className={styles.logo}>Logo</div>
                    <LoginCard />
                </main>
                <footer className={styles.footer}>Footer</footer>
            </div>
        </>
    )
}

export default HomePage;