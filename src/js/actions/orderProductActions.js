import axios from "axios";

//OrderProduct list
export const FETCH_ORDER_PRODUCTS = 'FETCH_ORDER_PRODUCTS';
export const FETCH_ORDER_PRODUCTS_SUCCESS = 'FETCH_ORDER_PRODUCTS_SUCCESS';
export const FETCH_ORDER_PRODUCTS_FAILURE = 'FETCH_ORDER_PRODUCTS_FAILURE';
export const FETCH_PTORDER_PRODUCTS = 'FETCH_PTORDER_PRODUCTS';
export const RESET_ORDER_PRODUCTS = 'RESET_ORDER_PRODUCTS';

//Create new order_product
export const CREATE_ORDER_PRODUCT = 'CREATE_ORDER_PRODUCT';
export const CREATE_ORDER_PRODUCT_SUCCESS = 'CREATE_ORDER_PRODUCT_SUCCESS';
export const CREATE_ORDER_PRODUCT_FAILURE = 'CREATE_ORDER_PRODUCT_FAILURE';
export const RESET_NEW_ORDER_PRODUCT = 'RESET_NEW_ORDER_PRODUCT';

//Fetch order_product
export const FETCH_ORDER_PRODUCT = 'FETCH_ORDER_PRODUCT';
export const FETCH_ORDER_PRODUCT_SUCCESS = 'FETCH_ORDER_PRODUCT_SUCCESS';
export const FETCH_ORDER_PRODUCT_FAILURE = 'FETCH_ORDER_PRODUCT_FAILURE';
export const RESET_ACTIVE_ORDER_PRODUCT = 'RESET_ACTIVE_ORDER_PRODUCT';

//Update order_product
export const UPDATE_ORDER_PRODUCT = 'UPDATE_ORDER_PRODUCT';
export const UPDATE_ORDER_PRODUCT_SUCCESS = 'UPDATE_ORDER_PRODUCT_SUCCESS';
export const UPDATE_ORDER_PRODUCT_FAILURE = 'UPDATE_ORDER_PRODUCT_FAILURE';

//Delete order_product
export const DELETE_ORDER_PRODUCT = 'DELETE_ORDER_PRODUCT';
export const DELETE_ORDER_PRODUCT_SUCCESS = 'DELETE_ORDER_PRODUCT_SUCCESS';
export const DELETE_ORDER_PRODUCT_FAILURE = 'DELETE_ORDER_PRODUCT_FAILURE';
export const RESET_DELETED_ORDER_PRODUCT = 'RESET_DELETED_ORDER_PRODUCT';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/api' : '/api';

export function fetchOrderProducts() {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/order_product/read.php`,
    headers: []
  });

  return {
    type: FETCH_ORDER_PRODUCTS,
    payload: request
  };
}

export function fetchOrderProductsSuccess(order_products) {
  console.log("fetched order products")
  return {
    type: FETCH_ORDER_PRODUCTS_SUCCESS,
    payload: order_products
  };
}

export function fetchOrderProductsFailure(error) {
  return {
    type: FETCH_ORDER_PRODUCTS_FAILURE,
    payload: error
  };
}

export function resetOrderProducts() {
  console.log("reset order products")
  return {
    type: RESET_ORDER_PRODUCTS
  }
}
;
export function fetchPtOrderProducts(id) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/order_product/search.php?s=${id}`,
    headers: []
  });

  return {
    type: FETCH_PTORDER_PRODUCTS,
    payload: request
  };
}
;

export function createOrderProduct(props) {
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/order_product/create.php`,
    // headers: {
    //   'Authorization': `Bearer ${tokenFromStorage}`
    // }
  });

  return {
    type: CREATE_ORDER_PRODUCT,
    payload: request
  };
}

export function createOrderProductSuccess(newOrderProduct) {
  return {
    type: CREATE_ORDER_PRODUCT_SUCCESS,
    payload: newOrderProduct
  };
}

export function createOrderProductFailure(error) {
  return {
    type: CREATE_ORDER_PRODUCT_FAILURE,
    payload: error
  };
}

export function resetNewOrderProduct() {
  return {
    type: RESET_NEW_ORDER_PRODUCT
  }
}
;

export function resetDeletedOrderProduct() {
  return {
    type: RESET_DELETED_ORDER_PRODUCT
  }
}
;

export function fetchOrderProduct(id) {
  const request = axios.get(`${ROOT_URL}/order_product/read_one.php?id=${id}`);

  return {
    type: FETCH_ORDER_PRODUCT,
    payload: request
  };
}


export function fetchOrderProductSuccess(activeOrderProduct) {
  return {
    type: FETCH_ORDER_PRODUCT_SUCCESS,
    payload: activeOrderProduct
  };
}

export function fetchOrderProductFailure(error) {
  return {
    type: FETCH_ORDER_PRODUCT_FAILURE,
    payload: error
  };
}

export function resetActiveOrderProduct() {
  return {
    type: RESET_ACTIVE_ORDER_PRODUCT
  }
}

export function updateOrderProduct(props) {
  console.log("ORDER_PRODUCT UPDATED");
  const request = axios({
    method: 'post',
    data : props,
    url: `${ROOT_URL}/order_product/update.php`,
    // success : function(response) {
    //     this.setState({successUpdate: response['message']});
    // }.bind(this),
    // error: function(xhr, resp, text){
    //     // show error to console
    //     console.log(xhr, resp, text);
    // }
    // headers: {
    //   'Authorization': `Bearer ${tokenFromStorage}`
    // }
  });

  return {
    type: UPDATE_ORDER_PRODUCT,
    payload: request
  };
}


export function UpdateOrderProductSuccess(activeOrderProduct) {
  console.log("UPDATE SUCCESS",props);
  return {
    type: UPDATE_ORDER_PRODUCT_SUCCESS,
    payload: activeOrderProduct
  };
}

export function UpdateOrderProductFailure(error) {
  console.log("UPDATE FAILURE",props);
  return {
    type: UPDATE_ORDER_PRODUCT_FAILURE,
    payload: error
  };
}

export function deleteOrderProduct(orderProductId) {
  const request = axios({
    // method: 'delete',
    method: 'post',
    data: JSON.stringify({'id' : orderProductId}),
    url: `${ROOT_URL}/order_product/delete.php`,
    success : function(response) {
        this.props.changeAppMode('read');
    }.bind(this),
    error: function(xhr, resp, text){
        // show error in console
        console.log(xhr, resp, text);
    }
    // headers: {
    //   'Authorization': `Bearer ${tokenFromStorage}`
    // }
  });
  return {
    type: DELETE_ORDER_PRODUCT,
    payload: request
  };
}

export function deleteOrderProductSuccess(deletedOrderProduct) {
  return {
    type: DELETE_ORDER_PRODUCT_SUCCESS,
    payload: deletedOrderProduct
  };
}

export function deleteOrderProductFailure(response) {
  return {
    type: DELETE_ORDER_PRODUCT_FAILURE,
    payload: response
  };
}
