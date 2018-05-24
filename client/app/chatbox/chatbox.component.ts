import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges, DoCheck} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SocketService } from '../shared/services/socket.service';
import { ChatRoomService } from '../shared/services/chat-room.service';
import { AuthService } from '../shared/services/auth.service';


import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges, DoCheck {
  isLoading = false;
  currentchatroomid : string;
  ioConnection: any;
 // chatroom: {_id:'', username: string[], messagesCount:'', newMessagesCount:'', messages: string[] };
  chatroom = [{_id:'', username: [], messagesCount:'', newMessagesCount:'', messages: [] }];
  messageContent: string;
  constructor(private socketService: SocketService, public chatRoomService: ChatRoomService
    , private auth: AuthService, private router: Router) { 
    console.log("여기는 chatbox이다.");
    console.log(this.chatRoomService.currentchatroomid);
    //this.initIoConnection();
  }


  ngOnInit() {
    this.ioConnection = this.socketService.onMessage()
    .subscribe((message) => {
      this.chatroom[0].messages.push(message);
    });

    //이거 상대방이 나간거임
    this.ioConnection = this.socketService.onLeaveRoom()
    .subscribe((data) => {
      // 상대방이 나간거 표시 해줘야지
      console.log( " 나 말고 상대방이 나감.");
      
      
    });



    this.chatRoomService.joinRoom(this.chatRoomService.currentchatroomid, this.auth.currentUser.username);
    this.getChatRoom(this.chatRoomService.currentchatroomid);
    this.currentchatroomid = this.chatRoomService.currentchatroomid;
  }
//한번만 실행됨
  ngAfterViewInit() {
    console.log("ngAfterViewIniter 테스트 하기");
  }

  ngDoCheck() {
    if(this.currentchatroomid != this.chatRoomService.currentchatroomid) {
      this.currentchatroomid = this.chatRoomService.currentchatroomid;
      this.getChatRoom(this.currentchatroomid);
    }
    console.log(this.chatRoomService.currentchatroomid);
  }

  ngOnChanges() {
    console.log("ngOnChanges 테스트 하기");
  }

  ngOnDestroy() {
    console.log("ngOnDestroy 테스트 하기");
  }

  getChatRoom(roomid) {
    this.chatRoomService.getChatRoom(roomid).subscribe(
      data => this.chatroom[0] = data,
      error => console.log(error),
      () => {
        console.log(this.chatroom);
        this.isLoading = false;
      }
    );
  }

/** 
  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
    .subscribe((message: string) => {
      this.chatroom.messages.push(message);
    });


  }
  */

  public disConnect() {
    this.socketService.disConnect();
  }

  sendMessage(roomId: string, message: string): void {
    let data = { username : this.auth.currentUser.username, contents: message }
    this.chatRoomService.sendMessage(roomId,this.auth.currentUser.username,message );
    this.messageContent = null;
    console.log(roomId);
    console.log(message);

  }

  leave() {
    console.log(" 나 나간다.나가기");
    
    this.chatRoomService.leaveRoom(this.currentchatroomid, this.auth.currentUser.username);
    this.router.navigate(['/']);
  }
/** 
  public sendMessage(message: string): void {


    console.log("박정환");
    this.socketService.send(message);


    this.messageContent = null;


  }
  */



}
