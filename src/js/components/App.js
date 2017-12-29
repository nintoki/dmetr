import React from 'react';
import { Component } from 'react';
import Search from '../components/Search'
import OrderProductTable from '../containers/PatientOrderProducts'

export default class App extends Component {
	componentWillMount() {
    // this.props.loadUserFromToken();
  }

  render() {
    return (
      <div>
				<Search />
        {this.props.children}
      </div>
    );
  }
}
