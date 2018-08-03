import React from 'react';
import { Provider } from 'react-redux'
import {render} from 'react-dom';
import { Router,Route,Switch,Redirect} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import configureStore from './store'
import Comments from './components/Comments'
import App from './App'
import 'antd/dist/antd.css';
import './index.css';

const store = configureStore();
const customHistory = createBrowserHistory();
render(
  <Provider store={store}>
    <Router history={customHistory}>
      <div>
        <Switch>
          <Route exact path='/' component={Comments}/>
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
