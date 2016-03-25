const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();

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
  if (hasKeywords(`hello ${Options['alias']}`)) {
    return 'Hello!';
  }
  if (matches(/.*(time is it|is the time).*/)) {
    var date = new Date;
    return `${date.getHours()}, ${date.getMinutes()}`;
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

emitter.on('hear_message', (msg) => {
  return replyTo(msg);
});
