import React from 'react';
import axios from 'axios';
import {RequestsIRequested} from './requests-i-requested';
import {RequestsIProvide} from './requests-i-provide';

export class MyPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            requests: []
        }
    }

    componentDidMount() {
        axios.get("/api/requests").then(res => {
            const requests = res.data;
            this.setState({ requests });
        })
    }

    render() {
        let requestsIRequested = [];
        let requestsIProvide = [];
        this.state.requests.forEach(request => {
            if (request.requesting_user_id == localStorage.getItem("currentUser"))
                requestsIRequested.push(request);
        });
        this.state.requests.forEach(request => {
            if (request.providing_user_id == localStorage.getItem("currentUser"))
                requestsIProvide.push(request);
        });
        let rowsRequestsIRequested = requestsIRequested.map(request => <RequestsIRequested
            request={request} key={request.id} >
        </RequestsIRequested>);
        let rowsRequestsIProvide = requestsIProvide.map(request => <RequestsIProvide
            request={request} key={request.id}>
        </RequestsIProvide>);
        return <div>
            <div>
                <label>Services you requested</label>
                <table>
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Explanation</td>
                            <td>State</td>
                            <td>Providing User</td>
                            <td>Requested Day And Time</td>
                            <td>Accepted Day And Time</td>
                            <td>Location</td>
                        </tr>
                    </thead>
                    <tbody>{rowsRequestsIRequested}</tbody>
                </table>
            </div>
            <br />
            <br />
            <div>
                <label>Services you providing</label>
                <table>
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Explanation</td>
                            <td>State</td>
                            <td>Requesting User</td>
                            <td>Requested Day And Time</td>
                            <td>Accepted Day And Time</td>
                            <td>Location</td>
                        </tr>
                    </thead>
                    <tbody>{rowsRequestsIProvide}</tbody>
                </table>
            </div>
            <button onClick={() => this.props.history.push("/main")}>Back to main</button>


        </div>
    }
}