import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
// import 'moment-timezone';
import OrderProductTable from '../containers/PatientOrderProducts';

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

  orderNotes(order) {
    return (
      !order.notes
      ?
      <div className="note-text light">No notes created.</div>
      :
      <div className="note-text light">{order.notes}</div>
    )
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
                  <div className="modalInline" style={{paddingLeft:'30px', fontWeight:'600', letterSpacing:'1px'}}>
                    <div className="order-pt">Patient:</div>
                    <div className="order-cl">Clinic:</div>
                    <div className="order-ins">Insurance:</div>
                    <div className="order-dt">Date:</div>
                  </div>
                  <div className="modalInline">
                    <div style={{fontSize:'18px', lineHeight:'1.4'}}>
                      <Link to={"/patient/" + this.props.activeOrder.order.patient_id}>{order.patient_name}</Link>
                    </div>
                    <div className={ order.oot == 1 ? "oot mt-10 " : "mt-10 " }>{order.clinic}</div>
                    <div className="mt-10 ">{order.insurance}</div>
                    <div className="mt-10 ">
                      <Moment format="MM/DD/YY - hh:mm A">{order.created}</Moment><br />
                      <Moment fromNow>{order.created}</Moment>
                    </div>
                  </div>
                  <div>
                    <h2>Order Notes</h2>
                    { this.orderNotes(order) }
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
