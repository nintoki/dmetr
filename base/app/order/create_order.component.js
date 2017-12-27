window.CreateOrderComponent = React.createClass({
// initial component states will be here
    // initialize values
    getInitialState: function() {
      return {
          patients: [],
          selectedPatientId: -1,
          product_1: '',
          product_2: '',
          product_3: '',
          product_4: '',
          product_5: '',
          clinic: '',
          insurance: '',
          created: '',
          successCreation: null
      };
    },

    // on mount, get all patients and store them in this component's state
    componentDidMount: function() {
      this.serverRequest = $.get("http://localhost/api/patient/read.php", function (patients) {
          this.setState({
              patients: patients.records
          });
      }.bind(this));

      $('.page-header h1').text('Create Order');
    },

    // on unmount, stop getting patients in case the request is still loading
    componentWillUnmount: function() {
      this.serverRequest.abort();
    },

// handle form field changes here
    // handle patient change
    onPatientChange: function(e) {
        this.setState({selectedPatientId: e.target.value});
    },

    // handle Product change
    onProductChange: function(e) {
        this.setState({product_1: e.target.value});
    },
    onProductTwoChange: function(e) {
        this.setState({product_2: e.target.value});
    },
    onProductThreeChange: function(e) {
        this.setState({product_3: e.target.value});
    },
    onProductFourChange: function(e) {
        this.setState({product_4: e.target.value});
    },
    onProductFiveChange: function(e) {
        this.setState({product_5: e.target.value});
    },

    // handle clinic change
    onClinicChange: function(e) {
        this.setState({clinic: e.target.value});
    },

    // handle insurance change
    onInsuranceChange: function(e) {
        this.setState({insurance: e.target.value});
    },

// handle save button here

    // handle save button clicked
    onSave: function(e){

        // data in the form
        var form_data={
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
            url: "http://localhost/api/order/create.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : function(response) {

                // api message
                this.setState({successCreation: response['message']});

                // empty form
                this.setState({product_1: ""});
                this.setState({product_2: ""});
                this.setState({product_3: ""});
                this.setState({product_4: ""});
                this.setState({product_5: ""});
                this.setState({clinic: ""});
                this.setState({insurance: ""});
                this.setState({selectedPatientId: -1});

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

        // make patients as option for the select tag.
        var patientsOptions = this.state.patients.map(function(patient){
            return (
                <option key={patient.id} value={patient.id}>{patient.last_name}, {patient.first_name}</option>
            );
        });

        /*
        - tell the user if a order was created
        - tell the user if unable to create order
        - button to go back to orders list
        - form to create a order
        */
        return (
        <div>
            {

                this.state.successCreation == "Order was created." ?
                    <div className='alert alert-success'>
                        Order was saved.
                    </div>
                : null
            }

            {

                this.state.successCreation == "Unable to create order." ?
                    <div className='alert alert-danger'>
                        Unable to save order. Please try again.
                    </div>
                : null
            }

            <a href='#'
                onClick={() => this.props.changeAppMode('read')}
                className='btn btn-primary margin-bottom-1em'> Read Orders
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
                            <option value="-1">Select Patient...</option>
                            {patientsOptions}
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td></td>
                        <td>
                            <button
                            className='btn btn-primary'
                            onClick={this.onSave}>Save</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
        );
    }
});
