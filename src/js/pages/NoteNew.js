import React, { Component } from 'react';
// import HeaderContainer from '../containers/HeaderContainer.js';
import NotesForm from '../containers/NotesFormContainer.js';

class NoteNew extends Component {
  render() {
    console.log("note new", this);
    return (
      <div class="container">
        {/* <HeaderContainer /> */}
        <NotesForm initialValues={this.props.location.state} patient_name={this.props.match.params.patient_name}/>
      </div>
    );
  }
}

export default NoteNew;
