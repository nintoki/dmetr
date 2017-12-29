import {
	FETCH_ORDER_PRODUCTS, FETCH_ORDER_PRODUCTS_SUCCESS, FETCH_ORDER_PRODUCTS_FAILURE, FETCH_PTORDER_PRODUCTS, RESET_ORDER_PRODUCTS,
	FETCH_ORDER_PRODUCT, FETCH_ORDER_PRODUCT_SUCCESS,  FETCH_ORDER_PRODUCT_FAILURE, RESET_ACTIVE_ORDER_PRODUCT,
	CREATE_ORDER_PRODUCT, CREATE_ORDER_PRODUCT_SUCCESS, CREATE_ORDER_PRODUCT_FAILURE, RESET_NEW_ORDER_PRODUCT,
	UPDATE_ORDER_PRODUCT, UPDATE_ORDER_PRODUCT_SUCCESS, UPDATE_ORDER_PRODUCT_FAILURE,
	DELETE_ORDER_PRODUCT, DELETE_ORDER_PRODUCT_SUCCESS, DELETE_ORDER_PRODUCT_FAILURE, RESET_DELETED_ORDER_PRODUCT
} from '../actions/orderProductActions';

const INITIAL_STATE = { orderProductTable: {order_products: [], error:null, loading: false},
            newOrderProduct:{order_product:null, error: null, loading: false},
            activeOrderProduct:{order_product:null, error:null, loading: false},
            deletedOrderProduct: {order_product: null, error:null, loading: false},
          };

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_ORDER_PRODUCTS:// start fetching orders and set loading = true
  	return { ...state, orderProductTable: {order_products:[], error: null, loading: true} };
  case FETCH_ORDER_PRODUCTS_SUCCESS:// return list of orders and make loading = false
    return { ...state, orderProductTable: {order_products: action.payload, error:null, loading: false} };
  case FETCH_ORDER_PRODUCTS_FAILURE:// return error and make loading = false
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, orderProductTable: {order_products: [], error: error, loading: false} };
  case FETCH_PTORDER_PRODUCTS:// start fetching orders and set loading = true
  	return { ...state, orderProductTable: {order_products:[], error: null, loading: true} };
  case RESET_ORDER_PRODUCTS:// reset orderList to initial state
	  console.log("reset reducer")
    return { ...state, orderProductTable: {order_products: [], error:null, loading: false} };

    case FETCH_ORDER_PRODUCT:
      return { ...state, activeOrderProduct:{...state.activeOrderProduct, loading: true}};
    case FETCH_ORDER_PRODUCT_SUCCESS:
      return { ...state, activeOrderProduct: {order_product: action.payload, error:null, loading: false}};
    case FETCH_ORDER_PRODUCT_FAILURE:
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, activeOrderProduct: {order_product: null, error:error, loading:false}};
    case RESET_ACTIVE_ORDER_PRODUCT:
      return { ...state, activeOrderProduct: {order_product: null, error:null, loading: false}};

    case CREATE_ORDER_PRODUCT:
      return {...state, newOrderProduct: {...state.newOrderProduct, loading: true}}
    case CREATE_ORDER_PRODUCT_SUCCESS:
      return {...state, newOrderProduct: {order_product:action.payload, error:null, loading: false}}
    case CREATE_ORDER_PRODUCT_FAILURE:
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return {...state, newOrderProduct: {order_product:null, error:error, loading: false}}
    case RESET_NEW_ORDER_PRODUCT:
      return {...state,  newOrderProduct:{order_product:null, error:null, loading: false}}

		case UPDATE_ORDER_PRODUCT:
	    return { ...state, activeOrderProduct:{...state.activeOrderProduct, loading: true}};
	  case UPDATE_ORDER_PRODUCT_SUCCESS:
				// return [
	      //   ...state, Object.assign({}, action.order)
				// ]
	    return { ...state, activeOrderProduct: {order_product: action.payload, error:null, loading: false}};
	  case UPDATE_ORDER_PRODUCT_FAILURE:
	    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
	    return { ...state, activeOrderProduct: {order_product: null, error:error, loading:false}};



    case DELETE_ORDER_PRODUCT:
      return {...state, deletedOrderProduct: {...state.deletedOrderProduct, loading: true}}
    case DELETE_ORDER_PRODUCT_SUCCESS:
      return {...state, deletedOrderProduct: {order_product:action.payload, error:null, loading: false}}
    case DELETE_ORDER_PRODUCT_FAILURE:
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return {...state, deletedOrderProduct: {order_product:null, error:error, loading: false}}
    case RESET_DELETED_ORDER_PRODUCT:
      return {...state,  deletedOrderProduct:{order_product:null, error:null, loading: false}};

  default:
    return state;
  }
}
