import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as multer from 'multer';
import setRoutes from './routes';

import { createServer, Server } from 'http';
import * as socketio from 'socket.io';


import ChatRoomCtrl from './controllers/chatroom';
import ChatMessageCtrl from './controllers/chatMessage'


const chatRoomCtrl = new ChatRoomCtrl();
const UPLOAD_DIR ='./uploads/';
const app = express();
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
(<any>mongoose).Promise = global.Promise;


//multer 업로드 관련 uploads
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
//app.use('/bbb', express.static('uploads'));
app.get('/download/:filename/', function(req,res,next){
  console.log(req.params.filen);
  res.setHeader('content-type', 'image/jpeg');
  res.download(UPLOAD_DIR+req.params.filename);
})


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  setRoutes(app);

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  var ex_server =app.listen(app.get('port'), () => {
    console.log('Mean Stack listening on port ' + app.get('port'));
  });


  this.server = createServer(this.app);

  this.io = socketio(ex_server);
this.io.on('connect', (socket: any) => {
  console.log("socket-connect");
  console.log('Connected client on port %s.', "메시지 할려고 들어옴");
  


  socket.on('getrooms', (username: string) => {
    let result : any;
    console.log("socket-username");
    console.log('[server](username): %s', JSON.stringify(username));
    result = chatRoomCtrl.getRooms(username);

    console.log("asdasdasdasdasdasdasdasdasdasd");
      //this.io.emit('message', );
  });

  socket.on('getrooms', (username: string) => {
    let result : any;
    console.log("socket-username");
    console.log('[server](username): %s', JSON.stringify(username));
    result = chatRoomCtrl.getRooms(username);

    console.log("asdasdasdasdasdasdasdasdasdasd");
      //this.io.emit('message', );
  });

  socket.on('getroom', (username: string) => {
    let result : any;
    console.log("socket-getroom");
    console.log('[server](getroom): %s', JSON.stringify(username));
    result = chatRoomCtrl.getRooms(username);

    console.log("asdasdasdasdasdasdasdasdasdasd");
      //this.io.emit('message', );
  });

  socket.on('createroom', (room: any) => {
    let result : any;
    console.log("socket-getroom");
    console.log('[server](getroom): %s', JSON.stringify(room));
    result = chatRoomCtrl.createRoom(room);

    console.log("asdasdasdasdasdasdasdasdasdasd");
      //this.io.emit('message', );
  });

/** 
  socket.on('message', (m: string) => {
    console.log("socket-message");
    console.log('[server](message): %s', JSON.stringify(m));
      this.io.emit('message', m);
  });
  */

 socket.on('message', (data: { roomId: string, username:string, contents: string} ) => {
   console.log("잘온거 아님?");
   console.log(data.roomId);
   console.log(data.contents);
   // this.io.emit('message', data.message); 전체에 보냄

   //db에 추가하고 보내자
   chatRoomCtrl.addChatMessage(data)
   // socket.emit('message', data.message); // 나한테 보냄
   this.io.sockets.in(data.roomId).emit('message',data); // room에 속한 놈한테만 보냄


});

  
  socket.on('disconnect', () => {
    console.log("socket-disconnect");
      console.log('Client disconnected');
  });

  socket.on('joinRoom', (data: { roomId: string, user: string }) => {
    console.log(data.roomId+"joinRoom 되었다.");
    socket.join(data.roomId);
    console.log("확인용");
    
    //this.io.join(data.roomId); 
    //console.log(this.io.sockets.clients(data.roomId)); 
    //socket.broadcast.to(data.roomId).emit('userJoined', data.user);
  });

  socket.on('leaveRoom', (data: { roomId: string, username: string }) => {
   
    //socket.join(data.roomId);
    socket.leave(data.roomId);
    console.log("leaveRoom on 확인용");
    chatRoomCtrl.leaveRoom(data);

    this.io.sockets.in(data.roomId).emit('leaveroom'); // room에 속한 놈한테만 보냄
    
    //this.io.join(data.roomId); 
    //console.log(this.io.sockets.clients(data.roomId)); 
    //socket.broadcast.to(data.roomId).emit('userJoined', data.user);
  
  });





});



});

export { app };
