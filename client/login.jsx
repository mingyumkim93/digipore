import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap'

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
            alert("Put your email.");
            return;
        }

        if (!passwordInput) {
            alert("Put you password.");
            return;
        }

        axios.post('/login', { emailInput, passwordInput })
            .then((resp) => {
                if (resp.status == 200) {
                    localStorage.setItem("isAuthenticated", true);
                    localStorage.setItem("currentUser",emailInput);
                    this.props.history.push("/errands-list");
                }
            })
            .catch((err) => alert("Please check your email or password."));
    }

    render() {
        let { emailInput, passwordInput } = this.state;
        return <div>
            <input type="text" id="emailInput" name="emailInput" placeholder="Email" onChange={ev => this.textChanged(ev)} />
            <input type="password" id="passwordInput" name="passwordInput" placeholder="Password" onChange={ev => this.textChanged(ev)} />
            <Button color="primary" onClick={
                () => this.sendLoginRequest(emailInput, passwordInput)}
            >Login</Button>
            <Button color="primary" onClick={()=>this.props.history.push("/signup")} >Sign Up</Button>
        </div>
    }
}