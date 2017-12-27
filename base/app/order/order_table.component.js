// component for the whole Orders table
window.OrdersTable = React.createClass({
    render: function() {

    var rows = this.props.orders
        .map(function(order, i) {
            return (
                <OrderRow
                    key={i}
                    order={order}
                    changeAppMode={this.props.changeAppMode} />
            );
        }.bind(this));

        return(
            !rows.length
                ? <div className='alert alert-danger'>No orders found.</div>
                :
                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>Created</th>
                            <th>Patient</th>
                            <th>Products</th>
                            <th>Clinic</th>
                            <th>Insurance</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
        );
    }
});
