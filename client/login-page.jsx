import React from 'react';
import auth from './auth';

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: [
            {id: "user1", password: "abcd1234"},
            {id: "user2", password: "test1234"},
            {id: "user3", password: "q1w2e3r4"},
            {id: "user4", password: "12345678"}
        ], enableLogin: false, idInput:"",passwordInput:""};
    }

    textChanged(ev) {
        this.setState({ [ev.target.id]: ev.target.value });
    }

    componentDidUpdate(){
        let idMatched = this.state.users.find(user=>user.id == this.state.idInput);
        if(idMatched) {
            this.checkPassword();
        }
    }

    checkPassword(){
        let matchedIndex = this.state.users.findIndex(user => user.id == this.state.idInput);
        if(this.state.users[matchedIndex].password == this.state.passwordInput)
        this.state.enableLogin = true;
    }

    render() {
        return <div>
            <input type="text" id="idInput" placeholder="ID" onChange={ev => this.textChanged(ev)} />
            <input type="password" id="passwordInput" placeholder="PASSWORD" onChange={ev => this.textChanged(ev)} />
            <button
                onClick={
                    () => {
                        if (this.state.enableLogin==true){
                            auth.currentId=this.state.idInput;
                            auth.login(() =>
                            this.props.history.push("/main"));}
                        else console.log("Please check your ID and Password");
                    }
                }
            >Login</button>

        </div>
    }
}