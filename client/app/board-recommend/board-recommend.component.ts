import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { MatchService } from '../shared/services/match.service';
import { RecommendService } from '../shared/services/recommend.service';
import { AuthService } from '../shared/services';
import { OrderPipe } from 'ngx-order-pipe';
import { UserService } from '../shared/services/user.service';
import { ContestService } from '../shared/services/contest.service';



//this.getMatchs();


@Component({
  selector: 'app-board-recommend',
  templateUrl: './board-recommend.component.html',
  styleUrls: ['./board-recommend.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BoardRecommendComponent implements OnInit {

  // pie chart
  public pieChartLabels: string[] = ['기획/아이디어', '과학/공학', '디자인', '캐릭터/만화/게임'];
  public pieChartData: number[] = [7, 5, 3, 2];
  public pieChartType: string = 'pie';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  //bar chart

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['공모전1', '공모전2', '공모전3', '공모전4'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81] , label: '공모전 조회수'},
  ];
  



  g_keyward = ["컴퓨터","공학", "전자","정보", "IT","시스템","산업","기계"];
  y_keyward = ["인테리어","패션","시각","영상","디자인"];
  s_keyward = ["경영","경제","무역","행정"];
  I_keyward = ["한국어","문학","시나리오","영어","영문","역사","작문","독해"];
  recommendMatchs = [];
  contests = [];
  matchs = [];
  resultmatchs = [];
  match = {};
  isLoading = true;
  
  users = [];
  recommendContests = [];
  
  //Pipe
  order: string = 'created_at';
  reverse: boolean = true;
  
  //page 넘버링 할 때 쓰는 변수
  p:number = 1;
  total: number;
    constructor(public toast: ToastComponent,
      private matchService: MatchService,
      public auth: AuthService,
      private orderPipe: OrderPipe,
      private recommendService: RecommendService,
      private userService: UserService,
      private contestService: ContestService) {
  
  
       }
  //나의 프로필 정보상태야
  // 매칭글 다 끌고와
  // 비교해 -- 유사도 점수 주고 제일 높은 한놈 가져와
  // 보여줘
  
    ngOnInit() {
      //최종으로 contests, matchs에 보여줄 것 담는다.
      this.getUsers();
      this.getMatchs();
  
    }
  
    //recommendContests 추천 공모전 나왔으면 각각 contestid 값으로 find 하여 담아야죠~
  
    
    getContest() {
      var sortingField = "hits";
      this.recommendContests.sort(function(a, b) { // 내림차순
        return b[sortingField] - a[sortingField];
    });
    if(this.recommendContests.length <5) {
      for (var i=0; i<this.recommendContests.length; i++) {
        this.contestService.getContest(this.recommendContests[i].contestid).subscribe(
          data => this.contests.push(data),
          error => console.log(error),
          () => {
            this.isLoading = false;
          }
        );
      }
    }
    else {
      for (var i=0; i<4; i++) {
        this.contestService.getContest(this.recommendContests[i].contestid).subscribe(
          data => this.contests.push(data),
          error => console.log(error),
          () => {
            this.isLoading = false;
          }
        );
      }
    }
    }
  
    getMatch() {
      console.log("박정환");
      console.log(this.recommendMatchs);
      var sortingField = "score";
      this.recommendMatchs.sort(function(a, b) { // 내림차순
        return b[sortingField] - a[sortingField];
    });
  
      for (var i=0; i<this.recommendMatchs.length; i++) {
        this.matchService.getMatch(this.recommendMatchs[i].matchid).subscribe(
          data => this.resultmatchs.push(data),
          error => console.log(error),
          () => {
            this.isLoading = false;
          }
        );
      }
  }
  
    //매치글 다들고오나?
    getMatchs() {
      this.matchService.getMatchs().subscribe(
        data => this.matchs = data,
        error => console.log(error),
        () => {
          this.isLoading = false;
          this.recommendMatch();  // 여기서 recommendMatch 하고 넘기자.
          this.getMatch();
        }
      );
    }
  
  
    getUsers() {
      this.userService.getUsers().subscribe(
        data => this.users = data,
        error => console.log(error),
        () => {
         this.recommeandToUser();
         this.getContest();
          this.isLoading = false;}
      );
    }
  
   //recommendContests 담긴 것 갯수 새어서 가장 많이 채택된 5개 보여준다.
      //this.auth.currentUser.major 
      //어떤 유저 정보 모을 것인지 테스트한다. 나는 it 선택한다.
      //유저가 가장 최근에 조회한 것들 추천 contestid 값에 넣는다.
      // 다 넣으면 후에 contest 조회 때린다. 
    //유저 기반으로 조회한 공모전의 리스트 뽑아서 recommendContests에 저장함
    recommeandToUser() {
      var contestid;
      for ( var i =0; i<this.users.length; i++) {
        
        if(this.auth.currentUser._id  != this.users[i]._id){
         
          if(this.auth.currentUser.major  == this.users[i].major) { //이 조건 까지 부합해야 시작 할 수 있음
            //page 갯수가 5개 이상이면 5개만 5개 미만이면 내식 대로
            if(this.users[i].pages.length>= 5) {
  
              for (var k =1; k<6; k++ ) {
                //이미 있는 페이징이면 1 추가 하고 아니면 그냥 요소 추가함.
                contestid =this.users[i].pages[(this.users[i].pages.length)-k];
                var flag = false;
                for ( var s=0; s<this.recommendContests.length; s++) {
                  if (this.recommendContests[s].contestid == contestid) {
                    this.recommendContests[s].hits += 1;
                    flag = true;
                    break;
                  }
                }
                //flag가 false 라면 기존에 없던 contestid이므로 직접 추가한다.
                if(!flag) {
                  this.recommendContests.push({contestid: contestid, hits: 1});
                }
               }
            }else if(this.users[i].pages.length>1 && this.users[i].pages.length<5) {
              for(var j=0; j< this.users[i].pages.length; j++) {
                contestid =this.users[i].pages[(this.users[i].pages.length)-1-j];
                for ( var s=0; s<this.recommendContests.length; s++) {
                  if (this.recommendContests[s].contestid == contestid) {
                    this.recommendContests[s].hits += 1;
                    flag = true;
                    break;
                  }
                }
                //flag가 false 라면 기존에 없던 contestid이므로 직접 추가한다.
                if(!flag) {
                  this.recommendContests.push({contestid: contestid, hits: 1});
                }
              }
            }
          }
        }
      }
    }
  
    //매칭 글에 tags -> majorGroup 이랑 연결
    recommendMatch() {
      console.log(this.auth.currentUser);
      for (var i=0; i<this.matchs.length; i++) {
        var score = 0;
        var str = String(this.matchs[i].major);
        
  
        if( this.auth.currentUser.username != this.matchs[i].writer){
        if(!this.matchs[i].matchstate) { //매칭 완료된 상태가 아니라면 조사 한다.
  
          //우선 match 의 tags 값이 유저의 majorGroup 값 비교 해서 점수 준다.
          //그다음 내용 컨텐츠 조사 해서 찾아서 비교하다.
  
  
  
          if(String(this.auth.currentUser.majorGroup).indexOf("공대") > -1) {
  
            score += 1;
            if ( String(this.matchs[i].tags[0]).indexOf("공학") > -1 ) {
              console.log("들어오냐");
              score += 1;
              for( var k=0; k<this.g_keyward.length; k++) {
                if(String(this.matchs[i].contents).indexOf(this.g_keyward[k]) > -1 ) {
                  score += 0.5;
                }
              }
            }
          }
          
  
  
          if(String(this.auth.currentUser.majorGroup).indexOf("예대") > -1 ) {
  
            score += 1;
            if ( String(this.matchs[i].tags[0]).indexOf("디자인") > -1  ) {
  
            score += 1;
            for( var k=0; k<this.y_keyward.length; k++) {
              if(String(this.matchs[i].contents).indexOf(this.y_keyward[k]) > -1 ) {
                score += 0.5;
              }
            }
          }
          else if ( String(this.matchs[i].tags[0]).indexOf("기획") > -1 ) {
  
            score += 1;
            for( var k=0; k<this.y_keyward.length; k++) {
              if(String(this.matchs[i].contents).indexOf(this.y_keyward[k]) > -1) {
                score += 0.5;
              }
            }
          }
          else if ( String(this.matchs[i].tags[0]).indexOf("아이디어") > -1 ) {
  
            score += 1;
            for( var k=0; k<this.y_keyward.length; k++) {
              if(String(this.matchs[i].contents).indexOf(this.y_keyward[k]) > -1 ) {
                score += 0.5;
              }
            }
          }
          else if ( String(this.matchs[i].tags[0]).indexOf("광고") > -1  ) {
            score += 1;
            for( var k=0; k<this.y_keyward.length; k++) {
              if(String(this.matchs[i].contents).indexOf(this.y_keyward[k]) > -1 ) {
                score += 0.5;
              }
            }
          }
          else if ( String(this.matchs[i].tags[0]).indexOf("마케팅") > -1  ) {
            score += 1;
            for( var k=0; k<this.y_keyward.length; k++) {
              if(String(this.matchs[i].contents).indexOf(this.y_keyward[k]) > -1 ) {
                score += 0.5;
              }
            }
          }
        }
          /** 
          if(this.auth.currentUser.education== this.matchs[i].education || this.auth.currentUser.major== this.matchs[i].major) {
            
            if(this.auth.currentUser.education== this.matchs[i].education && this.auth.currentUser.major== this.matchs[i].major) {
              score +=2;
            }
            else if(this.auth.currentUser.education== this.matchs[i].education) {
              score +=1;
            }
            else if(this.auth.currentUser.major== this.matchs[i].major) {
              score +=0.5;
            }
          }
          **/
          if(score >= 1.5) {
            this.recommendMatchs.push({matchid: this.matchs[i]._id, score: score});
          }
        }
      }    
      } 
    }
  
    setOrder(value: string){
      if(this.order === value){
        this.reverse = !this.reverse;
      }
  
      this.order = value;
    }
}