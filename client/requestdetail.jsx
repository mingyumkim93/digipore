import React from 'react';
import axios from 'axios';

export class RequestDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            request: {
                id: 0,
                title: "",
                state: 0,
                explanation: "",
                requesting_user_id: "",
                providing_user_id: "",
                location:""
            }
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
        let requestId = this.props.match.params.id;
        let newRequest = {
            id: null,
            title: this.state.request.title,
            state: 10,
            explanation: this.state.request.explanation,
            requesting_user_id: this.state.request.requesting_user_id,
            providing_user_id: localStorage.getItem("currentUser"),
            requestedDayAndTime:this.state.request.requestedDayAndTime,
            acceptedDayAndTime:now,
            location:this.state.request.location
        };
        axios.put(`/api/requests/${requestId}`,newRequest).then(res=>{
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