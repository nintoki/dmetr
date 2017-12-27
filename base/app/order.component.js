// component that decides which main component to load: read or create/update
var OrderApp = React.createClass({

    // initial mode is 'read' mode
    getInitialState: function(){
        return {
            currentMode: 'read',
            orderId: null
        };
    },

    // used when use clicks something that changes the current mode
    changeAppMode: function(newMode, orderId){
        this.setState({currentMode: newMode});
            if(orderId !== undefined){
            this.setState({orderId: orderId});
        }
    },

    // render the component based on current or selected mode
    render: function(){

        var modeComponent =
            <ReadOrdersComponent
            changeAppMode={this.changeAppMode} />;

        switch(this.state.currentMode){
            case 'read':
                break;
            case 'readOne':
                modeComponent = <ReadOneOrderComponent orderId={this.state.orderId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'readPtOrder':
                modeComponent = <ReadPtOrderComponent orderId={this.state.orderId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'create':
                modeComponent = <CreateOrderComponent changeAppMode={this.changeAppMode}/>;
                break;
            case 'update':
                modeComponent = <UpdateOrderComponent orderId={this.state.orderId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'delete':
                modeComponent = <DeleteOrderComponent orderId={this.state.orderId} changeAppMode={this.changeAppMode}/>;
                break;
            default:
                break;
        }

        return modeComponent;
    }
});

// go and render the whole React component on to the div with id 'content'
// ReactDOM.render(
//     <OrderApp />,
//     document.getElementById('content1')
// );
