import React from 'react';
import { Label, Input } from '../Form/Form'; 
import Button from '../Button/Button';

const NewResume = function(props) {
    const { patch, handleUploadChange, handlePatchResume, handleSubmitUpload } = props;

    if(patch) {
        return (
            <div className='form-group'>
                <Label html='upload-resume'>Upload a new resume</Label>
                <Input onChange={handleUploadChange} type='file' id='upload-resume-input' name='upload-resume'/>
                <Button onClick={handlePatchResume} type='button'>Submit</Button>
            </div>
        )
    } else {
        return (
            <div className='form-group'>
                <Label html='upload-resume'>Upload a new resume</Label>
                <Input onChange={handleUploadChange} type='file' id='upload-resume-input' name='upload-resume'/>
                <Button onClick={handleSubmitUpload} type='button'>Submit</Button>
            </div>
        )
    }
}

export default NewResume;