// component that contains the logic to update a Patient
window.UpdatePatientComponent = React.createClass({
// initial component states will be here
    getInitialState: function() {
        // Get this Patient fields from the data attributes we set on the
        // #content div, using jQuery
        return {
            id: 0,
            last_name: '',
            first_name: '',
            phone: '',
            address_1: '',
            address_2: '',
            city: '',
            selectedStId: 0,
            zip: '',
            bt_id: '',
            ins_1: '',
            ins_2: '',
            ins_3: '',
            successUpdate: null
        };
    },

    // on mount, fetch all patients and one Patient data to stored them as this component's state
    componentDidMount: function(){

        // read patients
        this.serverRequestCat = $.get("http://localhost/api/patient/read.php",
            function (patients) {
                this.setState({
                    patients: patients.records
                });
            }.bind(this));

        // read one Patient data
        var patientId = this.props.patientId;
        this.serverRequestProd = $.get("http://localhost/api/patient/read_one.php?id=" + patientId,
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
            }.bind(this));

        $('.page-header h1').text('Update patient');
    },

    // on unmount, kill patients fetching in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequestCat.abort();
        this.serverRequestProd.abort();
    },

// handle form field changes here
    // handle name change
    onLastNameChange: function(e){
        this.setState({last_name: e.target.value});
    },
    onFirstNameChange: function(e){
        this.setState({first_name: e.target.value});
    },

    // handle phone change
    onPhoneChange: function(e){
        this.setState({phone: e.target.value});
    },
    // handle address change
    onAddressOneChange: function(e){
        this.setState({address_1: e.target.value});
    },
    onAddressTwoChange: function(e){
        this.setState({address_2: e.target.value});
    },

    // handle city change
    onCityChange: function(e){
        this.setState({city: e.target.value});
    },

    // handle state change
    onStChange: function(e){
        this.setState({selectedStId: e.target.value});
    },

    // handle zip change
    onZipChange: function(e){
        this.setState({zip: e.target.value});
    },

    // handle brightree id change
    onBtidChange: function(e){
        this.setState({bt_id: e.target.value});
    },
    // handle insurance change
    onInsOneChange: function(e){
        this.setState({ins_1: e.target.value});
    },
    onInsTwoChange: function(e){
        this.setState({ins_2: e.target.value});
    },
    onInsThreeChange: function(e){
        this.setState({ins_3: e.target.value});
    },


// handle save changes button here
    // handle save changes button clicked
    onSave: function(e){

        // data in the form
        var form_data={
            id: this.state.id,
            last_name: this.state.last_name,
            first_name: this.state.first_name,
            phone: this.state.phone,
            address_1: this.state.address_1,
            address_2: this.state.address_2,
            city: this.state.city,
            st: this.state.selectedStId,
            zip: this.state.zip,
            bt_id: this.state.bt_id,
            ins_1: this.state.ins_1,
            ins_2: this.state.ins_2,
            ins_3: this.state.ins_3,
        };

        // submit form data to api
        $.ajax({
            url: "http://localhost/api/patient/update.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : function(response) {
                this.setState({successUpdate: response['message']});
            }.bind(this),
            error: function(xhr, resp, text){
                // show error to console
                console.log(xhr, resp, text);
            }
        });

        e.preventDefault();
    },
