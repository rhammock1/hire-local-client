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
            handleSave
        } = this.props;

        const { userSaves } = this.context;
        let saveClass;
        userSaves.map((save) => {
            if (save.job_id === id) {
                saveClass = 'job-saved'
            }
            return saveClass;
        })

        return(
            <div className='job-container'>
                <h4>{title}</h4><span>{location}</span>
                <div className='job-card-details'>
                    {/* CSS grid for this part maybe 1 / 2  */}
                    <p>Summary: {summary}</p>
                    <p>Experience Level: {exp_level}</p>
                    <p>Job Type: {job_type}</p>
                </div>
                <img onClick={() => handleSave(id)} alt='heart icon' className={saveClass} src="https://img.icons8.com/metro/26/000000/like.png"/>
                <Button type='button'><Link to={`/jobs/${id}`}>More Details</Link></Button>
            </div>
        )
    }

}

export default Job;