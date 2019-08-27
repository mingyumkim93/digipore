import React from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Input, Media } from 'reactstrap'

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
                    this.props.history.push("/errands-list");
                }
            })
            .catch((err) => alert("Please check your email or password."));
    }

    handleKeyPress(target){
        if(target.charCode==13)
            this.sendLoginRequest(this.state.emailInput, this.state.passwordInput);
    }

    render() {
        let { emailInput, passwordInput } = this.state;
        return (
            <Container>
                <Row className = "align-items-center">
                    <Col className="d-none d-sm-block" sm="6">
                        <Media style={{ maxWidth: "100%" }} src="login.jpg" alt="Generic placeholder image" />
                    </Col>
                    <Col sm="6">
                        <h2>Run My Errand</h2>
                        <Row >
                            <Col style={{marginTop:"5%"}} sm="6">
                                <Input autoFocus type="text" id="emailInput" placeholder="Email" name="emailInput" onChange={ev => this.textChanged(ev)} onKeyPress={target=> this.handleKeyPress(target)}/>
                            </Col>
                            <Col style={{marginTop:"5%"}} sm="6">
                                <Input type="password" id="passwordInput" placeholder="Password" name="passwordInput" onChange={ev => this.textChanged(ev)} onKeyPress={target=> this.handleKeyPress(target)}/>
                            </Col>
                        </Row>
                        <Row >
                            <Col style={{marginTop:"5%"}} sm="6">
                                <Button style={{ width: "100%" }} outline color="primary" onClick={
                                    () => this.sendLoginRequest(emailInput, passwordInput)}
                                >Login</Button>
                            </Col>
                            <Col style={{marginTop:"5%"}} sm="6">
                                <Button style={{ width: "100%" }} outline color="primary" onClick={() => this.props.history.push("/signup")} >Sign Up</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}