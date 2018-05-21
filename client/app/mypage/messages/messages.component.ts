import { PopupMatchrequestComponent } from './../../shared/popup-matchrequest/popup-matchrequest.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services';
import { MessageService } from '../../shared/services/message.service';
import { BsModalService  } from 'ngx-bootstrap/modal';
import { ModalModule,BsModalRef } from 'ngx-bootstrap';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  sendMessages = [];
  receiveMessages = [];
  isLoading = true;

  bsModalRef: BsModalRef;


  //Pipe
  order: string = 'created_at';
  reverse: boolean = true;

  //page 넘버링 할 때 쓰는 변수
  p:number = 1;
  q:number = 1;
  total: number;

  constructor(public auth: AuthService,
  private messageService :MessageService,
  private modalService: BsModalService) {
    
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

  openMessage(message){
    message.read_at = new Date();
    console.log(message);
    
    this.messageService.editMessage(message).subscribe(
      error => console.log(error),
      () => console.log("json :: "+ message.json())
    );
    
    this.bsModalRef = this.modalService.show(PopupMatchrequestComponent);
    this.bsModalRef.content.title = message.title;
    this.bsModalRef.content.contents = message.contents;
  }



  getSendMessage() {
    var url ='/api/searchmessages';
    var sender = "sender";
    this.messageService.search(url+"?"+sender+"="+this.auth.currentUser.username).subscribe(
      data => {

        for( var i=0; i<data.length; i++) {
          if(data[i].code == "2") { //발신함

            this.sendMessages.push(data[i]);

          }
        }
       // this.messages = data
      },
      error => console.log(error),
      () => {
        this.isLoading = false;

      }
    );
  }
  getReceiveMessage() {
    var url ='/api/searchmessages';
    var receiver = "receiver";
    this.messageService.search(url+"?"+receiver+"="+this.auth.currentUser.username).subscribe(
      data => {

        for( var i=0; i<data.length; i++) {
          if(data[i].code == "1") { //수신함
            this.receiveMessages.push(data[i]);
          }
        }
       // this.messages = data
      },
      error => console.log(error),
      () => {
        this.isLoading = false;

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