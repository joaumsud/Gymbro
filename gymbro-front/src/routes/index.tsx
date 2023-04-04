import React from 'react';
import { Route, Redirect, RouteProps, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import HomePage from '../pages/HomePage';
import Dash from '../pages/Dash';

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
    component: Component,
    path,
}) => {
    const isAuthenticated = Cookies.get('acessToken');

    return isAuthenticated ? (
        <Route path={path} component={Component} />
    ) : (
        <Redirect to="/" />
    );
};

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <PrivateRoute exact path="/dash" component={Dash} />
            {/* <PrivateRoute exact path="/friends" component={} />
            <PrivateRoute exact path="/perfil" component={} /> */}
        </Switch>
    );
};

export default Routes;