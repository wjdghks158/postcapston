import { Component, OnInit } from '@angular/core';

import { OrderPipe } from 'ngx-order-pipe';
import { ToastComponent } from '../../shared/toast/toast.component';
import { MatchService, AuthService } from '../../shared/services';




@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
// username이랑 match writer 이랑 같은 애들 모두 불러와
export class PostsComponent implements OnInit {
  matchs = [];
  isLoading = true;

  created_at = new Date();


  //Pipe
  order: string = 'created_at';
  reverse: boolean = true;

  //page 넘버링 할 때 쓰는 변수
  p:number = 1;
  total: number;

  constructor(public toast: ToastComponent,
    private matchService: MatchService,
    public auth: AuthService,
    private orderPipe: OrderPipe) { }

  ngOnInit() {
    this.getMatchsWriter();
  }

  setOrder(value: string){
    if(this.order === value){
      this.reverse = !this.reverse;
    }

    this.order = value;
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


}
