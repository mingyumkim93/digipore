import React from 'react';
import axios from 'axios';
export class NewErrandPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { title:"", explanation: "", location:"" }
  }

  textChanged(ev) {
    this.setState({ [ev.target.id]: ev.target.value });
  }

  createErrand() {
    if(!this.state.title){
      window.alert("You can't empty title!");
      return;
    }
    if(!this.state.explanation){
      window.alert("You can't empty explanation!");
      return;
    }

    var d = new Date();
    let now = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
     axios.post('/api/errands', {
      id: null,
      title:this.state.title,
      explanation: this.state.explanation,
      poster: localStorage.getItem("currentUser"),
      runner: null,
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
      <textarea type="text" id="explanation" placeholder="Explanation" onChange={ev => this.textChanged(ev)} />
      <button onClick={() => {
        this.createErrand();
      }}>Post</button>
      <button onClick={() => this.props.history.push("/main")}>Cancel</button>
    </div>
  }
}