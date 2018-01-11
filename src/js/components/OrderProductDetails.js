import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment'

class OrderProductDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  // constructor(props, context) {
  //   super(props, context);
  //   this.state = {
  //     // patient: null,
  //     isEditing: false,
  //   };
  //   this.toggleEdit = this.toggleEdit.bind(this);
  // }
  //
  // toggleEdit() {
  //   this.setState({isEditing: !this.state.isEditing})
  // }

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchOrderProduct(this.props.orderProductId);
  }

  render() {
    const { order_product, loading, error } = this.props.activeOrderProduct;
    if (loading) {
      return <div className="container">Loading...</div>;
    } else if(error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if(!order_product) {
      return <span />
    }
    // else if(this.state.isEditing) {
    //   return (
    //   <div>
    //     <OrderProductUpdateForm {...this.props}
    //       initialValues={this.props.activeOrderProduct.order_product}
    //     />
    //   </div>)
    // }

    var divStyle = {
      padding: '15px 25px',
      border_product: '1px solid #676767',
      lineHeight: '1.8',
    };

    var fontMd = {
      fontSize: '24px',
    };

    var inlineCol = {
      display: 'inline-table',
      marginRight: '20px',
    };
    console.log("order_product details",this.props);
    return (

      <div className="container">
          <Link to={"/order/" + this.props.activeOrderProduct.order_product.order_id}><h1>{order_product.order_id}</h1></Link>
          <div class="row">
            <div class="col-md-4" style={divStyle}>
              <div style={fontMd}></div>
              <div style={inlineCol}>
              </div>
              <div style={inlineCol}>
                {/* <div>{order_product.id}</div>
                <div class={ order_product.oot == 1 ? "oot" : "" }>{order_product.clinic}</div>
                <div>{order_product.insurance}</div> */}
              </div>
              <Link to={{
                pathname: '/orderProductUpdate',
                state: {activeOrderProduct: this.props.activeOrderProduct}
              }}>
                <button>edit</button>
              </Link>
            </div>
            <div class="col-md-8">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div class="op1">
                        <div class="opdiv">
                          <div>
                            <input
                              type="checkbox"
                              name="op1_1"
                              id="op1_1"
                              checked={ order_product.op1_1 == 1 ? "checked" : "" }
                              readOnly
                            />
                            <label for="op1_1" />
                          </div>
                          <div>
                            { order_product.op1_1_dt === null ? "—" : <Moment format="MM/DD">{order_product.op1_1_dt}</Moment>}
                          </div>
                        </div>
                        <div class="opdiv">
                          <div>
                            <input
                              type="checkbox"
                              name="op1_2"
                              id="op1_2"
                              checked={ order_product.op1_2 == 1 ? "checked" : "" }
                              readOnly
                            />
                            <label for="op1_2" />
                          </div>
                          <div>
                            { order_product.op1_2_dt === null ? "—" : <Moment format="MM/DD">{order_product.op1_2_dt}</Moment>}
                          </div>
                        </div>
                        <div class="opdiv">
                          <div>
                            <input
                              type="checkbox"
                              name="op1_3"
                              id="op1_3"
                              checked={ order_product.op1_3 == 1 ? "checked" : "" }
                              readOnly
                            />
                            <label for="op1_3" />
                          </div>
                          <div>
                            { order_product.op1_3_dt === null ? "—" : <Moment format="MM/DD">{order_product.op1_3_dt}</Moment>}
                          </div>
                        </div>
                        <div class="opdiv">
                          <div>
                            <input
                              type="checkbox"
                              name="op1_4"
                              id="op1_4"
                              checked={ order_product.op1_4 == 1 ? "checked" : "" }
                              readOnly
                            />
                            <label for="op1_4" />
                          </div>
                          <div>
                            { order_product.op1_4_dt === null ? "—" : <Moment format="MM/DD">{order_product.op1_4_dt}</Moment>}
                          </div>
                        </div>
                        <div class="opdiv">
                          <div>
                            <input
                              type="checkbox"
                              name="op1_5"
                              id="op1_5"
                              checked={ order_product.op1_5 == 1 ? "checked" : "" }
                              readOnly
                            />
                            <label for="op1_5" />
                          </div>
                          <div>
                            { order_product.op1_5_dt === null ? "—" : <Moment format="MM/DD">{order_product.op1_5_dt}</Moment>}
                          </div>
                        </div>
                      </div>
                      <div class="op2">
                        <div class="opdiv">
                          <div>
                            <input
                              type="checkbox"
                              name="op2_1"
                              id="op2_1"
                              checked={ order_product.op2_1 == 1 ? "checked" : "" }
                              readOnly
                            />
                            <label for="op2_1" />
                          </div>
                          <div>
                            { order_product.op2_1_dt === null ? "—" : <Moment format="MM/DD">{order_product.op1_5_dt}</Moment>}
                          </div>
                        </div>
                        <div class="opdiv">
                          <div>
                            <input
                              type="checkbox"
                              name="op2_2"
                              id="op2_2"
                              checked={ order_product.op2_2 == 1 ? "checked" : "" }
                              readOnly
                            />
                            <label for="op2_2" />
                          </div>
                          <div>
                            { order_product.op2_2_dt === null ? "—" : <Moment format="MM/DD">{order_product.op1_5_dt}</Moment>}
                          </div>
                        </div>
                        <div class="opdiv">
                          <div>
                            <input
                              type="checkbox"
                              name="op2_3"
                              id="op2_3"
                              checked={ order_product.op2_3 == 1 ? "checked" : "" }
                              readOnly
                            />
                            <label for="op2_3" />
                          </div>
                          <div>
                            { order_product.op2_3_dt === null ? "—" : <Moment format="MM/DD">{order_product.op1_5_dt}</Moment>}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

      </div>
    );
  }
}

export default OrderProductDetails;
