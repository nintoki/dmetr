import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import Moment from 'react-moment';
import PatientOrders from '../containers/PatientOrders.js';
// import PatientUpdateForm from './PatientUpdateForm';
// import OrdersForm from '../containers/OrdersFormContainer.js';

class PatientDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  // constructor(props, context) {
  //   super(props, context);
  //   this.state = {
  //     // patient: null,
  //     isEditing: false
  //   };
  //   // this.updatePatientState = this.updatePatientState.bind(this);
  //   this.toggleEdit = this.toggleEdit.bind(this);
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.activePatient.id != nextProps.activePatient.id) {
  //     this.setState({activePatient: nextProps.activePatient});
  //   }
  // }

  // toggleEdit() {
  //   this.setState({isEditing: !this.state.isEditing})
  // }

  // updatePatientState(event) {
  //   const patient = this.props;
  //   return this.setState({patient: patient});
  // }


  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchPatient(this.props.id);
    }

  render() {
    console.log("pt details", this.props)
    // console.log("pt state", this.state)
    const { patient, loading, error } = this.props.activePatient;
    if (loading) {
      return <div className="container">Loading...</div>;
    } else if(error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if(!patient) {
      return <span />
    }
    // else if(this.state.isEditing) {
    //   return (
    //   <div>
    //     <PatientUpdateForm {...this.props}
    //       initialValues={this.props.activePatient.patient}
    //       // onChange={this.updatePatientState}
    //     />
    //   </div>)
    // }

    var divStyle = {
      padding: '15px 25px',
      border: '1px solid #676767',
      lineHeight: '1.8',
    };

    var fontMd = {
      fontSize: '24px',
    };

    var inlineCol = {
      display: 'inline-table',
      marginRight: '20px',
    };

    return (

      <div className="container">
          <h1>{patient.patient_name}</h1>
          <div class="row">
            <div class="col-md-6" style={divStyle}>
              <div style={fontMd}><Moment format="MM/DD/YY">{patient.created}</Moment></div>
              <div style={inlineCol}>
                <h1>{patient.last_name}, {patient.first_name}</h1>
                <div>{patient.id}</div>
                <div>{patient.phone}</div>
                <div>{patient.address_1}<br />{patient.address_2}<br />{patient.city}, {patient.st} {patient.zip}</div>
                <div>{patient.bt_id}</div>
                <div>
                  <ol>
                    <li>{patient.ins_1}</li>
                    <li>{patient.ins_2}</li>
                    <li>{patient.ins_3}</li>
                  </ol>
                </div>
              </div>
              <Link to={{
                pathname: '/patientUpdate',
                state: {activePatient: this.props.activePatient}
              }}>
                <button>edit</button>
              </Link>
            </div>
            <div class="col-md-8"></div>
          </div>
          <PatientOrders id={this.props.id}/>
      </div>
    );
  }
}

export default PatientDetails;
