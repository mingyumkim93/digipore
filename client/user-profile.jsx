import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

export class UserProfilePage extends React.Component{

    constructor(props){
        super(props); 
        this.state={
            user:{},
            reviews:[]
        }
    }

    componentDidMount(){
        let userEmail = this.props.match.params.email;
        axios.get(`/api/user/${userEmail}`).then(res => {
            const user = res.data;
            this.setState({ user });
        });
        axios.get(`/api/review/${userEmail}`).then(res=>{
            const reviews = res.data;
            this.setState({reviews})
        })
    }

    render(){
        let {user, reviews} = this.state;
        let showReviews = reviews.map(review => <h4>From {review.sender} : {review.comment} {review.stars} stars, Date: {review.date}</h4>)
        return <div>
            <h3> Phone Number : {user.phone}</h3>
            <h1> {user.firstName} {user.lastName}'s reviews..</h1>
            {showReviews}
            <Button outline color = "primary" onClick={()=>this.props.history.goBack()}>Back</Button>
        </div>

    }
}