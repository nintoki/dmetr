import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteOrder } from '../actions/orderActions';
import Header from '../containers/HeaderContainer.js';
import OrderDetailsContainer from '../containers/OrderDetailsContainer.js';

class OrderPage extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onDeleteOrderClick() {
    this.props.deleteOrder(this.props.match.params.id)
      .then(() => { this.context.router.push('/'); });
  }

  render() {
    return (
      <div className='container divcon'>
        <Header type="orders_show" orderId={this.props.match.params.id}/>
        <OrderDetailsContainer id={this.props.match.params.id}/>
      </div>
    );
  }
}

export default OrderPage;
