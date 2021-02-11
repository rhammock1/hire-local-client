import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const JobDetails = function(props) {
    const {
        description,
        salary,
        exp_level,
        job_type = '',
        location,
        zipcode,
        contact,
        reqs = []
    } = props;

    const capitalJobType = job_type.charAt(0).toUpperCase() + job_type.slice(1);

    let experience = '';
    if (exp_level === 'entry') {
        experience = 'Entry Level';
    } else if (exp_level === 'mid') {
        experience = 'Mid Level';
    } else if (exp_level === 'senior') {
        experience = 'Senior Level';
    }

    return (
        <div className='job-details-container'>
            <div>
                <h3>{location}</h3>
                {' '}
                <span>ZIP Code:{zipcode}</span>
            </div>
            <div>
                <h4>Experience: </h4><span>{experience}</span>
                <h4>Job Type: </h4><span>{capitalJobType}</span>
            </div>
            <div>
                <h4>Salary: </h4><span>${salary}</span>
            </div>
            <div>
                <h4>Job Description: </h4><p>{description}</p>
            </div>
            <div>
                <h4>Job Requirements:</h4>
                <ul>
                    {reqs.map((req) => <li key={req.id}>{req.requirement}</li>)}
                </ul>
            </div>
            <div>
                <h4>Interested in Applying?</h4>
                <p>Email your resume to the Hiring Manager at <strong>{contact}</strong></p>
            </div>
            <Button type='button'><Link to='/'>Go Back</Link></Button>
        </div>
    )
}

export default JobDetails;