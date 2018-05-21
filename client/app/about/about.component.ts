import { Component, OnInit } from '@angular/core';
import { ContestService } from '../shared/services/contest.service';





@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements  OnInit{

  noPause = false;
  contests = [];
  isLoading = true;

  constructor(private contestService: ContestService) { }


  

  
  background_img: String = "wood-3182655_1920.jpg";
  title: String = "공모전 검색";
  subtitle: String = "다양한 공모전을 쉽게 검색해보세요";
  link: String="/contest";
  h1_title = [
    "공모전 검색",
    "매칭 시스템",
    "공모전 추천"
  ];
  b_subtitle = [
    "다양한 공모전을 쉽게 검색해보세요",
    "같이 할 팀원들을 구해보세요",
    "입력한 데이터를 기반으로 공모전을 추천해드립니다"
  ];


  ngOnInit(): void {
    console.log("AboutComponent");

    this.getContests();
  }

  getContests() {
    this.contestService.getLimitContests().subscribe(
      data => this.contests = data,
      error => console.log(error),
      () => {
        this.isLoading = false;
        console.log(Object.keys(this.contests).length);
        console.log(this.contests);
        this.contests.sort(function(a, b) { // 내림차순
          return b["hits"] - a["hits"];
      });
      console.log(this.contests);

      }
    );
  }





  mouseEnter(background: String, number: number){
    this.background_img = background;
    this.title = this.h1_title[number];
    this.subtitle = this.b_subtitle[number];
    if(this.title === '공모전 검색'){
      this.link = "/contest";
    }else if(this.title === '매칭 시스템'){
      this.link = "/match";
    }else if(this.title === '공모전 추천'){
      this.link = "/recommend";
    }


    
  }

}