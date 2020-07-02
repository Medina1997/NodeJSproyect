const nodemailer = require('nodemailer');
module.exports = (formulario) => {
 var transporter = nodemailer.createTransport({
 service: 'gmail',
 port: 587,
 secure: false,
 requireTLS: true,
 auth: {
 user: 'sitiowebfhgym@gmail.com', // Cambialo por tu email
 pass: 'rrtvuhmhjdldfnvo' // Cambialo por tu password
 }
 });
const mailOptions = {
 from: `<${formulario.email}>`,
 to: 'sitiowebfhgym@gmail.com', // Cambia esta parte por el destinatario
 subject: `${formulario.asunto}`,
 html: `
 <strong>Nombre:</strong> ${formulario.name} <br/>
 <strong>Apellido:</strong> ${formulario.lastname} <br/>
 <strong>E-mail:</strong> ${formulario.email} <br/>
 <strong>Mensaje:</strong> ${formulario.message}
 `
 };
transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err);
 else
 console.log(info);
 });
}