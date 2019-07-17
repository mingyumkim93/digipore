import React from 'react';
import auth from './auth';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Requests = ({request, props, currentId}) =><tr>
    
    <td><Link to={`request/${request.id}`}>{request.id}</Link></td>
    <td>{request.requesting_user_id}</td>
    <td>{request.title}</td>
    {/* todo : think about how to implement different bahavior for modigying...*/}
    {request.isAccepted && <td>Under process</td>}
    {!request.isAccepted && <td>Wating for accept</td>}
    {/* Find better way.. */}
</tr>


export class Main extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          requests:[]
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

    componentDidUpdate(){
        this.getRequestsFromDB();
    }

    render() {
        let {requests} = this.state;
        
        let rows = requests.map(request => <Requests request={request} props={this.props} key={request.id} currentId={auth.currentId}/>)
        return <div>
            <button onClick={()=>this.props.history.push("/createrequest")}> New Request </button>
            <button onClick={()=>this.props.history.push("/mypage")}> My Page </button>
            <input type="text" placeholder="Filter" />
            <table>
                <thead>
                    <tr>
                        <td>Number</td>
                        <td>Requesting User</td>
                        <td>Title</td>
                        <td>State</td>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            <button onClick={()=>{
                auth.currentId="";
                auth.logout(()=>
                this.props.history.push("/"))
            }}>Logout</button>
            
        </div>

    }
}