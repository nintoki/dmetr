import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import Moment from 'react-moment'
import OrderPage from "../pages/OrderPage"
import matchSorter from 'match-sorter'
import ReactTable from 'react-table'
import Phases from "./Phases"

class OrderTable extends Component {


  componentWillMount() {
    this.props.fetchOrders();
  }

  render() {
    const { orders, loading, error } = this.props.orderTable;
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
          data={orders.filter((o) => { if (o.status == 0) return true })}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
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
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["created"] }),
              filterAll: true,
              Cell: row => (
                <Moment format="MM/DD/YY">{row.value}</Moment>
              )
            },
            {
              Header: 'Order #',
              id: 'id',
              accessor: 'rush',
              width: 110,
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["id"] }),
              filterAll: true,
              Cell: row => (
                <div className={ row.original.rush == 1 ? "rush" : "" }>
                  {row.original.id}
                </div>
              )
            },
            {
              Header: 'Name',
              accessor: 'patient_name',
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["patient_name"] }),
              filterAll: true,
              Cell: row => (
                <Link className="pos-abs" to={"/patient/" + row.original.patient_id}>{row.value}</Link>
              )
            },
            {
              Header: 'Products',
              accessor: 'short_desc',
              width: 340,
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["short_desc"] }),
              filterAll: true,
              Cell: row => (
                <div>
                  {row.original.code} - {row.value}
                  { row.original.exchange == 1 ? <span className="badge badge-info">exchanged </span> : "" }
                  { row.original.rtn == 1 ? <span className="badge badge-default">returned</span> : "" }
                  <br /> <span className="light overflow">{row.original.description}</span>
                </div>
              )
            },
            {
              Header: 'Phase',
              accessor: 'op1_1',
              width: 255,
              Cell: row => (
                <Phases phase={row.original} />
              )
            },
            {
              Header: 'Clinic',
              accessor: 'clinic',
              width:130,
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["clinic"] }),
              filterAll: true,
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
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["insurance"] }),
              filterAll: true
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
