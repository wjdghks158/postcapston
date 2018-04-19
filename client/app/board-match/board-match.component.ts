import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { MatchService } from '../shared/services/match.service';
import { AuthService } from '../shared/services';
import { OrderPipe } from 'ngx-order-pipe';
@Component({
  selector: 'app-board-match',
  templateUrl: './board-match.component.html',
  styleUrls: ['./board-match.component.scss']
})
export class BoardMatchComponent implements OnInit {
  matchs = [];
  isLoading = true;

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
    
    this.getMatchs();
    
  }

  getMatchs() {
    this.matchService.getMatchs().subscribe(
      data => this.matchs = data,
      error => console.log(error),
      () => {
        this.isLoading = false;
        console.log(Object.keys(this.matchs).length);
      }
    );
  }

  setOrder(value: string){
    if(this.order === value){
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  

}
