import NotesForm from '../components/NotesForm.js';
import { resetNewNote } from '../actions/noteActions';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetNewNote());
    }
  }
}


function mapStateToProps(state) {
  // console.log("state", state)
  return {
    newNote: state.notes.newNote
    // patient_id: state.patient_id
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesForm);
