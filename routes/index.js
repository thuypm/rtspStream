var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
// var bac = require('../public/video/a');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('useHlc', { title: 'Express' });
});

router.post('/getRtspVideo', function(req, res, next) {
console.log(req.body);
//var cmd = "mkdir Newvideo";
var cmd = 'ffmpeg -i "' +req.body.rtspLink+  '" -c copy -hls_time 2 -hls_wrap 5 "public/video/streaming.m3u8"';
exec(cmd, function(error, stdout, stderr){
  if(error)
  	throw error
  else
  	console.log("stdout");  
});
 	res.send("1");
});

module.exports = router;
