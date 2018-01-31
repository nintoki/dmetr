import {
	FETCH_NOTES, FETCH_NOTES_SUCCESS, FETCH_NOTES_FAILURE, FETCH_PTNOTES, RESET_NOTES,
	FETCH_NOTE, FETCH_NOTE_SUCCESS,  FETCH_NOTE_FAILURE, RESET_ACTIVE_NOTE,
	CREATE_NOTE, CREATE_NOTE_SUCCESS, CREATE_NOTE_FAILURE, RESET_NEW_NOTE,
	UPDATE_NOTE, UPDATE_NOTE_SUCCESS, UPDATE_NOTE_FAILURE,
	DELETE_NOTE, DELETE_NOTE_SUCCESS, DELETE_NOTE_FAILURE, RESET_DELETED_NOTE
} from '../actions/noteActions';

const INITIAL_STATE = { noteTable: {notes: [], error:null, loading: false},
            newNote:{note:null, error: null, loading: false},
            activeNote:{note:null, error:null, loading: false},
            deletedNote: {note: null, error:null, loading: false},
          };

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_NOTES:// start fetching notes and set loading = true
  	return { ...state, noteTable: {notes:[], error: null, loading: true} };
  case FETCH_NOTES_SUCCESS:// return list of notes and make loading = false
    return { ...state, noteTable: {notes: action.payload, error:null, loading: false} };
  case FETCH_NOTES_FAILURE:// return error and make loading = false
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, noteTable: {notes: [], error: error, loading: false} };
  case FETCH_PTNOTES:// start fetching notes and set loading = true
  	return { ...state, noteTable: {notes:[], error: null, loading: true} };
  case RESET_NOTES:// reset noteList to initial state
    return { ...state, noteTable: {notes: [], error:null, loading: false} };

    case FETCH_NOTE:
      return { ...state, activeNote:{...state.activeNote, loading: true}};
    case FETCH_NOTE_SUCCESS:
      return { ...state, activeNote: {note: action.payload, error:null, loading: false}};
    case FETCH_NOTE_FAILURE:
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, activeNote: {note: null, error:error, loading:false}};
    case RESET_ACTIVE_NOTE:
      return { ...state, activeNote: {note: null, error:null, loading: false}};

    case CREATE_NOTE:
      return {...state, newNote: {...state.newNote, loading: true}}
    case CREATE_NOTE_SUCCESS:
      return {...state, newNote: {note:action.payload, error:null, loading: false}}
    case CREATE_NOTE_FAILURE:
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return {...state, newNote: {note:null, error:error, loading: false}}
    case RESET_NEW_NOTE:
      return {...state,  newNote:{note:null, error:null, loading: false}}

		case UPDATE_NOTE:
	    return { ...state, activeNote:{...state.activeNote, loading: true}};
	  case UPDATE_NOTE_SUCCESS:
	    return { ...state, activeNote: {note: action.payload, error:null, loading: false}};
	  case UPDATE_NOTE_FAILURE:
	    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
	    return { ...state, activeNote: {note: null, error:error, loading:false}};



    case DELETE_NOTE:
      return {...state, deletedNote: {...state.deletedNote, loading: true}}
    case DELETE_NOTE_SUCCESS:
      return {...state, deletedNote: {note:action.payload, error:null, loading: false}}
    case DELETE_NOTE_FAILURE:
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return {...state, deletedNote: {note:null, error:error, loading: false}}
    case RESET_DELETED_NOTE:
      return {...state,  deletedNote:{note:null, error:null, loading: false}};

  default:
    return state;
  }
}
