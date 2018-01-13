import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, FieldArray, SubmissionError } from 'redux-form';
import renderField from './renderField';
import renderProductDrop from './renderProductDrop';
import moment from 'moment';
import Moment from 'react-moment';
import { updateOrderProduct, updateOrderProductSuccess, updateOrderProductFailure, resetNewOrderProduct } from '../actions/orderProductActions';
// import { validateOrderProductFields, validateOrderProductFieldsSuccess, validateOrderProductFieldsFailure } from '../actions/orderProductActions';

//Client side validation
function validate(values) {
  const errors = {};

  if (!values.description || values.description.trim() === '') {
    errors.description = 'Enter description';
  }

  return errors;
}

//For any field errors upon submission (i.e. not instant check)
const dispatchAndUpdateOrderProduct = (values, dispatch) => {
  return dispatch(updateOrderProduct(values))
    .then(result => {
      console.log("values", values);
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(updateOrderProductFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      // window.alert(`Success! : \n\n${JSON.stringify(values, null, 2)}`);
      //let other components know that everything is fine by updating the redux` state
      dispatch(updateOrderProductSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
      window.alert(result.payload.data.message);
			history.back();
    });
}

class OrderProductUpdateForm extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }
  componentDidMount() {
    this.props.fetchProducts();
  }

  renderError(activeOrderProduct) {
    if (activeOrderProduct && activeOrderProduct.error && activeOrderProduct.error.message) {
      return (
        <div className="alert alert-danger">
          { activeOrderProduct ? activeOrderProduct.error.message : '' }
        </div>
        );
    } else {
      return <span></span>
    }
  }

  dateFormat(n) {
    if (n === "2000-12-25 00:00:00" || n === null) {
      return (
        <div>&#151;</div>
      )
    } else {
      return (
        <div>
          <Moment format="MM/DD">{n}</Moment>
        </div>
      )
    }
  }

  render() {
    // console.log("this.props", this.props);
    const {handleSubmit, submitting, activeOrderProduct} = this.props;
    const productsOptions = this.props.productTable.products;
    let op = this.props.activeOrderProduct;
    var dt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    return (
      <div className='container divcon'>
        <h1>Update Order Product</h1>
        { this.renderError(activeOrderProduct) }
        <form onSubmit={ handleSubmit(dispatchAndUpdateOrderProduct) } style={{marginRight: '50px'}}>
          <table>
            <tbody>
              <tr>
                <td>
                  <Field
                     name="product_id"
                     component={ renderProductDrop }
                     data={ productsOptions }
                     label="Product*" />
                  <Field
                     name="description"
                     type="text"
                     component={ renderField }
                     label="description*" />
                   <Field
                     name="id"
                     type="hidden"
                     component={ renderField } />
                   <Field
                     name="order_id"
                     type="hidden"
                     component={ renderField } />
                   <div>
                     <label htmlFor="rush">Rush</label>
                     <div>
                       <Field name="rush" id="rush" component="input" type="checkbox"/>
                     </div>
                   </div>
                   <div>
                     <label htmlFor="exchange">Exchange</label>
                     <div>
                       <Field name="exchange" id="exchange" component="input" type="checkbox"/>
                     </div>
                   </div>
                   <div>
                     <label htmlFor="rtn">Return</label>
                     <div>
                       <Field name="rtn" id="rtn" component="input" type="checkbox"/>
                     </div>
                   </div>
                   <div>
                     <label htmlFor="status">Status</label>
                     <div>
                       <Field name="status" id="status" component="input" type="checkbox"/>
                     </div>
                   </div>
                </td>
                <td>
                  <div class="op1 opcon">
                    <h4>Order Phase 1</h4>
                    <div>
                      <div class="opdiv">
                        <Field name="op1_1" id="op1_1" component="input" type="checkbox" onClick={() => {this.props.change('op1_1_dt', dt)}}/>
                        <label htmlFor="op1_1" />
                        {this.dateFormat(op.op1_1_dt)}
                      </div>
                      <div class="opdiv">
                        <Field name="op1_2" id="op1_2" component="input" type="checkbox" onClick={() => {this.props.change('op1_2_dt', dt)}}/>
                        <label htmlFor="op1_2" />
                        {this.dateFormat(op.op1_2_dt)}

                      </div>
                      <div class="opdiv">
                        <Field name="op1_3" id="op1_3" component="input" type="checkbox" onClick={() => {this.props.change('op1_3_dt', dt)}}/>
                        <label htmlFor="op1_3" />
                        {this.dateFormat(op.op1_3_dt)}

                      </div>
                      <div class="opdiv">
                        <Field name="op1_4" id="op1_4" component="input" type="checkbox" onClick={() => {this.props.change('op1_4_dt', dt)}}/>
                        <label htmlFor="op1_4" />
                        {this.dateFormat(op.op1_4_dt)}

                      </div>
                      <div class="opdiv">
                        <Field name="op1_5" id="op1_5" component="input" type="checkbox" onClick={() => {this.props.change('op1_5_dt', dt)}}/>
                        <label htmlFor="op1_5" />
                        {this.dateFormat(op.op1_5_dt)}
                      </div>
                    </div>
                  </div>
                  <div style={{height:'20px'}}>
                    <Field
                      name="op1_1_dt"
                      type="hidden"
                      component={ renderField } />
                    <Field
                      name="op1_2_dt"
                      type="hidden"
                      component={ renderField } />
                    <Field
                      name="op1_3_dt"
                      type="hidden"
                      component={ renderField } />
                    <Field
                      name="op1_4_dt"
                      type="hidden"
                      component={ renderField } />
                    <Field
                      name="op1_5_dt"
                      type="hidden"
                      component={ renderField } />
                  </div>
                  <div class="op2 opcon">
                    <h4>Order Phase 2</h4>
                    <div>
                      <div class="opdiv">
                        <Field name="op2_1" id="op2_1" component="input" type="checkbox" onClick={() => {this.props.change('op2_1_dt', dt)}}/>
                        <label htmlFor="op2_1" />
                        {this.dateFormat(op.op2_1_dt)}
                      </div>
                      <div class="opdiv">
                        <Field name="op2_2" id="op2_2" component="input" type="checkbox" onClick={() => {this.props.change('op2_2_dt', dt)}}/>
                        <label htmlFor="op2_2" />
                      {this.dateFormat(op.op2_2_dt)}
                      </div>
                      <div class="opdiv">
                        <Field name="op2_3" id="op2_3" component="input" type="checkbox" onClick={() => {this.props.change('op2_3_dt', dt)}}/>
                        <label htmlFor="op2_3" />
                      {this.dateFormat(op.op2_3_dt)}
                      </div>
                    </div>
                  </div>
                  <div style={{height:'20px'}}>
                    <Field
                      name="op2_1_dt"
                      type="hidden"
                      component={ renderField } />
                    <Field
                      name="op2_2_dt"
                      type="hidden"
                      component={ renderField } />
                    <Field
                      name="op2_3_dt"
                      type="hidden"
                      component={ renderField } />
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
//   form: 'OrderProductUpdateForm', // a unique identifier for this form
//   validate, // <--- validation function given to redux-form
//   asyncValidate
// })(OrderProductUpdateForm)

export default reduxForm({
  form: 'OrderProductUpdateForm',
  validate,  // <--- validation function given to redux-form
})(OrderProductUpdateForm)
