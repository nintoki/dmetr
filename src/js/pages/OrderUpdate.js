import React, { Component, PropTypes } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import OrderUpdateForm from '../containers/OrderUpdateContainer.js';

class OrderUpdate extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onDeleteOrderClick() {
    this.props.deleteOrder(this.props.match.params.id)
      // .then(() => { this.context.router.push('/'); });
  }


  render() {
    var ao = this.props.location.state.activeOrder;
    var aoStr = JSON.stringify(ao);
    var aoFilter = aoStr.toString().replace(/"([0]+|1)"/g, "$1");
    var aoClean = JSON.parse(aoFilter);
    console.log(ao)

    return (
      <div class="container divcon">
        <HeaderContainer type="orders_show" orderId={ao.order.id} patientId={ao.order.patient_id}/>
        <OrderUpdateForm
          activeOrder={ao}
          initialValues={aoClean.order}
        />
      </div>
    );
  }
}

export default OrderUpdate;
