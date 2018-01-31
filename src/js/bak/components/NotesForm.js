import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, FieldArray, SubmissionError } from 'redux-form';
import renderField from './renderField';
import renderTextArea from './renderTextArea';
import { createNote, createNoteSuccess, createNoteFailure, resetNewNote } from '../actions/noteActions';
// import { validateNoteFields, validateNoteFieldsSuccess, validateNoteFieldsFailure } from '../actions/noteActions';

//Client side validation
function validate(values) {
  const errors = {};

  if (!values.note || values.note.trim() === '') {
    errors.note = 'Enter note';
  }

  return errors;
}


//For any field errors upon submission (i.e. not instant check)
const dispatchAndCreateNote = (values, dispatch) => {
  return dispatch(createNote(values))
    .then(result => {
      console.log("values", values);
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(createNoteFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      // window.alert(`Success! : \n\n${JSON.stringify(values, null, 2)}`);
      //let other components know that everything is fine by updating the redux` state
      dispatch(createNoteSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
      window.alert(result.payload.data.message);
			history.back();
    });
}



class NotesForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  renderError(newNote) {
    if (newNote && newNote.error && newNote.error.message) {
      return (
        <div className="alert alert-danger">
          { newNote ? newNote.error.message : '' }
        </div>
        );
    } else {
      return <span></span>
    }
  }
  render() {
    console.log("this.props", this.props);

    const {handleSubmit, submitting, newNote} = this.props;
    return (
      <div className='container divcon'>
        <h1 className="formTit">New Note</h1>
        <h4><b>Patient:</b> {this.props.patient_name}</h4>
        { this.renderError(newNote) }
        <form onSubmit={ handleSubmit(dispatchAndCreateNote) } style={{marginRight: '50px'}}>
          <table className="noteForm">
            <tbody>
              <tr>
                <td>
                  <div style={{height: 0}}>
                    <Field
                       name="patient_id"
                       type="hidden"
                       component={ renderField }/>
                   </div>
                  <Field
                     name="note"
                     type="text"
                     component={ renderTextArea }
                     label="Note*" />
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{marginTop: '20px'}}>
            <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={ submitting }>
              Submit
            </button>
            <button
              className="btn btn-error"
              onClick={this.context.router.history.goBack}
              >
                Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }
}


// export default reduxForm({
//   form: 'NotesForm', // a unique identifier for this form
//   validate, // <--- validation function given to redux-form
//   asyncValidate
// })(NotesForm)

export default reduxForm({
  form: 'NotesForm',
  validate  // <--- validation function given to redux-form
})(NotesForm)
