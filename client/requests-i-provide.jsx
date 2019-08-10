import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const changeRequestStateToWaitingForAccepting = (request) => {
    request.state=0;
    request.providing_user_id="";
    request.acceptedDayAndTime="";
    axios.put(`/api/requests/${request.id}`,request)
    .then((res) => console.log("Request has been changed"))
    .catch(err => console.log(err));
}

const providerConfirm = (request) => {
    request.state=30;
    axios.put(`/api/requests/${request.id}`, request).then((res) => {
        console.log("You Confirmed.");
    })
        .catch(err => window.alert(err));
}

const leaveReviewToRequester = () => {
    let stars = prompt("Please give your stars to requester 0 to 10 : ");
    if (stars > 10) stars = 10; if (stars < 0) stars = 0;
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
        axios.post("/api/review", review).then(res => {
            console.log("You left review.");
        })
        .catch(err => window.alert(err));
    }
    if(!stars) return;
}

const finalizeRequest = (request) => {
    request.state=40;
    axios.put(`/api/requests/${request.id}`, request)
    .then(res => console.log("You Finalized request!"))
    .catch(err => console.log(err));
}

export const RequestsIProvide = ({ request }) => <tr>
<td>{request.title}</td>
<td>{request.explanation}</td>
{request.state == 0 &&
    <td>Waiting for accept</td>}
{request.state == 10 &&
    <td>You are providing<button onClick={() => {
        let doubleCheck = confirm("Do you really want to finalize this request?")
        if (doubleCheck) {
            providerConfirm(request);
            leaveReviewToRequester();
        }
    }}>Confirm</button><button onClick={()=>{
        let doubleCheck = confirm("Do you really want to cancel providing?")
        if (doubleCheck) {changeRequestStateToWaitingForAccepting(request) }
    }}>Cancel this request</button></td>}
{request.state == 20 &&
    <td>Requester Confirmed. Please Confirm.<button onClick={()=>{
        let doubleCheck = confirm("Do you really want to cancel providing?")
        if (doubleCheck) {
            finalizeRequest(request);
            leaveReviewToRequester();
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
