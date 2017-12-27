import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Router, Route } from "react-router-dom"
import history from './history';
import routes from './routes';
import configureStore from "./store/configureStore.js"

import App from "./pages/App"

const client = document.getElementById('client')
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
      <Router history={history}>
          {/* <Route path="/" component={App} /> */}
          <App />
      </Router>
  </Provider>,
  client
);
