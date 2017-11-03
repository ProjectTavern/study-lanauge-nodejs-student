var connect = require("connect");


/* helloworld */
//var helloworld = require("./Testing");
//var app = connect.createServer(helloworld);
//app.listen(8080);


/* ReplyText */
//var replyText = require('./replyText');
//var app = connect.createServer(replyText('Hello World!'));
//app.listen(8080);


/* WriteHeader */
//var writeHeader = require('./writeHeader');
//var replyText = require('./replyText');
//
//var app = connect.createServer(
//    writeHeader('X-Powered-By', "Node"),
//    replyText('Hello World!')
//);
//
//app.listen(8080);

/* SaveRequest Server */
var saveRequest = require('./save_request');
var writeHeader = require('./writeHeader');
var replyText = require('./replyText');

var dirname = "/Users/arthur/Documents/NodeStudy/HTTPMiddleWare";

var app = connect.createServer(
    saveRequest(dirname + '/requests'),
    writeHeader('X-Powered-By', 'Node'),
    replyText('Hello World! Happy New Year!')
);

app.listen(8080);