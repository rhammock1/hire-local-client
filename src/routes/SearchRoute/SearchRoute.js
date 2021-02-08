import React from 'react';
import Search from '../../components/Search/Search';
import { Input, Label } from '../../components/Form/Form';

class SearchRoute extends React.Component {

    state = {
        seeAll: false,
    }

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
        return (
            <section>
                <h2>Find a job</h2>
                <Search />
                <div className='input-container'>
                    <Label htmlFor='all-jobs-input'>See all jobs</Label>
                    <Input onChange={this.handleSeeAllJobs} type='checkbox' id='all-jobs-input' name='all-jobs-input' />
                </div>
                {(seeAll) && (
                    <div className='job-container'>
                        
                    </div>
                )}
            </section>
        )
    }
}

export default SearchRoute;