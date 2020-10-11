var express = require('express');
var router = express.Router();
var child_process = require('child_process');
var VideoStream = require ("../app/stream");
// var bac = require('../public/video/a');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/demo', function(req, res, next) {
  res.render('useHlc', { title: 'Express' });
});

router.post('/getRtspVideo', function(req, res, next) {
// console.log(req.body);
//var cmd = "mkdir Newvideo";
var cmd = 'ffmpeg -i "' +req.body.rtspLink+  '" -c copy -hls_time 2 -hls_wrap 5 "public/video/streaming.m3u8"';
var args = ["-i",
			req.body.rtspLink,
			"-c",
			"copy",
			 '-b:v', '800k',
			"-hls_time",
			"2",
			"-hls_wrap",
			"5",
			"public/video/streaming.m3u8"
];
// var videoStream = new VideoStream(args);
// videoStream.on("mpegdata", (data)=>{
// 	res.send(data);
// })
var sd = 0;
var fmp = child_process.spawn("ffmpeg", args);
fmp.stdout.on("data", (data)=>{
})
 fmp.stderr.on('data', (data) => {
 	if(!sd)
 	{
 		sd = 1;
 		res.send("1");
 	}
  console.error(data.toString());
});

fmp.on('close', (code) => {
  console.log(`Child exited with code ${code}`); 
});	
});

module.exports = router;
