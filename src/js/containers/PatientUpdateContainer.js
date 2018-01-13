import PatientUpdateForm from '../components/PatientUpdateForm.js';
import { resetActivePatient, resetDeletedPatient } from '../actions/patientActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { change } from 'redux-form'

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetActivePatient());
      dispatch(resetDeletedPatient());
    }
  }
}

// const mapDispatchToProps = (dispatch) => {
//    return (
//      bindActionCreators({change}, dispatch);
//    )
// }

function mapStateToProps(state) {
  return {
    // activePatient: state.patient_products.activePatient
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientUpdateForm);
