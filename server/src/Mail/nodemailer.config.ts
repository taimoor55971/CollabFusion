
const  mailConfig={
    host: 'sandbox.smtp.mailtrap.io', 
    port: 587, 
    secure: false, 
    auth: {
      user: process.env.MAILTRAP_USER, 
      pass: process.env.MAILTRAP_PASS, 
    },
  };
  export default mailConfig
  