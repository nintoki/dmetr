import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, FieldArray, SubmissionError } from 'redux-form';
import renderField from './renderField';
import renderTextArea from './renderTextArea';
import { updateNote, updateNoteSuccess, updateNoteFailure } from '../actions/noteActions';

//Client side validation
function validate(values) {
  const errors = {};

  if (!values.note || values.note.trim() === '') {
    errors.note = 'Enter note';
  }

  return errors;
}


//For any field errors upon submission (i.e. not instant check)
const dispatchAndUpdateNote = (values, dispatch) => {
  return dispatch(updateNote(values))
    .then(result => {
      // console.log("values", values)
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(updateNoteFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      window.alert(`Values : \n\n${JSON.stringify(values, null, 2)}`);
      //let other components know that everything is fine by updating the redux` state
      dispatch(updateNoteSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
      // window.alert(result.payload.data.message);
      history.back()
    });
}



class NoteUpdateForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };


  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }


  renderError(activeNote) {
    if (activeNote && activeNote.error && activeNote.error.message) {
      return (
        <div className="alert alert-danger">
          { activeNote ? activeNote.error.message : '' }
        </div>
        );
    } else {
      return <span></span>
    }
  }

  render() {
    console.log("this.props", this.props)
    const {handleSubmit, submitting, activeNote} = this.props;
    let n = activeNote.note;
    return (
      <div className='container divcon' style={{marginTop:'20px'}}>
        <h1 className="formTit">Note: #{n.id}</h1>
        <h4><b>Patient:</b> {this.props.patient_name}</h4>
        { this.renderError(activeNote) }
        <form onSubmit={ handleSubmit(dispatchAndUpdateNote) } style={{marginRight: '50px'}}>
          <table className="noteForm">
            <tbody>
              <tr>
                <td>
                  <div style={{height:'0'}}>
                    <Field
                       name="id"
                       type="hidden"
                       component={ renderField }/>
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
          {/* <div style={{marginTop: '20px'}}>
            <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={ submitting }
                    >
              Submit
            </button>
            <button
              className="btn btn-error"
              onClick={this.context.router.history.goBack}
              >
                Back
            </button>
          </div> */}
        </form>
      </div>
    )
  }
}


export default reduxForm({
  form: 'NoteUpdateForm',
  validate,  // <--- validation function given to redux-form
})(NoteUpdateForm)
