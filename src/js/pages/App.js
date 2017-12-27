import React from 'react';
import { Component } from 'react';
import AppContainer from '../containers/AppContainer';
import Footer from '../components/layout/Footer'
import Nav from '../components/layout/Nav'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Nav />
        	<AppContainer>
        	 {this.props.children}
        	</AppContainer>
        <Footer />
    </div>
    );
  }
}
