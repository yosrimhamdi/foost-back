const app = require('express')();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
  const { email, userName } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    secureConnection: false,
    port: 587,
    tls: {
      ciphers: 'SSLv3',
    },
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Yosri MHAMDI Assessment 👻" ${process.env.EMAIL_USERNAME}`,
    to: email,
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: `<b>Hello ${userName}</b>`,
  });

  res.send('email sent');
});

app.listen(process.env.PORT, () => console.log('listening'));
