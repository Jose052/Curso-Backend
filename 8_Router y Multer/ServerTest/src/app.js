import express from 'express'
const app = express()
import handlebars from 'express-handlebars'
import routerProducts from './routers/products.router.js'
import __dirname from './utils.js'

let puerto = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use(express.static(__dirname+"/public"))
app.use('/api/products/', routerProducts)


app.listen(puerto, ()=>{
    console.log('servidor escuchando en el puerto: '+puerto)
})