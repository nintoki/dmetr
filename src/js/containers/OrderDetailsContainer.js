import OrderDetails from '../components/OrderDetails.js';
import { fetchOrder, fetchOrderSuccess, fetchOrderFailure, resetActiveOrder, resetDeletedOrder } from '../actions/orderActions';
import { connect } from 'react-redux';

function mapStateToProps(globalState, ownProps) {
  return {
    activeOrder: globalState.orders.activeOrder,
    orderId: ownProps.id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrder: (id) => {
      dispatch(fetchOrder(id))
        .then((result) => {
          // Note: Error's "data" is in result.payload.response.data (inside "response")
          // success's "data" is in result.payload.data
          if (result.payload.response && result.payload.response.status !== 200) {
            dispatch(fetchOrderFailure(result.payload.response.data));
          } else {
            dispatch(fetchOrderSuccess(result.payload.data))
          }
        })
    },
    resetMe: () => {
      //clean up both activeOrder(currrently open) and deletedOrder(open and being deleted) states
      dispatch(resetActiveOrder());
      dispatch(resetDeletedOrder());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
