const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const { client } = require('../sockets.wapi/cont.socket.wapi');
//const Usuario = require('../models/usuarios.model');
//console.log(client);
// inicio 
const usuarioInicioController = async(msg) => {

        /*         if (msg.body == 'Hola') {
                    msg.reply('Tes tst');
                } */


        await client.sendMessage(msg.from, `*ACORPORADO WALLET*
                *Saludos,*
                Tus envíos, compras ganancias y billetera
                “_Tu ganas y yo gano_”

                *Envía:*
                *R* - > Registrarse
                *S* - > Si ya está registrado`);

    } // msginicio.reply(




const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}






module.exports = {
    usuarioInicioController,
    //socketControllerUsuario
    //usuariosPost,
}