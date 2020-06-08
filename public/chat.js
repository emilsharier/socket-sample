$(function() {

    var username = window.prompt("Please enter your name : ", "Annonymous")
    var socket = io.connect('http://localhost:3000')

    var chatroom = $('#chat')
    var message = $('#message')
    var send = $('#send')

    send.click(function() {
        socket.emit('new_message', { username: username, message: message.val() })
        message.val("")
    })

    socket.on('new_message', (data) => {
        console.log(data)
        chatroom.append(`<p> ${data.username} : ${data.message} </p>`)
    })
})