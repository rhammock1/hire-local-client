import React from 'react';

const JobDetails = function(props) {
    const {
        description,
        salary,
        exp_level,
        job_type,
        location,
        zipcode,
        contact
    } = props;
    return (
        <div className='job-details-container'>
            <div>
                <span>{location}</span>
                {' '}
                <span>ZIP Code:{zipcode}</span>
            </div>
            <div>
                <span>Experience: {exp_level}</span>
                <span>Job Type: {job_type}</span>
            </div>
            <div>
                <span>Salary: ${salary}</span>
            </div>
            <div>
                <p>{description}</p>
            </div>
            <div>
                <p>Interested in Applying? Email your resume to the Hiring Manager at {contact}</p>
            </div>
        </div>
    )
}

export default JobDetails;