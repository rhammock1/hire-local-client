import React from 'react';
import JobDetails from '../../components/JobDetails/JobDetails';
import JobContext from '../../contexts/JobContext';
import RestApiService from '../../services/rest-api-service';

class JobRoute extends React.Component {

    state = {
        error: null,
        hasError: false,
        job: {},
    }

    static contextType = JobContext;

    componentDidMount() {
        const { jobId } = this.props.match.params;
        
        RestApiService.getJobById(jobId)
            .then((job) => this.setState({ job }))
            .catch((error) => this.setState({ error, hasError: true }));
       
    }

    render() {
        const { job } = this.state;
        const { userSaves, handleSave } = this.context;
        let saveClass;
        userSaves.map((save) => {
            if (save.job_id === job.id) {
                saveClass = 'job-saved'
            }
            return saveClass;
        })
        return (
            <section>
                <h2>{job.title}</h2><span onClick={() => handleSave(job.id)} className={`job ${saveClass}`}>&#10084;</span>
                <JobDetails {...job} />
            </section>
        )
    }
}

export default JobRoute;