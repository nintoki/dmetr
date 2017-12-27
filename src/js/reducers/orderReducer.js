import {
	FETCH_ORDERS, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE, FETCH_PTORDERS, RESET_ORDERS,
	FETCH_ORDER, FETCH_ORDER_SUCCESS,  FETCH_ORDER_FAILURE, RESET_ACTIVE_ORDER,
	CREATE_ORDER, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE, RESET_NEW_ORDER,
	UPDATE_ORDER, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAILURE,
	DELETE_ORDER, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAILURE, RESET_DELETED_ORDER
} from '../actions/orderActions';

const INITIAL_STATE = { orderTable: {orders: [], error:null, loading: false},
            newOrder:{order:null, error: null, loading: false},
            activeOrder:{order:null, error:null, loading: false},
            deletedOrder: {order: null, error:null, loading: false},
          };

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_ORDERS:// start fetching orders and set loading = true
  	return { ...state, orderTable: {orders:[], error: null, loading: true} };
  case FETCH_ORDERS_SUCCESS:// return list of orders and make loading = false
    return { ...state, orderTable: {orders: action.payload, error:null, loading: false} };
  case FETCH_ORDERS_FAILURE:// return error and make loading = false
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, orderTable: {orders: [], error: error, loading: false} };
  case FETCH_PTORDERS:// start fetching orders and set loading = true
  	return { ...state, orderTable: {orders:[], error: null, loading: true} };
  case RESET_ORDERS:// reset orderList to initial state
    return { ...state, orderTable: {orders: [], error:null, loading: false} };

    case FETCH_ORDER:
      return { ...state, activeOrder:{...state.activeOrder, loading: true}};
    case FETCH_ORDER_SUCCESS:
      return { ...state, activeOrder: {order: action.payload, error:null, loading: false}};
    case FETCH_ORDER_FAILURE:
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, activeOrder: {order: null, error:error, loading:false}};
    case RESET_ACTIVE_ORDER:
      return { ...state, activeOrder: {order: null, error:null, loading: false}};

    case CREATE_ORDER:
      return {...state, newOrder: {...state.newOrder, loading: true}}
    case CREATE_ORDER_SUCCESS:
      return {...state, newOrder: {order:action.payload, error:null, loading: false}}
    case CREATE_ORDER_FAILURE:
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return {...state, newOrder: {order:null, error:error, loading: false}}
    case RESET_NEW_ORDER:
      return {...state,  newOrder:{order:null, error:null, loading: false}}

		case UPDATE_ORDER:
	    return { ...state, activeOrder:{...state.activeOrder, loading: true}};
	  case UPDATE_ORDER_SUCCESS:
				// return [
	      //   ...state, Object.assign({}, action.order)
				// ]
	    return { ...state, activeOrder: {order: action.payload, error:null, loading: false}};
	  case UPDATE_ORDER_FAILURE:
	    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
	    return { ...state, activeOrder: {order: null, error:error, loading:false}};



    case DELETE_ORDER:
      return {...state, deletedOrder: {...state.deletedOrder, loading: true}}
    case DELETE_ORDER_SUCCESS:
      return {...state, deletedOrder: {order:action.payload, error:null, loading: false}}
    case DELETE_ORDER_FAILURE:
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return {...state, deletedOrder: {order:null, error:error, loading: false}}
    case RESET_DELETED_ORDER:
      return {...state,  deletedOrder:{order:null, error:null, loading: false}};

  default:
    return state;
  }
}
