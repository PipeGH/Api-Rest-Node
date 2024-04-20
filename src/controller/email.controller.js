const { Pool } = require('pg');
const nodemailer = require("nodemailer");

//Conexión a la base de datos------------------------------------------------------>

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'gimnasio',
    port: 5432
});

//Definición de los métodos--------------------------------------------------------->

const sendEmailWelcome = async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'reto21.team@gmail.com',
            pass: 'vmezkdfukfnvzuzk'
        }
    });

    const { correo } = req.body;

    var mailOptions = {
        from: 'Reto 21',
        to: correo,
        subject: '¡Bienvenido a la familia!',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>
        
        <body style="background-color: #000000; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="ffff00" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="ffff00" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Bienvenido!</h1> <img src="https://storage.googleapis.com/studio-design-asset-files/projects/7kadNre6O3/s-1279x1280_v-fms_webp_196037a5-07b0-4203-9085-4acc8655bf09.png" width="125" height="120" style="display: block; border: 0px;  border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">El gimnasio Reto 21 te da la bienvenida a nuestras instalaciones. con notros podras lograr tus objetivos</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 10px;" bgcolor="#ffff00"><a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; color: #000000; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #ffee00; display: inline-block; border-radius: 10px;">Inicia Sesion para activar tu cuenta</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"> Para iniciar sessión debes utilizar tu correo: <a style="color: #d8ca02;"> ${correo} </a>.</p>
                                    <p style="margin: 0;"> La contraseña de inicio de sessión es tu <a style="color: #d8ca02;"> documento </a> con el que te registraste. </p>
                                </td>
                            </tr> <!-- COPY -->
                                <tr>
                                    <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"> Este es el ultimo tramo para que seas parte de nuestra familia. <a style="color: #d8ca02;">Estamos aqui para brindarte el mejor servicio</a> </p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Para mas informacion</h2>
                                    <p style="margin: 0;"><a  style="color: #e7d000;">Ubicacion Calle. 9 #4-101 a 4-1, Silvania, Cundinamarca <br>
                                    Call +57 311-821-7361 <br>
                                    reto21.silvania@gmail.com
                                       </a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#0000" align="left" style="padding: 0px 30px 30px 30px; color: #ebebeb; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
        `
    }

    transporter.sendMail(mailOptions, (error,info) => {

        if(error){
            res.status(500).send(error.message);
        }else{
            res.status(200).json('Correo enviado');
        }

    });

}



const sendEmailChangePassword = async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'reto21.team@gmail.com',
            pass: 'vmezkdfukfnvzuzk'
        }
    });

    const { correo } = req.body;

    var mailOptions = {
        from: 'Reto 21',
        to: correo,
        subject: '¡La contraseña se actualizó con éxito!.',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>
        
        <body style="background-color: #000000; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="ffff00" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="ffff00" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Información!</h1> <img src="https://storage.googleapis.com/studio-design-asset-files/projects/7kadNre6O3/s-1279x1280_v-fms_webp_196037a5-07b0-4203-9085-4acc8655bf09.png" width="125" height="120" style="display: block; border: 0px;  border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Te informamos que la contraseña de tú cuenta ha sido actualizada.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
        
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"> Te recomendamos no compartir está información para evitar <a style="color: #d8ca02;"> vulneración en tú cuenta. </a></p>
                                </td>
                            </tr> <!-- COPY -->
        
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Para mas informacion</h2>
                                    <p style="margin: 0;"><a  style="color: #e7d000;">Ubicacion Calle. 9 #4-101 a 4-1, Silvania, Cundinamarca <br>
                                        Call +57 311-821-7361 <br>
                                        reto21.silvania@gmail.com
                                       </a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#0000" align="left" style="padding: 0px 30px 30px 30px; color: #ebebeb; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>`

    }

    transporter.sendMail(mailOptions, (error,info) => {

        if(error){
            res.status(500).send(error.message);
        }else{
            res.status(200).json('Correo enviado');
        }

    });

}





