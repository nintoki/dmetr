import axios from "axios";

//Note list
export const FETCH_NOTES = 'FETCH_NOTES';
export const FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';
export const FETCH_NOTES_FAILURE = 'FETCH_NOTES_FAILURE';
export const FETCH_PTNOTES = 'FETCH_PTNOTES';
export const RESET_NOTES = 'RESET_NOTES';

//Create new post
export const CREATE_NOTE = 'CREATE_NOTE';
export const CREATE_NOTE_SUCCESS = 'CREATE_NOTE_SUCCESS';
export const CREATE_NOTE_FAILURE = 'CREATE_NOTE_FAILURE';
export const RESET_NEW_NOTE = 'RESET_NEW_NOTE';

//Fetch post
export const FETCH_NOTE = 'FETCH_NOTE';
export const FETCH_NOTE_SUCCESS = 'FETCH_NOTE_SUCCESS';
export const FETCH_NOTE_FAILURE = 'FETCH_NOTE_FAILURE';
export const RESET_ACTIVE_NOTE = 'RESET_ACTIVE_NOTE';

//Update note
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS';
export const UPDATE_NOTE_FAILURE = 'UPDATE_NOTE_FAILURE';

//Delete post
export const DELETE_NOTE = 'DELETE_NOTE';
export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS';
export const DELETE_NOTE_FAILURE = 'DELETE_NOTE_FAILURE';
export const RESET_DELETED_NOTE = 'RESET_DELETED_NOTE';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/api' : '/api';

export function fetchNotes() {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/note/read.php`,
    headers: []
  });

  return {
    type: FETCH_NOTES,
    payload: request
  };
}

export function fetchNotesSuccess(notes) {
  return {
    type: FETCH_NOTES_SUCCESS,
    payload: notes
  };
}

export function fetchNotesFailure(error) {
  return {
    type: FETCH_NOTES_FAILURE,
    payload: error
  };
}

export function resetNoteFields() {
  return {
    type: RESET_NOTE_FIELDS
  }
}
;
export function fetchPtNotes(id) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/note/search.php?s=${id}`,
    headers: []
  });

  return {
    type: FETCH_PTNOTES,
    payload: request
  };
}
;

export function createNote(props) {
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/note/create.php`,
    // headers: {
    //   'Authorization': `Bearer ${tokenFromStorage}`
    // }
  });

  return {
    type: CREATE_NOTE,
    payload: request
  };
}

export function createNoteSuccess(newNote) {
  return {
    type: CREATE_NOTE_SUCCESS,
    payload: newNote
  };
}

export function createNoteFailure(error) {
  return {
    type: CREATE_NOTE_FAILURE,
    payload: error
  };
}

export function resetNewNote() {
  return {
    type: RESET_NEW_NOTE
  }
}
;

export function resetDeletedNote() {
  return {
    type: RESET_DELETED_NOTE
  }
}
;

export function fetchNote(id) {
  const request = axios.get(`${ROOT_URL}/note/read_one.php?id=${id}`);

  return {
    type: FETCH_NOTE,
    payload: request
  };
}


export function fetchNoteSuccess(activeNote) {
  return {
    type: FETCH_NOTE_SUCCESS,
    payload: activeNote
  };
}

export function fetchNoteFailure(error) {
  return {
    type: FETCH_NOTE_FAILURE,
    payload: error
  };
}

export function resetActiveNote() {
  return {
    type: RESET_ACTIVE_NOTE
  }
}

export function updateNote(props) {
  console.log("NOTE UPDATED");
  const request = axios({
    method: 'post',
    data : props,
    url: `${ROOT_URL}/note/update.php`,
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
    type: UPDATE_NOTE,
    payload: request
  };
}


export function updateNoteSuccess(props) {
  console.log("UPDATE SUCCESS", props);
  return {
    type: UPDATE_NOTE_SUCCESS,
    payload: props
  };
}

export function updateNoteFailure(error) {
  console.log("UPDATE FAILURE",props);
  return {
    type: UPDATE_NOTE_FAILURE,
    payload: error
  };
}

export function deleteNote(noteId) {
  const request = axios({
    // method: 'delete',
    method: 'post',
    data: JSON.stringify({'id' : noteId}),
    url: `${ROOT_URL}/note/delete.php`,
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
    type: DELETE_NOTE,
    payload: request
  };
}

export function deleteNoteSuccess(deletedNote) {
  return {
    type: DELETE_NOTE_SUCCESS,
    payload: deletedNote
  };
}

export function deleteNoteFailure(response) {
  return {
    type: DELETE_NOTE_FAILURE,
    payload: response
  };
}
