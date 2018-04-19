import { CategoryService } from './../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContestService } from '../../shared/services';

@Component({
  selector: 'app-search-contest',
  templateUrl: './search-contest.component.html',
  styleUrls: ['./search-contest.component.css']
})
export class SearchContestComponent implements OnInit {
  id: string;
  contests = [];
  j : any;
  Scontests = [];
  isLoading = true;
  cate;
  categorys;
  temp: string;
  keyword: string;

  constructor(private _route: ActivatedRoute, 
    private contestService: ContestService, 
    private category: CategoryService) {
      this.categorys = category.Category;
     }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    //this.getContests();
    if(this.id.indexOf("category") != -1){
      //category searching

      this.temp = this.id.slice(9);
      this.cate = this.categorys[this.temp];
      console.log("cate = " + this.cate.value);
    }
    else if(this.id.indexOf("keyword") != -1){
      //keyword searching

      this.temp = this.id.slice(8);
      this.keyword = this.temp;
    }
    
  }

  getContests() {
    this.contestService.getContests().subscribe(
      data => this.contests = data,
      error => console.log(error),
      () => {
        this.isLoading = false;
        console.log(Object.keys(this.contests).length);
      }
    );
  }
  
}
