import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { MatchService } from '../shared/services';
import { OrderPipe } from 'ngx-order-pipe';
import { Match } from '../shared/models/match.model';




@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {


  matchs: Match;
  isLoading = true;
  mypage: String="profile";




  constructor(public toast: ToastComponent,
    private matchService: MatchService,
    public auth: AuthService,
    private orderPipe: OrderPipe){}

  ngOnInit(){
    this.getMatchsWriter();
  }

  getMatchsWriter() {
    var url ='/api/searchmatchs';
    var writer = "writer";
    this.matchService.search(url+"?"+writer+"="+this.auth.currentUser.username).subscribe(
      data => this.matchs = data,
      error => console.log(error),
      () => {
        this.isLoading = false;
        console.log(Object.keys(this.matchs).length);
      }
    );
  }
  mypageTab(menu){
    this.mypage = menu;
  }
}