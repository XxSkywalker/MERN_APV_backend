import nodemailer from 'nodemailer'

const emailOlvidePassword = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const{email, nombre, token} = datos;

    //Enviar email
    const info = await transport.sendMail({
        from: `${process.env.EMAIL_USER}`,
        to: email,
        subject: 'Reestablece tu Password',
        text: 'Reestablece tu Password',
        html: `<p>Hola ${nombre}, has solicitado reestablecer tu password.</p>

            <p>Sigue el siguiente enlace para generar un nuevo password:
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password<a/> </p>

            <p>Si tu no creaste esta cuenta y/o solicitaste este cambio puedes ignorar este mensaje</p>
        `
    });

    console.log('Mensaje enviado: %s', info.messageId);
}

export default emailOlvidePassword