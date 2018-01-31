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
      if (o.status == 0) return true
    })

    if(loading) {
      return <div className="container divcon"><h1>Orders</h1><h3>Loading...</h3></div>
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      !orders.length
          ? <div className='container divcon'><h2>No orders found.</h2></div>
          :
      <div className="container divcon modalFormat">
        <h1>Orders</h1>
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
                <div className={ row.original.rush == 1 ? "rush" : "" }>
                  {row.original.id}
                </div>
              )
            },
            {
              Header: 'Name',
              accessor: 'patient_name',
              Cell: row => (
                <Link to={"/patient/" + row.original.patient_id}>{row.value}</Link>
              )
            },
            {
              Header: 'Products',
              accessor: 'description',
              width: 300,
              Cell: row => (
                <div style={{width: '100%', height: '100%'}}>
                  {row.original.short_desc} - <span className="light">{row.value}</span>
                  <br />
                  { row.original.exchange == 1 ? <span className="badge badge-info">exchanged </span> : "" }
                  { row.original.rtn == 1 ? <span className="badge badge-warning">returned</span> : "" }
                </div>
              )
            },
            {
              Header: 'Phase',
              accessor: 'op1_1',
              width: 255,
              Cell: row => (
                <div>
                  <div className={ (row.original.op1_1 == 1 && row.original.op1_2 == 1 && row.original.op1_3 == 1 && row.original.op1_4 == 1 && row.original.op1_5 == 1 ) ? "hidden" : "op1" }>
                    <div className="opdiv">
                      <div className="optit">Ins</div>
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
                    <div className="opdiv">
                      <div className="optit">Meas</div>
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
                    <div className="opdiv">
                      <div className="optit">Rx</div>
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
                    <div className="opdiv">
                      <div className="optit">Note</div>
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
                    <div className="opdiv">
                      <div className="optit">Auth</div>
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
                  <div className={ (row.original.op1_1 == 1 && row.original.op1_2 == 1 && row.original.op1_3 == 1 && row.original.op1_4 == 1 && row.original.op1_5 == 1 ) ? "op2" : "hidden" }>
                    <div className="opdiv">
                      <div className="optit">Ordr</div>
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
                    <div className="opdiv">
                      <div className="optit">Rcvd</div>
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
                    <div className="opdiv">
                      <div className="optit">Bill</div>
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
              )
            },
            {
              Header: 'Clinic',
              accessor: 'clinic',
              width:110,
              Cell: row => (
                <div className={ row.original.oot == 1 ? "oot" : "" }>
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
                <Link to={"/order/" + row.original.id}><button className="btn btn-primary btn-sm viewButton">View</button></Link>
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
