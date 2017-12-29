import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { Switch, Route, Link } from 'react-router-dom'
import OrderProductTable from '../containers/PatientOrderProducts'

class OrderTable extends Component {
  componentWillMount() {
    this.props.fetchPtOrders(this.props.patient_id);
  }

  renderOrders(orders) {
    console.log("order props", this.props)
    return orders.map((orders) => {
      return (
        <tr key={orders.id}>
          <td><Moment format="MM/DD/YY">{orders.created}</Moment></td>
          <td>{orders.id}</td>
          <td>
            <OrderProductTable id={orders.id}/>
          </td>
          <td class={ orders.oot == 1 ? "oot" : "" }>{orders.clinic}</td>
          <td>{orders.insurance}</td>
          <td><Link to={"/order/" + orders.id}><button class="btn btn-primary btn-sm">View</button></Link></td>
        </tr>
      );
    });
  }

  render() {
    const { orders, loading, error } = this.props.orderTable;

    if(loading) {
      return <div className="container"><h1>Orders</h1><h3>Loading...</h3></div>
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      !orders.length
          ? <div className='container divcon'><h2>No orders found.</h2></div>
          :
      <div class="container divcon">
        <h1>Orders</h1>
        <table class="pto">
          <thead>
            <tr>
              <td>Date</td>
              <td>Order #</td>
              <td>Products</td>
              <td>Phase</td>
              <td>Clinic</td>
              <td>Insurance</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {this.renderOrders(orders)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrderTable;
