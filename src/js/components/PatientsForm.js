import React, { Component, PropTypes } from 'react';
import { Link, push } from 'react-router-dom';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from './renderField';
import renderStateDrop from './renderStateDrop';
import { validatePatientFields, validatePatientFieldsSuccess, validatePatientFieldsFailure } from '../actions/patientActions';
import { createPatient, createPatientSuccess, createPatientFailure, resetNewPatient } from '../actions/patientActions';

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

// //For instant async server validation
// const asyncValidate = (values, dispatch) => {
//   return dispatch(validatePatientFields(values))
//     .then((result) => {
//       //Note: Error's "data" is in result.payload.response.data
//       // success's "data" is in result.payload.data
//       if (!result.payload.response) { //1st onblur
//         return;
//       }

//       let {data, status} = result.payload.response;
//       //if status is not 200 or any one of the fields exist, then there is a field error
//       if (response.payload.status != 200 || data.title || data.categories || data.description) {
//         //let other components know of error by updating the redux` state
//         dispatch(validatePatientFieldsFailure(data));
//         throw data; //throw error
//       } else {
//         //let other components know that everything is fine by updating the redux` state
//         dispatch(validatePatientFieldsSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
//       }
//     });
// };

// //For any field errors upon submission (i.e. not instant check)
// const validateAndCreatePatient = (values, dispatch) => {
//   return dispatch(createPatient(values, sessionStorage.getItem('jwtToken')))
//     .then(result => {
//       // Note: Error's "data" is in result.payload.response.data (inside "response")
//       // success's "data" is in result.payload.data
//       if (result.payload.response && result.payload.response.status !== 200) {
//         dispatch(createPatientFailure(result.payload.response.data));
//         throw new SubmissionError(result.payload.response.data);
//       }
//       //let other components know that everything is fine by updating the redux` state
//       dispatch(createPatientSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
//     });
// }

//For any field errors upon submission (i.e. not instant check)
const dispatchAndCreatePatient = (values, dispatch) => {
  return dispatch(createPatient(values))
    .then(result => {
      // console.log("values", values);
      // let firstName = values.first_name;
      // let lastName = values.last_name;
      // let name = firstName + ' ' + lastName;
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(createPatientFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      window.alert(`Success! : \n\n${JSON.stringify(values, null, 2)}`);
      //let other components know that everything is fine by updating the redux` state
      dispatch(createPatientSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
			history.back()
    });
}



class PatientsForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.newPatient.patient && !nextProps.newPatient.error) {
  //     this.context.router.push('/');
  //   }
  // }

  renderError(newPatient) {
    if (newPatient && newPatient.error && newPatient.error.message) {
      return (
        <div className="alert alert-danger">
          { newPatient ? newPatient.error.message : '' }
        </div>
        );
    } else {
      return <span></span>
    }
  }
  render() {
    const {handleSubmit, submitting, newPatient} = this.props;
    return (
      <div className='container divcon'>
        <h1>New Patient</h1>
        { this.renderError(newPatient) }
        <form onSubmit={ handleSubmit(dispatchAndCreatePatient) } style={{marginRight: '50px'}}>
          <table>
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
                          label="BT ID" />
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
                         label="Phone*" />
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
                         label="Zip*" />
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
//   form: 'PatientsForm', // a unique identifier for this form
//   validate, // <--- validation function given to redux-form
//   asyncValidate
// })(PatientsForm)

export default reduxForm({
  form: 'PatientsForm',
  validate  // <--- validation function given to redux-form
})(PatientsForm)
