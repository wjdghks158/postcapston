import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';
import { ContestService } from '../../shared/services/contest.service';
import { MatchService, AuthService } from '../../shared/services';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-show-contest',
  templateUrl: './show-contest.component.html',
  styleUrls: ['./show-contest.component.scss']
})
export class ShowContestComponent implements OnInit {

  userpages = { _id: '', contestid: '' };


  //추천 공모전
  contests = [];

  
  //선택된 카테고리
  selectedCategory=[];
  value = '';

  //contest ID값
  id: string;

  //현재 공모전
  contest = {
    title: '',		// 글 제목
    host: '',		// 주최기관
    progress: '',		// 진행상황
    hits: '',		// 조회수
    contents: '',						// 글 내용
    writer: '',							// 글쓴 사람
    comments: [{		// 댓글
        contents:'',					// 댓글 내용
        writer: '',
        created_at: ''
    }],
    startline: '', //공모전 시작일
    deadline: '',  //공모전 마감일
    person: '',  // 참여 인원
    field : '', //분야
    tags: '', // tag 이름
    url : '', //사이트 url
    url_img: '', // 그림 url
    
    created_at: '', // 글 생성 시간
    updated_at: ''  // 글 수정 시간
  };
  isLoading = true;

  //매칭 글 
  matchs = [];
  //Pipe
  order: string = 'created_at';
  reverse: boolean = true;

  //page 넘버링 할 때 쓰는 변수
  p:number = 1;
  total: number;
  
  constructor(private _route: ActivatedRoute, public toast: ToastComponent,
    private contestService: ContestService,private matchService: MatchService,
    public auth: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this.getContest(this.id);
    this.getMatchs(this.id);
    this.categorySearch();
    this.userpages._id = this.auth.currentUser._id;
    this.userpages.contestid = this.id;
    this.addUserPages(this.userpages); //줘야할 변수는 contestID 값이랑 auth id 값
  }

  getContest(id) {
    this.contestService.getContest(id).subscribe(
      data => this.contest = data,
      error => console.log(error),
      () => {
        this.isLoading = false;
        console.log(this.contest.tags);
        this.selectedCategory = (this.contest.tags).split(",",1);
        console.log(this.selectedCategory[0]);
      }
    );
  }
  //match에서 contest_id값을 이용하여 검색
  getMatchs(id) {

    var url ='/api/searchmatchs';
    var a = "contest_id"
    var b = id;


    this.matchService.search(url+"?"+a+"="+b).subscribe(
      data => this.matchs = data,
      error => console.log(error),
      () => {
        this.isLoading = false;
        console.log(Object.keys(this.matchs).length);
        
      }
    );
  }
  categorySearch(){
    this.contests = [];
    this.selectedCategory;
    
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

  setOrder(value: string){
    if(this.order === value){
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  addUserPages(userpage) {
    this.userService.addUserPages(userpage).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error),
      () => {
        this.auth.currentUser.pages.push(userpage.contestid);
      }

      
    );
  }


}
