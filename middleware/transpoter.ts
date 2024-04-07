import nodemailer from 'nodemailer'
const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "44c6a3d194108b",
      pass: "e1da894e99b912"
    }
  });
  export default transport