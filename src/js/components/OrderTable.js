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
        orders.description === null
        ?
        <tr key={orders.op_id}>
          <td><Moment format="MM/DD/YY">{orders.created}</Moment></td>
          <td class={ orders.rush == 1 ? "rush" : "" }>{orders.id}</td>
          <td><strong>{orders.patient_name}</strong></td>
          <td>
            <strong>No products found.</strong>
          </td>
          <td></td>
          <td class={ orders.oot == 1 ? "oot" : "" }>{orders.clinic}</td>
          <td>{orders.insurance}</td>
          <td><Link to={"/order/" + orders.id}><button class="btn btn-primary btn-sm">View</button></Link></td>
        </tr>
        :
        <tr key={orders.op_id}>
          <td><Moment format="MM/DD/YY">{orders.created}</Moment></td>
          <td class={ orders.rush == 1 ? "rush" : "" }>{orders.id}</td>
          <td><strong>{orders.patient_name}</strong></td>
          <td>
             {orders.short_desc} - {orders.description}
            <br />
            { orders.exchange == 1 ? <span class="badge badge-info">exchanged </span> : "" }
            { orders.rtn == 1 ? <span class="badge badge-warning">returned</span> : "" }
          </td>
          <td class="td-op op1">
            <div class="opdiv">
              <div>
                <input
                  type="checkbox"
                  name="op1_1"
                  id="op1_1"
                  checked={ orders.op1_1 == 1 }
                  readOnly
                />
                <label for="op1_1" />
              </div>
              <div>
                { (orders.op1_1_dt === null || orders.op1_1_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{orders.op1_1_dt}</Moment>}
              </div>
            </div>
            <div class="opdiv">
              <div>
                <input
                  type="checkbox"
                  name="op1_2"
                  id="op1_2"
                  checked={ orders.op1_2 == 1 }
                  readOnly
                />
                <label for="op1_2" />
              </div>
              <div>
                { (orders.op1_2_dt === null || orders.op1_2_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{orders.op1_2_dt}</Moment>}
              </div>
            </div>
            <div class="opdiv">
              <div>
                <input
                  type="checkbox"
                  name="op1_3"
                  id="op1_3"
                  checked={ orders.op1_3 == 1 }
                  readOnly
                />
                <label for="op1_3" />
              </div>
              <div>
                { (orders.op1_3_dt === null || orders.op1_3_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{orders.op1_3_dt}</Moment>}
              </div>
            </div>
            <div class="opdiv">
              <div>
                <input
                  type="checkbox"
                  name="op1_4"
                  id="op1_4"
                  checked={ orders.op1_4 == 1 }
                  readOnly
                />
                <label for="op1_4" />
              </div>
              <div>
                { (orders.op1_4_dt === null || orders.op1_4_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{orders.op1_4_dt}</Moment>}
              </div>
            </div>
            <div class="opdiv">
              <div>
                <input
                  type="checkbox"
                  name="op1_5"
                  id="op1_5"
                  checked={ orders.op1_5 == 1 }
                  readOnly
                />
                <label for="op1_5" />
              </div>
              <div>
                { (orders.op1_5_dt === null || orders.op1_5_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{orders.op1_5_dt}</Moment>}
              </div>
            </div>
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
              <td>Name</td>
              <td>Products</td>
              <td>
                <div class="opdiv">Ins</div>
                <div class="opdiv">Meas</div>
                <div class="opdiv">Rx</div>
                <div class="opdiv">Dx</div>
                <div class="opdiv">Auth</div>
              </td>
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
