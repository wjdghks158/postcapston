import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from '../../shared/services/message.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { BsModalService,  } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';


@Component({
  selector: 'app-popup-send',
  templateUrl: './popup-send.component.html',
  styleUrls: ['./popup-send.component.css']
})
export class PopupSendComponent implements OnInit {

  registerForm: FormGroup;
  //sender : new FormControl('', [Validators.required]);
  //receiver : new FormControl('', [Validators.required]);
  //match_id : new FormControl('', [Validators.required]);
  sender = new FormControl('', [Validators.required]);
  receiver = new FormControl('', [Validators.required]);
  matchid = new FormControl('', [Validators.required]);
  title = new FormControl('', [Validators.required]);
  contents = new FormControl('', [Validators.required]);




  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private messageService: MessageService,
    public bsModalRef: BsModalRef) {

      //console.log(this.bsModalRef.content);
   }


   ngOnInit() {
 //this.sender = sen.v;
 console.log("PopupSendComponent ngOnInit 왔다.");
 this.registerForm = this.formBuilder.group({
  receiver: this.receiver,
  sender: this.sender,
  code: "1",
  matchid: this.matchid,
  title: this.title,
  contents: this.contents
});
  }

  setMessage(sender, receiver, match_id) {

    this.registerForm.value.receiver = this.receiver;
    this.registerForm.value.sender = this.sender;
    this.registerForm.value.matchid = this.matchid;

    
   

      
  }

//여기에 메시지 보내는 코드 있어야 한다.
  onSubmit(){
    console.log("send test!!!!!!!!!!!");
    console.log(this.sender);
    this.setMessage(this.sender,this.receiver,this.matchid);

    console.log(this.receiver);
    this.messageService.sendMessage(this.registerForm.value).subscribe(
      res => {
        this.bsModalRef.hide();
        this.toast.setMessage('you successfully registered!', 'success');
        this.registerForm.value.code = "2";
        console.log(this.registerForm.value.code);
        this.messageService.sendMessage(this.registerForm.value);
        this.router.navigate(['/match']);
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );
  }

}
