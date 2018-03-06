import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/App.jsx';
import rootReducer from './reducers';
import { login } from './actions';

const store = createStore(rootReducer);

// For debugging
window.store = store;
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);
unsubscribe();
window.login = login;
// If you want to login automatically after launching app
store.dispatch(login("Alberto"));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
