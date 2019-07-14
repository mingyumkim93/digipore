import React from 'react';
import auth from './auth';

const Requests = ({request, props, currentId}) =><tr>
    <td>{request.name}</td>
    <td>{request.time}</td>
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
          requests:[
              {id:1,name:"Mingyum",time:"11.23",explanation:"asldkjqwldkj",requesting_user_id:"user1",providing_user_id:""},
              {id:2,name:"Mingyum",time:"12.53",explanation:"a34654kj",requesting_user_id:"user1",providing_user_id:""},
              {id:3,name:"Seppo",time:"13.31",explanation:"a1e12d1jqwldkj",requesting_user_id:"user2",providing_user_id:""},
              {id:4,name:"Sari",time:"17.29",explanation:"12312sadd12",requesting_user_id:"user3",providing_user_id:""},
              {id:5,name:"Niku",time:"20.20",explanation:"asld12443trdwkjqwldkj",requesting_user_id:"user4",providing_user_id:""}
          ]
        }
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
                        <td>Name</td>
                        <td>Time</td>
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