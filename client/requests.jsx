import React from 'react';
import {Link} from 'react-router-dom';

export const Requests = function({request, currentId}) {
    if (request.state !== 40) // Show only not terminated requests
        return <tr>
            {currentId == request.requesting_user_id &&
                <td><Link to={`myrequest/${request.id}`}>Myrequest</Link></td>}
            {currentId !== request.requesting_user_id &&
                <td><Link to={`request/${request.id}`}>{request.id}</Link></td>}
            <td>{request.requesting_user_id}</td>
            <td>{request.title}</td>
            <td>{request.location}</td>
            {request.state == 0 && <td>Waiting for accept</td>}
            {request.state !== 0 && <td>Under processing</td>}
            <td>{request.requestedDayAndTime}</td>
        </tr>
    else  // Don't show terminated request 
        return <tr></tr>
}