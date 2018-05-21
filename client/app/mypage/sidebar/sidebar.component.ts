import { MessageService } from './../../shared/services/message.service';
import { Component, OnInit, Input  } from '@angular/core';
import { AuthService, UserService } from '../../shared/services';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() sideMenu: string = 'mypage';


  isLoading = true;
  notRead: number;
  receiveMessages = [];

  constructor(private auth: AuthService, private messageService: MessageService, private userService: UserService) { }

  ngOnInit() {
    this.getReceiveMessage();
  }

  setMenu(value: string){
    this.sideMenu = value;
  }
  getReceiveMessage() {
    var url ='/api/searchmessages';
    var receiver = "receiver";
    this.messageService.search(url+"?"+receiver+"="+this.auth.currentUser.username).subscribe(
      data => {
        console.log(data);
        for( var i=0; i<data.length; i++) {
          if(data[i].code == "1") { //수신함
            if(data[i].read_at == null) {  
              this.receiveMessages.push(data[i]);
            }
          }
        }
       // this.messages = data
      },
      error => console.log(error),
      () => {
        this.isLoading = false;
        console.log(Object.keys(this.receiveMessages).length);
        console.log(this.receiveMessages);
        this.notRead = Object.keys(this.receiveMessages).length;
      }
    );
  }
}