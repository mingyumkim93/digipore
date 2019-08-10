import React from 'react';
import axios from 'axios';

export class RequestDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            request: {}
        }
    }

    getRequestFromDB(requestId) {
        axios.get(`/api/requests/${requestId}`).then(res => {
            const request = res.data;
            this.setState({ request });
        });
    }

    componentDidMount() {
        let requestId = this.props.match.params.id;
        if (requestId) this.getRequestFromDB(requestId);
    }

    acceptRequest(){
        var d = new Date();
        let now = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        let updatedRequest = this.state.request;
        updatedRequest.state=10;
        updatedRequest.providing_user_id = localStorage.getItem("currentUser");
        updatedRequest.acceptedDayAndTime=now;
        axios.put(`/api/requests/${updatedRequest.id}`,updatedRequest).then(res=>{
            this.props.history.push("/main");
        });
    }

    render() {
        return <div> <h2>{this.state.request.explanation}</h2>
        {this.state.request.state==0 && <button onClick={()=>this.acceptRequest()}>Accept</button>}
        <button onClick={()=>this.props.history.push("/main")}>
            Back to main
        </button>
        </div>
    }
}