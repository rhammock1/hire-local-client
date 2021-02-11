import React from 'react';

const JobContext = React.createContext({
    jobs: [],
    userSaves: [],
    handleSave: () => {},
    getUserSaves: () => {},
    getSavedJobs: () => {},
})

export default JobContext;