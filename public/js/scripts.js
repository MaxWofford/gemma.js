// Initialize sockets
var socket = io();

socket.on('reply', function(msg) {
  speak(msg);
});

// Initialize text to speech in browser
function speak(text) {
  var u = new SpeechSynthesisUtterance();
  u.lang = 'en-US';
  u.text = text;
  speechSynthesis.speak(u);
}

// Initialize speech recognition
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;

recognition.onresult = function(event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      var final_transcript = event.results[i][0].transcript;
    }
  }
  socket.emit('message', {contents: final_transcript});
};

recognition.onend = function(){
  // Auto restart
  recognition.start();
};

// Begin listening for speech
recognition.start();
