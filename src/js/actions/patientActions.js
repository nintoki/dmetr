import axios from "axios";

//Patient list
export const FETCH_PATIENTS = 'FETCH_PATIENTS';
export const FETCH_PATIENTS_SUCCESS = 'FETCH_PATIENTS_SUCCESS';
export const FETCH_PATIENTS_FAILURE = 'FETCH_PATIENTS_FAILURE';
export const RESET_PATIENTS = 'RESET_PATIENTS';

export const SEARCH_PATIENTS = 'SEARCH_PATIENTS';
export const SEARCH_PATIENTS_SUCCESS = 'SEARCH_PATIENTS_SUCCESS';
export const SEARCH_PATIENTS_FAILURE = 'SEARCH_PATIENTS_FAILURE';

//Create new patient
export const CREATE_PATIENT = 'CREATE_PATIENT';
export const CREATE_PATIENT_SUCCESS = 'CREATE_PATIENT_SUCCESS';
export const CREATE_PATIENT_FAILURE = 'CREATE_PATIENT_FAILURE';
export const RESET_NEW_PATIENT = 'RESET_NEW_PATIENT';

//Validate patient fields like Title, Categries on the server
export const VALIDATE_PATIENT_FIELDS = 'VALIDATE_PATIENT_FIELDS';
export const VALIDATE_PATIENT_FIELDS_SUCCESS = 'VALIDATE_PATIENT_FIELDS_SUCCESS';
export const VALIDATE_PATIENT_FIELDS_FAILURE = 'VALIDATE_PATIENT_FIELDS_FAILURE';
export const RESET_PATIENT_FIELDS = 'RESET_PATIENT_FIELDS';

//Fetch patient
export const FETCH_PATIENT = 'FETCH_PATIENT';
export const FETCH_PATIENT_SUCCESS = 'FETCH_PATIENT_SUCCESS';
export const FETCH_PATIENT_FAILURE = 'FETCH_PATIENT_FAILURE';
export const RESET_ACTIVE_PATIENT = 'RESET_ACTIVE_PATIENT';

//Update patient
export const UPDATE_PATIENT = 'UPDATE_PATIENT';
export const UPDATE_PATIENT_SUCCESS = 'UPDATE_PATIENT_SUCCESS';
export const UPDATE_PATIENT_FAILURE = 'UPDATE_PATIENT_FAILURE';

//Delete patient
export const DELETE_PATIENT = 'DELETE_PATIENT';
export const DELETE_PATIENT_SUCCESS = 'DELETE_PATIENT_SUCCESS';
export const DELETE_PATIENT_FAILURE = 'DELETE_PATIENT_FAILURE';
export const RESET_DELETED_PATIENT = 'RESET_DELETED_PATIENT';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/api' : '/api';

export function fetchPatients() {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/patient/read.php`,
    headers: []
  });

  return {
    type: FETCH_PATIENTS,
    payload: request
  };
}

export function fetchPatientsSuccess(patients) {
  return {
    type: FETCH_PATIENTS_SUCCESS,
    payload: patients
  };
}

export function fetchPatientsFailure(error) {
  return {
    type: FETCH_PATIENTS_FAILURE,
    payload: error
  };
}

export function searchPatients(searchTerm) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/patient/search.php?s=${searchTerm}`,
    headers: []
  });

  return {
    type: SEARCH_PATIENTS,
    payload: request
  };
}

export function searchPatientsSuccess(patients) {
  return {
    type: SEARCH_PATIENTS_SUCCESS,
    payload: patients
  };
}

export function searchPatientsFailure(error) {
  return {
    type: SEARCH_PATIENTS_FAILURE,
    payload: error
  };
}

export function validatePatientFields(props) {
  //note: we cant have /patients/validateFields because it'll match /patients/:id path!
  const request = axios.post(`${ROOT_URL}/patients/validate/fields`, props);

  return {
    type: VALIDATE_POST_FIELDS,
    payload: request
  };
}

export function validatePatientFieldsSuccess() {
  return {
    type: VALIDATE_POST_FIELDS_SUCCESS
  };
}

export function validatePatientFieldsFailure(error) {
  return {
    type: VALIDATE_POST_FIELDS_FAILURE,
    payload: error
  };
}
export function resetPatientFields() {
  return {
    type: RESET_PATIENT_FIELDS
  }
}
;

export function createPatient(props) {
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/patient/create.php`,
    // headers: {
    //   'Authorization': `Bearer ${tokenFromStorage}`
    // }
  });

  return {
    type: CREATE_PATIENT,
    payload: request
  };
}

export function createPatientSuccess(newPatient) {
  return {
    type: CREATE_PATIENT_SUCCESS,
    payload: newPatient
  };
}

export function createPatientFailure(error) {
  return {
    type: CREATE_PATIENT_FAILURE,
    payload: error
  };
}

export function resetNewPatient() {
  return {
    type: RESET_NEW_PATIENT
  }
}
;

export function resetDeletedPatient() {
  return {
    type: RESET_DELETED_PATIENT
  }
}
;

export function fetchPatient(id) {
  const request = axios.get(`${ROOT_URL}/patient/read_one.php?id=${id}`);

  return {
    type: FETCH_PATIENT,
    payload: request
  };
}


export function fetchPatientSuccess(activePatient) {
  return {
    type: FETCH_PATIENT_SUCCESS,
    payload: activePatient
  };
}

export function fetchPatientFailure(error) {
  return {
    type: FETCH_PATIENT_FAILURE,
    payload: error
  };
}

export function resetActivePatient() {
  console.log("PATIENT RESET");
  return {
    type: RESET_ACTIVE_PATIENT
  }
}
;

export function updatePatient(props) {
  console.log("PATIENT UPDATED");
  const request = axios({
    method: 'post',
    data : props,
    url: `${ROOT_URL}/patient/update.php`,
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
    type: UPDATE_PATIENT,
    payload: request
  };
}


export function updatePatientSuccess(props) {
  console.log("UPDATE SUCCESS",props);
  return {
    type: UPDATE_PATIENT_SUCCESS,
    payload: props
  };
}

export function updatePatientFailure(error) {
  console.log("UPDATE FAILURE",props);
  return {
    type: UPDATE_PATIENT_FAILURE,
    payload: error
  };
}


export function deletePatient(patient_id) {
  const request = axios({
    // method: 'delete',
    method: 'post',
    data: JSON.stringify({'id' : patient_id}),
    url: `${ROOT_URL}/patient/delete.php`,
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
    type: DELETE_PATIENT,
    payload: request
  };
}

export function deletePatientSuccess(deletedPatient) {
  return {
    type: DELETE_PATIENT_SUCCESS,
    payload: deletedPatient
  };
}

export function deletePatientFailure(response) {
  return {
    type: DELETE_PATIENT_FAILURE,
    payload: response
  };
}
