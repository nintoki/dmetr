import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import Moment from 'react-moment'
import OrderUpdateForm from './OrderUpdateForm';

class OrderDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      // patient: null,
      isEditing: false,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState({isEditing: !this.state.isEditing})
  }

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
    } else if(this.state.isEditing) {
      return (
      <div>
        <OrderUpdateForm {...this.props}
          initialValues={this.props.activeOrder.order}
          // onChange={this.updatePatientState}
        />
      </div>)
    }

    var divStyle = {
      padding: '15px 25px',
      border: '1px solid #676767',
      lineHeight: '1.8',
    };

    var fontMd = {
      fontSize: '24px',
    };

    var inlineCol = {
      display: 'inline-table',
      marginRight: '20px',
    };
    console.log(this.props);
    return (

      <div className="container">
          <Link to={"/patient/" + this.props.activeOrder.order.patient_id}><h1>{order.patient_name}</h1></Link>
          <div class="row">
            <div class="col-md-4" style={divStyle}>
              <div style={fontMd}><Moment format="MM/DD/YY">{order.created}</Moment></div>
              <div style={inlineCol}>
                <div><strong>Order ID: </strong></div>
                <div><strong>Clinic: </strong></div>
                <div><strong>Insurance: </strong></div>
              </div>
              <div style={inlineCol}>
                <div>{order.id}</div>
                <div>{order.clinic}</div>
                <div>{order.insurance}</div>
              </div>

              <div>{order.oot}</div>
              <button onClick={this.toggleEdit}>edit</button>

            </div>
            <div class="col-md-8"></div>
          </div>

      </div>
    );
  }
}

export default OrderDetails;