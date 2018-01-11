import { connect } from 'react-redux'
import { fetchPtOrders, fetchOrdersSuccess, fetchOrdersFailure } from '../actions/orderActions'
import OrderTable from '../components/PatientOrderTable'

function mapStateToProps(state, ownProps) {
  return {
    orderTable: state.orders.orderTable,
    patient_id: ownProps.id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPtOrders: (id) => {
      dispatch(fetchPtOrders(id)).then((response) => {
          !response.error ? dispatch(fetchOrdersSuccess(response.payload.data)) : dispatch(fetchOrdersFailure(response.payload.data));
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTable);
