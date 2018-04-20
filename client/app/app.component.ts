import { UserService } from './shared/services/user.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component, OnInit } from '@angular/core';
import { AuthService, AppGlobals, MessageService } from './shared/services';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // role: 'guest';
  constructor(public auth: AuthService, private appGlobals: AppGlobals, private userService: UserService, private router: Router,
    private activatedRoute: ActivatedRoute, private messageService :MessageService) { }

  isLoading = true;
  notRead: number;
  receiveMessages = [];
  more_info: string;
  user = {};
  ngOnInit() {

    if(this.auth.loggedIn) {
      this.getUser();
    }

    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        // this.role = this.appGlobals.userInfo.role;
      });
    // this.role = 'guest';
    //this.getReceiveMessage();

  }

getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.getReceiveMessage()
    );
  }
  
  getReceiveMessage() {
    var url ='/api/searchmessages';
    var receiver = "receiver";
    this.messageService.search(url+"?"+receiver+"="+this.auth.currentUser.username).subscribe(
      data => {
        console.log(data);
        for( var i=0; i<data.length; i++) {
          if(data[i].code == "1") { //수신함
            if(data[i].read_at == null) {  
              this.receiveMessages.push(data[i]);
            }
          }
        }
       // this.messages = data
      },
      error => console.log(error),
      () => {
        this.isLoading = false;
        console.log(Object.keys(this.receiveMessages).length);
        console.log(this.receiveMessages);
        this.notRead = Object.keys(this.receiveMessages).length;
      }
    );
  }

}