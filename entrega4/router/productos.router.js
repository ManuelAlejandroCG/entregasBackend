const {
    json
} = require('express');
const express = require('express')
const Contenedor = require("../contenedor");

const {
    Router
} = express

const routerProductos = Router()
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({
    extended: true
}))
const contenedor = new Contenedor("./productos.txt")
contenedor.iniciar()

routerProductos.get('/', (req, res) => {
    if (Object.entries(req.query).length > 0) {
        var index = contenedor.productos.findIndex(x => x.id == req.query.id)
        if (index === -1) {
            res.json({
                error: 'producto no encontrado'
            })
        } else {
            const producto = contenedor.productos.find(m => m.id == req.query.id)
            res.json(producto)
        }
    } else {
        res.json(contenedor.productos)
    }
})

routerProductos.post('/', (req, res) => {
    contenedor.guardar(req.body)
    res.json("Se agrego el producto" + JSON.stringify(contenedor.productos[contenedor.productos.length - 1]))
})

routerProductos.put('/', (req, res) => {
    var index = contenedor.productos.findIndex(x => x.id == req.query.id)
    if (index === -1) {
        res.json({
            error: 'Producto no encontrado'
        })
    } else {
        var indexProducto = contenedor.productos.findIndex(x => x.id == req.query.id)
        contenedor.productos[indexProducto] = {
            ...contenedor.productos[indexProducto],
            nombre: req.query.nombre,
            precio: req.query.precio,
            imagen: req.query.imagen
        }
        res.json("Producto actualizado")
    }
})

routerProductos.delete('/', (req, res) => {
    var index = contenedor.productos.findIndex(x => x.id == req.query.id)
    if (index === -1) {
        res.json({
            error: 'Producto no encontrado'
        })
    } else {
        contenedor.borrarId(req.params.id)
        res.json("Se elimino el producto de id " + req.query.id)
    }
})

module.exports = routerProductos