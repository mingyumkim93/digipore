import React from 'react';
import axios from 'axios';

export class RequestDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            request: {
                id: 0,
                title: "",
                isAccapted: false,
                explanation: "",
                requesting_user_id: "",
                providing_user_id: ""
            }
        };
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


    render() {
        let requestId = this.props.match.params.id;
        return <div> <h2>{this.state.request.explanation}</h2>
        <button onClick={()=>{
            axios.put(`/api/requests/${requestId}`).then(res=>{
                const request = res.data;
                this.setState({request});
            });
            this.props.history.push("/main");                    
                                }}>Accept</button>
        </div>
    }
}