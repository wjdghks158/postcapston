import Match from '../models/match';
import BaseCtrl from './base';
//import * as multer from 'multer';
export default class MatchCtrl extends BaseCtrl {
  model = Match;

  // Update by id
  addComment = (req, res) => {
    console.log("여기 까지 옴");
    console.log(req.body._id);
    console.log(req.body);
    this.model.findOneAndUpdate({ _id: req.params.id }, {'$push': {'comments': req.body }},
    {'new':true, 'upsert':true}
    , (err, match) => {
      if (!match) { return res.sendStatus(403); }
      res.status(200).json(match);
    });
  }





}
