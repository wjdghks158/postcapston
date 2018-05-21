import { ChatRoomService } from './../shared/services/chat-room.service';
import { Component, OnInit, Output, EventEmitter, Input, ElementRef, ViewChild } from '@angular/core';
import { Room } from '../shared/models/chatroom.model';
import { SocketService, AuthService } from '../shared/services';

@Component({
  selector: 'app-chatwindow',
  templateUrl: './chatwindow.component.html',
  styleUrls: ['./chatwindow.component.css']
})
export class ChatwindowComponent implements OnInit {
  @Output() chatclose = new EventEmitter();
  @Input() changechat = new EventEmitter();
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  currentId: String;

  isLoading = false;
  ioConnection: any;
 // chatroom: {_id:'', username: string[], messagesCount:'', newMessagesCount:'', messages: string[] };
  chatroom = [{_id:'', username: [], messagesCount:'', newMessagesCount:'', messages: [] }];
  messageContent: string;

  constructor(private socketService: SocketService, private chatRoomService: ChatRoomService
    , private auth: AuthService, public el: ElementRef) { 
    console.log("여기는 chatbox이다.");
    console.log(this.chatRoomService.currentchatroomid);
    //this.initIoConnection();
  }


  ngOnInit() {
    console.log("ChatwindowComponent");
    this.ioConnection = this.socketService.onMessage()
    .subscribe((message) => {
      this.chatroom[0].messages.push(message);
    });
    this.scrollToBottom();
    this.chatRoomService.joinRoom(this.chatRoomService.currentchatroomid, this.auth.currentUser.username);
    this.getChatRoom(this.chatRoomService.currentchatroomid);
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

  closeclick(){
    this.chatclose.emit()
  }


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
  scrollToBottom(): void {
    try{
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err){

    }
  }
}
