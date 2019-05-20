import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';

import history from './history';

import Private from './private';
import Guest from './guest';

import Dashboard from '../pages/dashboard';
import Signin from '../pages/auth/signin';
import Signup from '../pages/auth/signup';
import Logout from '../pages/auth/logout';
import SearchMeetup from '../pages/meetup/search';
import NewMeetup from '../pages/meetup/new';
import Profile from '../pages/profile';

function Routes() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Guest path="/signin" component={Signin} />
        <Guest path="/signup" component={Signup} />
        <Private path="/logout" component={Logout} />
        <Private path="/meetups/search" component={SearchMeetup} />
        <Private path="/meetups/new" component={NewMeetup} />
        <Private path="/profile" component={Profile} />
        <Private path="/" extact component={Dashboard} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Routes;
