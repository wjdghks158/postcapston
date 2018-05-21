import Contest from '../models/contest';
import BaseCtrl from './base';
import * as multer from 'multer';
export default class ContestCtrl extends BaseCtrl {
  model = Contest;

   // Get all
   test = (req, res) => {
    console.log('test 잘 왔당깨');
   
  }



  getLimit = (req, res) => {
      console.log('getLimit 잘 왔당깨');
      this.model.find({}).sort({ $natural: -1 }).limit(5).exec((err, docs) => {
        console.log('getLimit find 잘 왔당깨!!!');
        if (err) { return console.error(err); }
        res.json(docs);
      });

  }

}