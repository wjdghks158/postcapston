import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService, UserService } from '../shared/services';

@Component({
  selector: 'app-register-ok',
  templateUrl: './register-ok.component.html',
  styleUrls: ['./register-ok.component.css']
})
export class RegisterOkComponent implements OnInit {
  user = { _id: '', username: '', role: '', email: '', age: '', job: '', location: '', phone: '', education: '',
  major: '', majorGroup: '', introduction: '', preference: {department: ''}, pages:[], kakaoid: '' , skill: '' , interest: '' };
  isLoading = true;

  constructor(private auth: AuthService,
    public toast: ToastComponent,
    private userService: UserService) { }


  ngOnInit() {
    this.getUser();
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
  }
  selectMajor(user, value){
    user.major = value;
  }
  selectMajorGroup(user, value){
    user.majorGroup = value;
  }
}