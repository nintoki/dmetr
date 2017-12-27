import PatientsForm from '../components/PatientsForm.js';
import { resetNewPatient } from '../actions/patientActions';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetNewPatient());
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {
    newPatient: state.patients.newPatient
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientsForm);
