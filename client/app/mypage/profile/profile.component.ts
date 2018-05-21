import { Component, OnInit } from '@angular/core';
import { AuthService, UserService } from '../../shared/services';
import { ToastComponent } from '../../shared/toast/toast.component';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  

  user =  { _id: '', username: '', role: '', email: '', age: '', job: '', location: '', phone: '', education: '', major: '', introduction: '', preference: {department: ''}, pages:[] 
  ,kakaoid: '', interest: '', majorGroup: '', skill: '' };
  //user: User;
  isLoading = true;

  //importance: number;

  enoughEducation: boolean = false;
  
  constructor(private auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }
  changeEducation(value){
    if(value == '고졸' || value == '중졸'){
      this.enoughEducation = false;
      this.user.majorGroup = "";
      this.user.major = "";
    }
    this.enoughEducation = true;
  }
  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  save(user) {
    this.userService.editUser(user).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error),
      () => {
        this.auth.setCurrentUser(user);
      }
    );
    console.log(user);
  }

  selectEducation(user, value){
    user.education = value;
    this.user.education = value;
  }
  selectMajor(user, value){
    user.major = value;
    this.user.major = value;
  }
  selectMajorGroup(user, value){
    user.majorGroup = value;
    this.user.majorGroup = value;
  }
}