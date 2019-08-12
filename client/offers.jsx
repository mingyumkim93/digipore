import React from 'react';
import axios from 'axios';

export class Offer extends React.Component {
    constructor(props) {
        super(props);
    }

    acceptOffer(acceptedErrand, offer){
        var d = new Date();
        let now = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        acceptedErrand.runner = offer.sender;
        acceptedErrand.acceptedDayAndTime = now;
        acceptedErrand.state = 10;
        acceptedErrand.fee = offer.fee;
        axios.put(`/api/errands/${acceptedErrand.id}`, acceptedErrand)
            .then((res) => this.props.moveToMyErrands())
            .catch((err) => console.log(err))
    }

    render() {
        let offer = this.props.offer;
        let errand = this.props.errand;
        return <tr>
            <td>{offer.sender}</td>
            <td>{offer.message}</td>
            <td>{offer.fee}</td>
            <td>{offer.date}</td>
            <td><button onClick={() => {
                let doubleCheck = confirm("Do you really want to accept this offer?");
                if (doubleCheck) {
                    this.acceptOffer(errand, offer)
                }
            }}>ACCEPT</button></td>
        </tr>
    }

}