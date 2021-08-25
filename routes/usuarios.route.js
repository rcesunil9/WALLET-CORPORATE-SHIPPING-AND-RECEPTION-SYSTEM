const { Router } = require('express');
const { check } = require('express-validator');

/* const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares'); */


//const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');



const { Client } = require('whatsapp-web.js');
const client = new Client();
const usuarioInicio = async(msg) => {
    //console.log(msg.body);

    if (msg.body == 'hl' || 'Hola' || 'HOLA' || 'Hla' || 'Hl') {
        //await usuarioInicioController(msg);
        client.sendMessage(msg.from, `*ACORPORADO WALLET*
        *Saludos,*
        Tus envíos, compras ganancias y billetera
        “_Tu ganas y yo gano_”

        *Envía:*
        *R* - > Registrarse
        *S* - > Si ya está registrado`);

        //} // msginicio.reply(
        //console.log(msg.id._serialized);
        //console.log(await soloTelefono(msg)); // Obtener solo numero
    }
}

/* const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut); */

/* router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

 */



module.exports = {
    //router
    usuarioInicio

};