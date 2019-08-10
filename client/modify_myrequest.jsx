import React from 'react';
import axios from 'axios';

export class ModifyMyRequest extends React.Component {

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
                requestedDayAndTime:null,
                acceptedDayAndTime:null,
                location:""
            },
            newTitle: "",
            newExplanation: "",
            newLocation:""
        }
    }

    getRequestFromDB(requestId) {
        axios.get(`/api/requests/${requestId}`).then(res => {
            const request = res.data;
            this.setState({ request });
            this.setState({newTitle : request.title})
            this.setState({newExplanation : request.explanation})
            this.setState({newLocation:request.location})
        });
    }

    componentDidMount() {
        let requestId = this.props.match.params.id;
        if (requestId) this.getRequestFromDB(requestId);
    }

    textChanged(ev) {
        this.setState({ [ev.target.id]: ev.target.value });
    }

    modifyRequest() {
        if (!this.state.newTitle) {
            window.alert("You can't empty title!");
            return;
        }
        if (!this.state.newExplanation) {
            window.alert("You can't empty explanation!");
            return;
        }
        if (!this.state.newLocation) {
            window.alert("You can't empty location!");
            return;
        }
        let requestId = this.props.match.params.id;
        let newRequest = {
            id: this.state.request.id,
            title: this.state.newTitle,
            state: this.state.request.state,
            explanation: this.state.newExplanation,
            requesting_user_id: this.state.request.requesting_user_id,
            providing_user_id: this.state.request.providing_user_id,
            requestedDayAndTime: this.state.request.requestedDayAndTime,
            acceptedDayAndTime: this.state.request.acceptedDayAndTime,
            location:this.state.newLocation
        };
        axios.put(`/api/requests/${requestId}`,newRequest).then(()=>this.props.history.push("/main"));
    }

    deleteErrand(){
        let requestId = this.props.match.params.id;
        axios.delete(`/api/requests/${requestId}`).then(()=>this.props.history.push("/main"))
    }

    render() {
        let {newTitle, newExplanation, newLocation} = this.state;
        return <div>
            <input onChange={ev => this.textChanged(ev)} type="text" id="newTitle" value={newTitle}/>
            <textarea onChange={ev => this.textChanged(ev)} type="text" id="newExplanation" value={newExplanation}/>
            <input onChange={ev=> this.textChanged(ev)} type="text" id="newLocation" value={newLocation}/>
            <button onClick={() => {
                this.modifyRequest();
            }}>modify</button>
            <button onClick={() => {
                this.deleteErrand();
            }}>delete</button>
            <button onClick={() => this.props.history.push("/main")}>cancel</button>

        </div>
    }
}