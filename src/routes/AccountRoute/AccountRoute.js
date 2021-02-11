import React from 'react';
import Job from '../../components/Job/Job';
import JobContext from '../../contexts/JobContext';

class AccountRoute extends React.Component {

    static contextType = JobContext;

    render() {
        const { userSaves } = this.context;
        
        return (
            <section>
                <h2>Welcome to your acccount</h2>
                <h3>You have saved these jobs:</h3>
                {userSaves.map((save) => <Job {...save} />)}
            </section>
        )
    }
}

export default AccountRoute;