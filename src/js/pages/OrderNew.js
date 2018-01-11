import React, { Component } from 'react';
// import HeaderContainer from '../containers/HeaderContainer.js';
import OrdersForm from '../containers/OrdersFormContainer.js';

class OrderNew extends Component {
  render() {
    return (
      <div class="container">
        {/* <HeaderContainer type="orders_new"/> */}
        <OrdersForm initialValues={this.props.location.state}/>
      </div>
    );
  }
}

export default OrderNew;
