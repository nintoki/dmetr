import React, { Component, PropTypes } from 'react';
import Header from '../containers/HeaderContainer.js';
import OrderProductUpdateForm from '../containers/OrderProductsUpdateContainer.js';

class OrderProductUpdate extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onDeleteOrderProductClick() {
    this.props.deleteOrderProduct(this.props.match.params.id)
      .then(() => { this.context.router.push('/'); });
  }

  render() {
    // console.log("op form pg", this)
    var aop = this.props.location.state.activeOrderProduct;
    var aopStr = JSON.stringify(aop);
    var aopFilter = aopStr.toString().replace(/"([0]+|1)"/g, "$1");
    var aopClean = JSON.parse(aopFilter);

    return (
      <div class="container divcon">
        <Header type="order_products_show" orderProductId={aop.id}/>
        <OrderProductUpdateForm
            activeOrderProduct={aop}
            initialValues={aopClean}
        />
      </div>
    );
  }
}

export default OrderProductUpdate;
