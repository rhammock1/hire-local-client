import React from 'react';
import Search from '../../components/Search/Search';
import { Input, Label } from '../../components/Form/Form';

class SearchRoute extends React.Component {

    findZipcodesInRadius = () => {
        // USE ZipCode API 
    }

    handleSearch = (event) => {

    }

    handleSeeAllJobs = () => {
        
    }

    render() {
        return (
            <section>
                <h2>Find a job</h2>
                <Search />
                <div className='input-container'>
                    <Label htmlFor='all-jobs-input'>See all jobs</Label>
                    <Input type='checkbox' id='all-jobs-input' name='all-jobs-input' />
                </div>
            </section>
        )
    }
}

export default SearchRoute;