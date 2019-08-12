import React from 'react';
import axios from 'axios';

export class CreateOfferPage extends React.Component{


    constructor(props){
        super(props);
        this.state={
            errand:{},
            message:"",
            fee:0
        }
    }

    getErrandFromDB(errandId) {
        axios.get(`/api/errands/${errandId}`).then(res => {
            const errand = res.data;
            this.setState({ errand });
        });
    }

    componentDidMount() {
        let errandId = this.props.match.params.id;
        if (errandId) this.getErrandFromDB(errandId);
    }

    textChanged(ev){
        this.setState({ [ev.target.id]: ev.target.value });
    }

    sendOffer(){
        var d = new Date();
        let now = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        let offer = {
            id:null,
            sender:localStorage.getItem("currentUser"),
            receiver:this.state.errand.poster,
            message:this.state.message,
            date:now,
            errand_id:this.state.errand.id,
            fee:this.state.fee
        }
        axios.post('/api/offer',offer)
        .then(res=>{
            alert("You Created an offer!");
            this.props.history.goBack();
        })
        .catch(err=>console.log(err))

    }

    render(){
        return <div>
            <textarea type="text" id="message" placeholder="message" onChange={(ev)=>this.textChanged(ev)}/>
            <input type="number" id="fee" placeholder="Fee" onChange={(ev)=>this.textChanged(ev)}/>
            <button onClick={()=>this.sendOffer()}>Send</button>
            <button onClick={()=>this.props.history.goBack()}>Back</button>
        </div>
    }
}