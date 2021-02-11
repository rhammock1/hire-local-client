import React from 'react';
import Button from '../../components/Button/Button';
import Job from '../../components/Job/Job';
import NewJobForm from '../../components/NewJobForm/NewJobForm';
import JobContext from '../../contexts/JobContext';
import UserContext from '../../contexts/UserContext';
import RestApiService from '../../services/rest-api-service';

class AccountRoute extends React.Component {

    state = { 
        error: null,
        reqs: [],
        req: '',
    };

    static contextType = JobContext;

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
        reqs.push(req);
        this.setState({ req: '', reqs })
        element.value = '';
    }

    handleNewJobSubmit = async (event, user) => {
        event.preventDefault();
        event.persist();
        
        const user_id = user.user.id;
        const title = event.target['new-job-title'].value;
        const summary = event.target['new-job-summary'].value;
        const description = event.target['new-job-description'].value;
        const location = event.target['new-job-location'].value;
        const zipcode = event.target['new-job-zipcode'].value;
        const contact = event.target['new-job-contact'].value;
        const exp_level = event.target['new-job-exp'].value;
        const job_type = event.target['new-job-type'].value;
        const salary = event.target['new-job-salary'].value;

        const newJob = {
            user_id,
            title,
            summary,
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
            this.setState({ error: message });
        }

        await RestApiService.addNewJob(newJob)
            .then((resJson) => {
                event.target = '';
                return this.setState({ success: true, createdJob: resJson })
            })
            .catch((error) => this.setState({ error: error.error }))

        const { getAllJobs } = this.context;
        await getAllJobs();
    }

    render() {
        const { error, reqs } = this.state;
        const { getSavedJobs } = this.context;        
        const savedJobs = getSavedJobs();
        const { goBack } = this.props.history;
        return (
            <section>
                <h2>Welcome to your acccount</h2>
                <h3>Share a new job opportunity</h3>
                <UserContext.Consumer>
                    {user => (
                        <NewJobForm
                        user={user} error={error} reqs={reqs} handleReqChange={this.handleReqChange} handleAddReqs={this.handleAddReqs} handleNewJobSubmit={this.handleNewJobSubmit}/>
                    )}
                </UserContext.Consumer>
                
                <h3>You have saved these jobs:</h3>
                {savedJobs.map((save) => <Job key={save.id} {...save} />)}
                <Button onClick={goBack} type='button'>Go Back</Button>
            </section>
        )
    }
}

export default AccountRoute;