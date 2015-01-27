	var context = new AudioContext();
	var sound;

    var playAudioFile = function (buffer) {
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(0); // Play sound immediately
    };

    var loadAudioFile = (function (url) {
        var request = new XMLHttpRequest();

        request.open('get', 'src/sounds/iron.mp3', true);
        request.responseType = 'arraybuffer';

        request.onload = function () {
                context.decodeAudioData(request.response,
                     function(incomingBuffer) {
                         sound = incomingBuffer;
                     }
                );
        };

        request.send();
    }());

    setTimeout(function() {
    	playAudioFile(sound);
    }, 5000);