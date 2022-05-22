let {createTransport} = require('nodemailer');
let host = 'smtp.ethereal.email'
let user = 'russ.conroy71@ethereal.email'
let pass = 's31811aZ7227cxUdTd'
let transport = createTransport({
    host,
    port: 587,

    auth: {
        user,
        pass
    }
});


let subject = 'mi titulo con nodeamiler'
let html = `<h1>Hola todo bien?</h1>`


(async () => {
    try {
        let params = {
            from: 'Russ Conroy',
            to: user,
            subject,
            html
        };
        const response = await transport.sendMail(params);
        console.log("response --->",response);
    } catch (error) {
        console.log(error);
    }

})();
    