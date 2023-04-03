import React from 'react';
import { Route, Redirect, RouteProps, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoginPage from '../pages/LoginAndRegisterPage';
import HomePage from '../pages/HomePage';
import SignUpForm from '../components/FormSignUp';

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
        <Redirect to="/login" />
    );
};

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/" component={HomePage} />
            {/* <PrivateRoute exact path="/friends" component={} />
            <PrivateRoute exact path="/perfil" component={} /> */}
        </Switch>
    );
};

export default Routes;