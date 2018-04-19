import { Component, OnInit, Input } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from '../../shared/services/message.service';
import { MatchService } from '../../shared/services/match.service';
import { ToastComponent } from '../../shared/toast/toast.component';


@Component({
  selector: 'app-popup-matchcomplete',
  templateUrl: './popup-matchcomplete.component.html',
  styleUrls: ['./popup-matchcomplete.component.css']
})
export class PopupMatchcompleteComponent implements OnInit {
  registerForm: FormGroup;

  matchuser = new FormControl('', [Validators.required]);

  matchid : string;
  messages = [];
  isLoading = true;
  constructor(public activeModal: NgbActiveModal, 
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private messageService: MessageService,
    private matchService: MatchService) {
    
   }

  ngOnInit() {
    this.getMessage();

    this.registerForm = this.formBuilder.group({
      matchstate: true,
      matchuser: this.matchuser
    });


  }
//작성자에게 매칭 신청한 메시지 모두 찍음
  getMessage() {
    this.messageService.getMesssages(this.matchid).subscribe(
      data => {
        console.log(data);
        for( var i=0; i<data.length; i++) {
          if(data[i].code == "2") {
            console.log("test" + data.length);
            this.messages.push(data[i]);
            console.log(this.messages[0].title);
          }
        }
       // this.messages = data
      },
      error => console.log(error),
      () => {
        this.isLoading = false;
        console.log(Object.keys(this.messages).length);
        console.log(this.messages);
      }
    );


  }

  setMessage( match_id) {

    this.matchid = match_id;

  }

  onSubmit(){

    console.log(this.registerForm.value.matchstate +"aaaaaaaa"+  this.registerForm.value.matchuser
     +"aaaaaaaa"+ this.registerForm.value.matchid);


     this.matchService.editByMatchId(this.matchid, this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully registered!', 'success');
        this.router.navigate(['/match']);
        this.activeModal.close();
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );



   }





}
