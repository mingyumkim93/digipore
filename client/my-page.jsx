import React from 'react';
import axios from 'axios';
import auth from './auth';

const RequestsIRequested = ({request}) => <tr>
    <td>{request.title}</td>
    <td>{request.explanation}</td>
    <td>{request.isAccepted? 'Under processing':'Waiting for accept'}</td>
    <td>{request.providing_user_id}</td>
</tr>

const RequestsIProvide = ({request}) => <tr>
<td>{request.title}</td>
<td>{request.explanation}</td>
<td>{request.isAccepted? 'Under processing':'Waiting for accept'}</td>
<td>{request.requesting_user_id}</td>
</tr>

export class MyPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            requests:[]
        }
    }

    componentDidMount(){
        axios.get("/api/requests").then(res=>{
            const requests = res.data;
            this.setState({requests});
        })
    }

    render(){
        let requestsIRequested = [];
        let requestsIProvide = [];
        this.state.requests.forEach(request => {
            if (request.requesting_user_id == auth.currentId)
                requestsIRequested.push(request);
        })
        this.state.requests.forEach(request => {
            if (request.providing_user_id == auth.currentId)
                requestsIProvide.push(request);
        })
        let rowsRequestsIRequested = requestsIRequested.map(request => <RequestsIRequested
            request={request} key={request.id} >
        </RequestsIRequested>)
        let rowsRequestsIProvide = requestsIProvide.map(request => <RequestsIProvide
            request={request} key={request.id}>
        </RequestsIProvide>)
        return <div>
            <div>
                <label>Services you requested</label>
                <table>
                    <thead>
                        <tr>
                        <td>Title</td>
                        <td>Explanation</td>
                        <td>State</td>
                        <td>Providing User</td>
                        </tr>
                    </thead>
                    <tbody>{rowsRequestsIRequested}</tbody>
                </table>
            </div>
            <div>
                <label>Services you providing</label>
                <table>
                    <thead>
                        <tr>
                        <td>Title</td>
                        <td>Explanation</td>
                        <td>State</td>
                        <td>Requesting User</td>
                        </tr>
                    </thead>
                    <tbody>{rowsRequestsIProvide}</tbody>
                </table>
            </div>
            <button onClick={()=>this.props.history.push("/main")}>Back to main</button>

           
        </div>
    }
}