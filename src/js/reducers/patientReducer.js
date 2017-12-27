import {
	FETCH_PATIENTS, FETCH_PATIENTS_SUCCESS, FETCH_PATIENTS_FAILURE, RESET_PATIENTS,
	SEARCH_PATIENTS, SEARCH_PATIENTS_SUCCESS, SEARCH_PATIENTS_FAILURE,
	FETCH_PATIENT, FETCH_PATIENT_SUCCESS,  FETCH_PATIENT_FAILURE, RESET_ACTIVE_PATIENT,
	CREATE_PATIENT, CREATE_PATIENT_SUCCESS, CREATE_PATIENT_FAILURE, RESET_NEW_PATIENT,
	DELETE_PATIENT, DELETE_PATIENT_SUCCESS, DELETE_PATIENT_FAILURE, RESET_DELETED_PATIENT,
	UPDATE_PATIENT, UPDATE_PATIENT_SUCCESS, UPDATE_PATIENT_FAILURE,
	VALIDATE_PATIENT_FIELDS,VALIDATE_PATIENT_FIELDS_SUCCESS, VALIDATE_PATIENT_FIELDS_FAILURE, RESET_PATIENT_FIELDS
} from '../actions/patientActions';

const INITIAL_STATE = { patientTable: {patients: [], error:null, loading: false},
						patientResults: {patients:[], error:null, loading:false},
            newPatient:{patient:null, error: null, loading: false},
            activePatient:{patient:null, error:null, loading: false, isEditing: false},
            deletedPatient: {patient: null, error:null, loading: false},
          };

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_PATIENTS:// start fetching patients and set loading = true
  	return { ...state, patientTable: {patients:[], error: null, loading: true} };
  case FETCH_PATIENTS_SUCCESS:// return list of patients and make loading = false
    return { ...state, patientTable: {patients: action.payload, error:null, loading: false} };
  case FETCH_PATIENTS_FAILURE:// return error and make loading = false
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, patientTable: {patients: [], error: error, loading: false} };
  case RESET_PATIENTS:// reset patientList to initial state
    return { ...state, patientTable: {patients: [], error:null, loading: false} };

	case SEARCH_PATIENTS:// start fetching patients and set loading = true
  	return { ...state, patientResults: {patients:[], error: null, loading: true} };
  case SEARCH_PATIENTS_SUCCESS:// return list of patients and make loading = false
    return { ...state, patientResults: {patients: action.payload, error:null, loading: false} };
  case SEARCH_PATIENTS_FAILURE:// return error and make loading = false
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, patientResults: {patients: [], error: error, loading: false} };

  case FETCH_PATIENT:
    return { ...state, activePatient:{...state.activePatient, loading: true}};
  case FETCH_PATIENT_SUCCESS:
    return { ...state, activePatient: {patient: action.payload, error:null, loading: false}};
  case FETCH_PATIENT_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, activePatient: {patient: null, error:error, loading:false}};
  case RESET_ACTIVE_PATIENT:
    return { ...state, activePatient: {patient: null, error:null, loading: false}};

  case CREATE_PATIENT:
    return {...state, newPatient: {...state.newPatient, loading: true}}
  case CREATE_PATIENT_SUCCESS:
    return {...state, newPatient: {patient:action.payload, error:null, loading: false}}
  case CREATE_PATIENT_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return {...state, newPatient: {patient:null, error:error, loading: false}}
  case RESET_NEW_PATIENT:
    return {...state,  newPatient:{patient:null, error:null, loading: false}}


  case DELETE_PATIENT:
    return {...state, deletedPatient: {...state.deletedPatient, loading: true}}
  case DELETE_PATIENT_SUCCESS:
    return {...state, deletedPatient: {patient:action.payload, error:null, loading: false}}
  case DELETE_PATIENT_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return {...state, deletedPatient: {patient:null, error:error, loading: false}}
  case RESET_DELETED_PATIENT:
    return {...state,  deletedPatient:{patient:null, error:null, loading: false}}

	case UPDATE_PATIENT:
    return { ...state, activePatient:{...state.activePatient, loading: true}};
  case UPDATE_PATIENT_SUCCESS:
			// return [
      //   ...state, Object.assign({}, action.patient)
			// ]
    return { ...state, activePatient: {patient: action.payload, error:null, loading: false}};
  case UPDATE_PATIENT_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, activePatient: {patient: null, error:error, loading:false}};

	case VALIDATE_PATIENT_FIELDS:
		return {...state, newPatient:{...state.newPatient, error: null, loading: true}}
	case VALIDATE_PATIENT_FIELDS_SUCCESS:
		return {...state, newPatient:{...state.newPatient, error: null, loading: false}}
	case VALIDATE_PATIENT_FIELDS_FAILURE:
		let result = action.payload;
		if(!result) {
			error = {message: action.payload.message};
		} else {
			error = {title: result.title, categories: result.categories, description: result.description};
		}
		return {...state, newPatient:{...state.newPatient, error: error, loading: false}}
	case RESET_PATIENT_FIELDS:
		return {...state, newPatient:{...state.newPatient, error: null, loading: null}}

  default:
    return state;
  }
}
