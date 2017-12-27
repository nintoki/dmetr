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


function mapStateToProps(state, ownProps) {
  return {
    newOrder: state.orders.newOrder
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersForm);
