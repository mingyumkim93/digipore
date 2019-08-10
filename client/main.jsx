import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Requests = function({request, currentId}) {
    if (request.state !== 40) // Show only not terminated requests
        return <tr>
            {currentId == request.requesting_user_id &&
                <td><Link to={`myrequest/${request.id}`}>Myrequest</Link></td>}
            {currentId !== request.requesting_user_id &&
                <td><Link to={`request/${request.id}`}>{request.id}</Link></td>}
            <td>{request.requesting_user_id}</td>
            <td>{request.title}</td>
            <td>{request.location}</td>
            {request.state == 0 && <td>Waiting for accept</td>}
            {request.state !== 0 && <td>Under processing</td>}
            <td>{request.requestedDayAndTime}</td>
        </tr>
    else  // Don't show terminated request 
        return <tr></tr>
}


export class Main extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          requests:[],filter:""
        }
    }

     getRequestsFromDB(){
         axios.get('/api/requests').then(res=>{
            const requests = res.data;
            this.setState({requests});
        });
    }
    componentDidMount(){
        this.getRequestsFromDB();
    }

    filterChanged(e){
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        let {requests,filter} = this.state;
        let filtered = requests.filter(request => request.title.includes(filter));
        let rows = filtered.map(request => <Requests request={request} props={this.props} key={request.id} currentId={localStorage.getItem("currentUser")}/>)
       
        return <div>
            <button onClick={()=>this.props.history.push("/createrequest")}> New Request </button>
            <button onClick={()=>this.props.history.push("/mypage")}> My Page </button>
            <input type="text" id="filter" placeholder="Filter" onChange={e=>this.filterChanged(e)} />
            <table>
                <thead>
                    <tr>
                        <td>Number</td>
                        <td>Requesting User</td>
                        <td>Title</td>
                        <td>Location</td>
                        <td>State</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            <button onClick={()=>{
                localStorage.clear();
                this.props.history.push("/");
            }}>Logout</button>
            
        </div>

    }
}