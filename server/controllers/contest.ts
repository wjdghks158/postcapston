import Contest from '../models/contest';
import BaseCtrl from './base';
import * as multer from 'multer';
export default class ContestCtrl extends BaseCtrl {
  model = Contest;

   // Get all
   test = (req, res) => {
    console.log('test 잘 왔당깨');
   
  }


}