import React from 'react';

const JobContext = React.createContext({
    jobs: [],
    userSaves: [],
    handleSave: () => {},
    getUserSaves: () => {},
    getSavedJobs: () => {},
    getAllJobs: () => {},
    getUserResume: () => {},
    openResume: () => {},
    error: null,
    handleError: () => {},
})

export default JobContext;