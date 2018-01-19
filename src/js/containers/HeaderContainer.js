import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPatients, resetDeletedPatient, deletePatient, deletePatientSuccess, deletePatientFailure } from '../actions/patientActions';
import { fetchOrders, resetDeletedOrder, deleteOrder, deleteOrderSuccess, deleteOrderFailure } from '../actions/orderActions';
import { fetchOrderProducts, resetDeletedOrderProduct, deleteOrderProduct, deleteOrderProductSuccess, deleteOrderProductFailure } from '../actions/orderProductActions';
import { fetchNotes, resetDeletedNote, deleteNote, deleteNoteSuccess, deleteNoteFailure } from '../actions/noteActions';
// import { logoutUser } from '../actions/users';
import Header from '../components/header.js';



function mapStateToProps(state) {
  return {
    deletedPatient: state.patients.deletedPatient,
    deletedOrder: state.orders.deletedOrder,
    deletedOrderProduct: state.order_products.deletedOrderProduct,
    deletedNote: state.notes.deletedNote
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
    	dispatch(deletePatient(ownProps.patientId))
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
  	 onDeleteOrderProductClick: () => {
      // let token = sessionStorage.getItem('jwtToken');
      // if (!token || token === '') { //if there is no token, dont bother,
      //     let data = {data: {message: 'Please Sign In'}};//axios like error
      //     dispatch(deleteOrderProductFailure(data)); // but let other comps know
      //     return;
      // }

    	// dispatch(deleteOrderProduct(ownProps.orderProductId, token))
    	dispatch(deleteOrderProduct(ownProps.orderProductId))
      	.then((response) => {
            !response.error ? dispatch(deleteOrderProductSuccess(response.payload)) : dispatch(deleteOrderProductFailure(response.payload));
            alert(response.payload.data.message);
          });
  	 },
  	 onDeleteNoteClick: () => {
      // let token = sessionStorage.getItem('jwtToken');
      // if (!token || token === '') { //if there is no token, dont bother,
      //     let data = {data: {message: 'Please Sign In'}};//axios like error
      //     dispatch(deleteNoteFailure(data)); // but let other comps know
      //     return;
      // }

    	// dispatch(deleteNote(ownProps.orderProductId, token))
    	dispatch(deleteNote(ownProps.orderProductId))
      	.then((response) => {
            !response.error ? dispatch(deleteNoteSuccess(response.payload)) : dispatch(deleteNoteFailure(response.payload));
            alert(response.payload.data.message);
          });
  	 },
     resetMe: () =>{
        dispatch(resetDeletedPatient());
        dispatch(resetDeletedOrder());
        dispatch(resetDeletedOrderProduct());
        dispatch(resetDeletedNote());
     },

     // logout: () => {
     //     sessionStorage.removeItem('jwtToken');
     //     dispatch(logoutUser());
     // }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
