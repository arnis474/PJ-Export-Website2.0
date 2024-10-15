require('dotenv').config();

const express = require('express');
const path = require('path');
const sgMail = require('@sendgrid/mail'); // Import SendGrid Mail
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to serve static files (CSS, images, etc.) from the root directory
app.use(express.static(__dirname));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Route to serve the index.html page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Set your SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Make sure to set this environment variable

// Route to handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  // Email options
  const msg = {
    to: 'info@pjexport.co.uk', // Replace with the recipient's email
    from: email,  // This should be a verified sender in your SendGrid account
    subject: `New Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `<strong>Name: ${name}</strong><br><strong>Email:</strong> ${email}<br><strong>Message:</strong><br>${message}`,
  };

  // Send the email
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
      res.status(200).send('Message sent successfully!');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('There was an error sending the email.');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
