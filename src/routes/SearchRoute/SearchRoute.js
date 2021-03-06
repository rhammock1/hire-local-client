import React from 'react';
import Search from '../../components/Search/Search';
import Job from '../../components/Job/Job';
import JobContext from '../../contexts/JobContext';

class SearchRoute extends React.Component {

    state = {
        seeAll: false,
        searched: false,
        results: [],
        loading: false,
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
                const zips = data.DataList || [];
                let zipcodes = [];
                zips.map((obj) => zipcodes.push(obj.Code));
                return zipcodes;
            })
            .catch((error) => console.error(error));
    }

    handleSearch = async (event) => {
        event.preventDefault();
        event.persist();
        this.setState({ loading: true });
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
        const matchingJobs = jobs.filter((job) => (job.title.toLowerCase().includes(keywords)) ? job : null)
        
        // Check if matchingJobs contains the zipcodesInRadius
        let results = [];
        matchingJobs.map((job) => {
            return (zipcodesInRadius.includes(job.zipcode.toString())) 
                ? results.push(job)
                : null })
        this.setState({ searched: true, results });

        event.target['search-title-input'].value = '';
        event.target['search-zipcode-input'].value = '';
        event.target['search-radius-input'].value = '';
        
        this.setState({ loading: false });
    }

    handleSeeAllJobs = () => {
        const { seeAll } = this.state;
        this.setState({ seeAll: !seeAll });
    }

    render() {
        const { seeAll, results, loading, searched } = this.state;
        const { jobs } = this.context;
        return (
            <section>
                <h2>Find a job</h2>
                <Search handleSeeAllJobs={this.handleSeeAllJobs} handleSearch={this.handleSearch} />
                
                <div className='container'>
                    {(loading)
                        ? <img id='loading' src='https://media.giphy.com/media/KKCuBooszlPG0/giphy.gif' alt='loading search results' />
                        : <div className='jobs-container'>
                            {(seeAll) 
                                ? (
                                jobs.map((job) => (
                                <Job 
                                    key={job.id}
                                    {...job}
                                    />))
                            ) : ((searched) && (!results.length))
                                    ? <div>
                                        <p id='none-matching'>Sorry, there were no jobs matching your search terms</p>
                                    </div>
                                    : (
                                        results.map((result) => (
                                            <Job key={result.id}
                                            {...result} />
                                        )))
                            }
                            </div>
                            
                    }
                </div>
                
            </section>
        )
    }
}

export default SearchRoute;