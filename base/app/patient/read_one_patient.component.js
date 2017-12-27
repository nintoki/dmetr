// component that contains the logic to read one Patient
window.ReadOnePatientComponent = React.createClass({
// initial component state will be here
    getInitialState: function() {
        // Get this Patient fields from the data attributes we set on the
        // #content div, using jQuery
        return {
            id: 0,
            last_name: '',
            first_name: '',
            phone: '',
            address: '',
            city: '',
            st: '',
            zip: '',
            bt_id: '',
            ins_1: '',
            ins_2: '',
            ins_3: '',
            created: ''
        };
    },

    // on mount, read Patient data and them as this component's state
    componentDidMount: function(){

        var patientId = this.props.patientId;

          console.log("read one - this.props.patientId", this.props.patientId);

        this.serverRequestPt = $.get("http://localhost/api/patient/read_one.php?id=" + patientId,
            function (patient) {
                this.setState({id: patient.id});
                this.setState({last_name: patient.last_name});
                this.setState({first_name: patient.first_name});
                this.setState({phone: patient.phone});
                this.setState({address_1: patient.address_1});
                this.setState({address_2: patient.address_2});
                this.setState({city: patient.city});
                this.setState({st: patient.st});
                this.setState({zip: patient.zip});
                this.setState({bt_id: patient.bt_id});
                this.setState({ins_1: patient.ins_1});
                this.setState({ins_2: patient.ins_2});
                this.setState({ins_3: patient.ins_3});
                this.setState({created: patient.created});
            }.bind(this));

        $('.page-header h1').text('Read Patient');
    },

    // on unmount, kill patients fetching in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequestPt.abort();
    },

// render component html will be here
    render: function() {

        return (
            <div>
                <a href='#'
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'>
                    Read Patients
                </a>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                            <tr>
                                <td>Created</td>
                                <td>{this.state.created}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{this.state.last_name}, {this.state.last_name}</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>{this.state.phone}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{this.state.address_1} {this.state.address_2}<br />
                                    {this.state.city}, {this.state.st} {this.state.zip}
                                </td>
                            </tr>
                            <tr>
                                <td>BT ID</td>
                                <td>{this.state.bt_id}</td>
                            </tr>
                            <tr>
                                <td>Insurance</td>
                                <td>
                                  <ol>
                                    <li>
                                      {this.state.ins_1}
                                    </li>
                                    <li>
                                      {this.state.ins_2}
                                    </li>
                                    <li>
                                      {this.state.ins_3}
                                    </li>
                                  </ol>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <ReadPtOrdersComponent />
            </div>
        );
    }
});