const sendEmailAssingPlanNutrition = async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'reto21.team@gmail.com',
            pass: 'vmezkdfukfnvzuzk'
        }
    });

    const { correo } = req.body;

    var mailOptions = {
        from: 'Reto 21',
        to: correo,
        subject: '¡Se te asigno un plan de alimentación!',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>
        
        <body style="background-color: #000000; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="ffff00" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="ffff00" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Información!</h1> <img src="https://storage.googleapis.com/studio-design-asset-files/projects/7kadNre6O3/s-1279x1280_v-fms_webp_196037a5-07b0-4203-9085-4acc8655bf09.png" width="125" height="120" style="display: block; border: 0px;  border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Tenemos el gusto de informarte que se te asigno un nuevo plan de alimentación, está dispoible para que lo visualices y lo descargues.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 10px;" bgcolor="#ffff00"><a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; color: #000000; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #ffee00; display: inline-block; border-radius: 10px;">Inicia Sesion para ver tú plan</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"> Tú plan de alimentación se asignó a partir de los resultados de tu valoración. <a style="color: #d8ca02;">Si tienes dudas te invitamos a comunicarte con un administrador.</a></p>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"></p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Para mas informacion</h2>
                                    <p style="margin: 0;"><a  style="color: #e7d000;">Ubicacion Calle. 9 #4-101 a 4-1, Silvania, Cundinamarca <br>
                                        Call +57 311-821-7361 <br>
                                        reto21.silvania@gmail.com
                                       </a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#0000" align="left" style="padding: 0px 30px 30px 30px; color: #ebebeb; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
        `
    }

    transporter.sendMail(mailOptions, (error,info) => {

        if(error){
            res.status(500).send(error.message);
        }else{
            res.status(200).json('Correo enviado');
        }

    });

}





const sendEmailRegisteredAssessment = async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'reto21.team@gmail.com',
            pass: 'vmezkdfukfnvzuzk'
        }
    });

    const { correo } = req.body;

    var mailOptions = {
        from: 'Reto 21',
        to: correo,
        subject: 'Se actualizó el registro de las valoraciones.',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>
        
        <body style="background-color: #000000; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="ffff00" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="ffff00" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Información!</h1> <img src="https://storage.googleapis.com/studio-design-asset-files/projects/7kadNre6O3/s-1279x1280_v-fms_webp_196037a5-07b0-4203-9085-4acc8655bf09.png" width="125" height="120" style="display: block; border: 0px;  border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Tenemos el gusto de informarte que se realizó una actualización en tus valoraciones.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 10px;" bgcolor="#ffff00"><a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; color: #000000; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #ffee00; display: inline-block; border-radius: 10px;">Inicia Sesion para ver tus resultados</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"> Los resultados de tu última valoración ya fueron registrados, te invitamos a revisar los resultados. <a style="color: #d8ca02;">En caso de presentar dudas, comuniquese con un administrador o entrenador para recibir más información.</a></p>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"></p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Para mas informacion</h2>
                                    <p style="margin: 0;"><a  style="color: #e7d000;">Ubicacion Calle. 9 #4-101 a 4-1, Silvania, Cundinamarca <br>
                                        Call +57 311-821-7361 <br>
                                        reto21.silvania@gmail.com
                                       </a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#0000" align="left" style="padding: 0px 30px 30px 30px; color: #ebebeb; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
        `
    }

    transporter.sendMail(mailOptions, (error,info) => {

        if(error){
            res.status(500).send(error.message);
        }else{
            res.status(200).json('Correo enviado');
        }

    });

}




