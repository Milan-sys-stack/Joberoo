// src/services/api.js
export const fetchJobs = async () => {
    const response = await fetch('http://localhost:5001/jobs');
    return response.json();
};
