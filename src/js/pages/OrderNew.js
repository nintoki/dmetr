import React, { Component } from 'react';
// import HeaderContainer from '../containers/HeaderContainer.js';
import OrderFormContainer from '../containers/OrderFormContainer.js';

class OrdersNew extends Component {
  render() {
    return (
      <div class="container">
        {/* <HeaderContainer type="orders_new"/> */}
        <OrderFormContainer />
      </div>
    );
  }
}

export default OrdersNew;
