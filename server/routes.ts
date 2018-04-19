import * as express from 'express';

import UserCtrl from './controllers/user';
import EmployeeCtrl from './controllers/employee';
import AttendanceCtrl from './controllers/attendance';
import MatchCtrl from './controllers/match';
import RecommendCtrl from './controllers/recommend';
import ContestCtrl from './controllers/contest';
import UploadCtrl from './controllers/upload';
import MessageCtrl from './controllers/message';



import User from './models/user';
import Employee from './models/employee';
import Attendance from './models/attendance';
import Contest from './models/contest';
import Recommend from './models/recommend';
import Match from './models/match';
import Message from './models/message';


export default function setRoutes(app) {

  const router = express.Router();

  const employeeCtrl = new EmployeeCtrl();
  const attendanceCtrl = new AttendanceCtrl();
  const userCtrl = new UserCtrl();
  const matchCtrl = new MatchCtrl();
  const recommendCtrl = new RecommendCtrl();
  const contestCtrl = new ContestCtrl();
  
  const messageCtrl = new MessageCtrl();
  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user').put(userCtrl.insertPages);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Employee
  router.route('/employees').get(employeeCtrl.getAll);
  router.route('/employees/count').get(employeeCtrl.count);
  router.route('/employee').post(employeeCtrl.insert);
  router.route('/employee/:id').get(employeeCtrl.get);
  router.route('/employee/:id').put(employeeCtrl.update);
  router.route('/employee/:id').delete(employeeCtrl.delete);

  // Attendaces
  router.route('/attendances').get(attendanceCtrl.getAll);
  router.route('/attendances/count').get(attendanceCtrl.count);
  router.route('/attendance').post(attendanceCtrl.insert);
  router.route('/attendance/:id').get(attendanceCtrl.get);
  router.route('/attendance/:id').put(attendanceCtrl.update);
  router.route('/attendance/:id').delete(attendanceCtrl.delete);



    // Match
    router.route('/matchs').get(matchCtrl.getAll);
    router.route('/matchs/count').get(matchCtrl.count);
    router.route('/match').post(matchCtrl.insert);
    router.route('/match/:id').get(matchCtrl.get);
    router.route('/match/:id').put(matchCtrl.update);
    router.route('/match/:id').delete(matchCtrl.delete);
    router.route('/searchmatchs').get(matchCtrl.search);
    //recommend
    router.route('/recommends').get(recommendCtrl.getAll);
    router.route('/recommends/count').get(recommendCtrl.count);
    router.route('/recommend').post(recommendCtrl.insert);
    router.route('/recommend/:id').get(recommendCtrl.get);
    router.route('/recommend/:id').put(recommendCtrl.update);
    router.route('/recommend/:id').delete(recommendCtrl.delete);
    
    //contest
    router.route('/contests').get(contestCtrl.getAll);
    router.route('/contests/count').get(contestCtrl.count);
    router.route('/searchcontests').get(contestCtrl.search);
    router.route('/contest').post(contestCtrl.insert);
    router.route('/contest/:id').get(contestCtrl.get);
    router.route('/contest/:id').put(contestCtrl.update);
    router.route('/contest/:id').delete(contestCtrl.delete);
    //message
    router.route('/message').post(messageCtrl.sendAndReceive);
    router.route('/messages').get(messageCtrl.getAll);
    router.route('/messages/count').get(messageCtrl.count);
    router.route('/searchmessages').get(messageCtrl.search);
    router.route('/message').post(messageCtrl.insert);
    router.route('/message/:id').get(messageCtrl.getMessages);
    router.route('/message/:id').put(messageCtrl.update);
    router.route('/message/:id').delete(messageCtrl.delete);





    //router.route('/upload').post(uploadCtrl.upLoad);
    

    //router.route('/upload').post(uploadCtrl.upload.array('photos',1),
  //function(req, res){
 //   console.log("정말 찍히는지 확인");
 // });


  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
