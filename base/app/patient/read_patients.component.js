// component that contains all the logic and other smaller components
// that form the Read Patients view
window.ReadPatientsComponent = React.createClass({
    getInitialState: function() {
        return {
            patients: []
        };
    },

    // on mount, fetch all patients and stored them as this component's state
    componentDidMount: function() {

        this.serverRequest = $.get("http://localhost/api/patient/read.php", function (patients) {
            this.setState({
                patients: patients.records
            });
        }.bind(this));
    },

    // on unmount, kill patient fetching in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    // render component on the page
    render: function() {
        // list of patients
        var filteredPatients = this.state.patients;
        $('.page-header h1').text('Read Patients');

        return (
            <div className='overflow-hidden'>
                <TopActionsComponentPatient changeAppMode={this.props.changeAppMode} />

                <PatientsTable
                    patients={filteredPatients}
                    changeAppMode={this.props.changeAppMode} />
            </div>
        );
    }
});
