import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { Switch, Route, Link } from 'react-router-dom'
import PatientPage from "../pages/PatientPage"
import ReactTable from 'react-table'

class PatientResults extends Component {
  componentWillMount() {
    this.props.searchPatients(this.props.searchTerm);
  }

  render() {
    const { patients, loading, error } = this.props.patientResults;

    if(loading) {
      return <div className="container divcon"><h1>Patient - <i>Search Results</i></h1><h3>Loading...</h3></div>
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      !patients.length
          ? <div className='container divcon'>
              <h2>No patients found.</h2>
              <Link to="/"><button style={{marginTop:'20px'}} className="btn btn-error backButton">Back</button></Link>
              <Link style={{margin:'20px 0 0 20px'}} className="btn btn-success plusButton" to="/patientNew">Create New Patient</Link>
            </div>
          :
          <div className="container divcon pt-res">
            <div className="col-md-12 modalDiv" style={{maxWidth:'960px'}}>
              <h2>Patient - <i>Search Results</i></h2>
              <Link className="btn btn-success addButton" to="/patientNew">Create New Patient</Link>
              <ReactTable
                data={patients}
                columns={[
                  {
                    Header: '',
                    width: 0,
                    Cell: row => (
                      <Link to={"patient/" + row.original.id}><div className="row-link"></div></Link>
                    )
                  },
                  {
                    Header: 'ID',
                    accessor: 'id',
                    width: 100,
                  },
                  {
                    Header: 'Name',
                    accessor: 'patient_name',
                    Cell: row => (
                      <div>
                        <b className="blue">{row.value}</b>
                      </div>
                    )
                  },
                  {
                    Header: 'Address',
                    accessor: 'address_1',
                    width: 360,
                    Cell: row => (
                      <div className="p-addy">
                        {row.value}<br />{row.original.address_2}<br />{row.original.city}, {row.original.st} {row.original.zip}
                      </div>
                    )
                  },
                  {
                    Header: 'BT ID',
                    accessor: 'bt_id',
                    width: 100,
                  },
                  {
                    Header: 'Insurance',
                    accessor: 'ins_1',
                    width: 110,
                    Cell: row => (
                      <div>
                        {row.value}<br />
                        {row.original.ins_2}<br />
                        {row.original.ins_3}<br />
                      </div>
                    )
                  }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
              />
            </div>
          </div>
    );
  }
}

export default PatientResults;
