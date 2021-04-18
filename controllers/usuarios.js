const { response } = require('express');

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

const usuariosPost = (req, res = response) => {
    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API - Controlador',
        nombre,
        edad
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