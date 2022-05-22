const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const nodemailer = require('nodemailer');

router.post('/send-mail', (req, res) => {
    const {name , email, phone , message} = req.body;
    const contentHtml= `	
    <h1>Contact Form nodemailer</h1>
    <ul>
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
        <li>Phone: ${phone}</li>
    </ul>
    <p>${message}</p>
    `;



    const CLIENT_ID="957524271235-49cbhsv656951lcbriubr4vmcu94n56q.apps.googleusercontent.com"
    const CLIENT_SECRET='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'
    const REDIRECT_URI='https://developers.google.com/oauthplayground'
    const REFRESH_TOKEN='1//04mF5SId-XENqCgYIARAAGAQSNwF-L9Ir8-LeS5qWCdN2cqolaSb0BoaIGo8vrKH9XyrlVZwIXD_losIZttUsrzaaIrWYKbtmA5A'


    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

    oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});


    async function sendMail(){
        try {
            const acessToken= await oAuth2Client.getAccessToken()
            const transporter = nodemailer.createTransport({

                    service: 'gmail',
                    auth: {
                        type: 'OAuth2',
                        user: 'nicolas.beltrao69@gmail.com',
                        clientId: CLIENT_ID,
                        clientSecret: CLIENT_SECRET,
                        refreshToken: REFRESH_TOKEN,
                        accessToken: acessToken,
                    },
            });
            const mailOptions = {
                from: 'Pagina web nodemailer',
                to: `${email}`,
                subject: 'Contacto desde pagina web',
                html: contentHtml,
            };

            const result = await transporter.sendMail(mailOptions)
            return result;
                    
        } catch (error) {
            console.log(error);
        }
    }
    
    sendMail()
    .then(result => res.status(200).send('enviado'))
    .catch((error) => console.log(error.message));
        
    
});



module.exports = router;