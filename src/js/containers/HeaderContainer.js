import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPatients, resetDeletedPatient, deletePatient, deletePatientSuccess, deletePatientFailure } from '../actions/patientActions';
import { fetchOrders, resetDeletedOrder, deleteOrder, deleteOrderSuccess, deleteOrderFailure } from '../actions/orderActions';
// import { logoutUser } from '../actions/users';
import Header from '../components/header.js';



function mapStateToProps(state) {
  return {
    deletedPatient: state.patients.deletedPatient,
    deletedOrder: state.orders.deletedOrder,
    // authenticatedUser: state.user.status === 'authenticated' ? state.user.user : null,
    // user: state.user
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  	 onDeletePatientClick: () => {
      // let token = sessionStorage.getItem('jwtToken');
      // if (!token || token === '') { //if there is no token, dont bother,
      //     let data = {data: {message: 'Please Sign In'}};//axios like error
      //     dispatch(deletePatientFailure(data)); // but let other comps know
      //     return;
      // }

    	// dispatch(deletePatient(ownProps.patient_id, token))
    	dispatch(deletePatient(ownProps.patient_id))
      	.then((response) => {
            !response.error ? dispatch(deletePatientSuccess(response.payload)) : dispatch(deletePatientFailure(response.payload));
            alert(response.payload.data.message);
          });
  	 },
  	 onDeleteOrderClick: () => {
      // let token = sessionStorage.getItem('jwtToken');
      // if (!token || token === '') { //if there is no token, dont bother,
      //     let data = {data: {message: 'Please Sign In'}};//axios like error
      //     dispatch(deleteOrderFailure(data)); // but let other comps know
      //     return;
      // }

    	// dispatch(deleteOrder(ownProps.orderId, token))
    	dispatch(deleteOrder(ownProps.orderId))
      	.then((response) => {
            !response.error ? dispatch(deleteOrderSuccess(response.payload)) : dispatch(deleteOrderFailure(response.payload));
            alert(response.payload.data.message);
          });
  	 },
     resetMe: () =>{
        dispatch(resetDeletedPatient());
        dispatch(resetDeletedOrder());
     },

     // logout: () => {
     //     sessionStorage.removeItem('jwtToken');
     //     dispatch(logoutUser());
     // }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
