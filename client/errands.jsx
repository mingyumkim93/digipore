import React from 'react';
import {Link} from 'react-router-dom';

export const Errands = function({errand, currentId}) {
    if (errand.state !== 40) // Show only not terminated requests
        return <tr>
            {currentId == errand.poster &&
                <td><Link to={`myrequest/${errand.id}`}>My Errand</Link></td>}
            {currentId !== errand.poster &&
                <td><Link to={`request/${errand.id}`}>{errand.id}</Link></td>}
            <td>{errand.poster}</td>
            <td>{errand.title}</td>
            <td>{errand.location}</td>
            {errand.state == 0 && <td>Waiting for acceptance</td>}
            {errand.state !== 0 && <td>In processing</td>}
            <td>{errand.requestedDayAndTime}</td>
        </tr>
    else  // Don't show terminated request 
        return <tr></tr>
}