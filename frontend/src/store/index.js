import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import history from '../routes/history';
import reducers from './ducks';
import sagas from './sagas';

const sagaMonitor = process.env.NODE_ENV === 'development' ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware, routerMiddleware(history)];

const tronMiddleware = process.env.NODE_ENV === 'development' ? console.tron.createEnhancer : () => {};

const reduxDevToolsExtension = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  : null;

const store = createStore(
  reducers(history),
  compose(
    applyMiddleware(...middlewares),
    tronMiddleware(),
  ),
  reduxDevToolsExtension,
);

sagaMiddleware.run(sagas);

export default store;
