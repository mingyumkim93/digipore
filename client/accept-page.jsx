import React from 'react';

export class AcceptPage extends React.Component {

    render() {
        return <div>
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Detail" />
            <button onClick={() => this.props.history.push("/main")}>Accept</button>
            <button onClick={() => this.props.history.push("/main")}>Cancel</button>
        </div>
    }
}