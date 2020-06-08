const express = require('express')
const path = require('path')

const app = express()

var server = app.listen(3000, () => {
    console.log('Server up and running on 3000')
})

app.set('view engine', 'ejs')

// app.use('/public', express.static(path.join(__dirname, "public")))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

const io = require('socket.io').listen(server)

io.on('connection', (socket) => {
    console.log(`New user connected : ${socket.client.id}`)

    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', { message: data.message, username: data.username })
    })
})