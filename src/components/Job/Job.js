import React from 'react';
import { Link } from 'react-router-dom';
import JobContext from '../../contexts/JobContext';
import Button from '../Button/Button';
import './Job.css';

class Job extends React.Component {
    
    static contextType = JobContext;

    render() {
        const {
            id,
            title,
            exp_level,
            job_type,
            summary,
            location,
        } = this.props;

        let experience = '';
        if (exp_level === 'entry') {
            experience = 'Entry Level';
        } else if (exp_level === 'mid') {
            experience = 'Mid Level';
        } else if (exp_level === 'senior') {
            experience = 'Senior Level';
        }

        const capitalJobType = job_type.charAt(0).toUpperCase() + job_type.slice(1);

        const { userSaves, handleSave } = this.context;
        let saveClass;
        userSaves.map((save) => {
            if (save.job_id === id) {
                saveClass = 'job-saved'
            }
            return saveClass;
        })



        return(
            <div className='job-container'>
                <div className='job-details'>
                    <div className='job-title'>
                        <h4>{title} <span onClick={() => handleSave(id)} className={`job ${saveClass}`}>&#10084;</span></h4>
                        <span>{location}</span>
                    </div>
                    
                </div>
                <div className='job-card-details'>
                    {/* CSS grid for this part maybe 1 / 2  */}
                    <p id='grid-1'><strong>Summary:</strong> {summary}</p>
                    <p id='grid-2'><strong>Experience Level:</strong> {experience}</p>
                    <p id='grid-3'><strong>Job Type:</strong> {capitalJobType}</p>
                </div>
                <Button type='button'><Link to={`/jobs/${id}`}>Job Details</Link></Button>
            </div>
        )
    }

}

export default Job;