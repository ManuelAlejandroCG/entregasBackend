const express = require('express')
const routerProductos = require('./router/productos.router');


const app = express()
const PORT = process.env.PORT || 8080
app.use(express.urlencoded({extended:true}))


app.get('/api', (req,res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.use('/api/productos', routerProductos)


app.listen(PORT)