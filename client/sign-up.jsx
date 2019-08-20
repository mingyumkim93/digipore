import React from 'react';
import axios from 'axios';
import { Button, Input, Container, Row, Col } from 'reactstrap';

export class SignUpPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: null,
            role: 0
        }
    }

    textChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    signUp() {
        let { id, firstName, lastName, email, password, phone, role } = this.state;
        if (!(email && password && firstName && lastName && phone)) {
            window.alert("Please fill every fields!");
            return;
        }
        axios.post("/api/user", { id, firstName, lastName, email, password, phone, role })
            .then((res) => {
                if (res.status == 200) {
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

    render() {
        return <Container>
            <Row style={{marginTop:100, marginBottom:30}}>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Input onChange={(e) => this.textChange(e)} type="text" id="email" placeholder="Email" />
                </Col>
            </Row>
            <Row style={{marginBottom:30}}>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Input onChange={(e) => this.textChange(e)} type="text" id="password" placeholder="Password" />
                </Col>
            </Row>
            <Row style={{marginBottom:30}}>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Input onChange={(e) => this.textChange(e)} type="text" id="firstName" placeholder="FirstName" />
                </Col>
            </Row>
            <Row style={{ marginBottom:30}}>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Input onChange={(e) => this.textChange(e)} type="text" id="lastName" placeholder="LastName" />
                 </Col>
            </Row>
            <Row style={{ marginBottom:30}}>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Input onChange={(e) => this.textChange(e)} type="text" id="phone" placeholder="Phone" />
                 </Col>
            </Row>
            <Row style={{marginBottom:30}}>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Button outline color="primary" onClick={() => this.signUp()}>Sign Up</Button>
                <Button outline color="primary" onClick={() => this.props.history.goBack()}>Back</Button>
                 </Col>
            </Row>
        </Container>


    }
}
