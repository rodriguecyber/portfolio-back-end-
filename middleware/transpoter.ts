import nodemailer from 'nodemailer'
const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d3894eebe2be21",
      pass: "e3833625c046f6"
    }
  });
  export default transport