import React from 'react';
import axios from 'axios';
import {Button} from 'reactstrap';
export class ErrandDetailPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errand: {}
        }
    }

    getErrandFromDB(errandId) {
        axios.get(`/api/errands/${errandId}`).then(res => {
            const errand = res.data;
            this.setState({ errand });
        });
    }

    componentDidMount() {
        let errandId = this.props.match.params.id;
        if (errandId) this.getErrandFromDB(errandId);
    }

    render() {
        let { errand } = this.state;
        return <div> <h2>{this.state.errand.explanation}</h2>
            {this.state.errand.state == 0 && 
            <Button outline color ="primary" onClick={() => this.props.history.push(`/create-offer/${errand.id}`)}>
                Create Offer
                </Button>}
            <Button outline color ="primary" onClick={() => this.props.history.push("/errands-list")}>
                Back to list
            </Button>
        </div>
    }
}