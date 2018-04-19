
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as multer from 'multer';
const UPLOAD_DIR  ='../uploads/';
export default class UploadCtrl {
    
    //Uploader cb
      storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR)
      },
      filename: function (req, file, cb) {
          let extension = path.extname(file.originalname);
          let basename = path.basename(file.originalname, extension);
          cb(null, basename + Date.now() + extension);
      }
    })
    
     filter =function(req, file, cb){
      const extension = file.mimetype.split('/')[0];
      if(extension !== 'image'){
          return cb(new Error('Invalid file format'), false);
      }
      cb(null, true);
    };
    upload = multer({
        storage: this.storage, 
        limit:{
            files:10,
            fileSize:1024*1024*1024
        }
    });


 upLoad = (req, res,next) => {
     console.log(req.body);
     console.log('아 시팔 된거야 안된가야 짜증나넴');
    
    this.upload.single('file');
    res.sendStatus(200);
    next();

  }
    
    
     

  }
