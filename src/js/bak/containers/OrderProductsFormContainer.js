import OrderProductsForm from '../components/OrderProductsForm.js';
import { resetNewOrderProduct } from '../actions/orderProductActions';
import { fetchProducts, fetchProductsSuccess, fetchProductsFailure } from '../actions/productActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { change } from 'redux-form'

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts())
        .then((result) => {
          // Note: Error's "data" is in result.payload.response.data (inside "response")
          // success's "data" is in result.payload.data
          if (result.payload.response && result.payload.response.status !== 200) {
            dispatch(fetchProductsFailure(result.payload.response.data));
          } else {
            dispatch(fetchProductsSuccess(result.payload.data))
          }
        })
    },
    resetMe: () => {
      dispatch(resetNewOrderProduct());
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
    newOrderProduct: state.order_products.newOrderProduct,
    productTable: state.products.productTable
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderProductsForm);
