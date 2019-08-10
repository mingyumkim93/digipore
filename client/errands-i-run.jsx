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

const RunnerConfirm = (errand) => {
    errand.state = 30;
    axios.put(`/api/errands/${errand.id}`, errand).then((res) => {
        console.log("You Confirmed.");
    })
        .catch(err => window.alert(err));
}

const leaveReviewToPoster = (errand) => {
    let stars = prompt("Please give your stars to poster 0 to 10 : ");
    if (stars > 10) stars = 10; if (stars < 0) stars = 0;
    if (stars) {
        let comment = prompt("Please leave comments to poster");
        var d = new Date();
        let now = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        var review = {
            id: null,
            sender: errand.runner,
            receiver: errand.poster,
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
        .then(res => console.log("You Finalized errand!"))
        .catch(err => console.log(err));
}

export const ErrandsIRun = ({ errand }) => <tr>
    <td>{errand.title}</td>
    <td>{errand.explanation}</td>
    {errand.state == 0 && <td>Waiting for acceptance</td>}
    {errand.state == 10 && <td>You are running it
    <button onClick={() => {
            let doubleCheck = confirm("Do you really want to finalize this errand?")
            if (doubleCheck) {
                RunnerConfirm(errand);
                leaveReviewToPoster(errand);
            }
        }}>Confirm</button>
        <button onClick={() => {
            let doubleCheck = confirm("Do you really want to cancel running this errand?")
            if (doubleCheck) { changeErrandToNotAccepted(errand) }
        }}>Cancel this errand</button></td>}
    {errand.state == 20 && <td>Poster Confirmed. Please Confirm.
    <button onClick={() => {
            let doubleCheck = confirm("Do you really want to finalize this errand?")
            if (doubleCheck) {
                finalizeErrand(errand);
                leaveReviewToPoster();
            }
        }}>Confirm</button></td>}
    {errand.state == 30 && <td>You confirmed. Waiting for poster confirm..</td>}
    {errand.state == 40 && <td>--DONE--</td>}
    <td><Link to={`user/${errand.poster}`}>{errand.poster}</Link></td>
    <td>{errand.requestedDayAndTime}</td>
    <td>{errand.acceptedDayAndTime}</td>
    <td>{errand.location}</td>
</tr>
