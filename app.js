const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'static')));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Route to serve the index.html page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to serve home.html page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

// Route for serving pages from folders like aboutus, contact, etc.
app.get('/:folderName', (req, res) => {
  const folderName = req.params.folderName;
  res.sendFile(path.join(__dirname, folderName, 'index.html'));
});

// Route to handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  // Set up nodemailer to send email
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'customermail532@gmail.com', // Replace with your email
      pass: 'epzg xifa nwqs opuu',    // Replace with your app-specific password
    },
  });

  // Email options
  let mailOptions = {
    from: email,  
    to: 'info@pjexport.co.uk',  // Replace with the recipient's email
    subject: `New Message from ${name}`,  
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,  
  };

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error while sending email:', error);  // Log the error
    res.status(500).send('There was an error sending the email.');
  } else {
    console.log('Email sent successfully: ', info);  // Log the response info
    res.status(200).send('Message sent successfully!');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
