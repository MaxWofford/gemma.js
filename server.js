'use strict';

let App = require('koa')();
let ServeStatic = require('koa-static');
let Server = require('http').createServer(App.callback());
let Io = require('socket.io')(Server);

const PORT = process.env.port || 4056;
let Options = {
  alias: process.env.ALIAS || ["Gemma"],
  scripts: process.env.SCRIPTS || [],
  https: process.env.HTTPS || false
};

App.use(ServeStatic(`${__dirname}/public`));

Io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    // This is where response logic will go
    var reply = msg['contents'];
    // ^ for the time being, we'll just echo back messages
    socket.emit('reply', reply);
  });
});

Server.listen(PORT);
console.log(`Listening to port ${PORT}...`);
