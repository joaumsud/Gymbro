import React, { useState } from 'react';
import { Redirect,useHistory } from 'react-router-dom';
import { logout } from '../../services/auth.service';

const HomePage = () => {
    const history = useHistory()
    return (
        <>
            <p>Bem-Vindo ao GymBro</p>
            <button onClick={() => {
                logout()
                history.push('/login')
            }}>Sair</button>
        </>
    )
}

export default HomePage;