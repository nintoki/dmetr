import NoteUpdateForm from '../components/NoteUpdateForm.js';
import { resetActiveNote, resetDeletedNote } from '../actions/noteActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { change } from 'redux-form'

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetActiveNote());
      dispatch(resetDeletedNote());
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
    // activeNote: state.note_products.activeNote
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteUpdateForm);