const sendEmailUpdateAssessment = async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'reto21.team@gmail.com',
            pass: 'vmezkdfukfnvzuzk'
        }
    });

    const { correo } = req.body;

    var mailOptions = {
        from: 'Reto 21',
        to: correo,
        subject: 'Se actualizó una valoración ya existente',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>
        
        <body style="background-color: #000000; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="ffff00" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="ffff00" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Información!</h1> <img src="https://storage.googleapis.com/studio-design-asset-files/projects/7kadNre6O3/s-1279x1280_v-fms_webp_196037a5-07b0-4203-9085-4acc8655bf09.png" width="125" height="120" style="display: block; border: 0px;  border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Tenemos el gusto de informarte que se realizó la actualización de una de tus valoración.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 10px;" bgcolor="#ffff00"><a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; color: #000000; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #ffee00; display: inline-block; border-radius: 10px;">Inicia Sesion para visualizar los cambios</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"> La información de tus valoraciones se actualizó. <a style="color: #d8ca02;">Te invitamos a comunicarte con un entrenador o administrador para recibir más información.</a></p>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"></p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Para mas informacion</h2>
                                    <p style="margin: 0;"><a  style="color: #e7d000;">Ubicacion Calle. 9 #4-101 a 4-1, Silvania, Cundinamarca <br>
                                        Call +57 311-821-7361 <br>
                                        reto21.silvania@gmail.com
                                       </a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#0000" align="left" style="padding: 0px 30px 30px 30px; color: #ebebeb; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
        `
    }

    transporter.sendMail(mailOptions, (error,info) => {

        if(error){
            res.status(500).send(error.message);
        }else{
            res.status(200).json('Correo enviado');
        }

    });

}







const sendEmailAssingPlanTraining = async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'reto21.team@gmail.com',
            pass: 'vmezkdfukfnvzuzk'
        }
    });

    const { correo } = req.body;

    var mailOptions = {
        from: 'Reto 21',
        to: correo,
        subject: '¡Se te asignó un plan de entrenamiento!',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>
        
        <body style="background-color: #000000; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="ffff00" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="ffff00" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Información!</h1> <img src="https://storage.googleapis.com/studio-design-asset-files/projects/7kadNre6O3/s-1279x1280_v-fms_webp_196037a5-07b0-4203-9085-4acc8655bf09.png" width="125" height="120" style="display: block; border: 0px;  border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Tenemos el gusto de informarte que se asignó un plan de entrenamiento.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 10px;" bgcolor="#ffff00"><a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; color: #000000; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #ffee00; display: inline-block; border-radius: 10px;">Inicia Sesion para visualizar el plan de entrenamiento.</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"> El nuevo plan de entrenamiento se asigno, puedes consultarlo en cualquier momento. <a style="color: #d8ca02;">Te invitamos a comunicarte con un entrenador o administrador para recibir más información.</a></p>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"></p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Para mas informacion</h2>
                                    <p style="margin: 0;"><a  style="color: #e7d000;">Ubicacion Calle. 9 #4-101 a 4-1, Silvania, Cundinamarca <br>
                                        Call +57 311-821-7361 <br>
                                        reto21.silvania@gmail.com
                                       </a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#0000" align="left" style="padding: 0px 30px 30px 30px; color: #ebebeb; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
        `
    }

    transporter.sendMail(mailOptions, (error,info) => {

        if(error){
            res.status(500).send(error.message);
        }else{
            res.status(200).json('Correo enviado');
        }

    });

}







const sendEmailCodeUpdatePassword = async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'reto21.team@gmail.com',
            pass: 'vmezkdfukfnvzuzk'
        }
    });

    const { correo, codigo } = req.body;

    var mailOptions = {
        from: 'Reto 21',
        to: correo,
        subject: 'Código para actualizar la contraseña.',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>
        
        <body style="background-color: #000000; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="ffff00" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="ffff00" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">¡Bienvenido!</h1> <img src="https://storage.googleapis.com/studio-design-asset-files/projects/7kadNre6O3/s-1279x1280_v-fms_webp_196037a5-07b0-4203-9085-4acc8655bf09.png" width="125" height="120" style="display: block; border: 0px;  border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;"/>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">El gimnasio Reto 21 te da la bienvenida a nuestras instalaciones. con notros podras lograr tus objetivos</p>
                                    <strong class="d-flex justify-content-center" style="padding: 12px;">¿Aceptas el reto?</strong>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 3px;" bgcolor="#ffff00"><a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; color: #000000; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #ffee00; display: inline-block;">codigo: ${codigo}</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"> Ingresa el codigo en el apartado solicitado para poder continuar con el proceso. <a style="color: #d8ca02;">Estamos aqui para brindarte el mejor servicio</a></p>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"></p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Para mas informacion</h2>
                                    <p style="margin: 0;"><a  style="color: #e7d000;">Ubicacion Calle. 9 #4-101 a 4-1, Silvania, Cundinamarca <br>
                                        Call +57 311-821-7361 <br>
                                        reto21.silvania@gmail.com
                                       </a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#0000" align="left" style="padding: 0px 30px 30px 30px; color: #ebebeb; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>`
    }

    transporter.sendMail(mailOptions, (error,info) => {

        if(error){
            res.status(500).send(error.message);
        }else{
            res.status(200).json('Correo enviado');
        }

    });

}







