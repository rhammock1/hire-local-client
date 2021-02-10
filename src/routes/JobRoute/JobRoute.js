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

        return (
            <section>
                <h2>{job.title}</h2>
                <JobDetails {...job} />
            </section>
        )
    }
}

export default JobRoute;