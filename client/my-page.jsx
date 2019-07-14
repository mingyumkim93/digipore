import React from 'react';

export class MyPage extends React.Component{
    render(){
        return <div>
            <div>
                <label>Services you requested</label>
                <table>
                    <thead>
                        <tr>
                        <td>First Name</td>
                        <td>Time</td>
                        <td>Explanation</td>
                        <td>State</td>
                        </tr>
                    </thead>
                </table>
            </div>
            <div>
                <label>Services you accepted</label>
                <table>
                    <thead>
                        <tr>
                        <td>First Name</td>
                        <td>Time</td>
                        <td>Explanation</td>
                        <td>State</td>
                        </tr>
                    </thead>
                </table>
            </div>
            <button onClick={()=>this.props.history.push("/main")}>Back to main</button>

           
        </div>
    }
}