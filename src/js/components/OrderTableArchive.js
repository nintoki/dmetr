import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import Moment from 'react-moment'
import OrderPage from "../pages/OrderPage"

import ReactTable from 'react-table'

class OrderTable extends Component {


  componentWillMount() {
    this.props.fetchOrders();
  }

  render() {
    const { orders, loading, error } = this.props.orderTable;
    const openOrders = orders.filter((o) => {
      if (o.status == 1) return true
    })

    if(loading) {
      return <div className="container"><h1>Orders</h1><h3>Loading...</h3></div>
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      !orders.length
          ? <div className='container divcon'><h2>No orders found.</h2></div>
          :
      <div class="container divcon archived modalFormat">
        <h1>Orders - Archive</h1>
        <ReactTable
          data={openOrders}
          columns={[
            {
              Header: 'Date',
              accessor: 'created',
              width: 90,
              Cell: row => (
                <Moment format="MM/DD/YY">{row.value}</Moment>
              )
            },
            {
              Header: 'Order #',
              id: 'id',
              accessor: 'id',
              width: 110,
              Cell: row => (
                <div class={ row.original.rush == 1 ? "rush" : "" }>
                  {row.value}
                </div>
              )
            },
            {
              Header: 'Name',
              accessor: 'patient_name'
            },
            {
              Header: 'Products',
              accessor: 'description',
              width: 300,
              Cell: row => (
                <div style={{width: '100%', height: '100%'}}>
                  {row.original.short_desc} - {row.value}
                  <br />
                  { row.original.exchange == 1 ? <span class="badge badge-info">exchanged </span> : "" }
                  { row.original.rtn == 1 ? <span class="badge badge-warning">returned</span> : "" }
                </div>
              )
            },
            {
              Header: 'Phase',
              // accessor: 'op1_1',
              width: 255,
              Cell: row => (
                <div>
                  <div class={ row.original.status == 1 ? "hidden" : "" }>
                    <div class={ (row.original.op1_1 == 1 && row.original.op1_2 == 1 && row.original.op1_3 == 1 && row.original.op1_4 == 1 && row.original.op1_5 == 1 ) ? "hidden" : "op1" }>
                      <div class="opdiv">
                        <div class="optit">Ins</div>
                        <div>
                          <input
                            type="checkbox"
                            name="op1_1"
                            id="op1_1"
                            checked={ row.original.op1_1 == 1 }
                            readOnly
                          />
                          <label for="op1_1" />
                        </div>
                        <div>
                          { (row.original.op1_1_dt === null || row.original.op1_1_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{row.original.op1_1_dt}</Moment>}
                        </div>
                      </div>
                      <div class="opdiv">
                        <div class="optit">Meas</div>
                        <div>
                          <input
                            type="checkbox"
                            name="op1_2"
                            id="op1_2"
                            checked={ row.original.op1_2 == 1 }
                            readOnly
                          />
                          <label for="op1_2" />
                        </div>
                        <div>
                          { (row.original.op1_2_dt === null || row.original.op1_2_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{row.original.op1_2_dt}</Moment>}
                        </div>
                      </div>
                      <div class="opdiv">
                        <div class="optit">Rx</div>
                        <div>
                          <input
                            type="checkbox"
                            name="op1_3"
                            id="op1_3"
                            checked={ row.original.op1_3 == 1 }
                            readOnly
                          />
                          <label for="op1_3" />
                        </div>
                        <div>
                          { (row.original.op1_3_dt === null || row.original.op1_3_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{row.original.op1_3_dt}</Moment>}
                        </div>
                      </div>
                      <div class="opdiv">
                        <div class="optit">Note</div>
                        <div>
                          <input
                            type="checkbox"
                            name="op1_4"
                            id="op1_4"
                            checked={ row.original.op1_4 == 1 }
                            readOnly
                          />
                          <label for="op1_4" />
                        </div>
                        <div>
                          { (row.original.op1_4_dt === null || row.original.op1_4_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{row.original.op1_4_dt}</Moment>}
                        </div>
                      </div>
                      <div class="opdiv">
                        <div class="optit">Auth</div>
                        <div>
                          <input
                            type="checkbox"
                            name="op1_5"
                            id="op1_5"
                            checked={ row.original.op1_5 == 1 }
                            readOnly
                          />
                          <label for="op1_5" />
                        </div>
                        <div>
                          { (row.original.op1_5_dt === null || row.original.op1_5_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{row.original.op1_5_dt}</Moment>}
                        </div>
                      </div>
                    </div>
                    <div class={ (row.original.op1_1 == 1 && row.original.op1_2 == 1 && row.original.op1_3 == 1 && row.original.op1_4 == 1 && row.original.op1_5 == 1 ) ? "op2" : "hidden" }>
                      <div class="opdiv">
                        <div class="optit">Ship</div>
                        <div>
                          <input
                            type="checkbox"
                            name="op2_1"
                            id="op2_1"
                            checked={ row.original.op2_1 == 1 }
                            readOnly
                          />
                          <label for="op2_1" />
                        </div>
                        <div>
                          { (row.original.op2_1_dt === null || row.original.op2_1_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{row.original.op2_1_dt}</Moment>}
                        </div>
                      </div>
                      <div class="opdiv">
                        <div class="optit">Rcvd</div>
                        <div>
                          <input
                            type="checkbox"
                            name="op2_2"
                            id="op2_2"
                            checked={ row.original.op2_2 == 1 }
                            readOnly
                          />
                          <label for="op2_2" />
                        </div>
                        <div>
                          { (row.original.op2_2_dt === null || row.original.op2_2_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{row.original.op2_2_dt}</Moment>}
                        </div>
                      </div>
                      <div class="opdiv">
                        <div class="optit">Bill</div>
                        <div>
                          <input
                            type="checkbox"
                            name="op2_3"
                            id="op2_3"
                            checked={ row.original.op2_3 == 1 }
                            readOnly
                          />
                          <label for="op2_3" />
                        </div>
                        <div>
                          { (row.original.op2_3_dt === null || row.original.op2_3_dt === "2000-12-25 00:00:00") ? "—" : <Moment format="MM/DD">{row.original.op2_3_dt}</Moment>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class={ row.original.status == 1 ? "" : "hidden" }><b>Product fulfilled</b> - <Moment format="MM/DD/YY">{row.original.op2_3_dt}</Moment></div>
                </div>
              )
            },
            {
              Header: 'Clinic',
              accessor: 'clinic',
              width:110,
              Cell: row => (
                <div class={ row.original.oot == 1 ? "oot" : "" }>
                  {row.value}
                </div>
              )
            },
            {
              Header: 'Insurance',
              accessor: 'insurance',
              width: 110,
            },
            {
              Header: '',
              width: 105,
              Cell: row => (
                <Link to={"/order/" + row.original.id}><button class="btn btn-primary btn-sm viewButton">View</button></Link>
              )
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />

      </div>
    );
  }
}

export default OrderTable;
