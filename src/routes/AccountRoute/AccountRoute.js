import React from 'react';
import Button from '../../components/Button/Button';
import Job from '../../components/Job/Job';
import NewJobForm from '../../components/NewJobForm/NewJobForm';
import NewResume from '../../components/NewResume/NewResume';
import JobContext from '../../contexts/JobContext';
import UserContext from '../../contexts/UserContext';
import RestApiService from '../../services/rest-api-service';

class AccountRoute extends React.Component {

    state = { 
        stateError: null,
        reqs: [],
        req: '',
        success: null,
        createdJob: {},
        resume: false,
        view: null,
        formData: {},
        upload: false,
    };

    static contextType = JobContext;

    handleUploadChange = (event) => {
        const resume = event.target.files[0];
        let formData = new FormData();
        formData.append('resumePDF', resume);
        this.setState({ formData });
      }
    
    async componentDidMount() {
        const { getUserResume } = this.context;
        const resume = await getUserResume();

        if (!resume) {
            this.setState({ resume: false });
        } else {
            this.setState({ resume: true });
        }
        
    }

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validateInputs = (newJob) => {
        console.log(newJob);
        const requiredFields = ['user_id', 'title', 'summary', 'description', 'location', 'zipcode', 'contact'];
        let allGood = true;
        let message;
        const allRequired = requiredFields.map((field) => newJob[field]);
        if (!allRequired) {
            message = 'This job is missing some required fields';
            allGood = false;
            
        } else if (!this.validateEmail(newJob.contact)) {
            message = 'The contact email was not a correct email. Please use format fakeemail@provider.com';
            allGood = false;
        } 
        return {message, allGood };
    }

    handleReqChange = (event) => {
        const req = event.target.value;
        this.setState({ req });
    }

    handleAddReqs = () => {
        const element = document.getElementById('new-job-req');
        const { req, reqs } = this.state;
        if (!req) {
            return;
        }
        reqs.push(req);
        this.setState({ req: '', reqs })
        element.value = '';
    }

    removeReq = () => {
        const { reqs } = this.state;

        reqs.pop();
        this.setState({ reqs });
    }

    handleNewJobSubmit = async (event, user) => {
        event.preventDefault();
        event.persist();
        
        const user_id = user.user.id;
        const title = event.target['new-job-title'].value;
        const company = event.target['new-job-company'].value;
        const summary = event.target['new-job-summary'].value;
        const description = event.target['new-job-description'].value;
        const location = event.target['new-job-location'].value;
        const zipcode = event.target['new-job-zipcode'].value;
        const contact = event.target['new-job-contact'].value;
        const exp_level = event.target['new-job-exp'].value;
        const job_type = event.target['new-job-type'].value;
        const salary = event.target['new-job-salary'].value;

        const { reqs } = this.state;
        const formatReqs = reqs.map((req) => ({ requirement: req }));

        const newJob = {
            user_id,
            title,
            summary,
            company,
            description,
            location,
            zipcode,
            contact,
            exp_level,
            job_type,
            salary
        }

        const {
            message,
            allGood
        } = this.validateInputs(newJob);

        if (!allGood) {
            this.setState({ stateError: message });
        }

        await RestApiService.addNewJob(newJob, formatReqs)
            .then((resJson) => {
                event.target = '';
                return this.setState({ success: true, createdJob: resJson })
            })
            .catch((error) => this.setState({ stateError: error.error }))

        const { getAllJobs } = this.context;
        await getAllJobs();
    }

    handleCloseSuccess = () => {
        this.setState({ success: false });
    }

    handleView = (event) => {
        this.setState({ view: event.target.name });

    }

    handleUploadView = () => {
        this.setState({ upload: true });
    }

    handleSubmitUpload = async () => {
        const { formData } = this.state;
        const { handleError, getUserResume } = this.context;
        const { userId } = this.props.match.params;
        await RestApiService.postResume(formData, userId)
            .then(() => {
                this.setState({ upload: false });
            })
            .catch((error) => {
                handleError(error);
            })
        await getUserResume()
            .then(() => this.setState({ resume: true }))
            .catch((error) => this.setState({ stateError: error }))
    }

    handlePatchResume = () => {
        const { formData } = this.state;
        const { handleError, getUserResume } = this.context;
        const { userId } = this.props.match.params;
        RestApiService.patchResume(formData, userId)
            .then(() => this.setState({ upload: false }))
            .catch((error) => handleError(error));
        getUserResume();
    }

    handleDeleteResume = () => {
        const { userId } = this.props.match.params;
        const { handleError } = this.context;
        RestApiService.deleteResume(userId)
            .then(() => {
                if (this.state.upload) {
                    this.setState({ upload: false });
                }
                return this.setState({ resume: false })
            })
            .catch((error) => handleError(error));
    }

    render() {
        const { stateError, reqs, success, resume, view, upload } = this.state;
        const { getSavedJobs, getAppliedJobs, openResume, error } = this.context;        
        const savedJobs = getSavedJobs();
        const appliedJobs = getAppliedJobs();
        const { goBack } = this.props.history;
        return (
            <section>
                <h2>Welcome to your acccount</h2>
                
                <h3>What would you like to do?</h3>
                <div className='button-container'>
                    <Button onClick={this.handleView} name='opportunity' type='button'>Share a job opportunity</Button>
                    <Button onClick={this.handleView} name='saved' type='button'>See your saved jobs</Button>
                    <Button onClick={this.handleView} name='applied' type='button'>See your applied jobs</Button>
                    {((resume) && (error === null)) 
                        ? <div className='resume-buttons'>
                            <Button type='button' onClick={openResume}>View resume</Button>
                            <Button type='button' onClick={this.handleUploadView}>Update resume</Button>
                            {(upload) ? <NewResume
                                patch={true}
                                handlePatchResume={this.handlePatchResume}
                                handleUploadChange={this.handleUploadChange} />
                            : null}
                            <Button type='button' onClick={this.handleDeleteResume}>Delete resume</Button>
                        </div>
                        : (!upload)
                            ? <Button onClick={this.handleUploadView}type='button'>Upload a resume</Button>
                            : <NewResume
                                patch={false}
                                handleSubmitUpload={this.handleSubmitUpload}
                                handleUploadChange={this.handleUploadChange} />}
                </div>
                {(!view)
                    ? null
                    : (view === 'opportunity')
                        ?
                            (!success)
                                ? <>
                                <h3>New awesome job opportunity</h3>
                                <UserContext.Consumer>
                                    {user => (
                                        <NewJobForm
                                        user={user} removeReq={this.removeReq} error={stateError} reqs={reqs} handleReqChange={this.handleReqChange} handleAddReqs={this.handleAddReqs} handleNewJobSubmit={this.handleNewJobSubmit}/>
                                    )}
                                </UserContext.Consumer></>
                                : <div className='success-container'>
                                    <p>Successfully added Job</p>
                                    <Button type='button' onClick={this.handleCloseSuccess}>Add Another Job</Button>
                                </div>                    
                            
                        : (view === 'saved')
                            ? <><h3>You have saved these jobs:</h3>
                                {savedJobs.map((save) => <Job key={save.id} {...save} />)}</>
                            : (view === 'applied')
                                ? <><h3>You have applied to these jobs:</h3>
                                {appliedJobs.map((apply) => <Job key={apply.id} {...apply} />)}
                                </>
                                :null
                    }
                
                
                <Button onClick={goBack} type='button'>Go Back</Button>
            </section>
        )
    }
}

export default AccountRoute;