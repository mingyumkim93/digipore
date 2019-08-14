import React from 'react';
import axios from 'axios';

export class MyAccountPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            user:{},
            newFirstName:"",
            newLastName:"",
            newPhone:"",
            newPassword:""
        }
    }

    componentDidMount(){
        axios.get(`/api/user/${localStorage.getItem("currentUser")}`)
        .then(res=>{
            console.log(res.data);
            this.setState({user:res.data});
            this.setState({newFirstName:res.data.firstName});
            this.setState({newLastName:res.data.lastName});
            this.setState({newPhone:res.data.phone});
        })
        .catch(err=> console.log(err));
    }

    updateAccount(){
        let {newFirstName, newLastName, newPhone, newPassword} = this.state;
        if(!(newFirstName && newLastName && newPhone && newPassword)){
            alert("Please fill every fields!")
            return;
        } 
        let changedUser = this.state.user;
        changedUser.firstName = this.state.newFirstName;
        changedUser.lastName = this.state.newLastName;
        changedUser.phone = this.state.newPhone;
        changedUser.password = this.state.newPassword;
        axios.put(`/api/user/${localStorage.getItem("currentUser")}`,changedUser)
        .then(res=>{
            console.log(res);
            alert("Your account information has changed");
            this.props.history.push("/errands-list");
        })
        .catch(err => console.log(err));
    }

    textChanged(e){
        this.setState({[e.target.id]:e.target.value});
    }

    render(){
        return<div>
            <input onChange={(e)=>this.textChanged(e)} type="text" id="newFirstName" value={this.state.newFirstName}></input>
            <input onChange={(e)=>this.textChanged(e)} type="text" id="newLastName" value={this.state.newLastName}></input>
            <input onChange={(e)=>this.textChanged(e)} type="text" id="newPhone" value={this.state.newPhone}></input>
            <input onChange={(e)=>this.textChanged(e)} type="password" id="newPassword"/>
            <button onClick={()=>this.updateAccount()}>Change</button>
            <button onClick={()=>this.props.history.goBack()}>Back</button>
        </div>
    }
}