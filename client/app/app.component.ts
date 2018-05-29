import { UserService } from './shared/services/user.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AuthService, AppGlobals, MessageService, ChatRoomService } from './shared/services';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // role: 'guest';
  constructor(public auth: AuthService, private appGlobals: AppGlobals, private userService: UserService, private router: Router,
    private activatedRoute: ActivatedRoute, private messageService :MessageService,
     private chatRoomService :ChatRoomService) { }

  
 //@Input() changeChat = new EventEmitter();
 openchat: boolean = false;
 opened: boolean = false;

  asdasd = ["12","222","333"];

  isLoading = false;
  notRead: number;
  receiveMessages = [];
  more_info: string;
  user = {};
  chatRooms= [];

  ngOnInit() {
    console.log("app.component");

    

    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        // this.role = this.appGlobals.userInfo.role;
      });
    // this.role = 'guest';

    
  //  if(this.auth.loggedIn){
   //   this.getUser();
  //    this.getChatRooms();
  //    this.getReceiveMessage();
  //  }
  console.log("app.component");
  }

  chatRoomListClick() {
    this.chatRoomService.chatRooms = [];
    this.chatRoomService.getChatRooms(this.auth.currentUser.username).subscribe(
      data => this.chatRoomService.chatRooms = data,
      error => console.log(error),
      () => {
        console.log("asdasdasdasdasdasdasdasdasdasdasd");
        console.log(this.chatRoomService.chatRooms);
        this.sidenavToggle();
      });
  }

  goChatRoom(roomId) {
    this.sidenavToggle();
    this.chatRoomService.setCurrentChatRoomId(roomId);
    //this.router.navigate(['/chatbox/'+roomId]);
    if (!this.openchat) {
      console.log("asdasdasdasasdasdasd 채팅방 열었잖아");
      this.openchat = true;
    }

  }





  getChatRooms() {
    this.chatRooms = [];
    this.chatRooms = this.chatRoomService.chatRooms;
  }
  sidenavToggle(){
    console.log("확인");
    this.opened = !this.opened;
  }
  closelist(){
    this.opened = false;
  }
getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.getReceiveMessage()
    );
  }
  
  getReceiveMessage() {
    var url ='/api/searchmessages';
    var receiver = "receiver";
    this.receiveMessages =[];
    this.messageService.search(url+"?"+receiver+"="+this.auth.currentUser.username).subscribe(
      data => {
        console.log(data);
        for( var i=0; i<data.length; i++) {
          if(data[i].code == "1") { //수신함
            if(data[i].read_at == null) {  
              console.log("test" + data.length);
              this.receiveMessages.push(data[i]);
              console.log(this.receiveMessages[0].title);
            }
          }
        }
       // this.messages = data
      },
      error => console.log(error),
      () => {
        this.isLoading = false;
        console.log("length = " + Object.keys(this.receiveMessages).length);
        console.log(this.receiveMessages);
        this.notRead = Object.keys(this.receiveMessages).length;
      }
    );
  }
  chatboxstate() {
    this.openchat = false;
  }

  changechat(){

  }

  leave() {
    console.log("나가기 버튼 누름");
  }

}