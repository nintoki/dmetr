import React from "react";
import { Link, Route, Switch } from 'react-router-dom';
import App from "../../pages/App"
import OrdersIndex from "../../pages/OrdersIndex"
import OrderPage from "../../pages/OrderPage"
import PatientsIndex from "../../pages/PatientsIndex"
import PatientPage from "../../pages/PatientPage"
import PatientSearch from "../../pages/PatientSearch"
import PatientNew from "../../pages/PatientNew"

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    // const { location } = this.props;
    const { collapsed } = this.state;
    // const ordersClass = location.pathname === "/" ? "active" : "";
    // const searchClass = location.pathname.match(/^\/search/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (
      <div>
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav">
                <li>
                  <Link to="/" onClick={this.toggleCollapse.bind(this)}>Home</Link>
                </li>
                <li>
                  <Link to="/orders" onClick={this.toggleCollapse.bind(this)}>Orders</Link>
                </li>
                <li>
                  <Link to="/patients" onClick={this.toggleCollapse.bind(this)}>Patients</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Switch>
          {/* <Route exact path="/" component={App} /> */}
          <Route path="/orders" component={OrdersIndex}/>
          <Route path="/order/:id" component={OrderPage}/>
          <Route path="/patients" component={PatientsIndex}/>
          <Route path="/patient/:id" component={PatientPage}/>
          <Route path="/search/" component={PatientSearch} />
          <Route path="/patientNew" component={PatientNew} />
        </Switch>
      </div>
    );
  }
}
