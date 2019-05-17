import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as toastr } from 'react-redux-toastr';
import { reducer as auth } from './auth';
import { reducer as themes } from './themes';

export default history => combineReducers({
  auth,
  themes,
  toastr,
  router: connectRouter(history),
});
