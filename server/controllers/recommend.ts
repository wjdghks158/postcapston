import Recommend from '../models/recommend';
import BaseCtrl from './base';
import * as multer from 'multer';
export default class RecommendCtrl extends BaseCtrl {
  model = Recommend;
}
