'use strict';

const PORT = process.env.port || 4056;
let Options = {
  alias: process.env.ALIAS || ["Gemma"],
  scripts: process.env.SCRIPTS || [],
  https: process.env.HTTPS || false
}

App = require('koa')();
Serve = require('koa-static');
Server = require('http').createServer(app.callback());
Io = require('socket.io')(server);

app.use(serve(`${__dirname}/public`));

io.on('connection', (socket) => {
  console.log('Connection event');
  socket.on('speech', (msg) => {
    console.log(`Responding to ${msg}`);
    respondTo(msg);
  });
  socket.on('disconnect', () => {
    console.log('Disconnection event');
  });
});

server.listen(PORT);
console.log(`Listening to port ${PORT}...`);
