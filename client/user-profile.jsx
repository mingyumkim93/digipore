import React from 'react';
import axios from 'axios';

export class UserProfile extends React.Component{

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
            <h1> {user.firstName} {user.lastName}'s reviews..</h1>
            {showReviews}
            <button onClick={()=>this.props.history.push("/mypage")}>Back to Mypage</button>
        </div>

    }
}