const sendEmailActivatedAcount = async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'reto21.team@gmail.com',
            pass: 'vmezkdfukfnvzuzk'
        }
    });

    const { correo } = req.body;

    var mailOptions = {
        from: 'Reto 21',
        to: correo,
        subject: '¡Cuenta Activada con Éxito',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>
        
        <body style="background-color: #000000; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="ffff00" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="ffff00" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Bienvenido!</h1> <img src="https://storage.googleapis.com/studio-design-asset-files/projects/7kadNre6O3/s-1279x1280_v-fms_webp_196037a5-07b0-4203-9085-4acc8655bf09.png" width="125" height="120" style="display: block; border: 0px;  border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"> ¡Haz activado tu cuenta satisfactoriamente!. Ya puedes acceder a y disfrutar de los beneficios que tenemos para ti.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 10px;" bgcolor="#ffff00"><a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; color: #000000; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #ffee00; display: inline-block; border-radius: 10px;">Inicia Sesion para activar tu cuenta</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"> Te invitamos a iniciar sessión y disfrutar de nuestros servicios.</p>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"></p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Para mas informacion</h2>
                                    <p style="margin: 0;"><a  style="color: #e7d000;">Ubicacion Calle. 9 #4-101 a 4-1, Silvania, Cundinamarca <br>
                                    Call +57 311-821-7361 <br>
                                    reto21.silvania@gmail.com
                                       </a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#0000" align="left" style="padding: 0px 30px 30px 30px; color: #ebebeb; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>`
    }

    transporter.sendMail(mailOptions, (error,info) => {

        if(error){
            res.status(500).send(error.message);
        }else{
            res.status(200).json('Correo enviado');
        }

    });

}










const sendEmailAssingQuote = async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'reto21.team@gmail.com',
            pass: 'vmezkdfukfnvzuzk'
        }
    });

    const { correo,id_reservacion,hora,fecha } = req.body;
    const id_hora = hora;
    const response = await pool.query('select horas from reservacion_hora where id_hora = $1',[id_hora]);
    const horas = response.horas;

    var mailOptions = {
        from: 'Reto 21',
        to: correo,
        subject: '¡Cita de Valoración Agendada!',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>
        
        <body style="background-color: #000000; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="ffff00" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="ffff00" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Información!</h1> <img src="https://storage.googleapis.com/studio-design-asset-files/projects/7kadNre6O3/s-1279x1280_v-fms_webp_196037a5-07b0-4203-9085-4acc8655bf09.png" width="125" height="120" style="display: block; border: 0px;  border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">¡Tú cita de valoración se agendó con éxito! Es para nosotros un placer informarte que se te asignó una cita de valoración.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
        
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"> Tú cita de valoración quedo agendada el día  <a style="color: #d8ca02;"> ${fecha} </a> a la hora <a style="color: #d8ca02;"> ${horas}. </a> Le invitamos a comunicarse con un administrador o entrenador para recibir más información.  </p>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">En caso de no poder presentarse le recomendamos comunicarse con el personal encargado para evitar incovenientes futuros.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Para mas informacion</h2>
                                    <p style="margin: 0;"><a  style="color: #e7d000;">Ubicacion Calle. 9 #4-101 a 4-1, Silvania, Cundinamarca <br>
                                        Call +57 311-821-7361 <br>
                                        reto21.silvania@gmail.com
                                       </a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#0000" align="left" style="padding: 0px 30px 30px 30px; color: #ebebeb; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
        `
    }

    transporter.sendMail(mailOptions, (error,info) => {

        if(error){
            res.status(500).send(error.message);
        }else{
            res.status(200).json('Correo enviado');
        }

    });

}








const sendEmailUpdateQuote = async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'reto21.team@gmail.com',
            pass: 'vmezkdfukfnvzuzk'
        }
    });

    const { correo,id_reservacion,hora,fecha } = req.body;

    const id_hora = hora;
    const response = await pool.query('select horas from reservacion_hora where id_hora = $1',[id_hora]);
    const horas = response.horas;

    var mailOptions = {
        from: 'Reto 21',
        to: correo,
        subject: '¡Actualización en su cita de valoración!',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>
        
        <body style="background-color: #000000; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="ffff00" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="ffff00" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Información!</h1> <img src="https://storage.googleapis.com/studio-design-asset-files/projects/7kadNre6O3/s-1279x1280_v-fms_webp_196037a5-07b0-4203-9085-4acc8655bf09.png" width="125" height="120" style="display: block; border: 0px;  border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Tenemos el placer de informarte que tú cita de valoración fue actualizada.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
        
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"> Tú cita de valoración quedo agendada el día  <a style="color: #d8ca02;"> ${fecha.substring(0,10)} </a> a la hora <a style="color: #d8ca02;"> ${horas.substring(0,5)}. </a> Le invitamos a comunicarse con un administrador o entrenador para recibir más información.  </p>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">En caso de no poder presentarse le recomendamos comunicarse con el personal encargado para evitar incovenientes futuros.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Para mas informacion</h2>
                                    <p style="margin: 0;"><a  style="color: #e7d000;">Ubicacion Calle. 9 #4-101 a 4-1, Silvania, Cundinamarca <br>
                                        Call +57 311-821-7361 <br>
                                        reto21.silvania@gmail.com
                                       </a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#0000" align="left" style="padding: 0px 30px 30px 30px; color: #ebebeb; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
        `
    }

    transporter.sendMail(mailOptions, (error,info) => {

        if(error){
            res.status(500).send(error.message);
        }else{
            res.status(200).json('Correo enviado');
        }

    });

}








