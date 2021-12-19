const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query

    const [ usuarios, total ] = await Promise.all([
        Usuario.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limite)),
        Usuario.countDocuments({ estado: true })
    ])

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params
    const { _id, password, google, ...resto } = req.body

    if (password) {
        const salt = bcryptjs.genSaltSync(10)
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)
    
    res.json({
        msg: 'put API - Controlador',
        usuario
    });
}

const usuariosPost = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    const salt = bcryptjs.genSaltSync(10)
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params

    // const usuario = await Usuario.findByIdAndDelete(id)
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
    
    res.json({
        usuario
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