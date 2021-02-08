import React from 'react';
import Search from '../../components/Search/Search';
import Job from '../../components/Job/Job';
import { Input, Label } from '../../components/Form/Form';
import JobContext from '../../contexts/JobContext';

class SearchRoute extends React.Component {

    state = {
        seeAll: false,
    }

    static contextType = JobContext;

    findZipcodesInRadius = () => {
        // USE ZipCode API 
    }

    handleSearch = (event) => {

    }

    handleSeeAllJobs = () => {
        const { seeAll } = this.state;
        this.setState({ seeAll: !seeAll });
    }

    render() {
        const { seeAll } = this.state;
        const { jobs } = this.context;
        return (
            <section>
                <h2>Find a job</h2>
                <Search />
                <div className='input-container'>
                    <Label htmlFor='all-jobs-input'>See all jobs</Label>
                    <Input onChange={this.handleSeeAllJobs} type='checkbox' id='all-jobs-input' name='all-jobs-input' />
                </div>
                {(seeAll) ? (
                    <div className='jobs-container'>
                        {jobs.map((job) => (
                        <Job 
                            key={job.id}
                            {...job}
                            />))}
                    </div>
                ) : null}
            </section>
        )
    }
}

export default SearchRoute;