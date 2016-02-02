// Initialize sockets
var socket = io();
function socketSend(key, value) {
  socket.emit(key, value);
  return false;
}

// Initialize text to speech in browser
var u = new SpeechSynthesisUtterance();
u.lang = 'en-US';
function speak(text) {
  u.text = text;
  speechSynthesis.speak(u);
}

// Initialize speech recognition
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;

var final_transcript = '';
recognition.onresult = function(event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
    }
  }
  if (final_transcript) {
    console.log('Recognized speech: ' + final_transcript);
    socketSend('speech', final_transcript);
    speak(`${final_transcript}`);
    final_transcript = '';
  }
};

// Begin listening for speech
recognition.start();
