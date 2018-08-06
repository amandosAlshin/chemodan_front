import React from 'react';
import { Provider } from 'react-redux'
import {render} from 'react-dom';
import { Router,Route,Switch} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import configureStore from './store'
import {CommentsCont} from './containers/comments'
import 'antd/dist/antd.css';
import './index.css';

const store = configureStore();
const customHistory = createBrowserHistory();
render(
  <Provider store={store}>
    <Router history={customHistory}>
      <div>
        <Switch>
          <Route exact path='/' component={CommentsCont}/>
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
