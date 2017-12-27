// component that contains the functionalities that appear on top of
// the products table: create order
window.TopActionsComponent = React.createClass({
    render: function(){
        return (
            <div>
                <a href='#'
                    onClick={() => this.props.changeAppMode('create')}
                    className='btn btn-primary margin-bottom-1em'> Create Order
                </a>
            </div>
        );
    }
});
