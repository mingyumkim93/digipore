import React from 'react';
import axios from 'axios';

export class ErrandDetailPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errand: {}
        }
    }

    getErrandFromDB(errandId) {
        axios.get(`/api/errands/${errandId}`).then(res => {
            const errand = res.data;
            this.setState({ errand });
        });
    }

    componentDidMount() {
        let errandId = this.props.match.params.id;
        if (errandId) this.getErrandFromDB(errandId);
    }

    runErrand(){
        let doubleCheck = confirm("Do you really want to run this errand?")
        if(doubleCheck){
            var d = new Date();
            let now = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
            let updatedErrand = this.state.errand;
            updatedErrand.state=10;
            updatedErrand.runner = localStorage.getItem("currentUser");
            updatedErrand.acceptedDayAndTime=now;
            axios.put(`/api/errands/${updatedErrand.id}`,updatedErrand).then(res=>{
                this.props.history.push("/errands-list");
            });
        }
        else return;
    }

    render() {
        return <div> <h2>{this.state.errand.explanation}</h2>
        {this.state.errand.state==0 && <button onClick={()=>this.runErrand()}>Run Errand</button>}
        <button onClick={()=>this.props.history.push("/errands-list")}>
            Back to list
        </button>
        </div>
    }
}