import React, { Component } from 'react';
// import Header from '../containers/HeaderContainer.js';
import OrdersForm from '../containers/OrdersFormContainer.js';

class OrderNew extends Component {
  render() {
    console.log("order new", this);
    return (
      <div class="container">
        {/* <HeaderContainer /> */}
        <OrdersForm initialValues={this.props.location.state} patient_name={this.props.match.params.patient_name}/>
      </div>
    );
  }
}

export default OrderNew;
