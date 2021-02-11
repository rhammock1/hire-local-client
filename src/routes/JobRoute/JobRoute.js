import React from 'react';
import JobDetails from '../../components/JobDetails/JobDetails';
import JobContext from '../../contexts/JobContext';

class JobRoute extends React.Component {

    state = {
        error: null,
        hasError: false,
        job: {},
    }

    static contextType = JobContext;

    async componentDidMount() {
        let { jobs } = this.context;
        
        const { jobId } = this.props.match.params;
        if (!jobs.length) {
            const int = setInterval(() => {
                jobs = this.context.jobs;
                if(jobs.length) {
                    clearInterval(int);
                    const job = jobs.find((job) => job.id.toString() === jobId)
            
                    return this.setState({ job });
                }
            }, 250);
            
        } else {
            const job = jobs.find((job) => job.id.toString() === jobId)
            
            this.setState({ job });
        }
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