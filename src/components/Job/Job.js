import React from 'react';

const Job = function(props) {
    const {
        title,
        exp_level,
        job_type,
        description,
    } = props;
    
    return(
        <div className='job-container'>
            <h4>{title}</h4>
            <div className='job-card-details'>
                {/* CSS grid for this part maybe 1 / 2  */}
                <p>Summary: {description}</p>
                <p>Experience Level: {exp_level}</p>
                <p>Job Type: {job_type}</p>
            </div>
        </div>
    )

}

export default Job;