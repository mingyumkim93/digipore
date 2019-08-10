import React from 'react';
import axios from 'axios';
import {ErrandsIPosted} from './errands-i-posted';
import {ErrandsIRun} from './errands-i-run';

export class MyErrandsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errands: []
        }
    }

    componentDidMount() {
        axios.get("/api/errands").then(res => {
            const errands = res.data;
            this.setState({ errands });
        })
    }

    render() {
        let errandsIPosted = [];
        let errandsIRun = [];
        this.state.errands.forEach(errand => {
            if (errand.poster == localStorage.getItem("currentUser"))
                errandsIPosted.push(errand);
        });
        this.state.errands.forEach(errand => {
            if (errand.runner == localStorage.getItem("currentUser"))
                errandsIRun.push(errand);
        });
        let rowsErrandsIPosted = errandsIPosted.map(errand => <ErrandsIPosted
            errand={errand} key={errand.id} >
        </ErrandsIPosted>);
        let rowsErrandsIRun = errandsIRun.map(errand => <ErrandsIRun
            errand={errand} key={errand.id}>
        </ErrandsIRun>);
        return <div>
            <div>
                <label>Errands you posted</label>
                <table>
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Explanation</td>
                            <td>State</td>
                            <td>Runner</td>
                            <td>Posted Day And Time</td>
                            <td>Accepted Day And Time</td>
                            <td>Location</td>
                        </tr>
                    </thead>
                    <tbody>{rowsErrandsIPosted}</tbody>
                </table>
            </div>
            <br />
            <br />
            <div>
                <label>Errands you are running / Errands you have run</label>
                <table>
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Explanation</td>
                            <td>State</td>
                            <td>Poster</td>
                            <td>Posted Day And Time</td>
                            <td>Accepted Day And Time</td>
                            <td>Location</td>
                        </tr>
                    </thead>
                    <tbody>{rowsErrandsIRun}</tbody>
                </table>
            </div>
            <button onClick={() => this.props.history.push("/main")}>Back to list</button>
        </div>
    }
}