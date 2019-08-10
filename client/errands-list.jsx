import React from 'react';
import axios from 'axios';
import {Errands} from './errands';

export class ErrandsListPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          errands:[],filter:""
        }
    }

    getErrandsFromDB(){
         axios.get('/api/errands').then(res=>{
            const errands = res.data;
            this.setState({errands: errands});
        });
    }
    componentDidMount(){
        this.getErrandsFromDB();
    }

    filterChanged(e){
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        let {errands,filter} = this.state;
        let filtered = errands.filter(errand => errand.title.includes(filter));
        let rows = filtered.map(errand => <Errands errand={errand} key={errand.id} currentId={localStorage.getItem("currentUser")}/>)
       
        return <div>
            <button onClick={()=>this.props.history.push("/createrequest")}> New Errand </button>
            <button onClick={()=>this.props.history.push("/mypage")}> My Errands </button>
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