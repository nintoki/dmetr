import { connect } from 'react-redux'
import { fetchPtOrderProducts, fetchOrderProductsSuccess, fetchOrderProductsFailure } from '../actions/orderProductActions'
import OrderProductTable from '../components/OrderProductTable'

function mapStateToProps(state, ownProps) {
  return {
    orderProductTable: state.order_products.orderProductTable,
    order_id: ownProps.id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPtOrderProducts: (id) => {
      dispatch(fetchPtOrderProducts(id)).then((response) => {
            !response.error ? dispatch(fetchOrderProductsSuccess(response.payload.data)) : dispatch(fetchOrderProductsFailure(response.payload.data));
          });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderProductTable);
