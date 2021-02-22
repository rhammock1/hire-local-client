import React from 'react';

const JobContext = React.createContext({
    jobs: [],
    userSaves: [],
    handleSave: () => {},
    getUserSaves: () => {},
    getSavedJobs: () => {},
    getAppliedJobs: () => {},
    getAllJobs: () => {},
    getUserResume: () => {},
    openResume: () => {},
    error: null,
    handleError: () => {},
})

export default JobContext;