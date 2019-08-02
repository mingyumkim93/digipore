import React from 'react';
import axios from 'axios';
import auth from './auth';

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { emailInput: "", passwordInput: "" };
    }

    textChanged(ev) {
        this.setState({ [ev.target.id]: ev.target.value });
    }

    sendLoginRequest(emailInput, passwordInput) {
        if (!emailInput) {
            console.log("put your email");
            return;
        }

        if (!passwordInput) {
            console.log("put you password")
            return;
        }

        axios.post('/login', { emailInput, passwordInput })
            .then((resp) => {
                console.log("axios post from login page : " + emailInput + " " + passwordInput);
                if (resp.status == 200) {
                    localStorage.setItem("isAuthenticated", true);
                    localStorage.setItem("currentUser",emailInput)
                    this.props.history.push("/main")
                }
            })
            .catch((err) => console.log("there is error" + err));
        //todo : better error handling
    }

    render() {
        let { emailInput, passwordInput } = this.state;
        return <div>
            <input type="text" id="emailInput" name="emailInput" placeholder="Email" onChange={ev => this.textChanged(ev)} />
            <input type="password" id="passwordInput" name="passwordInput" placeholder="Password" onChange={ev => this.textChanged(ev)} />
            <button onClick={
                () => this.sendLoginRequest(emailInput, passwordInput)}
            >Login</button>
        </div>
    }
}