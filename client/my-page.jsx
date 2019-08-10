import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RequestsIRequested = ({ request }) => <tr>
    <td>{request.title}</td>
    <td>{request.explanation}</td>
    {request.state == 0 &&
        <td>Waiting for accepting</td>}
    {request.state === 10 &&
        <td>Under Processing<button onClick={() => {
            //make new request (state=20) -> put the new request
            let doubleCheck = confirm("Do you really want to finalize this request?")
            if (doubleCheck) {
                let requesterConfirmedRequest = request;
                requesterConfirmedRequest.state = 20;
                axios.put(`/api/requests/${request.id}`, requesterConfirmedRequest).then((res) => {
                    console.log("You Confirmed.");
                })
                    .catch(err => window.alert(err));
                //input review -> post the review .. ISN'T IT TOO LONG TO PUT HERE 
                let stars = prompt("Please give your stars to provider 0 to 10 : ");
                if (stars > 10) stars = 10
                if (stars < 0) stars = 0
                if (stars) {
                    let comment = prompt("Please leave comments to provider");
                    var d = new Date();
                    let now = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
                    var review = {
                        id: null,
                        sender: request.requesting_user_id,
                        receiver: request.providing_user_id,
                        comment: comment,
                        date: now,
                        stars: stars,
                        request_id: request.id
                    }
                }
                axios.post("/api/review", review).then(res => {
                    console.log("You left review.");
                })
                    .catch(err => window.alert(err));
                //- Maybe move factory functions to it's own file
            }
        }}>Confirm</button><button onClick={() => {
            let doubleCheck = confirm("Do you really want to cancel this provider?")
            if (doubleCheck) {
                let canceledRequest = request;
                canceledRequest.state = 0;
                canceledRequest.providing_user_id = "";
                canceledRequest.acceptedDayAndTime = "";
                axios.put(`/api/requests/${request.id}`, canceledRequest)
                    .then((res) => console.log("You canceled the provider"))
                    .catch(err => console.log(err));
            }
        }}>Cancel this provider</button></td>}
    {request.state == 20 &&
        <td>You Confirmed. Waiting for provider confirm..</td>}
    {request.state == 30 &&
        <td>Provider Confirmed. Please Confirm.<button onClick={() => {
            let doubleCheck = confirm("Do you really want to finalize this request?")
            if (doubleCheck) {
                let finalizedRequest = request;
                finalizedRequest.state = 40
                axios.put(`/api/requests/${request.id}`, finalizedRequest)
                    .then(res => console.log("You Finalized request!"))
                    .catch(err => console.log(err));

                let stars = prompt("Please give your stars to provider 0 to 10 : ");
                if (stars > 10) stars = 10
                if (stars < 0) stars = 0
                if (stars) {
                    let comment = prompt("Please leave comments to provider");
                    var d = new Date();
                    let now = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
                    var review = {
                        id: null,
                        sender: request.requesting_user_id,
                        receiver: request.providing_user_id,
                        comment: comment,
                        date: now,
                        stars: stars,
                        request_id: request.id
                    }
                }
                axios.post("/api/review", review).then(res => {
                    console.log("You left review.");
                })
                    .catch(err => window.alert(err));
            }
        }}>Confirm</button></td>}
    {request.state == 40 &&
        <td>--DONE--</td>}
    <td><Link to={`user/${request.providing_user_id}`}>{request.providing_user_id}</Link></td>
    <td>{request.requestedDayAndTime}</td>
    <td>{request.acceptedDayAndTime}</td>
    <td>{request.location}</td>
</tr>

const RequestsIProvide = ({ request }) => <tr>
    <td>{request.title}</td>
    <td>{request.explanation}</td>
    {request.state == 0 &&
        <td>Waiting for accept</td>}
    {request.state == 10 &&
        <td>You are providing<button onClick={() => {
            let doubleCheck = confirm("Do you really want to finalize this request?")
            if (doubleCheck) {
                let providerConfirmedRequest = request;
                providerConfirmedRequest.state = 30;
                axios.put(`/api/requests/${request.id}`, providerConfirmedRequest).then((res) => {
                    console.log("You Confirmed.");
                })
                    .catch(err => window.alert(err));
                //input review -> post the review .. ISN'T IT TOO LONG TO PUT HERE 
                let stars = prompt("Please give your stars to requester 0 to 10 : ");
                if (stars > 10) stars = 10
                if (stars < 0) stars = 0
                if (stars) {
                    let comment = prompt("Please leave comments to requester");
                    var d = new Date();
                    let now = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
                    var review = {
                        id: null,
                        sender: request.providing_user_id,
                        receiver: request.requesting_user_id,
                        comment: comment,
                        date: now,
                        stars: stars,
                        request_id: request.id
                    }
                }
                axios.post("/api/review", review).then(res => {
                    console.log("You left review.");
                })
                    .catch(err => window.alert(err));
            }
        }}>Confirm</button><button onClick={()=>{
            let doubleCheck = confirm("Do you really want to cancel providing?")
            if (doubleCheck) {
                let canceledRequest = request;
                canceledRequest.state = 0;
                canceledRequest.providing_user_id = "";
                canceledRequest.acceptedDayAndTime = "";
                axios.put(`/api/requests/${request.id}`, canceledRequest)
                    .then((res) => console.log("You canceled providing"))
                    .catch(err => console.log(err));
            }
        }}>Cancel this request</button></td>}
    {request.state == 20 &&
        <td>Requester Confirmed. Please Confirm.<button onClick={()=>{
            let doubleCheck = confirm("Do you really want to cancel providing?")
            if (doubleCheck) {
                let finalizedRequest = request;
                finalizedRequest.state = 40
                axios.put(`/api/requests/${request.id}`, finalizedRequest)
                    .then(res => console.log("You Finalized request!"))
                    .catch(err => console.log(err));

                let stars = prompt("Please give your stars to provider 0 to 10 : ");
                if (stars > 10) stars = 10
                if (stars < 0) stars = 0
                if (stars) {
                    let comment = prompt("Please leave comments to provider");
                    var d = new Date();
                    let now = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
                    var review = {
                        id: null,
                        sender: request.providing_user_id,
                        receiver: request.requesting_user_id,
                        comment: comment,
                        date: now,
                        stars: stars,
                        request_id: request.id
                    }
                }
                axios.post("/api/review", review).then(res => {
                    console.log("You left review.");
                })
                    .catch(err => window.alert(err));
            }
        }}>Confirm</button></td>}
    {request.state == 30 &&
        <td>You confirmed. Waiting for requester confirm..</td>}
    {request.state == 40 &&
        <td>--DONE--</td>}
    <td><Link to={`user/${request.requesting_user_id}`}>{request.requesting_user_id}</Link></td>
    <td>{request.requestedDayAndTime}</td>
    <td>{request.acceptedDayAndTime}</td>
    <td>{request.location}</td>
</tr>

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