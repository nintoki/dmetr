// component that renders a single Order
window.OrderRow = React.createClass({
    render: function() {
    return (
        <tr>
            <td>{this.props.order.created}</td>
            <td>{this.props.order.patient_name}</td>
            <td>
              <ol>
                <li>{this.props.order.product_1}</li>
                <li>{this.props.order.product_2}</li>
                <li>{this.props.order.product_3}</li>
                <li>{this.props.order.product_4}</li>
                <li>{this.props.order.product_5}</li>
              </ol>
            </td>
            <td>{this.props.order.clinic}</td>
            <td>{this.props.order.insurance}</td>
            <td>
                <a href='#'
                    onClick={() => this.props.changeAppMode('readOne', this.props.order.id)}
                    className='btn btn-info m-r-1em'> Read One
                </a>
                <a href='#'
                    onClick={() => this.props.changeAppMode('update', this.props.order.id)}
                    className='btn btn-primary m-r-1em'> Edit
                </a>
                <a
                    onClick={() => this.props.changeAppMode('delete', this.props.order.id)}
                    className='btn btn-danger'> Delete
                </a>
            </td>
        </tr>
        );
    }
});
