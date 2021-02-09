import React from 'react';

const JobContext = React.createContext({
    jobs: [],
    userSaves: [],
    handleSave: () => {},
})

export default JobContext;