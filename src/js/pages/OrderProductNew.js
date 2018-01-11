import React, { Component } from 'react';
// import HeaderContainer from '../containers/HeaderContainer.js';
import OrderProductsForm from '../containers/OrderProductsFormContainer.js';

class OrderProductNew extends Component {
  render() {
    return (
      <div class="container">
        {/* <HeaderContainer type="orders_new"/> */}
        <OrderProductsForm initialValues={this.props.location.state}/>
      </div>
    );
  }
}

export default OrderProductNew;
