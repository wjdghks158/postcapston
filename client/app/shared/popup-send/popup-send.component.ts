import { Component, OnInit, Input } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from '../../shared/services/message.service';
import { ToastComponent } from '../../shared/toast/toast.component';


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


  constructor(public activeModal: NgbActiveModal, 
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private messageService: MessageService) {
    
   }


   ngOnInit() {

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

    this.matchid = match_id;
    this.receiver = receiver;
    this.sender  = sender;
    
    //this.sender = sen.v;

    
  }

//여기에 메시지 보내는 코드 있어야 한다.
  onSubmit(){
    console.log('test:'+ this.matchid+"aaaaaaaa");
    console.log('test:'+this.receiver);
    console.log('test:'+this.sender);


    console.log(this.registerForm.value);
    this.messageService.sendMessage(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully registered!', 'success');
        this.registerForm.value.code = "2";
        console.log(this.registerForm.value.code);
        this.messageService.sendMessage(this.registerForm.value);
        this.router.navigate(['/match']);
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );


    this.activeModal.close();
  }

}
