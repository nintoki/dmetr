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

    if(loading) {
      return <div className="container"><h1>Orders</h1><h3>Loading...</h3></div>
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      !orders.length
          ? <div className='container divcon'><h2>No orders archived.</h2></div>
          :
          <div class="container divcon archived modalFormat">
            <h1>Orders - <i>Archive</i></h1>
            <ReactTable
              data={orders.filter((o) => { if (o.status == 1) return true })}
              columns={[
                {
                  Header: '',
                  width: 0,
                  Cell: row => (
                    <Link to={"/order/" + row.original.id}><div className="row-link"></div></Link>
                  )
                },
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
                  accessor: 'patient_name',
                  Cell: row => (
                    <Link className="pos-abs" to={"/patient/" + row.original.patient_id}>{row.value}</Link>
                  )
                },
                {
                  Header: 'Products',
                  accessor: 'description',
                  width: 340,
                  Cell: row => (
                    <div>
                      {row.original.code} - {row.original.short_desc}
                      { row.original.exchange == 1 ? <span className="badge badge-info">exchanged </span> : "" }
                      { row.original.rtn == 1 ? <span className="badge badge-default">returned</span> : "" }
                      <br /> <span className="light overflow">{row.value}</span>
                    </div>
                  )
                },
                {
                  Header: 'Phase',
                  // accessor: 'op1_1',
                  width: 255,
                  Cell: row => (
                    <div>
                      <div className={row.original.status == 1 ? "flfd" : "hidden" }><b>Fulfilled</b> - <Moment format="MM/DD/YY">{row.original.op3_4_dt}</Moment></div>
                    </div>
                  )
                },
                {
                  Header: 'Clinic',
                  accessor: 'clinic',
                  width:130,
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
