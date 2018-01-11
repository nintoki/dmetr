import OrderProductDetails from '../components/OrderProductDetails.js';
import { fetchOrderProduct, fetchOrderProductSuccess, fetchOrderProductFailure, resetActiveOrderProduct, resetDeletedOrderProduct } from '../actions/orderProductActions';
import { connect } from 'react-redux';

function mapStateToProps(globalState, ownProps) {
  return {
    activeOrderProduct: globalState.order_products.activeOrderProduct,
    orderProductId: ownProps.id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrderProduct: (id) => {
      dispatch(fetchOrderProduct(id))
        .then((result) => {
          // Note: Error's "data" is in result.payload.response.data (inside "response")
          // success's "data" is in result.payload.data
          if (result.payload.response && result.payload.response.status !== 200) {
            dispatch(fetchOrderProductFailure(result.payload.response.data));
          } else {
            dispatch(fetchOrderProductSuccess(result.payload.data))
          }
        })
    },
    resetMe: () => {
      //clean up both activeOrderProduct(currrently open) and deletedOrderProduct(open and being deleted) states
      dispatch(resetActiveOrderProduct());
      dispatch(resetDeletedOrderProduct());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderProductDetails);
