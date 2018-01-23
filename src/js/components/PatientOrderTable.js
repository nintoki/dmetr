import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { Switch, Route, Link } from 'react-router-dom'

class OrderTable extends Component {
  componentWillMount() {
    this.props.fetchPtOrders(this.props.patient_id);
  }

  renderOrders(orders) {
    // console.log("order props", this.props)
    return orders.map((orders) => {
      return (
        orders.description === null
        ?
        <tr key={orders.op_id}>
          <td><Moment format="MM/DD/YY">{orders.created}</Moment></td>
          <td className={ orders.rush == 1 ? "rush" : "" }>{orders.id}</td>
          <td>
            <strong className="red">No products found.</strong>
          </td>
          <td></td>
          <td className={ orders.oot == 1 ? "oot" : "" }>{orders.clinic}</td>
          <td>{orders.insurance}</td>
          <td style={{width:'85px'}}><Link to={"/order/" + orders.id}><button className="btn btn-primary btn-sm viewButton">View</button></Link></td>
        </tr>
        :
        <tr key={orders.op_id}  class={ orders.status == 1 ? "archived" : "" }>
          <td><Moment format="MM/DD/YY">{orders.created}</Moment></td>
          <td className={ orders.rush == 1 ? "rush" : "" }><Link to={"/order/" + orders.id}>{orders.id}</Link></td>
          <td>
             {orders.code} - {orders.short_desc} <br /> <span className="light">{orders.description}</span>
            <br />
            { orders.exchange == 1 ? <span className="badge badge-info">exchanged </span> : "" }
            { orders.rtn == 1 ? <span className="badge badge-warning">returned</span> : "" }
          </td>
          <td>
            <div class={ orders.status == 1 ? "hidden" : "" }>
              <div className={ (orders.op1_1 == 1 && orders.op1_2 == 1 && orders.op1_3 == 1 && orders.op1_4 == 1 && orders.op1_5 == 1 ) ? "hidden" : "op1" }>
                <div className="opdiv">
                  <div className="optit">Ins</div>
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
                <div className="opdiv">
                  <div className="optit">Meas</div>
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
                <div className="opdiv">
                  <div className="optit">Rx</div>
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
                <div className="opdiv">
                  <div className="optit">Note</div>
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
                <div className="opdiv">
                  <div className="optit">Auth</div>
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
              </div>
              <div className={ (orders.op1_1 == 1 && orders.op1_2 == 1 && orders.op1_3 == 1 && orders.op1_4 == 1 && orders.op1_5 == 1 ) ? "op2" : "hidden" }>
                <div className="opdiv">
                  <div className="optit">Ordr</div>
                  <div>
                    <input
                      type="checkbox"
                      name="op2_1"
                      id="op2_1"
                      checked={ orders.op2_1 == 1 }
                      readOnly
                    />
                    <label for="op2_1" />
                  </div>
                  <div>
                    { (orders.op2_1_dt === null || orders.op2_1_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{orders.op2_1_dt}</Moment>}
                  </div>
                </div>
                <div className="opdiv">
                  <div className="optit">Rcvd</div>
                  <div>
                    <input
                      type="checkbox"
                      name="op2_2"
                      id="op2_2"
                      checked={ orders.op2_2 == 1 }
                      readOnly
                    />
                    <label for="op2_2" />
                  </div>
                  <div>
                    { (orders.op2_2_dt === null || orders.op2_2_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{orders.op2_2_dt}</Moment>}
                  </div>
                </div>
                <div className="opdiv">
                  <div className="optit">Bill</div>
                  <div>
                    <input
                      type="checkbox"
                      name="op2_3"
                      id="op2_3"
                      checked={ orders.op2_3 == 1 }
                      readOnly
                    />
                    <label for="op2_3" />
                  </div>
                  <div>
                    { (orders.op2_3_dt === null || orders.op2_3_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{orders.op2_3_dt}</Moment>}
                  </div>
                </div>
              </div>
            </div>
            <div class={ orders.status == 1 ? "" : "hidden" }><b>Product fulfilled</b> - <Moment format="MM/DD/YY">{orders.op2_3_dt}</Moment></div>
          </td>
          <td className={ orders.oot == 1 ? "oot" : "" }>{orders.clinic}</td>
          <td>{orders.insurance}</td>
          <td style={{width:'85px'}}><Link to={"/order/" + orders.id}><button className="btn btn-primary btn-sm viewButton">View</button></Link></td>
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
          ? <div className='container divcon'>
              <h2>No orders found.</h2>
              <Link
                to={{
                  pathname: '/orderNew/'+this.props.patient_name,
                  state: {patient_id: this.props.patient_id, oot: false, created: new Date() }
                }}
              >
                <button className="btn btn-success orderButton" style={{marginTop:'20px'}}>
                  Add Order
                </button>
              </Link>
            </div>
          :
          <div className="col-md-12 modalDiv" style={{marginTop:'20px'}}>
            <h2>Orders</h2>
            <Link
              to={{
                pathname: '/orderNew/'+this.props.patient_name,
                state: {patient_id: this.props.patient_id, oot: false, created: new Date() }
              }}
              >
                <button className="btn btn-success addButton">
                  New Order
                </button>
            </Link>
          <table className="pto">
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
