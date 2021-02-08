import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const Job = function(props) {
    const {
        id,
        title,
        exp_level,
        job_type,
        summary,
        location,
    } = props;

    return(
        <div className='job-container'>
            <h4>{title}</h4><span>{location}</span>
            <div className='job-card-details'>
                {/* CSS grid for this part maybe 1 / 2  */}
                <p>Summary: {summary}</p>
                <p>Experience Level: {exp_level}</p>
                <p>Job Type: {job_type}</p>
            </div>
            <Button type='button'><Link to={`/jobs/${id}`}>More Details</Link></Button>
        </div>
    )

}

export default Job;