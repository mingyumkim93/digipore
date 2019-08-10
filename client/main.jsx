import React from 'react';
import axios from 'axios';
import {Requests} from './requests';

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
        let rows = filtered.map(request => <Requests request={request} key={request.id} currentId={localStorage.getItem("currentUser")}/>)
       
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