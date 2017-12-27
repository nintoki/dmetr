// component that contains the logic to update a Order
window.UpdateOrderComponent = React.createClass({
// initial component states will be here
    getInitialState: function() {
        // Get this Order fields from the data attributes we set on the
        // #content div, using jQuery
        return {
            patients: [],
            selectedPatientId: 0,
            id: 0,
            product_1: '',
            product_2: '',
            product_3: '',
            product_4: '',
            product_5: '',
            clinic: '',
            insurance: '',
            successUpdate: null
        };
    },

    // on mount, fetch all patients and one Order data to stored them as this component's state
    componentDidMount: function(){

        // read patients
        this.serverRequestCat = $.get("http://localhost/api/patient/read.php",
            function (patients) {
                this.setState({
                    patients: patients.records
                });
            }.bind(this));

        // read one Order data
        var orderId = this.props.orderId;
        this.serverRequestProd = $.get("http://localhost/api/order/read_one.php?id=" + orderId,
            function (order) {
                this.setState({selectedPatientId: order.patient_id});
                this.setState({id: order.id});
                this.setState({product_1: order.product_1});
                this.setState({product_2: order.product_2});
                this.setState({product_3: order.product_3});
                this.setState({product_4: order.product_4});
                this.setState({product_5: order.product_5});
                this.setState({clinic: order.clinic});
                this.setState({insurance: order.insurance});
            }.bind(this));

        $('.page-header h1').text('Update order');
    },

    // on unmount, kill patients fetching in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequestCat.abort();
        this.serverRequestProd.abort();
    },

// handle form field changes here
    // handle patient change
    onPatientChange: function(e){
        this.setState({selectedPatientId: e.target.value});
    },

    // handle product change
    onProductChange: function(e){
        this.setState({product_1: e.target.value});
    },
    onProductTwoChange: function(e){
        this.setState({product_2: e.target.value});
    },
    onProductThreeChange: function(e){
        this.setState({product_3: e.target.value});
    },
    onProductFourChange: function(e){
        this.setState({product_4: e.target.value});
    },
    onProductFiveChange: function(e){
        this.setState({product_5: e.target.value});
    },

    // handle clinic change
    onClinicChange: function(e){
        this.setState({clinic: e.target.value});
    },

    // handle insurance change
    onInsuranceChange: function(e){
        this.setState({insurance: e.target.value});
    },

// handle save changes button here
    // handle save changes button clicked
    onSave: function(e){

        // data in the form
        var form_data={
            id: this.state.id,
            product_1: this.state.product_1,
            product_2: this.state.product_2,
            product_3: this.state.product_3,
            product_4: this.state.product_4,
            product_5: this.state.product_5,
            clinic: this.state.clinic,
            insurance: this.state.insurance,
            patient_id: this.state.selectedPatientId
        };

        // submit form data to api
        $.ajax({
            url: "http://localhost/api/order/update.php",
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
        var patientsOptions = this.state.patients.map(function(patient){
            return (
                <option key={patient.id} value={patient.id}>{patient.last_name}, {patient.first_name}</option>
            );
        });

        return (
            <div>
                {
                    this.state.successUpdate == "Order was updated." ?
                        <div className='alert alert-success'>
                            Order was updated.
                        </div>
                    : null
                }

                {
                    this.state.successUpdate == "Unable to update order." ?
                        <div className='alert alert-danger'>
                            Unable to update order. Please try again.
                        </div>
                    : null
                }

                <a href='#'
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'>
                    Read Orders
                </a>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>Product 1</td>
                            <td>
                                <textarea
                                    type='text'
                                    className='form-control'
                                    required
                                    value={this.state.product_1}
                                    onChange={this.onProductChange}>
                                </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>Product 2</td>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={this.state.product_2}
                                    required
                                    onChange={this.onProductTwoChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Product 3</td>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={this.state.product_3}
                                    required
                                    onChange={this.onProductThreeChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Product 4</td>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={this.state.product_4}
                                    required
                                    onChange={this.onProductFourChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Product 5</td>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={this.state.product_5}
                                    required
                                    onChange={this.onProductFiveChange} />
                            </td>
                        </tr>

                        <tr>
                            <td>Clinic</td>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={this.state.clinic}
                                    required
                                    onChange={this.onClinicChange} />
                            </td>
                        </tr>

                        <tr>
                            <td>Insurance</td>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={this.state.insurance}
                                    required
                                    onChange={this.onInsuranceChange}/>
                            </td>
                        </tr>

                        <tr>
                            <td>Patient</td>
                            <td>
                                <select
                                    onChange={this.onPatientChange}
                                    className='form-control'
                                    value={this.state.selectedPatientId}>
                                    <option value="-1">Select patient...</option>
                                    {patientsOptions}
                                    </select>
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
