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
      return <div><h1>Orders</h1><h3>Loading...</h3></div>
    } else if(error) {
      return <div><h2>No orders found.</h2></div>
    }

    function removeDuplicates(myArr, prop) {
      return myArr.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
    }

    let pts = removeDuplicates(orders, "id")

    return (
      // !orders.length
      //     ? <div className='container divcon'><h2>No orders found.</h2></div>
      //     :
      <div className="row modalDiv">
        <h2>Orders</h2>
        <ReactTable
          data={pts.filter((o) => { if (o.status == 0) return true })}
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
              accessor: 'id',
              width: 100
            },
            {
              Header: 'Name',
              accessor: 'patient_name',
              Cell: row => (
                <Link className="pos-abs" to={"/patient/" + row.original.patient_id}>{row.value}</Link>
              )
            },
            {
              Header: 'Clinic',
              accessor: 'clinic',
              width:130,
              Cell: row => (
                <div className={ row.original.oot == 1 ? "oot cap" : "cap" }>
                  {row.value}
                </div>
              )
            },
            {
              Header: 'Insurance',
              accessor: 'insurance',
              width: 110,
              Cell: row => (
                <div className="cap">
                  {row.value}
                </div>
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
