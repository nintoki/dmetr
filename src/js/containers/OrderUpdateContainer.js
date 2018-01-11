import OrderUpdateForm from '../components/OrderUpdateForm.js';
import { resetActiveOrder, resetDeletedOrder } from '../actions/orderActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { change } from 'redux-form'

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetActiveOrder());
      dispatch(resetDeletedOrder());
    }
  }
}

// const mapDispatchToProps = (dispatch) => {
//    return (
//      bindActionCreators({change}, dispatch);
//    )
// }

function mapStateToProps(state) {
  return {
    // activeOrder: state.order_products.activeOrder
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderUpdateForm);
