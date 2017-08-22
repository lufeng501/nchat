var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var ws = require('./routes/ws');

var SocketHander = require('./socket/index');

var app = express();

// 启动websocket服务，端口3001
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('a user connected');

  // 链接ID
  var socketid = socket.id

  socketHander = new SocketHander();

  socketHander.connect()

  var history = socketHander.getHistoryMessages();

  history.then(
    function (data) {
      io.to(socketid).emit("history", data);
    }
  )

  // 断开连接
  socket.on("disconnect", function() {
    console.log("a user go out");
  });

  // 接收消息
  socket.on("message", function(obj) {
    var moment = require('moment')
    obj.time = moment().valueOf();
    socketHander.storeMessages(obj)
    // 发送消息
    io.emit("message", obj);
  });

});
server.listen(3001)

app.use(function(req, res, next){
  res.io = io;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 允许跨域请求
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/ws', ws);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
