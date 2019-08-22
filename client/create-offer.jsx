import React from 'react';
import axios from 'axios';
import {Input, Button} from 'reactstrap';

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
            fee:this.state.fee,
            state:0
        }
        axios.post('/api/offer',offer)
        .then(res=>{
            alert("You Created an offer!");
            this.props.history.goBack();
        })
        .catch(err=>console.log(err))

    }

    render(){
        if(this.state.errand.poster == localStorage.getItem("currentUser"))
        return <div><h1>You can't offer to your errand</h1></div>
        return <div>
            <h4>Create Offer</h4>
            <Input style={{marginBottom:"2%"}} type="textarea" id="message" placeholder="message" onChange={(ev)=>this.textChanged(ev)}/>
            <Input style={{marginBottom:"2%"}} type="number" id="fee" placeholder="Fee" onChange={(ev)=>this.textChanged(ev)}/>
            <Button style={{width:"50%"}} outline color="primary" onClick={()=>this.sendOffer()}>Send</Button>
            <Button style={{width:"50%"}} outline color="primary" onClick={()=>this.props.history.goBack()}>Back</Button>
        </div>
    }
}