const sendEmailUpdatePlans = async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'reto21.team@gmail.com',
            pass: 'vmezkdfukfnvzuzk'
        }
    });

    const { correo } = req.body;

    var mailOptions = {
        from: 'Reto 21',
        to: correo,
        subject: 'Se actualizó su plan contratado.',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>
        
        <body style="background-color: #000000; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="ffff00" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="ffff00" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Información!</h1> <img src="https://storage.googleapis.com/studio-design-asset-files/projects/7kadNre6O3/s-1279x1280_v-fms_webp_196037a5-07b0-4203-9085-4acc8655bf09.png" width="125" height="120" style="display: block; border: 0px;  border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">¡Tú plan contratado se actualizó con éxito! Tenemos el gusto de informate la actualización de tu plan contratado.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 10px;" bgcolor="#ffff00"><a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; color: #000000; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #ffee00; display: inline-block; border-radius: 10px;">Inicia Sesion para visualizar la actualización</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"> La actualización de tu plan contratado se realizó con éxito. <a style="color: #d8ca02;">En caso de presentar alguna duda, comuniquese con un administrador para recbir más información.</a></p>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"></p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Para mas informacion</h2>
                                    <p style="margin: 0;"><a  style="color: #e7d000;">Ubicacion Calle. 9 #4-101 a 4-1, Silvania, Cundinamarca <br>
                                        Call +57 311-821-7361 <br>
                                        reto21.silvania@gmail.com
                                       </a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#0000" align="left" style="padding: 0px 30px 30px 30px; color: #ebebeb; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
        `
    }

    transporter.sendMail(mailOptions, (error,info) => {

        if(error){
            res.status(500).send(error.message);
        }else{
            res.status(200).json('Correo enviado');
        }

    });

}







const sendEmailUpdateTypeAssessment = async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'reto21.team@gmail.com',
            pass: 'vmezkdfukfnvzuzk'
        }
    });

    const { correo } = req.body;

    var mailOptions = {
        from: 'Reto 21',
        to: correo,
        subject: '¡Se actualizó tu tipo de valoración!',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>
        
        <body style="background-color: #000000; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="ffff00" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="ffff00" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Información!</h1> <img src="https://storage.googleapis.com/studio-design-asset-files/projects/7kadNre6O3/s-1279x1280_v-fms_webp_196037a5-07b0-4203-9085-4acc8655bf09.png" width="125" height="120" style="display: block; border: 0px;  border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">¡Tú tipo de valoración se actualizó con éxito!. Tenemos el gusto de informarte que tú tipo de valoración se actualizó con éxito.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 10px;" bgcolor="#ffff00"><a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; color: #000000; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #ffee00; display: inline-block; border-radius: 10px;">Inicia Sesion para revisar la actualización de la información.</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"> Tú tipo de valoración se actualizó con éxito. <a style="color: #d8ca02;">Te invitamos a comunicarte con un administrador para recibir más información.</a></p>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"></p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Para mas informacion</h2>
                                    <p style="margin: 0;"><a  style="color: #e7d000;">Ubicacion Calle. 9 #4-101 a 4-1, Silvania, Cundinamarca <br>
                                        Call +57 311-821-7361 <br>
                                        reto21.silvania@gmail.com
                                       </a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#0000" align="left" style="padding: 0px 30px 30px 30px; color: #ebebeb; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
        `
    }

    transporter.sendMail(mailOptions, (error,info) => {

        if(error){
            res.status(500).send(error.message);
        }else{
            res.status(200).json('Correo enviado');
        }

    });

}







