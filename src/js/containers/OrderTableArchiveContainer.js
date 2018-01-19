import { connect } from 'react-redux'
import { fetchOrders, fetchOrdersSuccess, fetchOrdersFailure } from '../actions/orderActions'
import OrderTableArchive from '../components/OrderTableArchive'

const mapStateToProps = (state) => {
  return {
    orderTable: state.orders.orderTable
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => {
      dispatch(fetchOrders()).then((response) => {
            !response.error ? dispatch(fetchOrdersSuccess(response.payload.data)) : dispatch(fetchOrdersFailure(response.payload.data));
          });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTableArchive);