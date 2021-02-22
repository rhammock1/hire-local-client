import React from 'react';
import JobDetails from '../../components/JobDetails/JobDetails';
import JobContext from '../../contexts/JobContext';
import UserContext from '../../contexts/UserContext';
import RestApiService from '../../services/rest-api-service';

class JobRoute extends React.Component {

    state = {
        error: null,
        hasError: false,
        job: {},
        formData: {},
        success: false,
    }

    static contextType = JobContext;

    componentDidMount() {
        const { jobId } = this.props.match.params;
        
        RestApiService.getJobById(jobId)
            .then((job) => this.setState({ job }))
            .catch((error) => this.setState({ error, hasError: true }));
       
    }

    handleUploadChange = (event) => {
        const coverLetter = event.target.files[0];
        let formData = new FormData();
        formData.append('coverLetter', coverLetter);
        this.setState({ formData });
    }

    handleApplyForJob = (userId) => {
        console.log(userId);
        const { formData } = this.state;
        const { jobId } = this.props.match.params;
        console.log(jobId);
        const { handleError } = this.context;
        formData.append('jobId', jobId);
        
        RestApiService.postApplyJob(formData, userId)
            .then(() => {
                return this.setState({ success: true })
            })
            .catch((error) => handleError(error));
    }

    render() {
        const { job, success } = this.state;
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
                <UserContext.Consumer>
                    {user => {
                        return <JobDetails
                            {...job}
                            success={success}
                            userId={user.user.id}
                            handleUploadChange={this.handleUploadChange}
                            handleApplyForJob={this.handleApplyForJob}
                            />
     } }
                </UserContext.Consumer>
            </section>
        )
    }
}

export default JobRoute;