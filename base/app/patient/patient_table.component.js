// component for the whole Patients table
window.PatientsTable = React.createClass({
    render: function() {

    var rows = this.props.patients
        .map(function(patient, i) {
            return (
                <PatientRow
                    key={i}
                    patient={patient}
                    changeAppMode={this.props.changeAppMode} />
            );
        }.bind(this));

        return(
            !rows.length
                ? <div className='alert alert-danger'>No patients found.</div>
                :
                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>BT ID</th>
                            <th>Insurance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
        );
    }
});
