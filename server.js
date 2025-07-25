const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http); // ✅ ถูกต้อง

let bellList = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.emit('bellList', bellList);

  socket.on('ring', ({ name, time }) => {
    const order = bellList.length + 1;
    bellList.push({ name, time, order });
    io.emit('bellList', bellList);
  });

  socket.on('reset', () => {
    bellList = [];
    io.emit('bellList', bellList);
    io.emit('reset');
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
