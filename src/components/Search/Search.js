import React from 'react';
import Button from '../Button/Button';
import { Input, Required, Label } from '../Form/Form';
import './Search.css';

class Search extends React.Component {

    
    render() {
        const { handleSearch, handleSeeAllJobs } = this.props;
        return (
            <div className='search-container'>
                <form onSubmit={handleSearch}>
                    <fieldset>
                        <legend><h3>Search</h3></legend>
                        <div className='form-group'>
                            <Label htmlFor='search-title-input'>
                            Keyword or title<Required />
                            </Label>
                            <Input
                                id='search-title-input'
                                name='search-title'
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <Label htmlFor='search-zipcode-input'>
                            ZIP Code<Required />
                            </Label>
                            <Input
                                id='search-zipcode-input'
                                name='search-zipcode'
                                pattern='^\d{5}$'
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <Label htmlFor='search-radius-input'>
                            Radius<Required />
                            </Label>
                            <Input
                                type='number'
                                id='search-radius-input'
                                name='search-radius'
                                required
                            />
                        </div>
                        <div className='form-group checkbox-container'>
                            <div>
                                <Label htmlFor='search-clt-input'>
                                CLT
                                </Label>
                                <Input type='checkbox' id='search-clt-input' name='search-clt-input' />
                            </div>
                            <div>
                                <Label htmlFor='all-jobs-input'>See all jobs</Label>
                                <Input onChange={handleSeeAllJobs} type='checkbox' id='all-jobs-input' name='all-jobs-input' />
                            </div>
                            </div>
                        <Button type='submit'>Search</Button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default Search;