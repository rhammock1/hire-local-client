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
        resume: {},
    }

    static contextType = JobContext;

    async componentDidMount() {
        const { jobId } = this.props.match.params;
        const { getUserResume } = this.context;

        await RestApiService.getJobById(jobId)
            .then((job) => this.setState({ job }))
            .catch((error) => this.setState({ error, hasError: true }));

        const resume = await getUserResume();
        this.setState({ resume });
       
    }

    handleUploadChange = (event) => {
        const coverLetter = event.target.files[0];
        let formData = new FormData();
        formData.append('coverLetter', coverLetter);
        this.setState({ formData });
    }

    handleApplyForJob = (userId) => {
        let { formData } = this.state;
        const { handleError } = this.context;
        const { jobId } = this.props.match.params;
        
        if (Object.entries(formData).length === 0) {
            formData = new FormData();
            
        }
        
        formData.append('jobId', jobId);
        RestApiService.postApplyJob(formData, userId)
                .then(() => {
                    return this.setState({ success: true })
                })
                .catch((error) => handleError(error));

    }

    render() {
        const { job, success, resume } = this.state;
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
                            resume={resume}
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