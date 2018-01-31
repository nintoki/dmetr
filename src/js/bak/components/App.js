import React, { Component } from 'react';
// import Search from '../components/Search'

export default class App extends Component {
	// componentWillMount() {
  //   this.props.loadUserFromToken();
  // }

  render() {
    return (
      <div>
				{/* <Search /> */}
        {this.props.children}
      </div>
    );
  }
}
