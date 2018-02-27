import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import LoginPage from '../components/LoginPage.js';
import DashboardPage from '../components/DashboardPage.js';
import HelpPage from '../components/HelpPage.js';
import NotFoundPage from '../components/NotFoundPage.js';
import SearchPage from '../components/SearchPage.js';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute.js';
import PublicRoute from './PublicRoute.js';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history} >
    <div>
      <Switch>
        <PublicRoute path="/" component={SearchPage} exact />
        <PublicRoute component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

// <PublicRoute path="/search" component={SearchPage} />

export default AppRouter;

