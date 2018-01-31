import { connect } from 'react-redux'
import { fetchPatients, fetchPatientsSuccess, fetchPatientsFailure } from '../actions/patientActions'
import PatientTable from '../components/PatientTable'

const mapStateToProps = (state) => {
  return {
    patientTable: state.patients.patientTable
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPatients: () => {
      dispatch(fetchPatients()).then((response) => {
            (!response.error && response.payload.data.length != 0) ? dispatch(fetchPatientsSuccess(response.payload.data)) : dispatch(fetchPatientsFailure(response.payload.data));
          });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientTable);
