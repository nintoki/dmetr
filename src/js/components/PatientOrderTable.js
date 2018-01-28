import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { Switch, Route, Link } from 'react-router-dom'
import ReactTable from 'react-table'
import Phases from "./Phases"

class OrderTable extends Component {
  componentWillMount() {
    this.props.fetchPtOrders(this.props.patient_id);
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
          ? <div className="col-md-12 modalDiv" style={{marginTop:'20px'}}>
              <h3>No orders found.</h3>
              <Link
                to={{
                  pathname: '/orderNew/'+this.props.patient_name,
                  state: {patient_id: this.props.patient_id, oot: false, created: new Date() }
                }}
              >
                <button className="btn btn-success plusButton" style={{margin:'5px 0 10px'}}>
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
            <ReactTable
              data={orders}
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
                    <div className={row.original.status == 1 ? "archived" : ""}>
                      <div className={ row.original.rush == 1 ? "rush" : "" }>
                        {row.original.id}
                      </div>
                    </div>
                  )
                },
                {
                  Header: 'Products',
                  accessor: 'description',
                  Cell: row => (
                    row.original.code === null
                    ?
                    <div><strong className="red">Please add products.</strong></div>
                    :
                    <div className={row.original.status == 1 ? "archived" : ""}>
                      {row.original.code} - {row.original.short_desc}
                      { row.original.exchange == 1 ? <span className="badge badge-info">exchanged </span> : "" }
                      { row.original.rtn == 1 ? <span className="badge badge-default">returned</span> : "" }
                      <br /> <span className="light overflow">{row.value}</span>
                    </div>
                  )
                },
                {
                  Header: 'Phase',
                  accessor: 'op1_1',
                  width: 255,
                  Cell: row => (
                    <div>
                      <div className={row.original.status == 1 ? "hidden" : ""}>
                        <Phases phase={row.original} />
                      </div>
                      <div className={ row.original.status == 1 ? "flfd" : "hidden" }><b>Fulfilled</b> - <Moment format="MM/DD/YY">{row.original.op3_4_dt}</Moment></div>
                    </div>

                  )
                },
                {
                  Header: 'Clinic',
                  accessor: 'clinic',
                  width:130,
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
                }
              ]}
              defaultPageSize={5}
              className="-striped -highlight"
            />
        </div>
    );
  }
}

export default OrderTable;
