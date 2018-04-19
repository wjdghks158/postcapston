import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService, AppGlobals } from '../shared/services';
import { ToastComponent } from '../shared/toast/toast.component';
import { UserService } from '../shared/services/user.service';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email = new FormControl('', [Validators.required,
  Validators.minLength(3),
  Validators.maxLength(100)]);
  password = new FormControl('', [Validators.required,
  Validators.minLength(6)]);

  constructor(private auth: AuthService,
    private formBuilder: FormBuilder,
    private appGlobals: AppGlobals,
    private router: Router,
    public toast: ToastComponent,
    private userService: UserService,) { }

  ngOnInit() {
    if (this.auth.loggedIn) {
      this.router.navigate(['/']);
    }
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }
  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      res => {
        console.log(this.auth.currentUser);
        if(this.auth.currentUser.pages.length > 30){
          console.log('30개 넘는구나');
          for( var i = 0 ; i<(this.auth.currentUser.pages.length-20); i++ ) {
            this.auth.currentUser.pages.shift();
          }
          console.log(this.auth.currentUser.pages.length);
          this.save(this.auth.currentUser);
        }
        
        this.router.navigate(['/']);
        this.appGlobals.userInfo = res;
      },
      error => this.toast.setMessage('invalid email or password!', 'danger')
    );
  }

  save(user) {
    this.userService.editUser(user);
  }



}
