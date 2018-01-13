import PatientDetails from '../components/PatientDetails.js';
import { fetchPatient, fetchPatientSuccess, fetchPatientFailure, resetActivePatient, resetDeletedPatient } from '../actions/patientActions';
import { connect } from 'react-redux';

function mapStateToProps(globalState, ownProps) {
  return {
    activePatient: globalState.patients.activePatient,
    patientId: ownProps.id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPatient: (id) => {
      dispatch(fetchPatient(id))
        .then((result) => {
          // Note: Error's "data" is in result.payload.response.data (inside "response")
          // success's "data" is in result.payload.data
          if (result.payload.response && result.payload.response.status !== 200) {
            dispatch(fetchPatientFailure(result.payload.response.data));
          } else {
            dispatch(fetchPatientSuccess(result.payload.data))
          }
        })
    },
    resetMe: () => {
      //clean up both activePatient(currrently open) and deletedPatient(open and being deleted) states
      dispatch(resetActivePatient());
      dispatch(resetDeletedPatient());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails);
