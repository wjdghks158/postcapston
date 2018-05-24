import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService, AppGlobals } from '../shared/services';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  username = new FormControl('', [Validators.required,
  Validators.minLength(2),
  Validators.maxLength(30),
  Validators.pattern('[a-zA-Z0-9_-\\s]*')]);
  email = new FormControl('', [Validators.required,
  Validators.minLength(3),
  Validators.maxLength(100)]);
  password = new FormControl('', [Validators.required,
  Validators.minLength(6)]);

  role = new FormControl('');

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private userService: UserService,
    private auth: AuthService,
    private appGlobals: AppGlobals) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    });
  }

  // setClassUsername() {
  //   return { 'has-danger': !this.username.pristine && !this.username.valid };
  // }
  // setClassEmail() {
  //   return { 'has-danger': !this.email.pristine && !this.email.valid };
  // }
  // setClassPassword() {
  //   return { 'has-danger': !this.password.pristine && !this.password.valid };
  // }

  register() {
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.login();
        console.log("aaaaaa");
      },
      error => this.toast.setMessage('Something already exists', 'danger')
    );
  }

  login() {
    var loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });

    this.auth.login(loginForm.value).subscribe(
      res => {
        this.router.navigate(['/registerok']);

        this.appGlobals.userInfo = res;
        this.toast.setMessage('가입을 축하드립니다.!', 'success');
      },
      error => this.toast.setMessage('invalid email or password!', 'danger')
    );
  }


}
