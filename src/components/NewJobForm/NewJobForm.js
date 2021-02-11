import React from 'react';
import Button from '../Button/Button';
import { Input, Label, Required } from '../Form/Form';

const NewJobForm = function(props) {
    const { user, handleNewJobSubmit, error } = props;
    return (
        <div className='form-container'>
            <form onSubmit={(event) => handleNewJobSubmit(event, user) }>
            <div role='alert'>
                {error && <p>{error}</p>}
            </div>
                <fieldset>
                    <legend>New Job</legend>
                    <div className='form-group'>
                        <Label htmlFor='new-job-title'>Job Title:<Required /> </Label>
                        <Input id='new-job-title' name='new-job-title' required />
                    </div>
                    <div className='form-group'>
                        <Label htmlFor='new-job-summary'>Job Summary:<Required /> </Label>
                        <Input id='new-job-summary' name='new-job-summary' required />
                    </div>
                    <div className='form-group'>
                        <Label htmlFor='new-job-description'>Job Description:<Required /> </Label>
                        <Input id='new-job-description' name='new-job-description' required />
                    </div>
                    <div className='form-group'>
                        <Label htmlFor='new-job-location'>Job Location:<Required /> </Label>
                        <Input id='new-job-location' name='new-job-location' required />
                    </div>
                    <div className='form-group'>
                        <Label htmlFor='new-job-zipcode'>ZIP Code:<Required /> </Label>
                        <Input type='number' id='new-job-zipcode' pattern='^\d{5}$' name='new-job-zipcode' required />
                    </div>
                    <div className='form-group'>
                        <Label htmlFor='new-job-contact'>Job Contact Email:<Required /> </Label>
                        <Input id='new-job-contact' name='new-job-contact' required />
                    </div>
                    <div className='form-group'>
                        <Label htmlFor='new-job-exp'>Experience:<Required /></Label>
                        <select id='new-job-exp' name='new-job-exp'>
                            <option value=''>Please Choose</option>
                            <option value='entry'>Entry Level</option>
                            <option value='mid'>Mid Level</option>
                            <option value='senior'>Senior Level</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <Label htmlFor='new-job-type'>Job Type:<Required /></Label>
                        <select id='new-job-type' name='new-job-type'>
                            <option value=''>Please Choose</option>
                            <option value='full-time'>Full Time</option>
                            <option value='part-time'>Part Time</option>
                            <option value='internship'>Internship</option>
                            <option value='temporary'>Temporary</option>
                            <option value='contract'>Contract</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <Label htmlFor='new-job-salary'>Salary:</Label>
                        <Input id='new-job-salary' name='new-job-salary' />
                    </div>
                    <Button type='submit'>Submit Job</Button>
                </fieldset>
            </form>
        </div>
    )
}

export default NewJobForm;