import { Component, OnInit } from '@angular/core';
import { ContestService } from '../shared/services/contest.service';
import { OrderPipe } from 'ngx-order-pipe';
import { Router } from '@angular/router';
import { CategoryService } from '../shared/services/category.service';
@Component({
  selector: 'app-board-contest',
  templateUrl: './board-contest.component.html',
  styleUrls: ['./board-contest.component.css']
})
export class BoardContestComponent implements OnInit {
  contests = [];
  isLoading = true;
  
  isSearched : boolean = false;
  value = '';

  //category
  categorys;    //category list
  selectedCategory: string; //search category

  //order pipe
  order: string = '';
  reverse: boolean = false;


  constructor(private contestService: ContestService, private category: CategoryService, private router: Router, private orderPipe: OrderPipe) { 
    this.categorys = category.Category;
  }

  ngOnInit() {
    this.getContests();
    
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

  searchEnter(){
    //this.router.navigate(["/search/keyword?" + this.value]);
    var url ='/api/searchcontests';
    
    var a = "title";
    console.log('searchContests 들어오는거 맡죠');
    this.contestService.search(url+"?"+a+"="+this.value).subscribe(
      data => this.contests = data,
      error => console.log(error),
      () => {
        this.isLoading = false;
        console.log(Object.keys(this.contests).length);
        //this.router.navigate(["/search/keyword?" + this.value]);
      }
    );
  }

  categorySearch(value){
    this.contests = [];
    this.selectedCategory = value;
    if(value=="All"){
      console.log("All Click");
      this.getContests();
    } else{
      var url ='/api/searchcontests';

      var a = "tags";
  
      this.contestService.search(url+"?"+a+"="+this.selectedCategory).subscribe(
        data => this.contests = data,
        error => console.log(error),
        () => {
          this.isLoading = false;
          console.log(Object.keys(this.contests).length);
          //this.router.navigate(["/search/keyword?" + this.value]);
        }
      );
      
    }
    
  }

  setOrder(value: string){
    console.log(value);
    if(this.order === value){
      this.reverse = !this.reverse;
    }
    this.order = value;
  }


  searchContests() {
    var url ='/api/searchcontests';
    
    var title = {
      title: "2018"
    };
    var a = "title";
    var b = "2018 제10회 대학생 공작기계 창의아이디어 공모전";
    console.log('searchContests 들어오는거 맡죠');
    this.contestService.search(url+"?"+a+"="+b).subscribe(
      data => this.contests = data,
      error => console.log(error),
      () => {
        this.isLoading = false;
        console.log(Object.keys(this.contests).length);
      }
    );
  }
}


