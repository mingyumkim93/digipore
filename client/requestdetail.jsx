import React from 'react';
import axios from 'axios';

export class RequestDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            request: {
                id: 0,
                title: "",
                isAccepted: false,
                explanation: "",
                requesting_user_id: "",
                providing_user_id: ""
            }
        },this._isMounted=false;
    }

    getRequestFromDB(requestId) {
        axios.get(`/api/requests/${requestId}`).then(res => {
            const request = res.data;
            this._isMounted && this.setState({ request });
        });
    }

    componentDidMount() {
        this._isMounted = true;
        let requestId = this.props.match.params.id;
        if (requestId) this.getRequestFromDB(requestId);
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        let requestId = this.props.match.params.id;
        let newRequest = {
            id: null,
            title: this.state.request.title,
            isAccepted: true,
            explanation: this.state.request.explanation,
            requesting_user_id: this.state.request.requesting_user_id,
            providing_user_id: localStorage.getItem("currentUser")
        }
        console.log(newRequest);
        return <div> <h2>{this.state.request.explanation}</h2>
        <button onClick={()=>{
            axios.put(`/api/requests/${requestId}`,newRequest).then(res=>{
                const request = res.data;
                this._isMounted && this.setState({request});
            });
            this.props.history.push("/main");                    
                                }}>Accept</button>
        </div>
    }
}