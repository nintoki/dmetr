// component that renders a single Patient
window.PatientRow = React.createClass({
    render: function() {
    return (
        <tr>
            <td>{this.props.patient.last_name}, {this.props.patient.first_name}</td>
            <td>{this.props.patient.phone}</td>
            <td>{this.props.patient.address_1} {this.props.patient.address_2}<br />{this.props.patient.city}, {this.props.patient.st} {this.props.patient.zip}</td>
            <td>{this.props.patient.bt_id}</td>
            <td>
              <ol>
                <li>
                  {this.props.patient.ins_1}
                </li>
                <li>
                  {this.props.patient.ins_2}
                </li>
                <li>
                  {this.props.patient.ins_3}
                </li>
              </ol></td>
            <td>
                <a href='#'
                    onClick={() => this.props.changeAppMode('readOne', this.props.patient.id)}
                    className='btn btn-info m-r-1em'> Read One
                </a>
                <a href='#'
                    onClick={() => this.props.changeAppMode('update', this.props.patient.id)}
                    className='btn btn-primary m-r-1em'> Edit
                </a>
                <a
                    onClick={() => this.props.changeAppMode('delete', this.props.patient.id)}
                    className='btn btn-danger'> Delete
                </a>
            </td>
        </tr>
        );
    }
});
