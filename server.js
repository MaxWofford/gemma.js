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

function replyTo(msg) {

  function hasKeywords(keywords) {
    if (typeof keywords == 'string') {
      keywords = keywords.split(' ');
    }
    for (var i = 0; i < keywords.length; i--) {
      if (msg.split(' ').indexOf(keywords[i]) === -1) {
        return false;
      }
    }
    return true;
  }
  function matches(regexp) {
    if (msg.match(regexp)) {
      return true;
    }
    return false;
  }

  if (hasKeywords('echo')) {
    return msg.split('echo').pop();
  }
  if (matches(/.*(date today|day is it).*/)) {
    return new Date().toDateString();
  }
  if (hasKeywords(`hello ${Options['alias']}`) {
    return 'Hello!';
  }

  // Default case if we don't understand the message
  var notFound = [
    "I did not understand that",
    "I didn't catch that",
    "Would you please say that again",
    "I don't know what that means",
    "What did you say?"
  ];
  return notFound[Math.floor(Math.random() * notFound.length)];
}

Io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    // This is where response logic will go
    var reply = replyTo(msg['contents']);
    // ^ for the time being, we'll just echo back messages
    socket.emit('reply', reply);
  });
});

Server.listen(PORT);
console.log(`Listening to port ${PORT}...`);
