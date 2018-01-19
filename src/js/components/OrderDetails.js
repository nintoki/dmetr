import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment'
import OrderProductTable from '../containers/PatientOrderProducts'

class OrderDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchOrder(this.props.orderId);
  }

  render() {
    const { order, loading, error } = this.props.activeOrder;
    if (loading) {
      return <div className="container">Loading...</div>;
    } else if(error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if(!order) {
      return <span />
    }

    // console.log("order details",this.props);
    return (

      <div className="container">
          <div className="row">
            <div className="col-md-4 modalDiv">
              <h2 className="order">Order: #{order.id}</h2>
              <Link
                to={{
                  pathname: '/orderUpdate',
                  state: {activeOrder: this.props.activeOrder}
                }}
                className="editButton"
              >
                <button className="btn btn-primary btn-sm">Edit</button>
              </Link>
              <div className="row">
                <div className="col-md-12">
                  <div className="modalInline">
                    <div className="order-pt">
                      <Link to={"/patient/" + this.props.activeOrder.order.patient_id}>{order.patient_name}</Link>
                    </div>
                    <div className={ order.oot == 1 ? "oot order-cl" : "order-cl" }>{order.clinic}</div>
                    <div className="order-ins">{order.insurance}</div>
                    <div className="order-dt">
                      <Moment format="MM/DD/YY - hh:mm A">{order.created}</Moment><br />
                      <Moment fromNow>{order.created}</Moment>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-md-8">
              <OrderProductTable id={order.id}/>
            </div>
          </div>

      </div>
    );
  }
}

export default OrderDetails;
