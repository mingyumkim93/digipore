import React from 'react';
import axios from 'axios';
import { Offer } from './offers';
import { Table, Button } from 'reactstrap';
export class SeeOfferPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            offers: [],
            errand: {},
            moveToMyErrands: false
        },
            this.moveToMyErrands = this.moveToMyErrands.bind(this)
    }

    moveToMyErrands() {
        this.props.history.push("/my-errands-list")
    }

    getOffersToThisErrand(errandId) {
        axios.get(`/api/offer/${errandId}`)
            .then((res) => {
                this.setState({ offers: res.data })
            })
            .catch((err) => console.log(err));
    }

    getErrandFromDB(errandId) {
        axios.get(`/api/errands/${errandId}`)
            .then((res) => {
                const errand = res.data
                this.setState({ errand })
            })
            .catch((err) => console.log(err));
    }

    componentDidMount() {
        let errandId = this.props.match.params.id;
        this.getOffersToThisErrand(errandId)
        this.getErrandFromDB(errandId)
    }


    render() {
        let { offers, errand } = this.state;
        let stateZeroOffers = [];
        offers.map(offer => { if (offer.state == 0) stateZeroOffers.push(offer) });
        let rows = stateZeroOffers.map(offer => <Offer offer={offer} errand={errand} moveToMyErrands={this.moveToMyErrands} key={offer.id} />)
        if (offers.length == 0) return <h1>There are no offers</h1>
        if (errand.poster == localStorage.getItem("currentUser")) {
            return <div>
                <h4>See Offer</h4>
                <Table responsive={true}>
                <thead>
                    <tr>
                        <td>From</td>
                        <td>Message</td>
                        <td>Fee</td>
                        <td>When</td>
                        <td>&nbsp;</td>
                    </tr>
                </thead>
                <thead>{rows}</thead>
            </Table>
            <Button  outline color="primary" onClick={() => this.props.history.goBack()}>Back</Button></div>
        }
        else {
            return <div>
                <h1>You can't access this page</h1>
                 <Button  outline color="primary" onClick={() =>  this.props.history.goBack()}>Back</Button>
            </div>
        }
    }
}