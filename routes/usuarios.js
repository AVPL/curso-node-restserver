const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, esEmailValido, esIdValido } = require('../helpers/db-validators')


const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'El ID no es valido').isMongoId(),
    check('id').custom(esIdValido),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y más de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(esEmailValido),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    check('id', 'El ID no es valido').isMongoId(),
    check('id').custom(esIdValido),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch);


module.exports = router;