import OrdersForm from '../components/OrdersForm.js';
import { resetNewOrder } from '../actions/orderActions';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetNewOrder());
    }
  }
}


function mapStateToProps(state) {
  // console.log("state", state)
  return {
    newOrder: state.orders.newOrder
    // patient_id: state.patient_id
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersForm);
