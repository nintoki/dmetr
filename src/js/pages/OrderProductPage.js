import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteOrderProduct } from '../actions/orderProductActions';
import Header from '../containers/HeaderContainer.js';
import OrderProductDetails from '../containers/OrderProductDetailsContainer.js';

class OrderProductPage extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onDeleteOrderProductClick() {
    this.props.deleteOrderProduct(this.props.match.params.id)
      .then(() => { this.context.router.push('/'); });
  }

  render() {
    return (
      <div className='container divcon'>
        <Header type="order_products_show" orderProductId={this.props.match.params.id}/>
        <OrderProductDetails id={this.props.match.params.id}/>
      </div>
    );
  }
}

export default OrderProductPage;
