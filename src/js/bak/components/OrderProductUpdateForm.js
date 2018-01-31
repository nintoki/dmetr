import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, FieldArray, SubmissionError } from 'redux-form';
import renderField from './renderField';
import renderTextArea from './renderTextArea';
import renderProductDrop from './renderProductDrop';
import moment from 'moment';
import Moment from 'react-moment';
import renderDateTimePicker from './renderDateTimePicker';
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
        <div>—</div>
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
      <div className='container divcon' style={{marginTop:'20px'}}>
        <h1>Update Product: #{op.id}</h1>
        <h4><b>Order:</b> #{op.order_id}</h4>
        { this.renderError(activeOrderProduct) }
        <form onSubmit={ handleSubmit(dispatchAndUpdateOrderProduct) } style={{marginTop: '40px'}}>
          <table className="productForm">
            <tbody>
              <tr>
                <td style={{verticalAlign:'top'}}>
                  <Field
                     name="created"
                     component={ renderDateTimePicker }
                     label="Order Date (MM/DD/YY)"
                  />
                  <Field
                     name="product_id"
                     component={ renderProductDrop }
                     data={ productsOptions }
                     label="Product*" />
                  <Field
                     name="description"
                     type="text"
                     component={ renderTextArea }
                     label="Description*" />
                   <div className="orderCheck">
                     <div>
                       <label htmlFor="rush">Rush</label>
                       <div>
                         <label className="switch">
                           <Field name="rush" id="rush" component="input" type="checkbox"/>
                           <span className="slider red round"></span>
                         </label>
                       </div>
                     </div>
                     <div>
                       <label htmlFor="exchange">Exchange</label>
                       <div>
                         <label className="switch">
                           <Field name="exchange" id="exchange" component="input" type="checkbox"/>
                           <span className="slider round"></span>
                         </label>
                       </div>
                     </div>
                     <div>
                       <label htmlFor="rtn">Return</label>
                       <div>
                         <label className="switch">
                           <Field name="rtn" id="rtn" component="input" type="checkbox"/>
                           <span className="slider round"></span>
                         </label>
                       </div>
                     </div>
                     <div style={{background: '#ddd'}}>
                       <label htmlFor="status">Archive</label>
                       <div>
                         <label className="switch">
                           <Field name="status" id="status" component="input" type="checkbox"/>
                           <span className="slider green round"></span>
                         </label>
                       </div>
                     </div>
                   </div>
                </td>
                <td style={{verticalAlign:'top'}}>
                  <div className="op1">
                    <label>Order Phase 1</label>
                    <div className="opcon">
                      <div className="opdiv">
                        <div class="optit">Demo</div>
                          <Field name="op1_1" id="op1_1" component="input" type="checkbox" onClick={() => {this.props.change('op1_1_dt', dt)}}/>
                        <label htmlFor="op1_1" />
                        {this.dateFormat(op.op1_1_dt)}
                      </div>
                      <div className="opdiv">
                        <div class="optit">Ins</div>
                          <Field name="op1_2" id="op1_2" component="input" type="checkbox" onClick={() => {this.props.change('op1_2_dt', dt)}}/>
                        <label htmlFor="op1_2" />
                        {this.dateFormat(op.op1_2_dt)}

                      </div>
                      <div className="opdiv">
                        <div class="optit">EOB</div>
                          <Field name="op1_3" id="op1_3" component="input" type="checkbox" onClick={() => {this.props.change('op1_3_dt', dt)}}/>
                        <label htmlFor="op1_3" />
                        {this.dateFormat(op.op1_3_dt)}

                      </div>
                      <div className="opdiv">
                        <div class="optit">og.Rx</div>
                          <Field name="op1_4" id="op1_4" component="input" type="checkbox" onClick={() => {this.props.change('op1_4_dt', dt)}}/>
                        <label htmlFor="op1_4" />
                        {this.dateFormat(op.op1_4_dt)}

                      </div>
                      <div className="opdiv">
                        <div class="optit">Meas</div>
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
                  <div className="op2">
                    <label>Order Phase 2</label>
                    <div className="opcon">
                      <div className="opdiv">
                        <div class="optit">sn.Rx</div>
                          <Field name="op2_5" id="op2_5" component="input" type="checkbox" onClick={() => {this.props.change('op2_5_dt', dt)}}/>
                        <label htmlFor="op2_5" />
                        {this.dateFormat(op.op2_5_dt)}
                      </div>
                      <div className="opdiv">
                        <div class="optit">rc.Rx</div>
                          <Field name="op2_1" id="op2_1" component="input" type="checkbox" onClick={() => {this.props.change('op2_1_dt', dt)}}/>
                        <label htmlFor="op2_1" />
                        {this.dateFormat(op.op2_1_dt)}
                      </div>
                      <div className="opdiv">
                        <div class="optit">LMN</div>
                          <Field name="op2_2" id="op2_2" component="input" type="checkbox" onClick={() => {this.props.change('op2_2_dt', dt)}}/>
                        <label htmlFor="op2_2" />
                      {this.dateFormat(op.op2_2_dt)}
                      </div>
                      <div className="opdiv">
                        <div class="optit">Note</div>
                          <Field name="op2_3" id="op2_3" component="input" type="checkbox" onClick={() => {this.props.change('op2_3_dt', dt)}}/>
                        <label htmlFor="op2_3" />
                      {this.dateFormat(op.op2_3_dt)}
                      </div>
                      <div className="opdiv">
                        <div class="optit">Auth</div>
                          <Field name="op2_4" id="op2_4" component="input" type="checkbox" onClick={() => {this.props.change('op2_4_dt', dt)}}/>
                        <label htmlFor="op2_4" />
                      {this.dateFormat(op.op2_4_dt)}
                      </div>
                    </div>
                  </div>
                  <div style={{height:'20px'}}>
                    <Field
                      name="op2_5_dt"
                      type="hidden"
                      component={ renderField } />
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
                    <Field
                      name="op2_4_dt"
                      type="hidden"
                      component={ renderField } />
                    <Field
                      name="op3_1_dt"
                      type="hidden"
                      component={ renderField } />
                    <Field
                      name="op3_2_dt"
                      type="hidden"
                      component={ renderField } />
                    <Field
                      name="op3_3_dt"
                      type="hidden"
                      component={ renderField } />
                    <Field
                      name="op3_4_dt"
                      type="hidden"
                      component={ renderField } />
                    <Field
                      name="id"
                      type="hidden"
                      component={ renderField } />
                    <Field
                      name="order_id"
                      type="hidden"
                      component={ renderField } />
                  </div>
                  <div className="op3">
                    <label>Order Phase 3</label>
                    <div className="opcon">
                      <div className="opdiv">
                        <div class="optit">Ordr</div>
                          <Field name="op3_1" id="op3_1" component="input" type="checkbox" onClick={() => {this.props.change('op3_1_dt', dt)}}/>
                        <label htmlFor="op3_1" />
                        {this.dateFormat(op.op3_1_dt)}
                      </div>
                      <div className="opdiv">
                        <div class="optit">Dstb</div>
                          <Field name="op3_2" id="op3_2" component="input" type="checkbox" onClick={() => {this.props.change('op3_2_dt', dt)}}/>
                        <label htmlFor="op3_2" />
                      {this.dateFormat(op.op3_2_dt)}
                      </div>
                      <div className="opdiv">
                        <div class="optit">Serv</div>
                          <Field name="op3_3" id="op3_3" component="input" type="checkbox" onClick={() => {this.props.change('op3_3_dt', dt)}}/>
                        <label htmlFor="op3_3" />
                      {this.dateFormat(op.op3_3_dt)}
                      </div>
                      <div className="opdiv">
                        <div class="optit">Bill</div>
                          <Field name="op3_4" id="op3_4" component="input" type="checkbox" onClick={() => {this.props.change('op3_4_dt', dt)}}/>
                        <label htmlFor="op3_4" />
                      {this.dateFormat(op.op3_4_dt)}
                      </div>
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
            <div
              className="btn btn-error"
              onClick={this.context.router.history.goBack}
              >
                Cancel
            </div>
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
