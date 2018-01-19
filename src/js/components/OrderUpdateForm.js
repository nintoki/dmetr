import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from './renderField';
import { validateOrderFields, validateOrderFieldsSuccess, validateOrderFieldsFailure } from '../actions/orderActions';
import { updateOrder, updateOrderSuccess, updateOrderFailure } from '../actions/orderActions';

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
const dispatchAndUpdateOrder = (values, dispatch) => {
  return dispatch(updateOrder(values))
    .then(result => {
      // console.log("values", values)
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(updateOrderFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      // window.alert(`Success! : \n\n${JSON.stringify(values, null, 2)}`);
      //let other components know that everything is fine by updating the redux` state
      dispatch(updateOrderSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
      window.alert(result.payload.data.message);
      history.back()
    });
}



class OrderUpdateForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };


  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }


  renderError(activeOrder) {
    if (activeOrder && activeOrder.error && activeOrder.error.message) {
      return (
        <div className="alert alert-danger">
          { activeOrder ? activeOrder.error.message : '' }
        </div>
        );
    } else {
      return <span></span>
    }
  }

  render() {
    // console.log("this.props", this.props)
    const {handleSubmit, submitting, activeOrder} = this.props;
    let o = activeOrder.order;
    return (
      <div className='container divcon' style={{marginTop:'20px'}}>
        <h1 className="formTit">Update Order: #{o.id}</h1>
        <h4><b>Patient:</b> {o.patient_name}</h4>
        { this.renderError(activeOrder) }
        <form onSubmit={ handleSubmit(dispatchAndUpdateOrder) } style={{marginRight: '50px'}}>
          <table className="orderForm">
            <tbody>
              <tr>
                <td>
                  <div style={{height: 0}}>
                    <Field
                          name="patient_id"
                          type="hidden"
                          component={ renderField }/>
                    <Field
                          name="id"
                          type="hidden"
                          component={ renderField }/>
                    <Field
                          name="created"
                          type="hidden"
                          component={ renderField }/>
                  </div>
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
                      <label className="switch">
                        <Field name="oot" id="oot" component="input" type="checkbox"/>
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                   <div>
                     <div>
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
  form: 'OrderUpdateForm',
  validate,  // <--- validation function given to redux-form
})(OrderUpdateForm)
