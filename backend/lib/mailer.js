// later




const nodeMailer = require('nodemailer');

// https://jay315.medium.com/sending-email-using-express-js-with-nodemailer-in-heroku-71741f29463c

router.post('/send-email', (req, res) => {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        // should be replaced with real sender's account
        user: 'hello@gmail.com',
        pass: 'test'
    }
  });

  let mailOptions = {
    // should be replaced with real recipient's account
    to: 'info@gmail.com',
    subject: req.body.subject,
    text: req.body.message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
  res.writeHead(301, { Location: 'index.html' });
  res.end();
});

module.exports = router;
