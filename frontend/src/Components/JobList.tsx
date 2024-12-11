import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import  Logo  from '../assets/joobberoologo.png';

type Job = {
  title: string;
  description: string;
  link: string;
  council: string;
  location: string;
  dates: number[];
  logo: string;
  fullLogoUrl: any;

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
        console.log(data); // Log the full response to inspect the data
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
    <>
    {/* Logo Section */}
    <div className="flex justify-center mt-10">

</div>
    {/* Job Listings */}
    <div className="mt-10">
    <div className="flex flex-col items-center">
    <img
      src={Logo}
      alt="Joberoo"
       className=''  /> {/* Directly set size */}
    <h1 className="text-2xl font-bold text-red-600 mt-4">Available Jobs</h1>
  </div>
    <ul>
  {jobs.map((job, index) => (
    <li key={index}>
      <div className="m-5">
        <div className="group mx-2 mt-10 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8  shadow transition hover:shadow-lg sm:mx-auto">
          <a href={job.link} target="_blank" rel="noopener noreferrer" className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4">
            <div className="group relative h-16 w-16 overflow-hidden rounded-lg">
             <img src={job.logo} alt={`${job.council} logo`} className="h-full w-full object-cover text-gray-700" />
             
            </div>
          </a>
          <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
            <h3 className="text-sm text-gray-600">{job.council}</h3>
            <a href={job.link} target="_blank" rel="noopener noreferrer" className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl">
              {job.title}
            </a>
            <p className="overflow-hidden pr-7 text-sm">{job.location}</p> {/* Display location instead of description */}
            <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
              <div className="">Dates: <span className="ml-2 mr-3">{job.dates || 'Not specified'}</span></div>
            </div>
          </div>
        </div>
      </div>
    </li>
  ))}
</ul>
    </div>

    {/* Pagination */}
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  </>


  );
};

export default JobList;
