const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  await transport.sendEmail(mailOptions);
};

module.exports = sendEmail;
