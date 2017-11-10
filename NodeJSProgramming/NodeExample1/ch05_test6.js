var http = require('http');
var fs = require('fs');

var server = http.createServer();

server.on('connection', function(socket){
    var addr = socket.address();
    console.log('클라이언트가 접속: %s, %d', addr.address, addr.port);
});

server.on('request', function(req, res){
    console.log('클라이언트 요청이 들어왔습니다.');
    
    var filename = 'Celtic-Cross.png';
    /* ReadStream 활용 */
    var infile = fs.createReadStream(filename, {flags: 'r'});
    var filelength = 0;
    var curlength = 0;
    
    
    /* 파일 정보 확인 */
    fs.stat(filename, function(err, stats){
        filelength = stats.size;
    });
    
    /* 헤더 쓰기 */
    res.writeHead(200, {"Content-Type": "image/png"});
    
//    /* 파이프로 연결하여 알아서 처리하도록 설정하기 */
//    infile.pipe(res);
    
    /* 파일 내용을 스트림에서 읽어 본문 쓰기 */
    infile.on('readable', function(){
        var chunk;
        
        while(null != (chunk = infile.read())) {
            console.log('읽어 들인 데이터 크기: %d 바이트', chunk.length);
            curlength += chunk.length;
            res.write(chunk, 'utf8', function(err) {
                console.log('파일 부분 쓰기 완료: %d, 파일 크기: %d', curlength, filelength);
                if(curlength >= filelength) {
                 /* 응답 전송하기 */   
                    res.end();
                }
            })
        }
    
    });
});

server.on('close', function(){
    console.log('서버가 종료됩니다.');
});

server.listen(3000);

/**
* MIME Type
* text/plain
* text/html
* text/css
* text/xml
* image/jpeg, image/png
* video/mpeg, audio/mp3
* application/zip
*/