import { combineReducers } from "redux"
import OrdersReducer from "./orderReducer"
import PatientsReducer from "./patientReducer"
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  orders: OrdersReducer,
  patients: PatientsReducer,
  form: formReducer // <-- redux-form
});

export default rootReducer;
