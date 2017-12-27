import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { Switch, Route, Link } from 'react-router-dom'
import PatientPage from "../pages/PatientPage"

class PatientResults extends Component {
  componentWillMount() {
    this.props.searchPatients(this.props.searchTerm);
  }

  renderPatients(patients) {
    return patients.map((patients) => {
      return (
        <tr key={patients.id}>
          <td><Moment format="MM/DD/YY">{patients.created}</Moment></td>
          <td>{patients.id}</td>
          <td>{patients.patient_name}</td>
          <td>{patients.phone}</td>
          <td>{patients.address_1}<br />{patients.address_2}<br />{patients.city}, {patients.st} {patients.zip}</td>
          <td>{patients.bt_id}</td>
          <td>
            <ol>
              <li>{patients.ins_1}</li>
              <li>{patients.ins_2}</li>
              <li>{patients.ins_3}</li>
            </ol>
          </td>
          <td><Link to={"patient/" + patients.id}><button class="btn btn-primary btn-sm">View</button></Link></td>
        </tr>
      );
    });
  }

  render() {
    console.log("this.props", this.props)
    const { patients, loading, error } = this.props.patientResults;

    if(loading) {
      return <div className="container divcon"><h1>Patients</h1><h3>Loading...</h3></div>
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      !patients.length
          ? <div className='container divcon'><h2>No patients found.</h2></div>
          :
      <div class="container divcon">
        <h1>Patients</h1>
        <table>
          <thead>
            <tr>
              <td>Date</td>
              <td>ID</td>
              <td>Name</td>
              <td>Phone</td>
              <td>Address</td>
              <td>BT ID</td>
              <td>Insurance</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {this.renderPatients(patients)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PatientResults;
