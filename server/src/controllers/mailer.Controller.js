
// setup nodemailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.USER_MAIL,
            clientId: process.env.YOUR_CLIENT_ID,
            clientSecret: process.env.YOUR_CLIENT_SECRET,
            accessToken: process.env.ACCESS_TOKEN,
            expires: 1484314697598,
            refreshToken: process.env.REFRESH_TOKEN,
            accessUrl: process.env.ACCESS_URL
        }
    },
    {
        from: 'Medical AG <d.kovalenko174@gmail.com>'
    }
)

transporter.verify((error, success) => {
    if (error) return console.log(error)
    console.log('Server is ready to take our message', success)
    transporter.on("token", (token) => {
        console.log("A new access token was generated");
        console.log("User: %s", token.user);
        console.log("Access Token: %s", token.accessToken);
        console.log("Expires: %s", new Date(token.expires));
    });
})

exports.mailer = (getter, subject, text) => {
    transporter.sendMail({
        to: getter,
        subject: subject,
        text: text
    })
}
