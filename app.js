require('dotenv').config();
const express = require('express');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
const device = require('express-device');  // Import express-device

const app = express();
const port = 3000;

// Middleware to serve static files (CSS, images, etc.) from the root directory
app.use(express.static(__dirname));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to detect device
app.use(device.capture());

// Route to serve the correct homepage based on device type
app.get('/', (req, res) => {
  if (req.device.type === 'phone' || req.device.type === 'tablet') {
    // Serve the mobile version of the homepage
    res.sendFile(path.join(__dirname, 'mobile.html'));
  } else {
    // Serve the desktop version of the homepage
    res.sendFile(path.join(__dirname, 'home.html'));
  }
});

// Set your SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Route to handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  // Email options
  const msg = {
    to: 'info@pjexport.co.uk',
    from: email,
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
      console.error('Error sending email:', error.response.body);
      res.status(500).send('There was an error sending the email.');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
