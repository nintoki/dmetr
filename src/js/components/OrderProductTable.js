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
    console.log("render op",this.props.orderProductTable.order_products)
    return order_products.map((order_products) => {
      return (
        <tr key={order_products.id} className={ order_products.status == 1 ? "archived" : "" }>
          <td style={{width:'90px'}}><Moment format="MM/DD/YY">{order_products.created}</Moment></td>
          <td className={ order_products.rush == 1 ? "rush prewrap" : "prewrap" }>
            {order_products.code} - {order_products.short_desc}
            { order_products.exchange == 1 ? <span className="badge badge-info">exchanged </span> : "" }
            { order_products.rtn == 1 ? <span className="badge badge-default">returned</span> : "" }
            <br /> <span className="light">{order_products.description}</span>
          </td>
          <td>
            <div className={ order_products.status == 1 ? "hidden" : "" }>
              <div className={ (order_products.op1_1 == 1 && order_products.op1_2 == 1 && order_products.op1_3 == 1 && order_products.op1_4 == 1 && order_products.op1_5 == 1 ) ? "hidden" : "op1" }>
                <div className="opdiv">
                  <div className="optit">Demo</div>
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
                  <div className="optit">Ins</div>
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
                  <div className="optit">EOB</div>
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
                  <div className="optit">og.Rx</div>
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
                  <div className="optit">Meas</div>
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
              <div className={ (order_products.op1_1 == 0 || order_products.op1_2 == 0 || order_products.op1_3 == 0 || order_products.op1_4 == 0 || order_products.op1_5 == 0 || order_products.op1_1 == 1 && order_products.op1_2 == 1 && order_products.op1_3 == 1 && order_products.op1_4 == 1 && order_products.op1_5 == 1 && order_products.op2_1 == 1 && order_products.op2_2 == 1 && order_products.op2_3 == 1 && order_products.op2_4 == 1 && order_products.op2_5 == 1) ? "hidden" : "op2" }>
                <div className="opdiv">
                  <div className="optit">sn.Rx</div>
                  <div>
                    <input
                      type="checkbox"
                      name="op2_5"
                      id="op2_5"
                      checked={ order_products.op2_5 == 1 }
                      readOnly
                    />
                    <label for="op2_5" />
                  </div>
                  <div>
                    { (order_products.op2_5_dt === null || order_products.op2_5_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{order_products.op2_5_dt}</Moment>}
                  </div>
                </div>
                <div className="opdiv">
                  <div className="optit">rc.Rx</div>
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
                  <div className="optit">LMN</div>
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
                  <div className="optit">Note</div>
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
                <div className="opdiv">
                  <div className="optit">Auth</div>
                  <div>
                    <input
                      type="checkbox"
                      name="op2_4"
                      id="op2_4"
                      checked={ order_products.op2_4 == 1 }
                      readOnly
                    />
                    <label for="op2_4" />
                  </div>
                  <div>
                    { (order_products.op2_4_dt === null || order_products.op2_4_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{order_products.op2_4_dt}</Moment>}
                  </div>
                </div>
              </div>
              <div className={(order_products.op1_1 == 0 || order_products.op1_2 == 0 || order_products.op1_3 == 0 || order_products.op1_4 == 0 || order_products.op1_5 == 0 || order_products.op2_1 == 0 || order_products.op2_2 == 0 || order_products.op2_3 == 0 || order_products.op2_4 == 0 || order_products.op2_5 == 0 || order_products.op3_1 == 1 && order_products.op3_2 == 1 && order_products.op3_3 == 1 && order_products.op3_4 == 1 ) ? "hidden" : "op3" }>
                <div className="opdiv">
                  <div className="optit">Ordr</div>
                  <div>
                    <input
                      type="checkbox"
                      name="op3_1"
                      id="op3_1"
                      checked={ order_products.op3_1 == 1 }
                      readOnly
                    />
                    <label for="op3_1" />
                  </div>
                  <div>
                    { (order_products.op3_1_dt === null || order_products.op3_1_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{order_products.op3_1_dt}</Moment>}
                  </div>
                </div>
                <div className="opdiv">
                  <div className="optit">Dstb</div>
                  <div>
                    <input
                      type="checkbox"
                      name="op3_2"
                      id="op3_2"
                      checked={ order_products.op3_2 == 1 }
                      readOnly
                    />
                    <label for="op3_2" />
                  </div>
                  <div>
                    { (order_products.op3_2_dt === null || order_products.op3_2_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{order_products.op3_2_dt}</Moment>}
                  </div>
                </div>
                <div className="opdiv">
                  <div className="optit">Tckt</div>
                  <div>
                    <input
                      type="checkbox"
                      name="op3_3"
                      id="op3_3"
                      checked={ order_products.op3_3 == 1 }
                      readOnly
                    />
                    <label for="op3_3" />
                  </div>
                  <div>
                    { (order_products.op3_3_dt === null || order_products.op3_3_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{order_products.op3_3_dt}</Moment>}
                  </div>
                </div>
                <div className="opdiv">
                  <div className="optit">Bill</div>
                  <div>
                    <input
                      type="checkbox"
                      name="op3_4"
                      id="op3_4"
                      checked={ order_products.op3_4 == 1 }
                      readOnly
                    />
                    <label for="op3_4" />
                  </div>
                  <div>
                    { (order_products.op3_4_dt === null || order_products.op3_4_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{order_products.op3_4_dt}</Moment>}
                  </div>
                </div>
              </div>
              <div className={(order_products.op1_1 == 1 && order_products.op1_2 == 1 && order_products.op1_3 == 1 && order_products.op1_4 == 1 && order_products.op1_5 == 1 && order_products.op2_1 == 1 && order_products.op2_2 == 1 && order_products.op2_3 == 1 && order_products.op2_4 == 1 && order_products.op2_5 == 1 && order_products.op3_1 == 1 && order_products.op3_2 == 1 && order_products.op3_3 == 1 && order_products.op3_4 == 1 ) ? "" : "hidden" }><strong className="red">Completed - Please archive</strong></div>
            </div>
            <div className={ order_products.status == 1 ? "oparch" : "hidden" }><b>Fulfilled</b> - <Moment format="MM/DD/YY">{order_products.op3_4_dt}</Moment></div>
          </td>
          <td style={{maxWidth:'100px'}}>
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
                  created: new Date(),
                  order_id: this.props.order_id,
                  op1_1: false,
                  op1_2: false,
                  op1_3: false,
                  op1_4: false,
                  op1_5: false,
                  op2_1: false,
                  op2_2: false,
                  op2_3: false,
                  op2_4: false,
                  op2_5: false,
                  op3_1: false,
                  op3_2: false,
                  op3_3: false,
                  op3_4: false,
                  op1_1_dt: nullDate,
                  op1_2_dt: nullDate,
                  op1_3_dt: nullDate,
                  op1_4_dt: nullDate,
                  op1_5_dt: nullDate,
                  op2_1_dt: nullDate,
                  op2_2_dt: nullDate,
                  op2_3_dt: nullDate,
                  op2_4_dt: nullDate,
                  op2_5_dt: nullDate,
                  op3_1_dt: nullDate,
                  op3_2_dt: nullDate,
                  op3_3_dt: nullDate,
                  op3_4_dt: nullDate,
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
                    <td>Date</td>
                    <td>Products</td>
                    <td>Phase</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong className="red">Please add products.</strong></td>
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
            created: new Date(),
            order_id: this.props.order_id,
            op1_1: false,
            op1_2: false,
            op1_3: false,
            op1_4: false,
            op1_5: false,
            op2_1: false,
            op2_2: false,
            op2_3: false,
            op2_4: false,
            op2_5: false,
            op3_1: false,
            op3_2: false,
            op3_3: false,
            op3_4: false,
            op1_1_dt: nullDate,
            op1_2_dt: nullDate,
            op1_3_dt: nullDate,
            op1_4_dt: nullDate,
            op1_5_dt: nullDate,
            op2_1_dt: nullDate,
            op2_2_dt: nullDate,
            op2_3_dt: nullDate,
            op2_4_dt: nullDate,
            op2_5_dt: nullDate,
            op3_1_dt: nullDate,
            op3_2_dt: nullDate,
            op3_3_dt: nullDate,
            op3_4_dt: nullDate,
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
              <td>Date</td>
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
