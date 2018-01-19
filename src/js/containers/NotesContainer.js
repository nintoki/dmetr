import { connect } from 'react-redux'
import { fetchPtNotes, fetchNotesSuccess, fetchNotesFailure } from '../actions/noteActions'
import NoteTable from '../components/NoteTable'

function mapStateToProps(state, ownProps) {
  return {
    noteTable: state.notes.noteTable,
    patient_id: ownProps.id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPtNotes: (id) => {
      dispatch(fetchPtNotes(id)).then((response) => {
          !response.error ? dispatch(fetchNotesSuccess(response.payload.data)) : dispatch(fetchNotesFailure(response.payload.data));
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteTable);
