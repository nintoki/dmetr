import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from './renderField';

export default class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchTerm: ''
		};

		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(event) {
		this.setState({
			searchTerm: event.target.value
		});
	}

	componentWillMount() {
    // this.props.loadUserFromToken();
  }

  render() {

    return (
      <div class="container divcon">
				<div class="row">
					<div class="col-md-6" style={{textAlign:'center'}}>
						<div style={{display:'inline-block', verticalAlign:'middle'}}>
							<input style={{height:'45px', width:'260px', padding:'5px 15px'}} name="searchTerm" id="searchTerm" value={ this.state.searchTerm } onChange={this.onInputChange}></input>
						</div>
						<Link style={{display:'inline-block', height:'45px'}} class="btn btn-primary" to={{
							pathname: '/search',
							state: {searchTerm: this.state.searchTerm}
						}}>
							Search
						</Link>

						<div style={{marginTop:'40px', paddingTop:'40px', borderTop:'1px solid #ccc'}}>
							<Link class="btn btn-block btn-success" to="/patientNew">Create New Patient</Link>
						</div>
					</div>
					<div class="col-md-6"></div>
				</div>
      </div>
    );
  }
}
