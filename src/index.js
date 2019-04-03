import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
//import {createStore} from 'redux';
//import reducer from './redux/reducer';
import { Provider } from 'react-globally';

const initialState = {
  loggedIn: false,
  runOnce: true,
  user: {},
  open: false,
  currentDay: new Date()
}

//const store = createStore(reducer)

ReactDOM.render(
    <Provider globalState={initialState}>
      <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
