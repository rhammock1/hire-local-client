import React from 'react';
import Search from '../../components/Search/Search';
import Job from '../../components/Job/Job';
import { Input, Label } from '../../components/Form/Form';
import JobContext from '../../contexts/JobContext';

class SearchRoute extends React.Component {

    state = {
        seeAll: false,
        results: [],
    }

    static contextType = JobContext;

    findZipcodesInRadius = (zipcode, radius) => {
        // USE ZipCode API 
        const endpoint = `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=${zipcode}&maximumradius=${radius}&country=US&key=${process.env.REACT_APP_ZIP_KEY}`;
        return fetch(endpoint)
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
            .then((data) => {
                const zips = data.DataList;
                let zipcodes = [];
                zips.map((obj) => zipcodes.push(obj.Code));
                return zipcodes;
            })
            .catch((error) => console.error(error));
    }

    handleSearch = async (event) => {
        event.preventDefault();
        event.persist();

        const { jobs } = this.context;
        
        const title = event.target['search-title-input'].value;
        let zipcode = event.target['search-zipcode-input'].value;
        let radius = event.target['search-radius-input'].value;

        // Check zipcode and radius
        const zipcodesInRadius = await this.findZipcodesInRadius(zipcode, radius);

        title.toLowerCase();
        // Split title variable at the spaces to identify keywords
        let keywords = title.split(' ');
        // search jobs for job titles with matching keywords
        const matchingJobs = jobs.map((job) => (job.title.toLowerCase().includes(keywords)) ? job : null)

        // Check if matchingJobs contains the zipcodesInRadius
        let results = [];
        matchingJobs.map((job) => {
            return (zipcodesInRadius.includes(job.zipcode.toString())) 
                ? results.push(job)
                : null })
        this.setState({ results });

        event.target['search-title-input'].value = '';
        event.target['search-zipcode-input'].value = '';
        event.target['search-radius-input'].value = '';
    }

    handleSeeAllJobs = () => {
        const { seeAll } = this.state;
        this.setState({ seeAll: !seeAll });
    }

    render() {
        const { seeAll, results } = this.state;
        const { jobs } = this.context;
        return (
            <section>
                <h2>Find a job</h2>
                <Search handleSearch={this.handleSearch} />
                <div className='input-container'>
                    <Label htmlFor='all-jobs-input'>See all jobs</Label>
                    <Input onChange={this.handleSeeAllJobs} type='checkbox' id='all-jobs-input' name='all-jobs-input' />
                </div>
                <div className='jobs-container'>
                {(seeAll) ? (
                    jobs.map((job) => (
                    <Job 
                        key={job.id}
                        {...job}
                        />))
                ) : (
                    results.map((result) => (
                        <Job key={result.id}
                        {...result} />
                    )))
                }
                </div>
            </section>
        )
    }
}

export default SearchRoute;