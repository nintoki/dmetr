import React, { Component, PropTypes } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import PatientUpdateForm from '../containers/PatientUpdateContainer.js';

class PatientUpdate extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onDeletePatientClick() {
    this.props.deletePatient(this.props.match.params.id);
  }


  render() {
    let ap = this.props.location.state.activePatient;
    // var apStr = JSON.stringify(ap);
    // var apFilter = apStr.toString().replace(/"([0]+|1)"/g, "$1");
    // var apClean = JSON.parse(apFilter);
    console.log("ap",ap)
    return (
      <div class="container divcon">
        <HeaderContainer type="patients_show" patientId={ap.patient.id}/>
        <PatientUpdateForm
          activePatient={ap}
          initialValues={ap.patient}
        />
      </div>
    );
  }
}

export default PatientUpdate;
