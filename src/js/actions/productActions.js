import axios from "axios";

//Product list
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const RESET_PRODUCTS = 'RESET_PRODUCTS';

// //Create new post
// export const CREATE_PRODUCT = 'CREATE_PRODUCT';
// export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
// export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';
// export const RESET_NEW_PRODUCT = 'RESET_NEW_PRODUCT';
//
// //Fetch post
// export const FETCH_PRODUCT = 'FETCH_PRODUCT';
// export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
// export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';
// export const RESET_ACTIVE_PRODUCT = 'RESET_ACTIVE_PRODUCT';
//
// //Update product
// export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
// export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
// export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';
//
// //Delete post
// export const DELETE_PRODUCT = 'DELETE_PRODUCT';
// export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
// export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';
// export const RESET_DELETED_PRODUCT = 'RESET_DELETED_PRODUCT';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/api' : '/api';

export function fetchProducts() {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/product/read.php`,
    headers: []
  });

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function fetchProductsSuccess(products) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
  };
}

export function fetchProductsFailure(error) {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error
  };
}

export function resetProductFields() {
  return {
    type: RESET_PRODUCT_FIELDS
  }
}
;
//
//
// export function createProduct(props) {
//   const request = axios({
//     method: 'post',
//     data: props,
//     url: `${ROOT_URL}/product/create.php`,
//     // headers: {
//     //   'Authorization': `Bearer ${tokenFromStorage}`
//     // }
//   });
//
//   return {
//     type: CREATE_PRODUCT,
//     payload: request
//   };
// }
//
// export function createProductSuccess(newProduct) {
//   return {
//     type: CREATE_PRODUCT_SUCCESS,
//     payload: newProduct
//   };
// }
//
// export function createProductFailure(error) {
//   return {
//     type: CREATE_PRODUCT_FAILURE,
//     payload: error
//   };
// }
//
// export function resetNewProduct() {
//   return {
//     type: RESET_NEW_PRODUCT
//   }
// }
// ;
//
// export function resetDeletedProduct() {
//   return {
//     type: RESET_DELETED_PRODUCT
//   }
// }
// ;
//
// export function fetchProduct(id) {
//   const request = axios.get(`${ROOT_URL}/product/read_one.php?id=${id}`);
//
//   return {
//     type: FETCH_PRODUCT,
//     payload: request
//   };
// }
//
//
// export function fetchProductSuccess(activeProduct) {
//   return {
//     type: FETCH_PRODUCT_SUCCESS,
//     payload: activeProduct
//   };
// }
//
// export function fetchProductFailure(error) {
//   return {
//     type: FETCH_PRODUCT_FAILURE,
//     payload: error
//   };
// }
//
// export function resetActiveProduct() {
//   return {
//     type: RESET_ACTIVE_PRODUCT
//   }
// }
//
// export function updateProduct(props) {
//   console.log("PRODUCT UPDATED");
//   const request = axios({
//     method: 'post',
//     data : props,
//     url: `${ROOT_URL}/product/update.php`,
//     // success : function(response) {
//     //     this.setState({successUpdate: response['message']});
//     // }.bind(this),
//     // error: function(xhr, resp, text){
//     //     // show error to console
//     //     console.log(xhr, resp, text);
//     // }
//     // headers: {
//     //   'Authorization': `Bearer ${tokenFromStorage}`
//     // }
//   });
//
//   return {
//     type: UPDATE_PRODUCT,
//     payload: request
//   };
// }
//
//
// export function updateProductSuccess(props) {
//   console.log("UPDATE SUCCESS", props);
//   return {
//     type: UPDATE_PRODUCT_SUCCESS,
//     payload: props
//   };
// }
//
// export function updateProductFailure(error) {
//   console.log("UPDATE FAILURE",props);
//   return {
//     type: UPDATE_PRODUCT_FAILURE,
//     payload: error
//   };
// }
//
// export function deleteProduct(productId) {
//   const request = axios({
//     // method: 'delete',
//     method: 'post',
//     data: JSON.stringify({'id' : productId}),
//     url: `${ROOT_URL}/product/delete.php`,
//     success : function(response) {
//         this.props.changeAppMode('read');
//     }.bind(this),
//     error: function(xhr, resp, text){
//         // show error in console
//         console.log(xhr, resp, text);
//     }
//     // headers: {
//     //   'Authorization': `Bearer ${tokenFromStorage}`
//     // }
//   });
//   return {
//     type: DELETE_PRODUCT,
//     payload: request
//   };
// }
//
// export function deleteProductSuccess(deletedProduct) {
//   return {
//     type: DELETE_PRODUCT_SUCCESS,
//     payload: deletedProduct
//   };
// }
//
// export function deleteProductFailure(response) {
//   return {
//     type: DELETE_PRODUCT_FAILURE,
//     payload: response
//   };
// }
