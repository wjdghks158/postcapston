import ChatRoom from '../models/chatroom';
import BaseCtrl from './base';
import { Observable } from 'rxjs/Observable';
//import {Room} from '../../client/app/shared/models/chatroom.model' 
//import * as multer from 'multer';
export default class ChatRoomCtrl extends BaseCtrl {
  model = ChatRoom;


  

  getRooms(username : string) : Observable<any> {
    let result : any;

    this.model.find({username : username}, (err, docs) => {
      console.log('getRooms  잘 왔당깨!!!');
      console.log(docs);
      result = docs;
      if (err) { return console.error(err); }
      
    })
    .then(() => {
      console.log("asdasdasdasdasdasdasd");
    }) ;
    return result;
  }

  createRoom(room : any)  {
    const obj = new this.model(room) 
    this.model.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err) {
        return console.error(err);
      }
    });
  }

  leaveRoom(data : any) {

    
    //수정 후 받은 정보에 유저가 없으면 방도 삭제해 버리자
    this.model.findOne({ _id: data.roomId }, (err, obj) => {
      console.log(" chatroom leaveRoom 입니다.");
      //(data: { roomId: string, username: string 
      console.log(obj);
      console.log(obj.username.length);


      if( obj.username.length != 1) {
        //1이 아니라면 유저 방에서 나가게만 한다.
        obj.username.splice(data.username,1);
        obj.save();
      }
      else {
        // 1명 이므로 방을 아예 db에서 지워 버린다.
        this.model.findOneAndRemove({ _id: obj._id }, (err) => {
          if (err) { return console.error(err); }
        });

      }
      console.log(obj);
      //obj.hits++;
      //console.log(obj.hits);

      //obj.save();
      if (err) { return console.error(err); }
      //res.json(obj);
    }, ).then( () => {
      console.log(" 방 잘 나갔음");
 
    });
  }


  addChatMessage(data) {
    console.log("추가추가추가추가");
     //db에 추가하고 보내자
     //ChatRoomCtrl.addChatMessage(data)
     console.log(data.roomId);
     console.log(data.contents);

     let message = { username: data.username, contents: data.contents};

     this.model.findOne({ _id: data.roomId }, (err, obj) => {
      console.log('get의 findOne 잘 왔당깨');
      obj.messagesCount++;
      obj.messages.push(message);
      obj.save();
      if (err) { return console.error(err); }
      console.log(obj);
    });
  }


  // Get by id
  getroom = (req, res) => {
    console.log('get에 잘 왔당깨');
    console.log(req.params.id);
    this.model.findOne({ _id: req.params.id }, (err, obj) => {
      console.log('get의 findOne 잘 왔당깨');
      if (err) { return console.error(err); }
      res.json(obj);
    });
  }





}
