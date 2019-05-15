import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import history from './history';

import Dashboard from '../pages/dashboard';
import Signin from '../pages/auth/signin';
import Signup from '../pages/auth/signup';

function Routes() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/" extact component={Dashboard} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Routes;
