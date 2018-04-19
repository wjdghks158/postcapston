import Message from '../models/message';
import BaseCtrl from './base';
//import * as multer from 'multer';
export default class MessageCtrl extends BaseCtrl {
  model = Message;
/*
  sendAndReceive= (req, res) => {
    console.log('insert에 도착 해부렸당깨');
    let obj = new this.model(req.body);  

    // 발신함 하나 보내고 
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      obj.code= "2";
      //코드 번호 고처서 수신함에 하나 보냄
      obj.save();
      res.status(200).json(item);
    });
  }
  */
 sendAndReceive= (req, res) => {
  console.log('insert에 도착 해부렸당깨');
  let obj = new this.model(req.body);  
  console.log('aaaaaaaaaaaaaaaaaa:'+ req.body);
  // 발신함 하나 보내고 
  obj.save((err, item) => {
    // 11000 is the code for duplicate key error
    if (err && err.code === 11000) {
      res.sendStatus(400);
    }
    if (err) {
      return console.error(err);
    }
    req.body.code= "2";
    let obj2 = new this.model(req.body);  
    //코드 번호 고처서 수신함에 하나 보냄
    obj2.save();
    res.status(200).json(item);
  });
}


  // Get all
  getMessages = (req, res) => {
    console.log('getMessages 잘 왔당깨 matchid : ' +req.params.id);
    this.model.find({matchid: req.params.id}, (err, docs) => {
      console.log('getMessages  잘 왔당깨!!!');
      console.log(docs);
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }



    
}
