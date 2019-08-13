import React from 'react';
import axios from 'axios';

export class SignUpPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            id:null,
            email:"",
            password:"",
            firstName:"",
            lastName:"",
            phone:null
        }
    }

    textChange(e){
        this.setState({[e.target.id]:e.target.value});
    }

    signUp(){
        let {id, firstName, lastName, email, password, phone} = this.state;
        if(!(email&&password&&firstName&&lastName&phone)) {
            window.alert("Please fill every fields!");
            return;
        }
        axios.post("/api/user", { id, firstName, lastName, email, password, phone})
            .then((res) => {
                if(res.status==200){
                    window.alert("You signed up successfully. Move to login page.");
                    this.props.history.push("/");
                }
            })
            .catch(err => {
                if (err.response.status == 404) {
                    window.alert(`Email ${email} is already exist, please select other email`);
                    return;
                }
            });
    }

    render(){
        return <div>
            <input onChange={(e)=>this.textChange(e)} type="text" id="email" placeholder="Email"/>
            <input onChange={(e)=>this.textChange(e)} type="text" id="password" placeholder="Password"/>
            <input onChange={(e)=>this.textChange(e)} type="text" id="firstName" placeholder="FirstName"/>
            <input onChange={(e)=>this.textChange(e)} type="text" id="lastName" placeholder="LastName"/>
            <input onChange={(e)=>this.textChange(e)} type="text" id="phone" placeholder="Phone"/>
            <button onClick={()=>this.signUp()}>Sign Up</button>
            <button onClick={()=>this.props.history.goBack()}>Back</button>
        </div>
    }
}
