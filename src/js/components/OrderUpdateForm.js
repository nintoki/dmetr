import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from './renderField';
import renderTextArea from './renderTextArea';
import renderStateDrop from './renderStateDrop';
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
    });
}



class OrderUpdateForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  // constructor(props, context) {
  //   super(props, context);
  //   this.state = {
  //     isEditing: true
  //   };
  // }

  // componentWillUnmount() {
  //   //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
  //   //always reset that global state back to null when you REMOUNT
  //    this.props.resetMe();
  // }

  // componentDidMount() {
  //   this.setState({isEditing: !this.state.isEditing})
  // }

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
    // console.log("this.state", this.state)
    const {handleSubmit, submitting, activeOrder} = this.props;
    const { order, loading, error } = this.props.activeOrder;
    if (loading) {
      return <div className="container">Loading...</div>;
    } else if(error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if(!order) {
      return <span />
    }

    return (
      <div className='container divcon'>
        <h1>Update Order</h1>
        { this.renderError(activeOrder) }
        <form onSubmit={ handleSubmit(dispatchAndUpdateOrder) } style={{marginRight: '50px'}}>
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
