import React from 'react';
import auth from './auth';
import axios from 'axios';
export class RequestPage extends React.Component{

    constructor(props){
        super(props);
        this.state={requestExplanation:""}
    }

    textChanged(ev){
        this.setState({[ev.target.id] : ev.target.value}); 
    }


    render(){
        return <div>
            <input type="text" id="requestExplanation" placeholder="requestExplanation" onChange={ev => this.textChanged(ev)}/>
            <button onClick={()=>{
                 axios.post('/api/requests',{
                    id: null,
                    explanation: this.state.requestExplanation,
                    requesting_user_id: auth.currentId,
                    providing_user_id: ""
                  })
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
                this.props.history.push("/main");
                }}>Request</button> 
            <button onClick={()=>this.props.history.push("/main")}>Cancel</button>
        </div>
    }
}