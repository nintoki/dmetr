import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { Switch, Route, Link } from 'react-router-dom'
import PatientPage from "../pages/PatientPage"
import ReactTable from 'react-table'

class PatientTable extends Component {
  componentWillMount() {
    this.props.fetchPatients();
  }

  render() {
    const { patients, loading, error } = this.props.patientTable;

    if(loading) {
      return <div className="container divcon"><h1>Patients</h1><h3>Loading...</h3></div>
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div class="container divcon">
        <h1>Patients</h1>
        <ReactTable
          data={patients}
          columns={[
            {
              Header: 'ID',
              accessor: 'id',
            },
            {
              Header: 'Name',
              Cell: row => (
                <div>
                  {row.original.patient_name}
                </div>
              )
            },
            {
              Header: 'Address',
              Cell: row => (
                <div>
                  {row.original.address_1}<br />{row.original.address_2}<br />{row.original.city}, {row.original.st} {row.original.zip}
                </div>
              )
            },
            {
              Header: 'BT ID',
              accessor: 'bt_id',
              width: 80,
            },
            {
              Header: 'Insurance',
              width: 100,
              Cell: row => (
                <div>
                  {row.original.ins_1}<br />
                  {row.original.ins_2}<br />
                  {row.original.ins_3}<br />
                </div>
              )
            },
            {
              Header: '',
              width: 80,
              Cell: row => (
                <Link to={"patient/" + row.original.id}><button class="btn btn-primary btn-sm">View</button></Link>
              )
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default PatientTable;
