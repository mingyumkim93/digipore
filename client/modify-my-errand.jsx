import React from 'react';
import axios from 'axios';

export class ModifyMyErrandPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errand: {},
            newTitle: "",
            newExplanation: "",
            newLocation:""
        }
    }

    getErrandFromDB(errandId) {
        axios.get(`/api/errands/${errandId}`).then(res => {
            const errand = res.data;
            this.setState({ errand });
            this.setState({newTitle : errand.title})
            this.setState({newExplanation : errand.explanation})
            this.setState({newLocation:errand.location})
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
        let errandId = this.props.match.params.id;
        let newErrand = this.state.errand;
        newErrand.title = this.state.newTitle;
        newErrand.explanation = this.state.newExplanation;
        newErrand.location = this.state.newLocation;
        axios.put(`/api/errands/${errandId}`,newErrand).then(()=>this.props.history.push("/main"));
    }

    deleteErrand(){
        let errandId = this.props.match.params.id;
        axios.delete(`/api/errands/${errandId}`).then(()=>this.props.history.push("/main"))
    }

    render() {
        let {newTitle, newExplanation, newLocation} = this.state;
        return <div>
            <input onChange={ev => this.textChanged(ev)} type="text" id="newTitle" value={newTitle}/>
            <textarea onChange={ev => this.textChanged(ev)} type="text" id="newExplanation" value={newExplanation}/>
            <input onChange={ev=> this.textChanged(ev)} type="text" id="newLocation" value={newLocation}/>
            <button onClick={() => {
                this.modifyErrand();
            }}>modify</button>
            <button onClick={() => {
                this.deleteErrand();
            }}>delete</button>
            <button onClick={() => this.props.history.push("/main")}>cancel</button>

        </div>
    }
}