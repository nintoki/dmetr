import axios from "axios";

//Order list
export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';
export const FETCH_PTORDERS = 'FETCH_PTORDERS';
export const RESET_ORDERS = 'RESET_ORDERS';

//Create new post
export const CREATE_ORDER = 'CREATE_ORDER';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';
export const RESET_NEW_ORDER = 'RESET_NEW_ORDER';

//Fetch post
export const FETCH_ORDER = 'FETCH_ORDER';
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS';
export const FETCH_ORDER_FAILURE = 'FETCH_ORDER_FAILURE';
export const RESET_ACTIVE_ORDER = 'RESET_ACTIVE_ORDER';

//Update order
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const UPDATE_ORDER_SUCCESS = 'UPDATE_ORDER_SUCCESS';
export const UPDATE_ORDER_FAILURE = 'UPDATE_ORDER_FAILURE';

//Delete post
export const DELETE_ORDER = 'DELETE_ORDER';
export const DELETE_ORDER_SUCCESS = 'DELETE_ORDER_SUCCESS';
export const DELETE_ORDER_FAILURE = 'DELETE_ORDER_FAILURE';
export const RESET_DELETED_ORDER = 'RESET_DELETED_ORDER';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/api' : '/api';

export function fetchOrders() {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/order/read.php`,
    headers: []
  });

  return {
    type: FETCH_ORDERS,
    payload: request
  };
}

export function fetchOrdersSuccess(orders) {
  return {
    type: FETCH_ORDERS_SUCCESS,
    payload: orders
  };
}

export function fetchOrdersFailure(error) {
  return {
    type: FETCH_ORDERS_FAILURE,
    payload: error
  };
}

export function resetOrderFields() {
  return {
    type: RESET_ORDER_FIELDS
  }
}
;
export function fetchPtOrders(id) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/order/search.php?s=${id}`,
    headers: []
  });

  return {
    type: FETCH_PTORDERS,
    payload: request
  };
}
;

export function createOrder(props) {
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/order/create.php`,
    // headers: {
    //   'Authorization': `Bearer ${tokenFromStorage}`
    // }
  });

  return {
    type: CREATE_ORDER,
    payload: request
  };
}

export function createOrderSuccess(newOrder) {
  return {
    type: CREATE_ORDER_SUCCESS,
    payload: newOrder
  };
}

export function createOrderFailure(error) {
  return {
    type: CREATE_ORDER_FAILURE,
    payload: error
  };
}

export function resetNewOrder() {
  return {
    type: RESET_NEW_ORDER
  }
}
;

export function resetDeletedOrder() {
  return {
    type: RESET_DELETED_ORDER
  }
}
;

export function fetchOrder(id) {
  const request = axios.get(`${ROOT_URL}/order/read_one.php?id=${id}`);

  return {
    type: FETCH_ORDER,
    payload: request
  };
}


export function fetchOrderSuccess(activeOrder) {
  return {
    type: FETCH_ORDER_SUCCESS,
    payload: activeOrder
  };
}

export function fetchOrderFailure(error) {
  return {
    type: FETCH_ORDER_FAILURE,
    payload: error
  };
}

export function resetActiveOrder() {
  return {
    type: RESET_ACTIVE_ORDER
  }
}

export function updateOrder(props) {
  console.log("ORDER UPDATED");
  const request = axios({
    method: 'post',
    data : props,
    url: `${ROOT_URL}/order/update.php`,
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
    type: UPDATE_ORDER,
    payload: request
  };
}


export function UpdateOrderSuccess(activeOrder) {
  console.log("UPDATE SUCCESS",props);
  return {
    type: UPDATE_ORDER_SUCCESS,
    payload: activeOrder
  };
}

export function UpdateOrderFailure(error) {
  console.log("UPDATE FAILURE",props);
  return {
    type: UPDATE_ORDER_FAILURE,
    payload: error
  };
}

export function deleteOrder(orderId) {
  const request = axios({
    // method: 'delete',
    method: 'post',
    data: JSON.stringify({'id' : orderId}),
    url: `${ROOT_URL}/order/delete.php`,
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
    type: DELETE_ORDER,
    payload: request
  };
}

export function deleteOrderSuccess(deletedOrder) {
  return {
    type: DELETE_ORDER_SUCCESS,
    payload: deletedOrder
  };
}

export function deleteOrderFailure(response) {
  return {
    type: DELETE_ORDER_FAILURE,
    payload: response
  };
}
