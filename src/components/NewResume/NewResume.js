import React from 'react';
import { Label, Input } from '../Form/Form'; 
import Button from '../Button/Button';

const NewResume = function(props) {
    // Check if the input should PATCH or POST
    const { patch, handleUploadChange, handlePatchResume, handleSubmitUpload } = props;
    const submit = (patch) ? handlePatchResume : handleSubmitUpload;
    const div = <div className='form-group'>
                    <Label html='upload-resume'>Upload a new resume</Label>
                    <Input onChange={handleUploadChange} type='file' id='upload-resume-input' name='upload-resume'/>
                    <Button onClick={submit} type='button'>Submit</Button>
                </div>
    return div;
}

export default NewResume;