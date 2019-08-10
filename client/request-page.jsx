import React from 'react';
import axios from 'axios';
export class RequestPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { title:"", requestExplanation: "", location:"" }
  }

  textChanged(ev) {
    this.setState({ [ev.target.id]: ev.target.value });
  }

  createRequest() {
    if(!this.state.title){
      window.alert("You can't empty title!");
      return;
    }
    if(!this.state.requestExplanation){
      window.alert("You can't empty explanation!");
      return;
    }

    var d = new Date();
    let now = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
     axios.post('/api/requests', {
      id: null,
      title:this.state.title,
      explanation: this.state.requestExplanation,
      requesting_user_id: localStorage.getItem("currentUser"),
      providing_user_id: null,
      state:0,
      requestedDayAndTime:now,
      acceptedDayAndTime:null,
      location:this.state.location
    })
      .then((res) => {
        this.props.history.push("/main");
      })
      .catch((err)=> {
        console.log(err);
      });
  }

  render() {
    return <div>
      <input type="text" id="title" placeholder="title" onChange={ev => this.textChanged(ev)} />
      <input type="text" id="location" placeholder="location" onChange={ev=> this.textChanged(ev)} />
      <textarea type="text" id="requestExplanation" placeholder="Explanation" onChange={ev => this.textChanged(ev)} />
      <button onClick={() => {
        this.createRequest();
      }}>Request</button>
      <button onClick={() => this.props.history.push("/main")}>Cancel</button>
    </div>
  }
}