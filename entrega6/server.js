
const express = require('express')
const http = require ('http')
const { Server } = require ('socket.io')
const Contenedor = require('./contenedor/contenedor')
const ContenedorChat = require('./contenedor/contenedorChat')


const app = express()
const db = new Contenedor('db.json')
const dbChat = new ContenedorChat('dbChat.json')



app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const server = http.createServer(app)
const io = new Server(server)

app.use('/public', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render(__dirname + '/views/form.ejs')
})

app.get('/data', (req, res) => {
    const data = dbChat.getAll()
    res.json({data})
})

app.get('/dataItems', (req, res) => {
    const data = db.getAll()
    res.json({data})
})



app.post('/', (req, res) => {
    db.save(req.body)
})

io.on('connection', socket =>{
    console.log('some wild user showed up')

    socket.on('chat-in', data =>{
        const date = new Date().toLocaleString()
        const dataOut = {
            msj: data.msj,
            username: data.username,
            email: data.email,
            date
        }
        dbChat.save(dataOut)
        console.log(dataOut)
        io.sockets.emit('chat-out', dataOut)
    })
    socket.on('newItem-in', data=>{
        const dataOut ={
            nombre: data.nombre,
            precio: data.precio,
            url: data.url
        }
        db.save(dataOut)
        io.sockets.emit('newItem-out', dataOut)
    })
})

server.listen(8080, ()=>{
    console.log('running')
})
