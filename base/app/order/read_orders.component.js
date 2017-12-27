// component that contains all the logic and other smaller components
// that form the Read Orders view
window.ReadOrdersComponent = React.createClass({
    getInitialState: function() {
        return {
            orders: []
        };
    },

    // on mount, fetch all orders and stored them as this component's state
    componentDidMount: function() {

        this.serverRequest = $.get("http://localhost/api/order/read.php", function (orders) {
            this.setState({
                orders: orders.records
            });
        }.bind(this));
    },

    // on unmount, kill order fetching in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    // render component on the page
    render: function() {
        // list of orders
        var filteredOrders = this.state.orders;
        $('.page-header h1').text('Read Orders');

        return (
            <div className='overflow-hidden'>
                <TopActionsComponent changeAppMode={this.props.changeAppMode} />

                <OrdersTable
                    orders={filteredOrders}
                    changeAppMode={this.props.changeAppMode} />
            </div>
        );
    }
});
