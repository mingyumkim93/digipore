import React from 'react';
import axios from 'axios';

export class ModifyMyErrandPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errand: {},
            newTitle: "",
            newExplanation: "",
            newLocation: "",
            newFee: 0
        }
    }

    getErrandFromDB(errandId) {
        axios.get(`/api/errands/${errandId}`).then(res => {
            const errand = res.data;
            if (errand.state !== 0) {
                alert("You can't modify errand in process");
                this.props.history.push("/errands-list")
            }
            else {
                this.setState({ errand });
                this.setState({ newTitle: errand.title })
                this.setState({ newExplanation: errand.explanation })
                this.setState({ newLocation: errand.location })
                this.setState({ newFee: errand.fee })
            }

        });
    }

    componentDidMount() {
        let errandId = this.props.match.params.id;
        if (errandId) this.getErrandFromDB(errandId);
    }

    textChanged(ev) {
        this.setState({ [ev.target.id]: ev.target.value });
    }

    modifyErrand() {
        if (!this.state.newTitle) {
            window.alert("You can't empty title!");
            return;
        }
        if (!this.state.newExplanation) {
            window.alert("You can't empty explanation!");
            return;
        }
        if (!this.state.newLocation) {
            window.alert("You can't empty location!");
            return;
        }
        if (!this.state.newFee) {
            window.alert("You can't empty fee!");
            return;
        }
        let errandId = this.props.match.params.id;
        let newErrand = this.state.errand;
        newErrand.title = this.state.newTitle;
        newErrand.explanation = this.state.newExplanation;
        newErrand.location = this.state.newLocation;
        newErrand.fee = this.state.newFee;
        axios.put(`/api/errands/${errandId}`, newErrand).then(() => this.props.history.push("/errands-list"));
    }

    deleteErrand() {
        let errandId = this.props.match.params.id;
        axios.delete(`/api/errands/${errandId}`).then(() => this.props.history.push("/errands-list"))
    }

    render() {
        let { newTitle, newExplanation, newLocation, newFee } = this.state;
        return <div>
            <input onChange={ev => this.textChanged(ev)} type="text" id="newTitle" value={newTitle} />
            <input onChange={ev => this.textChanged(ev)} type="text" id="newLocation" value={newLocation} />
            <input onChange={ev => this.textChanged(ev)} type="number" id="newFee" placeholder="Fee" />

            <textarea onChange={ev => this.textChanged(ev)} type="text" id="newExplanation" value={newExplanation} />
            <button onClick={() => {
                this.modifyErrand();
            }}>modify</button>
            <button onClick={() => {
                this.deleteErrand();
            }}>delete</button>
            <button onClick={() => this.props.history.push("/errands-list")}>cancel</button>

        </div>
    }
}