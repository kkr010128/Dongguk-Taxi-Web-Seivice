const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');

    // 클라이언트에서 메시지를 받았을 때
    socket.on('message', (data) => {
        // 받은 메시지를 모든 클라이언트에게 전파
        io.emit('message', data);
    });

    // 연결이 끊어졌을 때
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
