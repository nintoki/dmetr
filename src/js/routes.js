import React from "react"
import ReactDOM from "react-dom"
import { Route, IndexRoute } from "react-router-dom"

import App from "./pages/App"
import OrdersIndex from "./pages/OrdersIndex"
import OrderPage from "./pages/OrderPage"
import PatientSearch from "./pages/PatientSearch"

export default (
  <div>
    <Route path="/" component={App} />
    <Route path="/orders" component={OrdersIndex} />
    <Route path="orders/:id" component={OrderPage} />
    <Route path="/search" component={PatientSearch} />
  </div>
)
