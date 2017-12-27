import React, { Component } from 'react';
// import HeaderContainer from '../containers/HeaderContainer.js';
import PatientFormContainer from '../containers/PatientFormContainer.js';

class PatientNew extends Component {
  render() {
    return (
      <div class="container">
        {/* <HeaderContainer type="patients_new"/> */}
        <PatientFormContainer />
      </div>
    );
  }
}

export default PatientNew;
