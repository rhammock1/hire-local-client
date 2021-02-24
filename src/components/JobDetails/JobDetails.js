import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { Input, Label } from '../Form/Form';
import './JobDetails.css';

const JobDetails = function(props) {
    const {
        description,
        salary,
        exp_level,
        company,
        job_type = '',
        location,
        zipcode,
        contact,
        reqs = [],
        handleUploadChange,
        handleApplyForJob,
        userId,
        success,
        resume,
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
            <div className='job-location'>
                <h3>{location}</h3>
                <span>{zipcode}</span>
            </div>
            <div>
                <h4>Company: </h4><span>{company}</span>
                <br />
                <h4>Experience: </h4><span>{experience}</span>
                <br />
                <h4>Job Type: </h4><span>{capitalJobType}</span>
                <br />
                <h4>Salary: </h4><span>${salary}</span>
                <br />
            </div>
            <div>
                <h4>Job Description: </h4>
                <p className='desc'>{description}</p>
            </div>
            <div>
                <h4>Job Requirements:</h4>
                <ul>
                    {reqs.map((req) => <li key={req.id}>{req.requirement}</li>)}
                </ul>
            </div>
            <div>
                {
                    (success)
                        ? <>
                            <h4>Successfully applied for job</h4>
                            
                            <p className='desc' >Be sure to keep an eye on your email for a response from the hiring manager! Good Luck!</p>
                        </>
                        : (!resume) 
                            ? <>
                                <h4>Interested in Applying?</h4>
                                <p className='desc'>Email your resume to the Hiring Manager at <strong>{contact}</strong></p> 
                            </>
                            : <>
                                <h4>Interested in Applying?</h4>
                                <br />
                                <Label htmlFor='coverLetter'>Upload cover letter (optional)</Label>
                                <Input onChange={handleUploadChange} type='file' id='coverLetter' name='coverLetter' />
                                <Button onClick={() => handleApplyForJob(userId)} type='button'>Apply now</Button>
                                <p className='desc'>Clicking the Apply Now button will send your resume (and optional cover letter) to <strong>{contact}</strong></p>
                            </>
                }
            </div>
            <Button type='button'><Link to='/'>Go Back</Link></Button>
        </div>
    )
}

export default JobDetails;