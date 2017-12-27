// component that contains the logic to read one Order
window.ReadOneOrderComponent = React.createClass({
// initial component state will be here
    getInitialState: function() {
        // Get this Order fields from the data attributes we set on the
        // #content div, using jQuery
        return {
            id: 0,
            product_1: '',
            product_2: '',
            product_3: '',
            product_4: '',
            product_5: '',
            clinic: '',
            insurance: '',
            patient_name: '',
            created: ''
        };
    },

    // on mount, read Order data and them as this component's state
    componentDidMount: function(){

        var orderId = this.props.orderId;

        this.serverRequestProd = $.get("http://localhost/api/order/read_one.php?id=" + orderId,
            function (order) {
                this.setState({patient_name: order.patient_name});
                this.setState({id: order.id});
                this.setState({product_1: order.product_1});
                this.setState({product_2: order.product_2});
                this.setState({product_3: order.product_3});
                this.setState({product_4: order.product_4});
                this.setState({product_5: order.product_5});
                this.setState({clinic: order.clinic});
                this.setState({insurance: order.insurance});
                this.setState({created: order.created});
            }.bind(this));

        $('.page-header h1').text('Read Order');
    },

    // on unmount, kill patients fetching in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequestProd.abort();
    },

// render component html will be here
    render: function() {

        return (
            <div>
                <a href='#'
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'>
                    Read Orders
                </a>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                            <tr>
                                <td>Created</td>
                                <td>{this.state.created}</td>
                            </tr>
                            <tr>
                                <td>Product 1</td>
                                <td>{this.state.product_1}</td>
                            </tr>
                            <tr>
                                <td>Product 2</td>
                                <td>{this.state.product_2}</td>
                            </tr>
                            <tr>
                                <td>Product 3</td>
                                <td>{this.state.product_3}</td>
                            </tr>
                            <tr>
                                <td>Product 4</td>
                                <td>{this.state.product_4}</td>
                            </tr>
                            <tr>
                                <td>Product 5</td>
                                <td>{this.state.product_5}</td>
                            </tr>

                            <tr>
                                <td>Clinic</td>
                                <td>{this.state.clinic}</td>
                            </tr>

                            <tr>
                                <td>Insurance</td>
                                <td>{this.state.insurance}</td>
                            </tr>

                            <tr>
                                <td>Patient</td>
                                <td>{this.state.patient_name}</td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});
