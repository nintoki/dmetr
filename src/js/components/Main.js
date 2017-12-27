import React from "react";
import { Link, Route, Switch } from 'react-router-dom';
import App from "../../pages/App"
import OrdersIndex from "../../pages/OrdersIndex"
import OrderPage from "../../pages/OrderPage"
import PatientsIndex from "../../pages/PatientsIndex"
import PatientPage from "../../pages/PatientPage"
import PatientSearch from "../../pages/PatientSearch"
import PatientNew from "../../pages/PatientNew"
import Search from "./Search"

export default class Main extends React.Component {
  <Switch>
    <Route path="/" component={Search} />
    <Route path="/orders" component={OrdersIndex}/>
    <Route path="/order/:id" component={OrderPage}/>
    <Route path="/patients" component={PatientsIndex}/>
    <Route path="/patient/:id" component={PatientPage}/>
    <Route path="/search/" component={PatientSearch} />
    <Route path="/patientNew" component={PatientNew} />
  </Switch>
}
