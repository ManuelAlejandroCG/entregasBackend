
const express = require('express')
const Contenedor = require('./contenedor/contenedor')


const app = express()
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const db = new Contenedor('db.json')

app.get('/', (req, res) => res.sendFile(__dirname + '/views/form.html'))

app.get('/products', (req, res) => {
    db.getData()
        .then( data => res.render('products', { data } ))
        .catch(e => {
            console.log(e);
            res.send('Error to load data')
        })
})



app.post('/products', (req, res) => {
    db.save(req.body)
        .then(() => res.redirect('/'))
        .catch(e => {
            console.log(e);
            res.send('Error to save')
        })
})



app.listen(8080)