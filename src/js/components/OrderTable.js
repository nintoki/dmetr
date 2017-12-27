import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { Switch, Route, Link } from 'react-router-dom'
import OrderPage from "../pages/OrderPage"

class OrderTable extends Component {
  componentWillMount() {
    this.props.fetchOrders();
  }

  renderOrders(orders) {
    return orders.map((orders) => {
      return (
        <tr key={orders.id}>
          <td><Moment format="MM/DD/YY">{orders.created}</Moment></td>
          <td>{orders.id}</td>
          <td>{orders.patient_name}</td>
          <td>
            <ol>
              <li>ORDER PRODUCTS HERE</li>
            </ol>
          </td>
          <td>{orders.clinic}</td>
          <td>{orders.insurance}</td>
          <td>{orders.oot}</td>
          <td><Link to={"order/" + orders.id}><button class="btn btn-primary btn-sm">View</button></Link></td>
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
              <td>Name</td>
              <td>Products</td>
              <td>Clinic</td>
              <td>Insurance</td>
              <td>OOT</td>
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
