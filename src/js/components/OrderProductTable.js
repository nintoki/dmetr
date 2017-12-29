import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { Switch, Route, Link } from 'react-router-dom'
import { fetchPtOrderProducts, fetchOrderProductsSuccess, fetchOrderProductsFailure, resetOrderProducts } from '../actions/orderProductActions'


class OrderProductTable extends Component {
  componentWillMount() {
    this.props.fetchPtOrderProducts(this.props.id);
    console.log("mounting");
  }

  renderOrderProducts(order_products) {
    console.log("render op",this.props.orderProductTable.order_products)
    console.log(this.props.id)
    return order_products.map((order_products) => {
      return (
        <tr key={order_products.id}>
          <td class={ order_products.rush == 1 ? "rush" : "" }>
            {order_products.short_desc} - {order_products.description}
            <br />
            { order_products.exchange == 1 ? <span>exchanged </span> : "" }
            { order_products.return == 1 ? <span>returned</span> : "" }
          </td>
          <td>
            <div class="opdiv">
              <div>
                <input
                  type="checkbox"
                  name="op1_1"
                  id="op1_1"
                  checked={ order_products.op1_1 == 1 ? "checked" : "" }
                  readOnly
                />
                <label for="op1_1" />
              </div>
              <div>
                { order_products.op1_1_dt === null ? "—" : <Moment format="MM/DD">{order_products.op1_1_dt}</Moment>}
              </div>
            </div>
            <div class="opdiv">
              <div>
                <input
                  type="checkbox"
                  name="op1_2"
                  id="op1_2"
                  checked={ order_products.op1_2 == 1 ? "checked" : "" }
                  readOnly
                />
                <label for="op1_2" />
              </div>
              <div>
                { order_products.op1_2_dt === null ? "—" : <Moment format="MM/DD">{order_products.op1_2_dt}</Moment>}
              </div>
            </div>
            <div class="opdiv">
              <div>
                <input
                  type="checkbox"
                  name="op1_3"
                  id="op1_3"
                  checked={ order_products.op1_3 == 1 ? "checked" : "" }
                  readOnly
                />
                <label for="op1_3" />
              </div>
              <div>
                { order_products.op1_3_dt === null ? "—" : <Moment format="MM/DD">{order_products.op1_3_dt}</Moment>}
              </div>
            </div>
            <div class="opdiv">
              <div>
                <input
                  type="checkbox"
                  name="op1_4"
                  id="op1_4"
                  checked={ order_products.op1_4 == 1 ? "checked" : "" }
                  readOnly
                />
                <label for="op1_4" />
              </div>
              <div>
                { order_products.op1_4_dt === null ? "—" : <Moment format="MM/DD">{order_products.op1_4_dt}</Moment>}
              </div>
            </div>
            <div class="opdiv">
              <div>
                <input
                  type="checkbox"
                  name="op1_5"
                  id="op1_5"
                  checked={ order_products.op1_5 == 1 ? "checked" : "" }
                  readOnly
                />
                <label for="op1_5" />
              </div>
              <div>
                { order_products.op1_5_dt === null ? "—" : <Moment format="MM/DD">{order_products.op1_5_dt}</Moment>}
              </div>
            </div>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { order_products, loading, error } = this.props.orderProductTable;

    if(loading) {
    console.log("loading")
      return <div className=""><h5>Loading...</h5></div>
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    console.log("load success",this.props.orderProductTable.order_products)
    console.log(this.props.id)
    return (
      !order_products.length
          ? <div className=''><h5>No order products found.</h5></div>
          :
      <div class="">
        <table class="pto">
          <tbody>
            {this.renderOrderProducts(order_products)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrderProductTable;
