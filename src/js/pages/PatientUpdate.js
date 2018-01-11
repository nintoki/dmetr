import React, { Component } from 'react';
// import HeaderContainer from '../containers/HeaderContainer.js';
import PatientUpdateForm from '../components/PatientUpdateForm.js';

class PatientUpdate extends Component {
  render() {
    return (
      <div class="container">
        {/* <HeaderContainer type="patients_update"/> */}
        <PatientUpdateForm
          activePatient={this.props.location.state} 
          initialValues={this.props.location.state.activePatient.patient}
        />
      </div>
    );
  }
}

export default PatientUpdate;
