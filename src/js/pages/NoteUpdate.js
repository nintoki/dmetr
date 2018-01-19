import React, { Component, PropTypes } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import NoteUpdateForm from '../containers/NoteUpdateContainer.js';

class NoteUpdate extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onDeleteNoteClick() {
    this.props.deleteNote(this.props.match.params.id)
      // .then(() => { this.context.router.push('/'); });
  }


  render() {
    var an = this.props.location.state.activeNote;
    // console.log(an)
    console.log(this)

    return (
      <div class="container divcon">
        <HeaderContainer type="notes_show" noteId={an.note.id} patientId={an.note.patient_id}/>
        <NoteUpdateForm
          activeNote={an}
          patient_name={this.props.location.state.patient_name}
          initialValues={an.note}
        />
      </div>
    );
  }
}

export default NoteUpdate;
