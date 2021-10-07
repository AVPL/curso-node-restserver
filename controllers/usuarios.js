const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = (req, res = response) => {

    const params = req.query;

    res.json({
        msg: 'get API - Controlador',
        params
    });
}

const usuariosPut = (req, res = response) => {
    
    const id = req.params.id;
    
    res.json({
        msg: 'put API - Controlador',
        id
    });
}

const usuariosPost = async (req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // TODO verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});

    if (existeEmail) {
        return res.status(400).json({
            msg: 'Ese correo ya está registrado'
        })
    }

    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        msg: 'post API - Controlador',
        usuario
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controlador'
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}