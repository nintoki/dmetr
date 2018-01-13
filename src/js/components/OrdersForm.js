import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, FieldArray, SubmissionError } from 'redux-form';
import renderField from './renderField';
import { createOrder, createOrderSuccess, createOrderFailure, resetNewOrder } from '../actions/orderActions';
// import { validateOrderFields, validateOrderFieldsSuccess, validateOrderFieldsFailure } from '../actions/orderActions';

//Client side validation
function validate(values) {
  const errors = {};

  if (!values.clinic || values.clinic.trim() === '') {
    errors.clinic = 'Enter clinic';
  }
  if (!values.insurance || values.insurance.trim() === '') {
    errors.insurance = 'Enter insurance';
  }

  return errors;
}


//For any field errors upon submission (i.e. not instant check)
const dispatchAndCreateOrder = (values, dispatch) => {
  return dispatch(createOrder(values))
    .then(result => {
      console.log("values", values);
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(createOrderFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      // window.alert(result.payload.data.message);
      window.alert(`Success! : \n\n${JSON.stringify(values, null, 2)}`);
      //let other components know that everything is fine by updating the redux` state
      dispatch(createOrderSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
			history.back();
    });
}



class OrdersForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.newOrder.order && !nextProps.newOrder.error) {
  //     this.context.router.push('/');
  //   }
  // }

  renderError(newOrder) {
    if (newOrder && newOrder.error && newOrder.error.message) {
      return (
        <div className="alert alert-danger">
          { newOrder ? newOrder.error.message : '' }
        </div>
        );
    } else {
      return <span></span>
    }
  }
  render() {
    // console.log("this.props", this.props);

    const {handleSubmit, submitting, newOrder} = this.props;
    return (
      <div className='container divcon'>
        <h1>New Order</h1>
        { this.renderError(newOrder) }
        <form onSubmit={ handleSubmit(dispatchAndCreateOrder) } style={{marginRight: '50px'}}>
          <table>
            <tbody>
              <tr>
                <td>
                  <Field
                     name="patient_id"
                     type="hidden"
                     component={ renderField }/>
                  <Field
                     name="clinic"
                     type="text"
                     component={ renderField }
                     label="Clinic*" />
                  <Field
                     name="insurance"
                     type="text"
                     component={ renderField }
                     label="Insurance*" />
                   <div>
                     <label htmlFor="oot">Out of Town</label>
                     <div>
                       <Field name="oot" id="oot" component="input" type="checkbox"/>
                     </div>
                   </div>
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
//   form: 'OrdersForm', // a unique identifier for this form
//   validate, // <--- validation function given to redux-form
//   asyncValidate
// })(OrdersForm)

export default reduxForm({
  form: 'OrdersForm',
  validate  // <--- validation function given to redux-form
})(OrdersForm)
