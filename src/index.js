import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Admin from "layouts/Admin.js";
import Web from "layouts/Web";
import LoginComponent from 'auth/Login';
import LogoutComponent from 'auth/Logout';
import AuthenticatedRoute from './AuthenticatedRoute';
import { ThemeProvider } from '@mui/private-theming';
import theme from 'assets/theme';

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.10.0";

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <BrowserRouter basename="/">
            <Switch>
                <Route path="/web" component={Web} />
                <Route path="/login" exact component={LoginComponent} />
                <AuthenticatedRoute path="/admin" component={Admin} />
                <AuthenticatedRoute path="/logout" exact component={LogoutComponent} />
                <Redirect from="/" to="/web/" />
            </Switch>
        </BrowserRouter>
    </ThemeProvider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
