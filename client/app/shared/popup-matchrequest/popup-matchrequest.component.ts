import { Message } from './../models/message.model';
import { Component, OnInit } from '@angular/core';
import { BsModalService  } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-popup-matchrequest',
  templateUrl: './popup-matchrequest.component.html',
  styleUrls: ['./popup-matchrequest.component.css']
})
export class PopupMatchrequestComponent implements OnInit {
  public message: Message;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    console.log(this.message);
  }
  getMessage(ReceiveMessage: Message){
    console.log("asdasdasd");
    this.message = ReceiveMessage;
  }
  MoveMatching(){
    this.bsModalRef.hide();
  }
}