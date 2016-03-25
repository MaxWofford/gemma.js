'use strict';

let App = require('koa')();
let ServeStatic = require('koa-static');
let Server = require('http').createServer(App.callback());
let Io = require('socket.io')(Server);
let ReplyAdapter = require('./reply.js');

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
    emitter
    var reply = replyTo(msg['contents']);
    // ^ for the time being, we'll just echo back messages

    emitter.on('reply', (msg) => {
      socket.emit('reply', msg);
    });
  });
});

Server.listen(PORT);
console.log(`Listening to port ${PORT}...`);
