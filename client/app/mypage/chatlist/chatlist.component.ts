import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService, AppGlobals, UserService, ChatRoomService, MessageService } from '../../shared/services';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatlistComponent implements OnInit {
  constructor(public auth: AuthService, private appGlobals: AppGlobals, private userService: UserService, private router: Router,
    private activatedRoute: ActivatedRoute, private messageService: MessageService,
    private chatRoomService: ChatRoomService) { }


    selected: boolean =  false;

  //@Input() changeChat = new EventEmitter();
  openchat: boolean = false;
  opened: boolean = false;

  menu: String = "about"

  asdasd = ["12", "222", "333"];

  isLoading = true;
  notRead: number;
  receiveMessages = [];
  more_info: string;
  user = {};
  chatRooms = [];

  ngOnInit() {

    this.getUser();

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
    this.getChatRooms();
    console.log("======================");
    console.log(this.chatRooms);
    this.getReceiveMessage();

  }

  chatboxstate() {
    this.openchat = false;
  }

  chatroomclick(value){
    console.log();
  }

  chatRoomListClick() {
    this.openchat = false;
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
  changechat(){

  }
  goChatRoom(roomId) {
    this.sidenavToggle();
    this.chatRoomService.setCurrentChatRoomId(roomId);
    //this.router.navigate(['/chatbox/'+roomId]);
    if (!this.openchat) {
      this.openchat = true;
    }

  }





  getChatRooms() {
    this.chatRooms = [];
    this.chatRooms = this.chatRoomService.chatRooms;
  }
  sidenavToggle() {
    console.log("확인");
    this.opened = !this.opened;
  }
  closelist() {
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
    var url = '/api/searchmessages';
    var receiver = "receiver";
    this.messageService.search(url + "?" + receiver + "=" + this.auth.currentUser.username).subscribe(
      data => {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          if (data[i].code == "1") { //수신함
            if (data[i].read_at == null) {
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

  menuChange(value){
    this.menu = value;
  }

}
