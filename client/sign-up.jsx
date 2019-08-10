import React from 'react';
import axios from 'axios';

export class SignUp extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            firstName:"",
            lastName:""
        }
    }

    textChange(e){
        this.setState({[e.target.id]:e.target.value});
    }

    signUp(){
        let email = this.state.email;
        let password = this.state.password;
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let id= null;
        if(!(email&&password&&firstName&&lastName)) {
            window.alert("Please fill every fields!");
            return;
        }
        axios.post("/api/user", { id, firstName, lastName, email, password})
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
            <input onChange={(e)=>this.textChange(e)} type="text" id="email" placeholder="email"/>
            <input onChange={(e)=>this.textChange(e)} type="text" id="password" placeholder="password"/>
            <input onChange={(e)=>this.textChange(e)} type="text" id="firstName" placeholder="firstName"/>
            <input onChange={(e)=>this.textChange(e)} type="text" id="lastName" placeholder="lastName"/>
            <button onClick={()=>this.signUp()}>Sign Up</button>
            <button onClick={()=>this.props.history.push("/")}>Back to main</button>
        </div>
    }
}
