import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from '../services/user.service';
import { SocketService } from '../services/socket.service';
import { BaseService } from './base.service';

@Injectable()
export class ChatRoomService extends BaseService {

  //chatRooms = {_id: '', users: [], messages: []};
  chatRooms = [];
  currentchatroomid : string;
  constructor(private socketService: SocketService,
    private userService: UserService,
    private router: Router,protected http: Http) {
      super(http);
     }

 


    //로그인 하면 socket 서버 연결해서 내가 들어가있는 채팅방 목록 보여준다.

setCurrentChatRoomId(roomid : string) {
  this.currentchatroomid = roomid;
}
getChatRooms(username : string) : Observable<any> {
  this.chatRooms = [];
  let url = '/api/searchchatrooms';
/** 
  this.http.get(url+"?"+"username"+"="+username).map(res => res.json()).subscribe(
    data => this.chatRooms.push(data),
    error => console.log(error),
    () => {
      console.log("asdasdasdasdasdasdasdasdasdasdasd");
      console.log(this.chatRooms);
      return true;
    }
  );
  */
  return this.http.get(url+"?"+"username"+"="+username).map(res => res.json());
}


getChatRoom(id): Observable<any> {
  return this.http.get(`/api/chatroom/${id}`).map(res => res.json());
}


createRoom(chatroom) {
  console.log("채팅 룸 서비스createRoom ");
  return this.http.post('/api/chatroom', JSON.stringify(chatroom), this.options);
}

sendMessage(roomId, username, contents): void {
  this.socketService.socket.emit('message', { roomId, username, contents });
}






setChatRooms() {
  this.chatRooms.push();
}

logoutChatRooms() {
  this.chatRooms = [];
  this.router.navigate(['/']);
}

joinRoom(roomId: string, user: string): void {
  console.log("서버에게 join emit 한다.");  
  this.socketService.socket.emit('joinRoom', { roomId, user });
}

leaveRoom(roomId :  string, username : string) : void {
  this.socketService.socket.emit('leaveRoom', { roomId, username });
}



}


