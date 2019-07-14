import React from 'react';

export class RequestPage extends React.Component{

    render(){
        return <div>
            <input type="text" placeholder="Location"/>
            <input type="text" placeholder="Explnation"/>
            <button onClick={()=>this.props.history.push("/main")}>Request</button> 
            <button onClick={()=>this.props.history.push("/main")}>Cancel</button>
        </div>
    }
}