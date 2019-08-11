import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const changeErrandToNotAccepted = (errand) => {
    errand.state = 0;
    errand.runner = "";
    errand.acceptedDayAndTime = "";
    axios.put(`/api/errands/${errand.id}`, errand)
        .then((res) => console.log("Errand has been changed"))
        .catch(err => console.log(err));
}

const posterConfirm = (errand) => {
    errand.state = 20;
    axios.put(`/api/errands/${errand.id}`, errand).then((res) => {
        console.log("You Confirmed.");
    })
        .catch(err => window.alert(err));
}

const leaveReviewToRunner = (errand) => {
    let stars = prompt("Please give your stars to runner 0 to 10 : ");
    if (stars > 10) stars = 10; if (stars < 0) stars = 0;
    if (stars) {
        let comment = prompt("Please leave comments to runner");
        var d = new Date();
        let now = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        var review = {
            id: null,
            sender: errand.poster,
            receiver: errand.runner,
            comment: comment,
            date: now,
            stars: stars,
            errand_id: errand.id
        }
        axios.post("/api/review", review).then(res => {
            console.log("You left review.");
        })
            .catch(err => window.alert(err));
    }
    if (!stars) return;
}

const finalizeErrand = (errand) => {
    errand.state = 40;
    axios.put(`/api/errands/${errand.id}`, errand)
        .then(res => console.log("You Finalized Errand!"))
        .catch(err => console.log(err));
}

export const ErrandsIPosted = ({ errand, updateMyErrandsList}) => <tr>
    <td>{errand.title}</td>
    <td>{errand.explanation}</td>
    <td>{errand.fee}</td>
    {errand.state == 0 && <td>Waiting for acceptance</td>}
    {errand.state === 10 && <td>In progress
    <button onClick={() => {
            let doubleCheck = confirm("Do you really want to finalize this errand?")
            if (doubleCheck) {
                posterConfirm(errand);
                leaveReviewToRunner(errand);
                updateMyErrandsList(true);
            }
        }}>Confirm</button>
        <button onClick={() => {
            let doubleCheck = confirm("Do you really want to cancel this errand?")
            if (doubleCheck) { 
                changeErrandToNotAccepted(errand); 
                updateMyErrandsList(true);
            }
        }}>Cancel this runner</button></td>}
    {errand.state == 20 && <td>You Confirmed. Waiting for runner confirm..</td>}
    {errand.state == 30 && <td>Runner Confirmed. Please Confirm.
    <button onClick={() => {
            let doubleCheck = confirm("Do you really want to finalize this errand?")
            if (doubleCheck) {
                finalizeErrand(errand);
                leaveReviewToRunner(errand);
                updateMyErrandsList(true);
            }
        }}>Confirm</button></td>}
    {errand.state == 40 && <td>--DONE--</td>}
    <td>{errand.runner == null && "-"}<Link to={`user/${errand.runner}`}>{errand.runner}</Link></td>
    <td>{errand.requestedDayAndTime}</td>
    <td>{errand.acceptedDayAndTime == null && "-"}{errand.acceptedDayAndTime}</td>
    <td>{errand.location}</td>
</tr>
