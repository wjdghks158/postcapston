import { Component, OnInit } from '@angular/core';
import { AuthService, UserService, ContestService } from '../../shared/services';

import { OrderPipe } from 'ngx-order-pipe';



@Component({
  selector: 'app-select-contests',
  templateUrl: './select-contests.component.html',
  styleUrls: ['./select-contests.component.css']
})
export class SelectContestsComponent implements OnInit {

  cleanpages = [];
  contests = [];
  isLoading = true;


  //Pipe
order: string = 'created_at';
reverse: boolean = true;

p:number = 1;
total: number;


  constructor(private auth: AuthService,
  private contestService: ContestService,
  private orderPipe: OrderPipe) {

   }

  ngOnInit() {
    this.cleanPage();
    this.getContest();
  }


  cleanPage() {

    console.log(this.cleanpages.length);
    for (var i = 0; i<this.auth.currentUser.pages.length; i++) {
      var isSearch = false;
      if(!(this.cleanpages.length == 0) ) {


        for( var k =0; k< this.cleanpages.length; k ++) {
          if(this.cleanpages[k].contestid == this.auth.currentUser.pages[i]) {
            isSearch = true;
          }
        }
      }

      if(!isSearch) {
        this.cleanpages.push({contestid: this.auth.currentUser.pages[i]});

      }
      
    }
  }


  getContest() {
    for (var i=0; i<this.cleanpages.length; i++) {
      //console.log(this.recommendContests[i].contestid);
      this.contestService.getContest(this.cleanpages[i].contestid).subscribe(
        data => this.contests.push(data),
        error => console.log(error),
        () => {
          //console.log(this.contests);
          this.isLoading = false;
        }
      );
    }
  }

  setOrder(value: string){
    if(this.order === value){
      this.reverse = !this.reverse;
    }
    
    this.order = value;
    }
}
