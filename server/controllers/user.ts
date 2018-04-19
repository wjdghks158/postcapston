import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import User from '../models/user';
import BaseCtrl from './base';

export default class UserCtrl extends BaseCtrl {
  model = User;

  login = (req, res) => {
    this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        res.status(200).json({ token: token });
      });
    });
  }


  insert = (req, res) => {
    console.log('insert에 도착 해부렸당깨');
    const obj = new this.model(req.body);
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
    });
  }

 // Update by id
 update = (req, res) => {
  this.model.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
    if (err) { return console.error(err); }
    res.sendStatus(200);
  });
}
//req.body.contestid
  insertPages = (req, res) => {
    console.log("insertPages 잘왔다 :")
    console.log(req.body);
    console.log(req.body.contestid);
    this.model.findOneAndUpdate({ _id: req.body._id }, {'$push': {'pages': req.body.contestid }},
    {'new':true, 'upsert':true}
    , (err, user) => {
      if (!user) { return res.sendStatus(403); }
      res.status(200).json(user);
    });
  }

}
