import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  sendMessages = [];
  receiveMessages = [];
  isLoading = true;

  //Pipe
  order: string = 'created_at';
  reverse: boolean = true;

  //page 넘버링 할 때 쓰는 변수
  p:number = 1;
  q:number = 1;
  total: number;

  constructor(public auth: AuthService,
  private messageService :MessageService) {
    
   }

  ngOnInit() {
    this.getReceiveMessage();
    this.getSendMessage();
  }

  read(message){
    message.read_at = new Date();
    console.log(message);
    
    this.messageService.editMessage(message).subscribe(
      error => console.log(error),
      () => console.log("json :: "+ message.json())
    );

    
  }
  getSendMessage() {
    var url ='/api/searchmessages';
    var sender = "sender";
    this.messageService.search(url+"?"+sender+"="+this.auth.currentUser.username).subscribe(
      data => {
        console.log(data);
        for( var i=0; i<data.length; i++) {
          if(data[i].code == "2") { //발신함
            console.log("test" + data.length);
            this.sendMessages.push(data[i]);
            console.log(this.sendMessages[0].title);
          }
        }
       // this.messages = data
      },
      error => console.log(error),
      () => {
        this.isLoading = false;
        console.log(Object.keys(this.sendMessages).length);
        console.log(this.sendMessages);
      }
    );
  }
  getReceiveMessage() {
    var url ='/api/searchmessages';
    var receiver = "receiver";
    this.messageService.search(url+"?"+receiver+"="+this.auth.currentUser.username).subscribe(
      data => {
        console.log(data);
        for( var i=0; i<data.length; i++) {
          if(data[i].code == "1") { //수신함
            console.log("test" + data.length);
            this.receiveMessages.push(data[i]);
            console.log(this.receiveMessages[0].title);
          }
        }
       // this.messages = data
      },
      error => console.log(error),
      () => {
        this.isLoading = false;
        console.log(Object.keys(this.receiveMessages).length);
        console.log(this.receiveMessages);
      }
    );
  }


  //pipe
  setOrder(value: string){
    if(this.order === value){
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
}
