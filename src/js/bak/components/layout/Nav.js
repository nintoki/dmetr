import React from "react";
import { Link, Route, Switch } from 'react-router-dom';
import App from "../../pages/App"
import SearchStart from "../../pages/SearchStart"
import PatientsIndex from "../../pages/PatientsIndex"
import PatientPage from "../../pages/PatientPage"
import PatientSearch from "../../pages/PatientSearch"
import PatientNew from "../../pages/PatientNew"
import PatientUpdate from "../../pages/PatientUpdate"
import OrdersIndex from "../../pages/OrdersIndex"
import OrdersArchiveIndex from "../../pages/OrdersArchiveIndex"
import OrderPage from "../../pages/OrderPage"
import OrderNew from "../../pages/OrderNew"
import OrderUpdate from "../../pages/OrderUpdate"
import NoteNew from "../../pages/NoteNew"
import NoteUpdate from "../../pages/NoteUpdate"
import OrderProductNew from "../../pages/OrderProductNew"
import OrderProductUpdate from "../../pages/OrderProductUpdate"

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
              <div class="logo"><i class="fa fa-envira"></i>dmetr</div>
              <ul class="nav navbar-nav">
                <li>
                  <Link to="/" onClick={this.toggleCollapse.bind(this)}>Home</Link>
                </li>
                {/* <li>
                  <Link to="/searchStart" onClick={this.toggleCollapse.bind(this)}>Search</Link>
                </li> */}
                <li>
                  <Link to="/orders" onClick={this.toggleCollapse.bind(this)}>Orders</Link>
                </li>
                <li>
                  <Link to="/ordersArchive" onClick={this.toggleCollapse.bind(this)}>Archive</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Switch>
          <Route exact path="/" component={SearchStart} />
          <Route path="/search" component={PatientSearch} />
          <Route path="/patients" component={PatientsIndex}/>
          <Route path="/patient/:id" component={PatientPage}/>
          <Route path="/patientNew" component={PatientNew} />
          <Route path="/patientUpdate" component={PatientUpdate} />
          <Route path="/orders" component={OrdersIndex}/>
          <Route path="/ordersArchive" component={OrdersArchiveIndex}/>
          <Route path="/order/:id" component={OrderPage}/>
          <Route path="/orderNew/:patient_name" component={OrderNew} />
          <Route path="/orderUpdate" component={OrderUpdate} />
          <Route path="/noteNew/:patient_name" component={NoteNew} />
          <Route path="/noteUpdate" component={NoteUpdate} />
          <Route path="/orderProductNew" component={OrderProductNew} />
          <Route path="/orderProductUpdate" component={OrderProductUpdate} />
        </Switch>
      </div>
    );
  }
}
