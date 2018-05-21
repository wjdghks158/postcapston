import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from '../services/user.service';
import { SocketService } from '../services/socket.service';
import { ChatRoomService } from '../services/chat-room.service';


@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;
  

  currentUser = { _id: '', username: '', role: '', email: '', age: '', job: '', location: '', phone: '', education: '',
   major: '', majorGroup: '', introduction: '', preference: {department: ''}, pages:[], kakaoid: '' , skill: '' , interest: '' };
  jwtHelper: JwtHelperService = new JwtHelperService();



  constructor(private socketService: SocketService,
    private userService: UserService, private chatRoomService: ChatRoomService,
    private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
    if(this.loggedIn) {
      if(!this.socketService.isSocket) {
        this.socketService.initSocket();
      }
    }
  }

  login(emailAndPassword) {
    return this.userService.login(emailAndPassword).map(res => res.json()).map(
      res => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        this.socketService.initSocket();

        let username : string;
        username = this.currentUser.username;
        this.chatRoomService.getChatRooms(username);
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(this.currentUser.username);
        //this.socketService.connect();
        return this.loggedIn;
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.socketService.disConnect();
    this.currentUser = { _id: '', username: '', role: '', email: '', age: '', job: '', location: '', phone: '', education: '',
    major: '', majorGroup: '', introduction: '', preference: {department: ''}, pages:[], kakaoid: '' , skill: '' , interest: '' };
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }
  
  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    this.currentUser.email = decodedUser.email;
    this.currentUser.age = decodedUser.age;
    this.currentUser.job = decodedUser.job;
    this.currentUser.location = decodedUser.location;
    this.currentUser.phone = decodedUser.phone;
    this.currentUser.education = decodedUser.education;
    this.currentUser.major = decodedUser.major;
    this.currentUser.majorGroup = decodedUser.majorGroup;
    this.currentUser.introduction = decodedUser.introduction;
    this.currentUser.preference = decodedUser.preference;
    this.currentUser.pages = decodedUser.pages;
    decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
    delete decodedUser.role;
  }

}
