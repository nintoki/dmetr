import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deletePatient } from '../actions/patientActions';
// import Header from '../containers/HeaderContainer.js';
import PatientDetailsContainer from '../containers/PatientDetailsContainer.js';

class PatientPage extends Component {
  // static contextTypes = {
  //   router: PropTypes.object
  // };
  //
  // onDeletePatientClick() {
  //   this.props.deletePatient(this.props.match.params.id);
  // }

  render() {
    return (
      <div className='container divcon'>
        {/* <Header /> */}
        <PatientDetailsContainer
          id={this.props.match.params.id}
          // patient_id={this.props.match.params.id}
        />
      </div>
    );
  }
}

export default PatientPage;
