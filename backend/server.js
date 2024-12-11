const express = require('express');
const fs = require('fs');
const path = require('path');
const port = 5001;
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

const cors = require('cors');

// Enable CORS for all origins
app.use(cors());

// Middleware to serve static files (React app)
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Endpoint to get job listings
app.get('/api/jobs', async (req, res) => {
    try {
        // Fetch data from the website
        const { data } = await axios.get('https://www.careersatcouncil.com.au/jobs/');
        
        // Log the raw HTML to the console for debugging
        console.log(data);

        const $ = cheerio.load(data);
        const jobs = [];

        // Scrape job details
        $('.job-list__details').each((index, element) => {
            const title = $(element).find('.job-list__title').text().trim();
            const council = $(element).find('.job-list__council').text().trim();
            const location = $(element).find('.job-list__location').text().trim();
            const dates = $(element).find('.job-list__dates').text().trim();
            const description = $(element).find('.wpjb-job-content+wpjb-job-content--2627').text().trim();
    // Extract the logo URL
    const logoElement = $(element).find('.wpjb-info__logo-image job-logo');
    const logo = logoElement.attr('src') || ''; // If no logo found, fall back to an empty string

    // Handle relative and absolute URLs for the logo
    const fullLogoUrl = logo && !logo.startsWith('http') 
        ? `https://www.careersatcouncil.com.au${logo}` 
        : logo;

            // Find the job link
            const link = $(element).closest('a').attr('href');

            jobs.push({ title, council, location, dates, link, description, logo:fullLogoUrl });
        });

        // Send JSON response with job data
        res.json({ jobs });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ message: 'Error fetching jobs' });
    }
});

// Endpoint for email subscription
app.post('/api/subscribe', express.json(), (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Job Alert Subscription',
    text: 'You have successfully subscribed to job alerts!'
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(500).json({ message: 'Error sending email' });
    } else {
      res.status(200).json({ message: 'Subscription successful!' });
    }
  });
});


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const nodemailer = require('nodemailer');

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // replace with your email
    pass: 'your-email-password'    // replace with your email password
  }
});


