import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'
import { ContestService } from '../../shared/services/contest.service';
import { ToastComponent } from '../../shared/toast/toast.component';

const URL = '/api/upload';


@Component({
  selector: 'app-add-contest',
  templateUrl: './add-contest.component.html',
  styleUrls: ['./add-contest.component.css']
})
export class AddContestComponent implements OnInit {
  registerForm: FormGroup;
  title = new FormControl('', [Validators.required]);
  contents = new FormControl('', [Validators.required]);
  writer = new FormControl('', [Validators.required]);
  tags = new FormControl('', [Validators.required]);
  host = new FormControl('', [Validators.required]);
  person = new FormControl('', [Validators.required]);
  field = new FormControl('', [Validators.required]);
  url_img = new FormControl('', [Validators.required]);


  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private contestService: ContestService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: this.title,
      contents: this.contents,
      writer: this.writer,
      tags: this.tags,
      host: this.host,
      person: this.person,
      field: this.field
      
      //,url_img: this.url_img
    });


  }
  
  register() {
    this.contestService.addContest(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully registered!', 'success');
        this.router.navigate(['/contest']);
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );
    this.uploader.uploadAll();
  }

  register2() {
   if(this.uploader.queue.length >0) {
    this.registerForm.value.url_img = 'uploads/'+this.uploader.queue[0].file.name;
    this.uploader.uploadAll()
   } 
    this.contestService.addContest(this.registerForm.value).subscribe(
      res => {

        this.toast.setMessage('you successfully registered!', 'success');
        this.router.navigate(['/contest']);
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );


    
  }

}