const sendEmailUpdateInfoUser = async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'reto21.team@gmail.com',
            pass: 'vmezkdfukfnvzuzk'
        }
    });

    const { correo } = req.body;

    var mailOptions = {
        from: 'Reto 21',
        to: correo,
        subject: 'Se actualizó la información de su perfil de usuario.',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>
        
        <body style="background-color: #000000; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="ffff00" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="ffff00" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Información!</h1> <img src="https://storage.googleapis.com/studio-design-asset-files/projects/7kadNre6O3/s-1279x1280_v-fms_webp_196037a5-07b0-4203-9085-4acc8655bf09.png" width="125" height="120" style="display: block; border: 0px;  border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">¡La información de tú cuenta se actualizó con éxito!</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 10px;" bgcolor="#ffff00"><a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; color: #000000; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #ffee00; display: inline-block; border-radius: 10px;">Inicia Sesion para verificar la actualización de información.</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"> La información de tú cuenta se actualizó con éxito. <a style="color: #d8ca02;">Te recomendamos comunicarte con un administrador para recibir más información.</a></p>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"></p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Para mas informacion</h2>
                                    <p style="margin: 0;"><a  style="color: #e7d000;">Ubicacion Calle. 9 #4-101 a 4-1, Silvania, Cundinamarca <br>
                                        Call +57 311-821-7361 <br>
                                        reto21.silvania@gmail.com
                                       </a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#0000" align="left" style="padding: 0px 30px 30px 30px; color: #ebebeb; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
        `
    }

    transporter.sendMail(mailOptions, (error,info) => {

        if(error){
            res.status(500).send(error.message);
        }else{
            res.status(200).json('Correo enviado');
        }

    });

}







const sendEmailUpdateTimePago= async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'reto21.team@gmail.com',
            pass: 'vmezkdfukfnvzuzk'
        }
    });

    const { correo } = req.body;
    const response = await pool.query('SELECT titulo_suscripcion, fecha_de_inicio, fecha_de_fin FROM usuarios, suscripcion, pago where id_suscripcion_pago=id_suscripcion and documento_usuarios_pago=documento and correo= $1',[correo]);
    const titulo_suscripcion = response.titulo_suscripcion;
    const fecha_de_inicio = response.fecha_de_inicio;
    const fecha_de_fin = response.fecha_de_fin;


    var mailOptions = {
        from: 'Reto 21',
        to: correo,
        subject: 'Se realizó el pago de la suscripción.',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>
        
        <body style="background-color: #000000; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="ffff00" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="ffff00" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Información!</h1> <img src="https://storage.googleapis.com/studio-design-asset-files/projects/7kadNre6O3/s-1279x1280_v-fms_webp_196037a5-07b0-4203-9085-4acc8655bf09.png" width="125" height="120" style="display: block; border: 0px;  border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">¡Se actualizó tú suscripcion!, Es para nosotros un placer informarte que registramos tu pago y actualizamos tu periodo de asistencia.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 10px;" bgcolor="#ffff00"><a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; color: #000000; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #ffee00; display: inline-block; border-radius: 10px;">Inicia Sesion para verificar la información</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Tú pago se registró con éxito, tienes el plan <a style="color: #d8ca02;">${titulo_suscripcion} y tu periodo de suscripción inicia en ${fecha_de_inicio} y termina en ${fecha_de_fin}.</a></p>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">¡Gracias por preferirnos!, Esperamos verte cumplir tus objetivos.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Para mas informacion</h2>
                                    <p style="margin: 0;"><a  style="color: #e7d000;">Ubicacion Calle. 9 #4-101 a 4-1, Silvania, Cundinamarca <br>
                                        Call +57 311-821-7361 <br>
                                        reto21.silvania@gmail.com
                                       </a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#0000" align="left" style="padding: 0px 30px 30px 30px; color: #ebebeb; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
        `
    }

    transporter.sendMail(mailOptions, (error,info) => {

        if(error){
            res.status(500).send(error.message);
        }else{
            res.status(200).json('Correo enviado');
        }

    });

}










