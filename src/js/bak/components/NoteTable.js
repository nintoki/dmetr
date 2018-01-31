import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { Switch, Route, Link } from 'react-router-dom'

class NoteTable extends Component {
  componentWillMount() {
    this.props.fetchPtNotes(this.props.patient_id);
  }

  renderNotes(notes) {
    console.log("note props", this.props)
    return notes.map((notes) => {
      return (
        notes.note === null
        ?
        <tr key={notes.id}>
          <td><Moment format="MM/DD/YY">{notes.created}</Moment></td>
          <td>
            <strong className="red">No notes found.</strong>
          </td>
          <td style={{width:'35px'}}></td>
        </tr>
        :
        <tr key={notes.id}>
          <td style={{width:'90px', display:'block'}}>
            <Moment format="MM/DD/YY">{notes.created}</Moment><br />
            <Moment style={{fontSize:'12px', fontWeight:'300'}} format="-hh:mm A-">{notes.created}</Moment>
          </td>
          {/* <td style={{width:'95px'}}><Moment format="hh:mm A">{notes.created}</Moment></td> */}
          <td className="ntd">
             <span className="light">{notes.note}</span>
          </td>
          <td style={{width:'35px'}}>
            <Link
              to={{
                pathname: '/noteUpdate',
                state: {activeNote: {note: notes, error:null, loading: false}, patient_name:this.props.patient_name }
              }}
              >
              <button className="btn btn-primary btn-sm">
                <i className="fa fa-search"></i>
              </button>
            </Link>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { notes, loading, error } = this.props.noteTable;

    if(loading) {
      return <div className="container"><h1>Notes</h1><h3>Loading...</h3></div>
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      !notes.length
          ? <div className="col-md-6 modalDiv">
              <h3 style={{marginBottom:'0'}}>No notes found.</h3>
              <div className="row" style={{marginLeft:'0'}}>
                <Link
                  to={{
                    pathname: '/noteNew/'+this.props.patient_name,
                    state: {patient_id: this.props.patient_id}
                  }}
                  >
                    <button className="btn btn-success btn-sm plusButton">
                      Add Note
                    </button>
                  </Link>
              </div>
            </div>
          :
      <div className="col-md-6 modalDiv">
            <h2>Notes</h2>
            <Link
              to={{
                pathname: '/noteNew/'+this.props.patient_name,
                state: {patient_id: this.props.patient_id}
              }}
              className="addButtonsm"
            >
              <button className="btn btn-success btn-sm plusButton">
                New Note
              </button>
            </Link>
          <table className="pto ntab">
            <thead>
              <tr>
                <td>Date</td>
                <td className="ntd">Note</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {this.renderNotes(notes)}
            </tbody>
          </table>
      </div>
    );
  }
}

export default NoteTable;
