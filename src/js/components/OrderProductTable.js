import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { Switch, Route, Link } from 'react-router-dom'
import { fetchPtOrderProducts, fetchOrderProductsSuccess, fetchOrderProductsFailure, resetOrderProducts } from '../actions/orderProductActions'


class OrderProductTable extends Component {
  componentWillMount() {
    this.props.fetchPtOrderProducts(this.props.order_id);
  }

  renderOrderProducts(order_products) {
    // console.log("render op",this.props.orderProductTable.order_products)
    return order_products.map((order_products) => {
      return (
        <tr key={order_products.id} className={ order_products.status == 1 ? "archived" : "" }>
          <td className={ order_products.rush == 1 ? "rush" : "" }>
            {order_products.short_desc} - <span className="light">{order_products.description}</span>
            <br />
            { order_products.exchange == 1 ? <span className="badge badge-info">exchanged </span> : "" }
            { order_products.rtn == 1 ? <span className="badge badge-warning">returned</span> : "" }
          </td>
          <td>
            <div className={ order_products.status == 1 ? "hidden" : "" }>
              <div className="op1">
                <div className="opdiv">
                  <div className="optit">Ins</div>
                  <div>
                    <input
                      type="checkbox"
                      name="op1_1"
                      id="op1_1"
                      checked={ order_products.op1_1 == 1 }
                      readOnly
                    />
                    <label for="op1_1" />
                  </div>
                  <div>
                    { (order_products.op1_1_dt === null || order_products.op1_1_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{order_products.op1_1_dt}</Moment>}
                  </div>
                </div>
                <div className="opdiv">
                  <div className="optit">Meas</div>
                  <div>
                    <input
                      type="checkbox"
                      name="op1_2"
                      id="op1_2"
                      checked={ order_products.op1_2 == 1 }
                      readOnly
                    />
                    <label for="op1_2" />
                  </div>
                  <div>
                    { (order_products.op1_2_dt === null || order_products.op1_2_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{order_products.op1_2_dt}</Moment>}
                  </div>
                </div>
                <div className="opdiv">
                  <div className="optit">Rx</div>
                  <div>
                    <input
                      type="checkbox"
                      name="op1_3"
                      id="op1_3"
                      checked={ order_products.op1_3 == 1 }
                      readOnly
                    />
                    <label for="op1_3" />
                  </div>
                  <div>
                    { (order_products.op1_3_dt === null || order_products.op1_3_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{order_products.op1_3_dt}</Moment>}
                  </div>
                </div>
                <div className="opdiv">
                  <div className="optit">Note</div>
                  <div>
                    <input
                      type="checkbox"
                      name="op1_4"
                      id="op1_4"
                      checked={ order_products.op1_4 == 1 }
                      readOnly
                    />
                    <label for="op1_4" />
                  </div>
                  <div>
                    { (order_products.op1_4_dt === null || order_products.op1_4_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{order_products.op1_4_dt}</Moment>}
                  </div>
                </div>
                <div className="opdiv">
                  <div className="optit">Auth</div>
                  <div>
                    <input
                      type="checkbox"
                      name="op1_5"
                      id="op1_5"
                      checked={ order_products.op1_5 == 1 }
                      readOnly
                    />
                    <label for="op1_5" />
                  </div>
                  <div>
                    { (order_products.op1_5_dt === null || order_products.op1_5_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{order_products.op1_5_dt}</Moment>}
                  </div>
                </div>
              </div>
              <div className="op2">
                <div className="opdiv">
                  <div className="optit">Ordr</div>
                  <div>
                    <input
                      type="checkbox"
                      name="op2_1"
                      id="op2_1"
                      checked={ order_products.op2_1 == 1 }
                      readOnly
                    />
                    <label for="op2_1" />
                  </div>
                  <div>
                    { (order_products.op2_1_dt === null || order_products.op2_1_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{order_products.op2_1_dt}</Moment>}
                  </div>
                </div>
                <div className="opdiv">
                  <div className="optit">Rcvd</div>
                  <div>
                    <input
                      type="checkbox"
                      name="op2_2"
                      id="op2_2"
                      checked={ order_products.op2_2 == 1 }
                      readOnly
                    />
                    <label for="op2_2" />
                  </div>
                  <div>
                    { (order_products.op2_2_dt === null || order_products.op2_2_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{order_products.op2_2_dt}</Moment>}
                  </div>
                </div>
                <div className="opdiv">
                  <div className="optit">Bill</div>
                  <div>
                    <input
                      type="checkbox"
                      name="op2_3"
                      id="op2_3"
                      checked={ order_products.op2_3 == 1 }
                      readOnly
                    />
                    <label for="op2_3" />
                  </div>
                  <div>
                    { (order_products.op2_3_dt === null || order_products.op2_3_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{order_products.op2_3_dt}</Moment>}
                  </div>
                </div>
              </div>
            </div>
            <div className={ order_products.status == 1 ? "" : "hidden" }><b>Product fulfilled</b> - <Moment format="MM/DD/YY">{order_products.op2_3_dt}</Moment></div>
          </td>
          <td style={{maxWidth:'85px'}}>
            <Link
              to={{
                pathname: '/orderProductUpdate',
                state: {
                  activeOrderProduct: order_products
                }
              }}
            >
              <button className="btn btn-primary btn-sm editButton optab">Edit</button>
            </Link>

            {/* <Link to={"/orderProduct/" + order_products.id}>
              <button className="btn btn-primary btn-sm">Edit</button>
            </Link> */}
          </td>
        </tr>
      );
    });
  }

  render() {
    const { order_products, loading, error } = this.props.orderProductTable;
    const nullDate = '2000-12-25 00:00:00'
    if(loading) {
    // console.log("loading")
      return <div className=""><strong>Loading...</strong></div>
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    // console.log("order id:", this.props.id)
    // console.log("load success", this.props.orderProductTable.order_products)
    return (
      !order_products.length
          ? <div className='col-md-12 modalDiv'>
              <h2>Products</h2>
              <Link to={{
                pathname: '/orderProductNew',
                state: {
                  order_id: this.props.order_id,
                  op1_1: false,
                  op1_2: false,
                  op1_3: false,
                  op1_4: false,
                  op1_5: false,
                  op2_1: false,
                  op2_2: false,
                  op2_3: false,
                  op1_1_dt: nullDate,
                  op1_2_dt: nullDate,
                  op1_3_dt: nullDate,
                  op1_4_dt: nullDate,
                  op1_5_dt: nullDate,
                  op2_1_dt: nullDate,
                  op2_2_dt: nullDate,
                  op2_3_dt: nullDate,
                  rush: false,
                  exchange: false,
                  rtn: false,
                  status: false
                }
              }}>
                <button className="btn btn-success addButton">Add Products</button>
              </Link>
              <table className="pto">
                <thead>
                  <tr>
                    <td>Products</td>
                    <td>Phase</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong className="red">No products found.</strong></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          :
      <div className="col-md-12 modalDiv">
        <h2>Products</h2>
        <Link to={{
          pathname: '/orderProductNew',
          state: {
            order_id: this.props.order_id,
            op1_1: false,
            op1_2: false,
            op1_3: false,
            op1_4: false,
            op1_5: false,
            op2_1: false,
            op2_2: false,
            op2_3: false,
            op1_1_dt: nullDate,
            op1_2_dt: nullDate,
            op1_3_dt: nullDate,
            op1_4_dt: nullDate,
            op1_5_dt: nullDate,
            op2_1_dt: nullDate,
            op2_2_dt: nullDate,
            op2_3_dt: nullDate,
            rush: false,
            exchange: false,
            rtn: false,
            status: false
          }
        }}>
          <button className="btn btn-success addButton">Add Products</button>
        </Link>
        <table className="pto">
          <thead>
            <tr>
              <td>Products</td>
              <td>Phase</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {this.renderOrderProducts(order_products)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrderProductTable;
