import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import Moment from 'react-moment';
import PatientOrders from '../containers/PatientOrders.js';
import NoteTable from '../containers/NotesContainer.js';
import NumberFormat from 'react-number-format';

class PatientDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchPatient(this.props.id);
    }

  render() {
    // console.log("pt details", this.props)
    // console.log("pt state", this.state)
    const { patient, loading, error } = this.props.activePatient;
    if (loading) {
      return <div className="container">Loading...</div>;
    } else if(error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if(!patient) {
      return <span />
    }

    return (

      <div className="container">
          <div className="row">
            <div className="col-md-6 modalDiv">
              <h2 className="name">{patient.last_name}, {patient.first_name}</h2>
              <Link
                to={{
                  pathname: '/patientUpdate',
                  state: {activePatient: this.props.activePatient}
                }}
                className="editButton"
              >
                <button className="btn btn-primary btn-sm">Edit</button>
              </Link>
              <div className="row">
                <div className="col-md-6">
                  <div className="modalInline">
                    <div className="pt-phone">
                      <NumberFormat value={patient.phone} displayType={'text'} format="(###) ###-####" />
                    </div>
                    <div className="pt-addy">{patient.address_1}<br />{patient.address_2}<br />{patient.city}, {patient.st} {patient.zip}</div>
                    {/* <div className="pt-id">{patient.id}</div> */}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="modalInline">
                    <div className="pt-bt">{patient.bt_id}</div>
                    <div className="pt-ins">
                        {patient.ins_1}<br />
                        {patient.ins_2}<br />
                        {patient.ins_3}<br />
                    </div>
                    {/* <div className=""><Moment format="MM/DD/YY">{patient.created}</Moment></div> */}
                  </div>
                </div>
              </div>
            </div>
            <NoteTable id={this.props.id} patient_name={this.props.activePatient.patient.last_name + ', ' + this.props.activePatient.patient.first_name} />
          </div>
          <div className="row">
            <PatientOrders id={this.props.id} patient_name={this.props.activePatient.patient.last_name + ', ' + this.props.activePatient.patient.first_name} />
          </div>
      </div>
    );
  }
}

export default PatientDetails;
