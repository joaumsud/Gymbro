import React from 'react';
import { Route, Redirect, RouteProps, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import HomePage from '../pages/HomePage';
import HomeUseAuth from '../pages/HomeUseAuth';
import Events from '../pages/Events';
import NavBarUserAuth from '../components/NavBarUserAuth';
import PerfilUser from '../pages/PerfilUser';
import { Typography } from '@mui/material';

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
    component: Component,
    path,
}) => {
    const isAuthenticated = Cookies.get('acessToken');

    return isAuthenticated ? (
        <Route path={path} component={Component} >
            <Layout >
                <Component />
            </Layout>
        </Route>
    ) : (
        <Redirect to="/" />
    );
};

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
        <>
            <NavBarUserAuth />
            {children}
            <footer style={{
                backgroundColor: '#07142B',
                color: '#fff',
                height: '80px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Typography>GymBroz Todos os direitos resevados.</Typography>
            </footer>
        </>
    )
}

const Routes: React.FC = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <PrivateRoute path="/dash" component={HomeUseAuth} />
                <PrivateRoute path="/events" component={Events} />
                <PrivateRoute path="/perfil" component={PerfilUser} />
            </Switch>
        </>
    );
};

export default Routes;