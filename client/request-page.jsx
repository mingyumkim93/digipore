import React from 'react';
import auth from './auth';
import axios from 'axios';
export class RequestPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { title:"", requestExplanation: "" }
  }

  textChanged(ev) {
    this.setState({ [ev.target.id]: ev.target.value });
  }

  createRequest() {
     axios.post('/api/requests', {
      id: null,
      title:this.state.title,
      explanation: this.state.requestExplanation,
      requesting_user_id: auth.currentId,
      providing_user_id: null,
      isAccepted:false
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return <div>
      <input type="text" id="title" placeholder="title" onChange={ev => this.textChanged(ev)} />
      <input type="text" id="requestExplanation" placeholder="Explanation" onChange={ev => this.textChanged(ev)} />
      
      <button onClick={() => {
        this.createRequest();
        this.props.history.push("/main");
      }}>Request</button>
      <button onClick={() => this.props.history.push("/main")}>Cancel</button>
    </div>
  }
}