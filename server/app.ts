import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as multer from 'multer';
import setRoutes from './routes';


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

  app.listen(app.get('port'), () => {
    console.log('Mean Stack listening on port ' + app.get('port'));
  });

});

export { app };
