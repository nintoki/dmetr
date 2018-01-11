import {
	FETCH_PRODUCTS, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE, RESET_PRODUCTS
	// FETCH_PRODUCT, FETCH_PRODUCT_SUCCESS,  FETCH_PRODUCT_FAILURE, RESET_ACTIVE_PRODUCT,
	// CREATE_PRODUCT, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE, RESET_NEW_PRODUCT,
	// UPDATE_PRODUCT, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE,
	// DELETE_PRODUCT, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, RESET_DELETED_PRODUCT
} from '../actions/productActions';

const INITIAL_STATE = { productTable: {products: [], error:null, loading: false},
            // newProduct:{product:null, error: null, loading: false},
            // activeProduct:{product:null, error:null, loading: false},
            // deletedProduct: {product: null, error:null, loading: false},
          };

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_PRODUCTS:// start fetching products and set loading = true
  	return { ...state, productTable: {products:[], error: null, loading: true} };
  case FETCH_PRODUCTS_SUCCESS:// return list of products and make loading = false
    return { ...state, productTable: {products: action.payload, error:null, loading: false} };
  case FETCH_PRODUCTS_FAILURE:// return error and make loading = false
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, productTable: {products: [], error: error, loading: false} };
  case RESET_PRODUCTS:// reset productList to initial state
    return { ...state, productTable: {products: [], error:null, loading: false} };

    // case FETCH_PRODUCT:
    //   return { ...state, activeProduct:{...state.activeProduct, loading: true}};
    // case FETCH_PRODUCT_SUCCESS:
    //   return { ...state, activeProduct: {product: action.payload, error:null, loading: false}};
    // case FETCH_PRODUCT_FAILURE:
    //   error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    //   return { ...state, activeProduct: {product: null, error:error, loading:false}};
    // case RESET_ACTIVE_PRODUCT:
    //   return { ...state, activeProduct: {product: null, error:null, loading: false}};
    //
    // case CREATE_PRODUCT:
    //   return {...state, newProduct: {...state.newProduct, loading: true}}
    // case CREATE_PRODUCT_SUCCESS:
    //   return {...state, newProduct: {product:action.payload, error:null, loading: false}}
    // case CREATE_PRODUCT_FAILURE:
    //   error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    //   return {...state, newProduct: {product:null, error:error, loading: false}}
    // case RESET_NEW_PRODUCT:
    //   return {...state,  newProduct:{product:null, error:null, loading: false}}
    //
		// case UPDATE_PRODUCT:
		// console.log("reducer update")
	  //   return { ...state, activeProduct:{...state.activeProduct, loading: true}};
	  // case UPDATE_PRODUCT_SUCCESS:
		// console.log("reducer update success")
		// 		// return [
	  //     //   ...state, activeProduct: {product: action.payload, error:null, loading: false}, Object.assign({}, activeProduct),
		// 		// ]
	  //   return { ...state, activeProduct: {product: action.payload, error:null, loading: false}};
	  // case UPDATE_PRODUCT_FAILURE:
	  //   error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
	  //   return { ...state, activeProduct: {product: null, error:error, loading:false}};
    //
    //
    //
    // case DELETE_PRODUCT:
    //   return {...state, deletedProduct: {...state.deletedProduct, loading: true}}
    // case DELETE_PRODUCT_SUCCESS:
    //   return {...state, deletedProduct: {product:action.payload, error:null, loading: false}}
    // case DELETE_PRODUCT_FAILURE:
    //   error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    //   return {...state, deletedProduct: {product:null, error:error, loading: false}}
    // case RESET_DELETED_PRODUCT:
    //   return {...state,  deletedProduct:{product:null, error:null, loading: false}};

  default:
    return state;
  }
}
