import { connect } from 'react-redux'
import { searchPatients, searchPatientsSuccess, searchPatientsFailure, resetPatients } from '../actions/patientActions'
import PatientResults from '../components/PatientResults'

const mapStateToProps = (state, searchTerm) => {
  return {
    patientResults: state.patients.patientResults,
    // searchTerm: this.props.location.state.searchTerm
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchPatients: (searchTerm) => {
      dispatch(searchPatients(searchTerm)).then((response) => {
            (!response.error && !response.payload.data.message) ? dispatch(searchPatientsSuccess(response.payload.data)) : dispatch(searchPatientsFailure(response.payload.data));
          });
    },
    resetMe: () => {
      dispatch(resetPatients());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientResults);
