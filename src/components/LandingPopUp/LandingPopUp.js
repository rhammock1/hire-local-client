import React from 'react';
import Button from '../Button/Button';
import './LandingPopUp.css';

const LandingPopUp = function(props) {
    const { handleClear } = props;
  return (
    <div className="popup">
      <p className="demo">
        To test please use demo account:
        <br />
        username:
        {' '}
        <strong>demo</strong>
        <br />
        password:
        {' '}
        <strong>P@ssword123</strong>
      </p>
      <p className="info">
        
        This app's goal is to help connect local businesses with local talent. Users can post new jobs and search for jobs. Users can apply for jobs by uploading a resume on sign up or on your account page. 
      </p>
      <p>
        As a user you can search for jobs by title, zip code, and radius. All test jobs are labeled 'Test Title' and under the zipcode <strong>80014</strong>. A message 
        will alert you if no jobs match your search.
      </p>
      <Button type="button" onClick={handleClear}>Clear</Button>
    </div>

  );
}

export default LandingPopUp;