import React, { PropTypes } from 'react';
import { reduxForm, Field, FieldArray, SubmissionError } from 'redux-form';
import renderField from './renderField';
import renderProductDrop from './renderProductDrop';
import moment from 'moment';
import Moment from 'react-moment';
import { createOrderProduct, createOrderProductSuccess, createOrderProductFailure, resetNewOrderProduct } from '../actions/orderProductActions';
// import { validateOrderFields, validateOrderFieldsSuccess, validateOrderFieldsFailure } from '../actions/orderActions';

//Client side validation
function validate(values) {
  const errors = {};

  if (!values.description || values.description.trim() === '') {
    errors.description = 'Enter description';
  }

  return errors;
}

//For any field errors upon submission (i.e. not instant check)
const dispatchAndCreateOrderProduct = (values, dispatch) => {
  return dispatch(createOrderProduct(values))
    .then(result => {
      console.log("values", values);
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(createOrderProductFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      window.alert(`Success! : \n\n${JSON.stringify(values, null, 2)}`);
      //let other components know that everything is fine by updating the redux` state
      dispatch(createOrderProductSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
			history.back();
    });
}

class OrderProductsForm extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.updateDate = this.updateDate.bind(this);
  // }

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }
  componentDidMount() {
    this.props.fetchProducts();
  }

  renderError(newOrderProduct) {
    if (newOrderProduct && newOrderProduct.error && newOrderProduct.error.message) {
      return (
        <div className="alert alert-danger">
          { newOrderProduct ? newOrderProduct.error.message : '' }
        </div>
        );
    } else {
      return <span></span>
    }
  }

  // updateDate() {
  //    this.props.change( this.refs.checkbox.props.name +'_dt', Date())
  // }

  render() {
    // console.log("op new this.props", this.props);
    const {handleSubmit, submitting, newOrderProduct} = this.props;
    const productsOptions = this.props.productTable.products;
    var dt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    return (
      <div className='container divcon'>
        <h1>New Order Product</h1>
        {/* <Moment format="YYYY-MM-DD HH:mm:ss">{dt}</Moment> */}
        { this.renderError(newOrderProduct) }
        <form onSubmit={ handleSubmit(dispatchAndCreateOrderProduct) } style={{marginRight: '50px'}}>
          <table>
            <tbody>
              <tr>
                <td>
                  <Field
                     name="product_id"
                     component={ renderProductDrop }
                     data={productsOptions}
                     label="Product*" />
                  <Field
                     name="description"
                     type="text"
                     component={ renderField }
                     label="description*" />
                  <Field
                     name="product_id"
                     type="text"
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
                        <Field name="op1_1" id="op1_1" ref="checkbox" component="input" type="checkbox" onClick={() => {this.props.change('op1_1_dt', dt)}}/>
                        <label htmlFor="op1_1" />
                        <div>—</div>
                      </div>
                      <div class="opdiv">
                        <Field name="op1_2" id="op1_2" ref="checkbox" component="input" type="checkbox" onClick={() => {this.props.change('op1_2_dt', dt)}}/>
                        <label htmlFor="op1_2" />
                        <div>—</div>
                      </div>
                      <div class="opdiv">
                        <Field name="op1_3" id="op1_3" ref="checkbox" component="input" type="checkbox" onClick={() => {this.props.change('op1_3_dt', dt)}}/>
                        <label htmlFor="op1_3" />
                        <div>—</div>
                      </div>
                      <div class="opdiv">
                        <Field name="op1_4" id="op1_4" ref="checkbox" component="input" type="checkbox" onClick={() => {this.props.change('op1_4_dt', dt)}}/>
                        <label htmlFor="op1_4" />
                        <div>—</div>
                      </div>
                      <div class="opdiv">
                        <Field name="op1_5" id="op1_5" ref="checkbox" component="input" type="checkbox" onClick={() => {this.props.change('op1_5_dt', dt)}}/>
                        <label htmlFor="op1_5" />
                        <div>—</div>
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
                        <Field name="op2_1" id="op2_1" ref="checkbox" component="input" type="checkbox" onClick={() => {this.props.change('op2_1_dt', dt)}}/>
                        <label htmlFor="op2_1" />
                        <div>—</div>
                      </div>
                      <div class="opdiv">
                        <Field name="op2_2" id="op2_2" ref="checkbox" component="input" type="checkbox" onClick={() => {this.props.change('op2_2_dt', dt)}}/>
                        <label htmlFor="op2_2" />
                        <div>—</div>
                      </div>
                      <div class="opdiv">
                        <Field name="op2_3" id="op2_3" ref="checkbox" component="input" type="checkbox" onClick={() => {this.props.change('op2_3_dt', dt)}}/>
                        <label htmlFor="op2_3" />
                        <div>—</div>
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
              {/* <FieldArray name="products" component={renderProducts}/> */}
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
//   form: 'OrderProductsForm', // a unique identifier for this form
//   validate, // <--- validation function given to redux-form
//   asyncValidate
// })(OrderProductsForm)

export default reduxForm({
  form: 'OrderProductsForm',
  validate  // <--- validation function given to redux-form
})(OrderProductsForm)
