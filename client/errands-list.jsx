import React from 'react';
import axios from 'axios';
import { Errands } from './errands';
import { Table, Button, Input, Container, Row, Col } from 'reactstrap';

export class ErrandsListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errands: [], filter: "", currentUserRole: 0
        }
    }

    getErrandsFromDB() {
        axios.get('/api/errands').then(res => {
            const errands = res.data;
            this.setState({ errands });
        });
    }

    getCurrentUserRole() {
        axios.get(`/api/user/${localStorage.getItem("currentUser")}`)
            .then(res => {
                let currentUserRole = res.data.role;
                this.setState({ currentUserRole });
            })
            .catch(err => console.log(err));
    }
    componentDidMount() {
        this.getErrandsFromDB();
        this.getCurrentUserRole();
    }

    filterChanged(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    logout() {
        axios.get("/logout").then(res => console.log("Logout")).catch(err => console.log(err));
    }

    render() {
        let { errands, filter } = this.state;
        let filtered = errands.filter(errand => errand.title.includes(filter));
        let rows = filtered.map(errand => <Errands errand={errand} key={errand.id} currentId={localStorage.getItem("currentUser")} role={this.state.currentUserRole} />)

        return <Container>
            <Row>
                <Col sm="6" style={{ padding:0}}>
                    <Input style = {{height:"100%"}} type="text" id="filter" placeholder="Filter" onChange={e => this.filterChanged(e)} />
                </Col>
                <Col sm="2" style={{ padding:0}}>
                    <Button style={{ width: "100%" }} outline color="primary" onClick={() => this.props.history.push("/my-errands-list")}> My Errands </Button>
                </Col>
                <Col sm="2" style={{ padding:0}}>
                    <Button style={{ width: "100%"}} outline color="primary" onClick={() => this.props.history.push(`/my-account`)}> My Account</Button>
                </Col>
                <Col sm="2" style={{ padding:0}}>
                <Button style={{ width: "100%", height:"100%" }} outline color="primary" onClick={() => {
                        localStorage.clear();
                        this.logout();
                        this.props.history.push("/");
                    }}>Logout</Button>
                 </Col>
            </Row>
            <Row>
                <Col>

                    <Table responsive={true}>
                        <thead>
                            <tr>
                                <td>Poster</td>
                                <td>Title</td>
                                <td>Location</td>
                                <td>State</td>
                                <td>Date</td>
                                <td>Fee</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                   
                </Col>
            </Row>
            <Row>
            <Button style={{ width: "100%" }} outline color="primary" onClick={() => this.props.history.push("/create-errand")}> New Errand </Button>
              
            </Row>

        </Container>

    }
}