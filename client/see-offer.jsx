import React from 'react';
import axios from 'axios';
import {Offer} from './offers';

export class SeeOfferPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            offers: [],
            errand: {},
            moveToMyErrands:false
        },
        this.moveToMyErrands = this.moveToMyErrands.bind(this)
    }

    moveToMyErrands(){
        this.props.history.push("/my-errands")
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
        let rows = offers.map(offer => <Offer offer={offer} errand={errand} moveToMyErrands={this.moveToMyErrands} key={offer.id} />)
        return <div><table>
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
        </table></div>
    }
}