const sendEmailUpdateStateActived = async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'reto21.team@gmail.com',
            pass: 'vmezkdfukfnvzuzk'
        }
    });

    const { correo } = req.body;

    var mailOptions = {
        from: 'Reto 21',
        to: correo,
        subject: '¡Activamos tú cuenta!',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>
        
        <body style="background-color: #000000; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="ffff00" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="ffff00" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Información!</h1> <img src="https://storage.googleapis.com/studio-design-asset-files/projects/7kadNre6O3/s-1279x1280_v-fms_webp_196037a5-07b0-4203-9085-4acc8655bf09.png" width="125" height="120" style="display: block; border: 0px;  border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Para nosotros es un placer informarte que hemos activado tú cuenta, ya tienes acceso a la misma. En caso de recordar los datos en las instalaciones se le pueden actualizar los datos de acceso.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 10px;" bgcolor="#ffff00"><a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; color: #000000; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #ffee00; display: inline-block; border-radius: 10px;">Inicia Sesion para verificar la información</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">En caso de requerir información adicional, te recomendamos comunicarte con un administrador. <a style="color: #d8ca02;"></a></p>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"></p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Para mas informacion</h2>
                                    <p style="margin: 0;"><a  style="color: #e7d000;">Ubicacion Calle. 9 #4-101 a 4-1, Silvania, Cundinamarca <br>
                                        Call +57 311-821-7361 <br>
                                        reto21.silvania@gmail.com
                                       </a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#0000" align="left" style="padding: 0px 30px 30px 30px; color: #ebebeb; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
        `
    }

    transporter.sendMail(mailOptions, (error,info) => {

        if(error){
            res.status(500).send(error.message);
        }else{
            res.status(200).json('Correo enviado');
        }

    });

}






const sendEmailUpdateStateBlocked = async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'reto21.team@gmail.com',
            pass: 'vmezkdfukfnvzuzk'
        }
    });

    const { correo } = req.body;

    var mailOptions = {
        from: 'Reto 21',
        to: correo,
        subject: 'Tú cuenta ha sido bloqueada.',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>
        
        <body style="background-color: #000000; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="ffff00" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="ffff00" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Información!</h1> <img src="https://storage.googleapis.com/studio-design-asset-files/projects/7kadNre6O3/s-1279x1280_v-fms_webp_196037a5-07b0-4203-9085-4acc8655bf09.png" width="125" height="120" style="display: block; border: 0px;  border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Desafortunadamente es necesario que te informemos que tú cuenta ha sido bloqueada.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
        
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">En caso de que se quiera activar la cuenta <a style="color: #d8ca02;">es necesario que se comunique con el personal encargado en las instalaciones.</a></p>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Para recibir más información comuniquese con un administrador.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Para mas informacion</h2>
                                    <p style="margin: 0;"><a  style="color: #e7d000;">Ubicacion Calle. 9 #4-101 a 4-1, Silvania, Cundinamarca <br>
                                        Call +57 311-821-7361 <br>
                                        reto21.silvania@gmail.com
                                       </a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#0000" align="left" style="padding: 0px 30px 30px 30px; color: #ebebeb; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
        `
    }

    transporter.sendMail(mailOptions, (error,info) => {

        if(error){
            res.status(500).send(error.message);
        }else{
            res.status(200).json('Correo enviado');
        }

    });

}











