// component that contains the functionalities that appear on top of
// the products table: create patient
window.TopActionsComponentPatient = React.createClass({
    render: function(){
        return (
            <div>
                <a href='#'
                    onClick={() => this.props.changeAppMode('create')}
                    className='btn btn-primary margin-bottom-1em'> Create Patient
                </a>
            </div>
        );
    }
});
