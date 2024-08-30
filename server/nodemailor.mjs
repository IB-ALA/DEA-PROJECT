
import nodemailor from 'nodemailer';

export function sendEmail({ senderEmailAddress, senderEmailPassword, recipientEmailAddress, emailSubject, html }) {
  let transporter = nodemailor.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmailAddress,
      pass: senderEmailPassword
    }
  });

  let mailOptions = {
    from: senderEmailAddress,
    to: recipientEmailAddress,
    subject: emailSubject,
    html: html
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error sending email: ', error);
    }

    console.log('Email sent successfully: ', info.response);
    return info.response;
  });
}