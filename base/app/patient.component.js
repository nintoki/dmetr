// component that decides which main component to load: read or create/update
var PatientApp = React.createClass({

    // initial mode is 'read' mode
    getInitialState: function(){
        return {
            currentMode: 'read',
            patientId: null
        };
    },

    // used when use clicks something that changes the current mode
    changeAppMode: function(newMode, patientId){
        this.setState({currentMode: newMode});
            if(patientId !== undefined){
            this.setState({patientId: patientId});
        }
    },

    // render the component based on current or selected mode
    render: function(){

        var modeComponent =
            <ReadPatientsComponent
            changeAppMode={this.changeAppMode} />;

        switch(this.state.currentMode){
            case 'read':
                break;
            case 'readOne':
                modeComponent = <ReadOnePatientComponent patientId={this.state.patientId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'create':
                modeComponent = <CreatePatientComponent changeAppMode={this.changeAppMode}/>;
                break;
            case 'update':
                modeComponent = <UpdatePatientComponent patientId={this.state.patientId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'delete':
                modeComponent = <DeletePatientComponent patientId={this.state.patientId} changeAppMode={this.changeAppMode}/>;
                break;
            default:
                break;
        }

        return modeComponent;
    }
});

// go and render the whole React component on to the div with id 'content'
ReactDOM.render(
    <PatientApp />,
    document.getElementById('content')
);
