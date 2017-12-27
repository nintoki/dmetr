import React from 'react'
import PatientTable from '../containers/PatientTableContainer'

export default class PatientsIndex extends React.Component {
  render() {
    return (
      <div>
        {/* <HeaderContainer type="posts_index"/> */}
        <PatientTable />
      </div>
    )
  }
}
