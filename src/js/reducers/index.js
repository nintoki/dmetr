import { combineReducers } from "redux"
import OrdersReducer from "./orderReducer"
import OrderProductsReducer from "./orderProductReducer"
import PatientsReducer from "./patientReducer"
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  orders: OrdersReducer,
  order_products: OrderProductsReducer,
  patients: PatientsReducer,
  form: formReducer // <-- redux-form
});

export default rootReducer;
