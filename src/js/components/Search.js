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

	handleKeyPress = (event) => {
	  if(event.key == 'Enter'){
			searchBtn.click();
	  }
	}

  render() {

    return (
      <div className="container divcon">
				<div className="row">
					<div style={{maxWidth:'450px', textAlign:'center'}}>
						<h1 style={{marginBottom:'40px'}}>Patient Search</h1>
						<div style={{display:'inline-block', verticalAlign:'middle'}}>
							<input style={{height:'45px', width:'260px', padding:'5px 15px'}} name="searchTerm" id="searchTerm" value={ this.state.searchTerm } onChange={this.onInputChange} onKeyPress={this.handleKeyPress}></input>
						</div>
						<Link
							id="searchBtn"
							className="btn btn-primary"
							style={{display:'inline-block', height:'45px', borderRadius:'0 3px 3px 0', verticalAlign:'bottom'}}
							to={{
								pathname: '/search',
								state: {searchTerm: this.state.searchTerm}
							}}
						>
								Search
						</Link>
						<div style={{marginTop:'30px', paddingTop:'30px', borderTop:'1px solid #ccc'}}>
							<Link style={{maxWidth:'300px', margin:'0 auto'}} id="search" className="btn btn-block btn-success plusButton" to="/patientNew">Create New Patient</Link>
						</div>
					</div>
					<div className="col-md-6"></div>
				</div>
      </div>
    );
  }
}
