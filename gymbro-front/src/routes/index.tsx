import React from 'react';
import { Route, Redirect, RouteProps, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import HomePage from '../pages/HomePage';
import HomeUseAuth from '../pages/HomeUseAuth';
import Events from '../pages/Events';
import NavBarUserAuth from '../components/NavBarUserAuth';

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
            <Layout>
                <Component/>
            </Layout>
        </Route>
    ) : (
        <Redirect to="/" />
    );
};

const Layout:React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    return(
        <>
            <NavBarUserAuth />
            {children}
        </>
    )
}

const Routes: React.FC = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <PrivateRoute exact path="/dash" component={HomeUseAuth} />
                <PrivateRoute exact path="/events" component={Events} />
            </Switch>
        </>
    );
};

export default Routes;