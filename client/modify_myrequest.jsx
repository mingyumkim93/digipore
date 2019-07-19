import React from 'react';
import axios from 'axios';

export class ModifyMyRequest extends React.Component
{

    constructor(props){
        super(props);
        this.state={
            request:{
                id: 0,
                title: "",
                isAccepted: false,
                explanation: "",
                requesting_user_id: "",
                providing_user_id: ""
            },
                newTitle: "",
                newExplanation: ""
        },this._isMounted = false;
    }

    getRequestFromDB(requestId){
        axios.get(`/api/requests/${requestId}`).then(res => {
            const request = res.data;
            this._isMounted && this.setState({ request });
        });
    }

    componentDidMount(){
        this._isMounted = true;
        let requestId = this.props.match.params.id;
        if (requestId) this.getRequestFromDB(requestId);
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    textChanged(ev){
        this.setState({[ev.target.id] : ev.target.value});
    }

    modifyTheRequest(){
        let requestId = this.props.match.params.id;
        let newRequest={
            id: this.state.request.id,
            title: this.state.newTitle,
            isAccepted: this.state.request.isAccepted,
            explanation: this.state.newExplanation,
            requesting_user_id: this.state.request.requesting_user_id,
            providing_user_id: this.state.request.providing_user_id
        };
        axios.put(`/api/requests/${requestId}`,newRequest).then(res=>{
            const request = res.data;
            this._isMounted && this.setState({request});
        });

    }

    render(){
        return <div>
            <input onChange={ev => this.textChanged(ev)} type="text" id="newTitle" placeholder="title"></input>
            <input onChange={ev => this.textChanged(ev)} type="text" id="newExplanation" placeholder="explanation"></input>
            <button onClick={()=> {this.modifyTheRequest();
                                   this.props.history.push("/main")}}>modify</button>
            <button onClick={()=> this.props.history.push("/main")}>cancel</button>
        </div>
    }
}