// render component here
    render: function() {
        return (
            <div>
                {
                    this.state.successUpdate == "Patient was updated." ?
                        <div className='alert alert-success'>
                            Patient was updated.
                        </div>
                    : null
                }

                {
                    this.state.successUpdate == "Unable to update patient." ?
                        <div className='alert alert-danger'>
                            Unable to update patient. Please try again.
                        </div>
                    : null
                }

                <a href='#'
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'>
                    Read Patients
                </a>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>Last Name</td>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    required
                                    value={this.state.last_name}
                                    onChange={this.onLastNameChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>First Name</td>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={this.state.first_name}
                                    required
                                    onChange={this.onFirstNameChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>
                                <input
                                    type='tel'
                                    className='form-control'
                                    value={this.state.phone}
                                    required
                                    onChange={this.onPhoneChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Address 1</td>
                            <td>
                                <input
                                type='text'
                                className='form-control'
                                value={this.state.address_1}
                                required
                                onChange={this.onAddressOneChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Address 2</td>
                            <td>
                                <input
                                type='text'
                                className='form-control'
                                value={this.state.address_2}
                                required
                                onChange={this.onAddressTwoChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>
                                <input
                                type='text'
                                className='form-control'
                                value={this.state.city}
                                required
                                onChange={this.onCityChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>State</td>
                            <td>
                               <select
                                onChange={this.onStChange}
                                className="form-control"
                                value={this.state.st}>
                                     <option value="-1">Select State...</option>
                                     <option value="AL">Alabama</option>
                                     <option value="AK">Alaska</option>
                                     <option value="AZ">Arizona</option>
                                     <option value="AR">Arkansas</option>
                                     <option value="CA">California</option>
                                     <option value="CO">Colorado</option>
                                     <option value="CT">Connecticut</option>
                                     <option value="DE">Delaware</option>
                                     <option value="DC">District Of Columbia</option>
                                     <option value="FL">Florida</option>
                                     <option value="GA">Georgia</option>
                                     <option value="HI">Hawaii</option>
                                     <option value="ID">Idaho</option>
                                     <option value="IL">Illinois</option>
                                     <option value="IN">Indiana</option>
                                     <option value="IA">Iowa</option>
                                     <option value="KS">Kansas</option>
                                     <option value="KY">Kentucky</option>
                                     <option value="LA">Louisiana</option>
                                     <option value="ME">Maine</option>
                                     <option value="MD">Maryland</option>
                                     <option value="MA">Massachusetts</option>
                                     <option value="MI">Michigan</option>
                                     <option value="MN">Minnesota</option>
                                     <option value="MS">Mississippi</option>
                                     <option value="MO">Missouri</option>
                                     <option value="MT">Montana</option>
                                     <option value="NE">Nebraska</option>
                                     <option value="NV">Nevada</option>
                                     <option value="NH">New Hampshire</option>
                                     <option value="NJ">New Jersey</option>
                                     <option value="NM">New Mexico</option>
                                     <option value="NY">New York</option>
                                     <option value="NC">North Carolina</option>
                                     <option value="ND">North Dakota</option>
                                     <option value="OH">Ohio</option>
                                     <option value="OK">Oklahoma</option>
                                     <option value="OR">Oregon</option>
                                     <option value="PA">Pennsylvania</option>
                                     <option value="RI">Rhode Island</option>
                                     <option value="SC">South Carolina</option>
                                     <option value="SD">South Dakota</option>
                                     <option value="TN">Tennessee</option>
                                     <option value="TX">Texas</option>
                                     <option value="UT">Utah</option>
                                     <option value="VT">Vermont</option>
                                     <option value="VA">Virginia</option>
                                     <option value="WA">Washington</option>
                                     <option value="WV">West Virginia</option>
                                     <option value="WI">Wisconsin</option>
                                     <option value="WY">Wyoming</option>
                                 </select>
                            </td>
                        </tr>
                        <tr>
                            <td>ZIP</td>
                            <td>
                                <input
                                type='text'
                                className='form-control'
                                maxLength='5'
                                value={this.state.zip}
                                required
                                onChange={this.onZipChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>BT ID</td>
                            <td>
                                <input
                                type='text'
                                className='form-control'
                                maxLength='5'
                                value={this.state.bt_id}
                                required
                                onChange={this.onBtidChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Insurance 1</td>
                            <td>
                                <input
                                type='text'
                                className='form-control'
                                value={this.state.ins_1}
                                required
                                onChange={this.onInsOneChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Insurance 2</td>
                            <td>
                                <input
                                type='text'
                                className='form-control'
                                value={this.state.ins_2}
                                onChange={this.onInsTwoChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Insurance 3</td>
                            <td>
                                <input
                                type='text'
                                className='form-control'
                                value={this.state.ins_3}
                                onChange={this.onInsThreeChange} />
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>
                                <button
                                    className='btn btn-primary'
                                    onClick={this.onSave}>Save Changes</button>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});
