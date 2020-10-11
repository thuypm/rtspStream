
const child_process = require('child_process');
const EventEmitter = require('events');

class VideoStream extends EventEmitter {

  constructor(options) {
    super(options)
    this.url = options.url;
    this.port = options.port;
    this.stream = child_process.spawn("ffmpeg", options, {
      detached: false
    });
    this.inputStreamStarted = true
    this.stream.stdout.on('data', (data) => { return this.emit('mpegdata', data) })
    this.stream.stderr.on('data', (data) => { return this.emit('ffmpegError', data) })
  }
}

module.exports = VideoStream
