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
            this.setState({errands});
        });
    }
    componentDidMount(){
        this.getErrandsFromDB();
    }

    filterChanged(e){
        this.setState({ [e.target.id]: e.target.value });
    }

    logout(){
        axios.get("/logout").then(res=>console.log("Logout")).catch(err=>console.log(err));
    }

    render() {
        let {errands,filter} = this.state;
        let filtered = errands.filter(errand => errand.title.includes(filter));
        let rows = filtered.map(errand => <Errands errand={errand} key={errand.id} currentId={localStorage.getItem("currentUser")}/>)
       
        return <div>
            <button onClick={()=>this.props.history.push("/create-errand")}> New Errand </button>
            <button onClick={()=>this.props.history.push("/my-errands-list")}> My Errands </button>
            <input type="text" id="filter" placeholder="Filter" onChange={e=>this.filterChanged(e)} />
            <table>
                <thead>
                    <tr>
                        <td>Poster</td>
                        <td>Title</td>
                        <td>Location</td>
                        <td>State</td>
                        <td>Date</td>
                        <td>Fee</td>
                        <td>&nbsp;</td>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            <button onClick={()=>{
                localStorage.clear();
                this.logout();
                this.props.history.push("/");
            }}>Logout</button>
            <button onClick={()=>this.logout()}>Test:Destroy session</button>
        </div>

    }
}