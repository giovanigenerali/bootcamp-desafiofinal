import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';

import history from './history';

import Private from './private';
import Guest from './guest';

import Dashboard from '../pages/dashboard';
import Signin from '../pages/auth/signin';
import Signup from '../pages/auth/signup';

function Routes() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Guest path="/signin" component={Signin} />
        <Guest path="/signup" component={Signup} />
        <Private path="/" extact component={Dashboard} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Routes;
