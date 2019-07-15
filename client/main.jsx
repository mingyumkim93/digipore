import React from 'react';
import auth from './auth';
import axios from 'axios';

const Requests = ({request, props, currentId}) =><tr>
    <td>{request.id}</td>
    <td>{request.requesting_user_id}</td>
    <td>{request.explanation}</td>
    {/* todo : think about how to implement different bahavior for modigying...*/}
    {currentId == request.requesting_user_id && <td><button onClick={()=>props.history.push("/accept")}>Modify</button></td>}
    {currentId != request.requesting_user_id && <td><button onClick={()=>props.history.push("/accept")}>Accept</button></td>}
    {/* Find better way.. */}
</tr>


export class Main extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = {
          requests:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:9000/api/requests').then(res=>{
            const requests = res.data;
            this.setState({requests});
        })
    }

    render() {
        let {requests} = this.state;
        
        let rows = requests.map(request => <Requests request={request} props={this.props} key={request.id} currentId={auth.currentId}/>)
        return <div>
            <button onClick={()=>this.props.history.push("/request")}> New Request </button>
            <button onClick={()=>this.props.history.push("/mypage")}> My Page </button>
            <input type="text" placeholder="Filter" />
            <table>
                <thead>
                    <tr>
                        <td>Number</td>
                        <td>Requesting User</td>
                        <td>Explanation</td>
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