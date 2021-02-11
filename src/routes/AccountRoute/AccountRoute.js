import React from 'react';
import Button from '../../components/Button/Button';
import Job from '../../components/Job/Job';
import JobContext from '../../contexts/JobContext';

class AccountRoute extends React.Component {

    static contextType = JobContext;

    render() {
        const { getSavedJobs } = this.context;
        const savedJobs = getSavedJobs();
        const { goBack } = this.props.history;
        return (
            <section>
                <h2>Welcome to your acccount</h2>
                <h3>You have saved these jobs:</h3>
                {savedJobs.map((save) => <Job key={save.id} {...save} />)}
                <Button onClick={goBack} type='button'>Go Back</Button>
            </section>
        )
    }
}

export default AccountRoute;