require('dotenv').config();
const nodemailer = require('nodemailer');


const sendMail = (to, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.rambler.ru', // адрес smt servera для отправки email(mail.ru smtp)
    port: 465, // port smtp (mail.ru)
    secure: true, // true for 465 , false for other ports!!!
    auth: {
      user: 'boonany@rambler.ru',
      pass: '199620LIko',
    }
  });

  const options = {
    from: 'boonany@rambler.ru',
    to,
    subject,
    text: message,
  };

  transporter.sendMail(options, (error, info) => {
    if (error) console.log(error)
    else console.log(info)
  })

};

module.exports = { sendMail };


// const transporter = nodemailer.createTransport({
//   host: 'smtp.inbox.ru',
//   port: 465,
//   secure: true,
//   auth: {
//     user: user, // от него
//     pass: passstart, //
//   },
//   logger: true,
//   transactionLog: true, // include SMTP traffic in the logs
//   allowInternalNetworkInterfaces: false
// });
// function mailer(message) {
//   transporter.sendMail(message, (err, info) => {
//     if (err) return console.log(err);
//     console.log('письмо ушло', info);
//   });
// };