const sendEmailResetPassword= async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'reto21.team@gmail.com',
            pass: 'vmezkdfukfnvzuzk'
        }
    });

    const { correo } = req.body;

    var mailOptions = {
        from: 'Reto 21',
        to: correo,
        subject: '¡Su contraseña se actualizó con éxito!',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>
        
        <body style="background-color: #000000; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="ffff00" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="ffff00" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Información!</h1> <img src="https://storage.googleapis.com/studio-design-asset-files/projects/7kadNre6O3/s-1279x1280_v-fms_webp_196037a5-07b0-4203-9085-4acc8655bf09.png" width="125" height="120" style="display: block; border: 0px;  border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">¡Actualizaste tú contraseña con éxito! Te informamos el proceso exitoso que realizaste.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 10px;" bgcolor="#ffff00"><a style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; color: #000000; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #ffee00; display: inline-block; border-radius: 10px;">Inicia Sesion para verificar la información</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">En caso de ser necesaria más información, <a style="color: #d8ca02;">Comuniquese con un administrador</a></p>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"></p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Para mas informacion</h2>
                                    <p style="margin: 0;"><a  style="color: #e7d000;">Ubicacion Calle. 9 #4-101 a 4-1, Silvania, Cundinamarca <br>
                                        Call +57 311-821-7361 <br>
                                        reto21.silvania@gmail.com
                                       </a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#0000" align="left" style="padding: 0px 30px 30px 30px; color: #ebebeb; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">Este Correo es netamente informativo, por favor<a style="color: #ff0505; font-weight: 700;"> no responder</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
        `
    }

    transporter.sendMail(mailOptions, (error,info) => {

        if(error){
            res.status(500).send(error.message);
        }else{
            res.status(200).json('Correo enviado');
        }

    });

}




















const sendEmailContact= async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'reto21.team@gmail.com',
            pass: 'vmezkdfukfnvzuzk'
        }
    });

    const { nombre, email, numero_telefono, mensaje } = req.body;

    var mailOptions = {
        from: 'Reto 21',
        to: 'reto21.silvania@gmail.com',
        subject: 'Solicitud de contacto.',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>
        
        <body style="background-color: #000000; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="ffff00" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="ffff00" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Solicitud de Contacto</h1><img src="https://storage.googleapis.com/studio-design-asset-files/projects/7kadNre6O3/s-1279x1280_v-fms_webp_196037a5-07b0-4203-9085-4acc8655bf09.png" width="125" height="120" style="display: block; border: 0px;  border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Nombres:</p>
                                    <strong class="d-flex justify-content-center" style="padding: 12px;">${nombre}</strong>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Email:</p>
                                    <strong class="d-flex justify-content-center" style="padding: 12px;">${email}</strong>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Numero de Celular:</p>
                                    <strong class="d-flex justify-content-center" style="padding: 12px;">${numero_telefono}</strong>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">${mensaje}</p>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
        
            </table>
        </body>
        
        </html>`
    }

    transporter.sendMail(mailOptions, (error,info) => {

        if(error){
            res.status(500).send(error.message);
        }else{
            res.status(200).json('Correo enviado');
        }

    });

}





const sendEmailBuzon = async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'reto21.team@gmail.com',
            pass: 'vmezkdfukfnvzuzk'
        }
    });

    const { buzon } = req.body;

    var mailOptions = {
        from: 'Reto 21',
        to: 'reto21.silvania@gmail.com',
        subject: 'Buzón de sugerencia',
        html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>
        
        <body style="background-color: #000000; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
            </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="ffff00" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="ffff00" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Sugerencia</h1><img src="https://storage.googleapis.com/studio-design-asset-files/projects/7kadNre6O3/s-1279x1280_v-fms_webp_196037a5-07b0-4203-9085-4acc8655bf09.png" width="125" height="120" style="display: block; border: 0px;  border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#0000" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Mensaje:</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">${buzon}</p>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="transparent" align="center" style="padding: 30px 10px 0px 10px; background: transparent;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="transparent" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: transparent; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: transparent; margin: 0;">Para mas informacion</h2>
                                    <p style="margin: 0;"><a  style="color:transparent;">Ubicacion Calle. 9 #4-101 a 4-1, Silvania, Cundinamarca <br>
                                        Call +54 212-62-84773 <br>
                                        contacto@bibliotecadante.com
                                       </a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
        
            </table>
        </body>
        
        </html>`
    }

    transporter.sendMail(mailOptions, (error,info) => {

        if(error){
            res.status(500).send(error.message);
        }else{
            res.status(200).json('Correo enviado');
        }

    });

}

//Exportar los métodos-------------------------------------------------------------->

module.exports = {

    sendEmailWelcome,
    sendEmailChangePassword,
    sendEmailAssingPlanNutrition,
    sendEmailRegisteredAssessment,
    sendEmailUpdateAssessment,
    sendEmailAssingPlanTraining,
    sendEmailCodeUpdatePassword,
    sendEmailActivatedAcount,
    sendEmailAssingQuote,
    sendEmailUpdateQuote,
    sendEmailUpdatePlans,
    sendEmailUpdateTypeAssessment,
    sendEmailUpdateInfoUser,
    sendEmailUpdateTimePago,
    sendEmailUpdateStateActived,
    sendEmailUpdateStateBlocked,
    sendEmailResetPassword,










    sendEmailContact,
    sendEmailBuzon

}