import { combineReducers } from "redux"
import OrdersReducer from "./orderReducer"
import OrderProductsReducer from "./orderProductReducer"
import PatientsReducer from "./patientReducer"
import ProductsReducer from "./productReducer"
import NotesReducer from "./noteReducer"
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  orders: OrdersReducer,
  order_products: OrderProductsReducer,
  patients: PatientsReducer,
  products: ProductsReducer,
  notes: NotesReducer,
  form: formReducer // <-- redux-form
});

export default rootReducer;
