import React from 'react';
import auth from './auth';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Requests = ({request, props, currentId}) =><tr>
    
    {currentId == request.requesting_user_id && 
    <td><Link to={`myrequest/${request.id}`}>Myrequest</Link></td>}
     {currentId !== request.requesting_user_id && 
    <td><Link to={`request/${request.id}`}>{request.id}</Link></td>}
    <td>{request.requesting_user_id}</td>
    <td>{request.title}</td>
    {/* todo : think about how to implement different bahavior for modigying...*/}
   
    <td>{request.isAccepted? 'Under processing':'Waiting for accept'}</td>
    {/* Find better way.. */}
</tr>


export class Main extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          requests:[]
        },this._isMounted = false;
    }

     getRequestsFromDB(){
         console.log("main-get called");
         axios.get('/api/requests').then(res=>{
            const requests = res.data;
            this._isMounted && this.setState({requests});
        });
    }
    componentDidUpdate(){
        console.log("main-component did update");
    }

    componentDidMount(){
        console.log("main-component did mount");
        this._isMounted = true;
        this.getRequestsFromDB();
    }

    componentWillUnmount(){
        console.log("main-component unmount");
        this._isMounted = false;
    }

    render() {
        console.log("main-render");
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