import React, { Component } from 'react';
import Search from '../components/Search'


export default class SearchStart extends Component {
	// componentWillMount() {
  //   this.props.loadUserFromToken();
  // }

  render() {
    return (
      <div className="container divcon">
        <div className="row">
            <Search />
        </div>
      </div>
    );
  }
}
