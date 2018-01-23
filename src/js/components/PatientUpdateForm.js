import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from './renderField';
import renderTextArea from './renderTextArea';
import renderStateDrop from './renderStateDrop';
import normalizePhone from './normalizePhone';
import normalizeZip from './normalizeZip';
import { validatePatientFields, validatePatientFieldsSuccess, validatePatientFieldsFailure } from '../actions/patientActions';
import { updatePatient, updatePatientSuccess, updatePatientFailure } from '../actions/patientActions';

//Client side validation
function validate(values) {
  const errors = {};

  if (!values.first_name || values.first_name.trim() === '') {
    errors.first_name = 'Enter first name';
  }
  if (!values.last_name || values.last_name.trim() === '') {
    errors.last_name = 'Enter last name';
  }
  if (!values.phone || values.phone.trim() === '') {
    errors.phone = 'Enter a phone number';
  }
  if (!values.address_1 || values.address_1.trim() === '') {
    errors.address_1 = 'Enter a address';
  }
  if (!values.city || values.city.trim() === '') {
    errors.city = 'Enter a city';
  }
  if (!values.st || values.st.trim() === '') {
    errors.st = 'Choose a state';
  }
  if (!values.zip || values.zip.trim() === '') {
    errors.zip = 'Enter a zip';
  }
  if (!values.ins_1 || values.ins_1.trim() === '') {
    errors.ins_1 = 'Enter an insurance';
  }

  return errors;
}



//For any field errors upon submission (i.e. not instant check)
const dispatchAndUpdatePatient = (values, dispatch) => {
  return dispatch(updatePatient(values))
    .then(result => {
      // console.log("values", values)
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(updatePatientFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      // window.alert(`Success! : \n\n${JSON.stringify(values, null, 2)}`);
      //let other components know that everything is fine by updating the redux` state
      dispatch(updatePatientSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
      window.alert(result.payload.data.message);
      history.back()
    });
}



class PatientUpdateForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  renderError(activePatient) {
    if (activePatient && activePatient.error && activePatient.error.message) {
      return (
        <div className="alert alert-danger">
          { activePatient ? activePatient.error.message : '' }
        </div>
        );
    } else {
      return <span></span>
    }
  }

  render() {
    // console.log("this.props", this.props)
    // console.log("this.state", this.state)
    const {handleSubmit, submitting, activePatient} = this.props;
    return (
      <div className='container divcon' style={{marginTop:'20px'}}>
        <h1 className="formTit">Update Patient</h1>
        { this.renderError(activePatient) }
        <form onSubmit={ handleSubmit(dispatchAndUpdatePatient) } style={{marginRight: '50px'}}>
          <table className="ptForm">
            <tbody>
              <tr>
                <td>
                  <Field
                         name="first_name"
                         type="text"
                         component={ renderField }
                         label="First Name*" />
                  <Field
                         name="last_name"
                         type="text"
                         component={ renderField }
                         label="Last Name*" />
                   <Field
                          name="bt_id"
                          component={ renderField }
                          label="BT ID"
                          normalize={normalizeZip}
                          />
                </td>
                <td>
                  <Field
                         name="ins_1"
                         component={ renderField }
                         label="Insurance 1" />
                  <Field
                         name="ins_2"
                         component={ renderField }
                         label="Insurance 2" />
                  <Field
                         name="ins_3"
                         component={ renderField }
                         label="Insurance 3" />
                </td>
              </tr>
              <tr>
                <td>
                  <Field
                         name="phone"
                         component={ renderField }
                         label="Phone*"
                         normalize={normalizePhone}
                       />
                  <Field
                         name="address_1"
                         component={ renderField }
                         label="Address 1*" />
                  <Field
                         name="address_2"
                         component={ renderField }
                         label="Address 2" />
                </td>
                <td>
                  <Field
                         name="city"
                         component={ renderField }
                         label="City*" />
                  <Field
                         name="st"
                         component={ renderStateDrop }
                         label="State*" />
                  <Field
                         name="zip"
                         component={ renderField }
                         label="Zip*"
                         normalize={normalizeZip}
                         />
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{marginTop: '20px'}}>
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
                Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }
}


export default reduxForm({
  form: 'PatientUpdateForm',
  validate,  // <--- validation function given to redux-form
})(PatientUpdateForm)
