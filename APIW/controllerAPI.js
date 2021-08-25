// Aqui manejamos todas las funciones y distribuir msg
const { soloTelefono, formatearNumero } = require('../helpers/usuarios.helper');

const {
    usuarioInicio,
    //usuariosPut,
} = require('../routes/usuarios.route'); // Importamos funciones de routes creadas



const apiController = async(msg) => {

    // -> USUARIOS INICIO DE TODO, LO MANDO A ROUTES
    await usuarioInicio(msg);


    //console.log(soloTelefono(msg));
    // msg.reply('Bienvenido al sistema Acorporado wallet');
    //console.log(msg.from);
    //console.log(number);
    /* 
        } else if (msg.body == 'SALDO') {
            msg.reply('2.000.000XAF');
        } */
}






module.exports = {
    apiController
}