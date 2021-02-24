import React from 'react';
import Button from '../Button/Button';
import { Input, Label, Required } from '../Form/Form';


class NewJobForm extends React.Component {

    static defaultProps = {
        user: {},
        handleNewJobSubmit: () => {},
        error: null,
        handleAddReqs: () => {},
        reqs: [],
        handleReqChange: () => {},
        removeReq: () => {},
    }

    state = {
        toggled: false,
        inputId: '',
    }
    toggleTips = (event) => {
        this.setState({
            toggled: true,
            inputId: event.currentTarget.id,
        });
    }

    closeTips = () => {
        this.setState({
            toggled: false,
            inputId: '',
        })
    }

    render() {
        const { user, handleNewJobSubmit, error, handleAddReqs, reqs, handleReqChange, removeReq } = this.props;
        const { toggled, inputId } = this.state;
        return (
            <div className='form-container'>
                <form className='new-job-form' onSubmit={(event) => handleNewJobSubmit(event, user) }>
                <div role='alert'>
                    {error && <p>{error}</p>}
                </div>
                    <fieldset>
                        <div className='form-group'>
                            {((toggled) && (inputId === 'new-job-title'))
                                ? <aside><span id='close-tip' onClick={this.closeTips}>&times;</span> Avoid gendered words, like “rockstar,” “ninja,” and “dominate”. Keep it straightforward*</aside>
                                : null
                            }
                            <Label htmlFor='new-job-title'>Job Title:<Required /> </Label>
                            <Input onClick={this.toggleTips} id='new-job-title' name='new-job-title' required />
                        </div>
                        <div className='form-group'>
                            <Label htmlFor='new-job-company'>Company:<Required /> </Label>
                            <Input id='new-job-company' name='new-job-company' required />
                        </div>
                        <div className='form-group'>
                            {((toggled) && (inputId === 'new-job-summary'))
                                ? <aside><span id='close-tip' onClick={this.closeTips}>&times;</span> Avoid using unnecessary corporate speak and jargon*</aside>
                                : null
                            }
                            <Label htmlFor='new-job-summary'>Job Summary:<Required /> </Label>
                            <Input onClick={this.toggleTips} id='new-job-summary' name='new-job-summary' required />
                        </div>
                        <div className='form-group'>
                            {((toggled) && (inputId === 'new-job-description'))
                                ? <aside><span id='close-tip' onClick={this.closeTips}>&times;</span> Emphasize your company’s commitment to diversity and inclusion*</aside>
                                : null
                            }
                            <Label htmlFor='new-job-description'>Job Description:<Required /> </Label>
                            <textarea onClick={this.toggleTips} id='new-job-description' name='new-job-description' required />
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
                            {((toggled) && (inputId === 'new-job-contact'))
                                ? <aside><span id='close-tip' onClick={this.closeTips}>&times;</span> Users who apply to this job will have their resume sent to this email address by an automated mailing system</aside>
                                : null
                            }
                            <Label htmlFor='new-job-contact'>Job Contact Email:<Required /> </Label>
                            <Input onClick={this.toggleTips} id='new-job-contact' name='new-job-contact' required />
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
                        <div className='form-group'>
                            <h4>Requirements</h4>
                            <ul>
                                {reqs.map((req, index) => <li key={index} >{req}</li>)}
                            </ul>
                            {((toggled) && (inputId === 'new-job-req'))
                                ? <aside><span id='close-tip' onClick={this.closeTips}>&times;</span> Limit your job requirements to “must-haves”*</aside>
                                : null
                            }
                            <Label htmlFor='new-job-req'>Job Requirement:</Label>
                            <Input onClick={this.toggleTips} onChange={handleReqChange} id='new-job-req' name='new-job-req' />
                            <div className='req-buttons'>
                                <Button type='button' onClick={handleAddReqs}>Add Requirement</Button>
                                <Button type='button' onClick={removeReq}>Remove Last Requirement</Button>
                            </div>
                        </div>
                        <Button type='submit'>Submit Job</Button>
                        <p>* Job posting tips from: <a target="_blank" rel="noopener noreferrer" href='https://business.linkedin.com/talent-solutions/blog/job-descriptions/2018/5-must-dos-for-writing-inclusive-job-descriptions#:~:text=To%20make%20your%20job%20descriptions,inclusive%20and%20less%20likely%20to'>LinkedIn</a></p>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default NewJobForm;