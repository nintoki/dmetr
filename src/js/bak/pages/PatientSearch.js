import React from 'react'
import PatientResults from '../containers/PatientSearchContainer'

export default class PatientSearch extends React.Component {
  render() {
    return (
      <div>
        {/* <HeaderContainer type="posts_index"/> */}
        <PatientResults searchTerm={this.props.location.state.searchTerm}/>
      </div>
    )
  }
}
