import React from 'react';
import Button from '../Button/Button';
import { Input, Required, Label } from '../Form/Form';

class Search extends React.Component {

    
    render() {
        const { handleSearch } = this.props;
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
                            ZipCode<Required />
                            </Label>
                            <Input
                                id='search-zipcode-input'
                                name='search-zipcode'
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <Label htmlFor='search-radius-input'>
                            Radius<Required />
                            </Label>
                            <Input
                                id='search-radius-input'
                                name='search-radius'
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <Label htmlFor='search-clt-input'>
                            CLT
                            </Label>
                            <input type='checkbox' id='search-clt-input' name='search-clt-input' />
                        </div>
                        <Button type='submit'>Search</Button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default Search;