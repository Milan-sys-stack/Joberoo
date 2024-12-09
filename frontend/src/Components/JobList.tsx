import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';

type Job = {
  title: string;
  description: string;
  link: string;
};

type JobResponse = {
  jobs: Job[];
  totalPages: number;
};

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    // Using fetch to get job listings
    fetch(`http://localhost:5001/api/jobs?page=${currentPage}`)
      .then(response => response.json())
      .then((data: JobResponse) => {
        setJobs(data.jobs);
        setTotalPages(data.totalPages);
      })
      .catch(error => {
        console.error('Error fetching jobs', error);
      });
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>Job Listings</h1>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <a href={job.link} target="_blank" rel="noopener noreferrer">Apply Here</a>
          </li>
        ))}
      </ul>
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default JobList;
