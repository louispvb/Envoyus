import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

import MainPage from './pages/MainPage';
import ResultsPage from './pages/ResultsPage';
import { HCenter } from './containers';
import userReducer from './reducers/userReducer';

const store = createStore(
  userReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

const NoMatch = _ => (
  <HCenter style={{
    fontSize: 42,
    width: '100vw',
    height: '100vh',
  }}>
    Sorry, that page was not found :(
  </HCenter>
);

const RouteContainer = props => (
  <div style={{
    height: '100%',
    width: '100%',
  }}>
    { props.children }
  </div>
);

const RouterView = (
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ RouteContainer }>
        <IndexRoute component={ MainPage } />
        <Route path="results(/:query)" component={ ResultsPage } />
        <Route path="*" component={ NoMatch } />
      </Route>
    </Router>
  </Provider>
);

export default RouterView;
