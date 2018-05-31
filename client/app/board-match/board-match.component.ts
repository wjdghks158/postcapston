import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { MatchService } from '../shared/services/match.service';
import { AuthService, ContestService, MessageService } from '../shared/services';
import { OrderPipe } from 'ngx-order-pipe';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { PopupMatchrequestComponent } from '../shared/popup-matchrequest/popup-matchrequest.component';
import { PopupMatchcompleteComponent } from '../shared/popup-matchcomplete/popup-matchcomplete.component';
@Component({
  selector: 'app-board-match',
  templateUrl: './board-match.component.html',
  styleUrls: ['./board-match.component.scss']
})
export class BoardMatchComponent implements OnInit {
  matchs = [];
  mymatchs = [];
  contest = [];
  Messages = [];
  selectmatch = {_id: '',
  title: '',		// 글 제목
  contents: '',					// 글 내용
  writer: '',						// 글쓴 사람
  comments: [{		// 댓글
      contents:'',					// 댓글 내용
      writer: '',
      created_at:'',
  }],
  field : '', //분야
  tags: '', // tag 이름
  hits: '',		// 조회수
  contest_id: '',
  created_at: '',
  updated_at: '',
  matchstate: '',
  matchuser: ''
  };
  isLoading = true;
  value = '';
  //Pipe
  order: string = 'created_at';
  reverse: boolean = true;

  //page 넘버링 할 때 쓰는 변수
  p:number = 1;
  total: number;

  bsModalRef: BsModalRef;
  
  constructor(public toast: ToastComponent,
    private matchService: MatchService,
    public auth: AuthService,
    private orderPipe: OrderPipe,
    private contestService: ContestService,
    private messageService: MessageService,
    private modalService: BsModalService) { }

  ngOnInit() {
    
    this.getMatchs();
    this.getMatchsWriter();
    this.getSendMessage();
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

  searchEnter(){
    //this.router.navigate(["/search/keyword?" + this.value]);
    var url ='/api/searchmatchs';
    
    var a = "title";
    console.log('searchContests 들어오는거 맡죠');
    this.matchService.search(url+"?"+a+"="+this.value).subscribe(
      data => this.matchs = data,
      error => console.log(error),
      () => {
        this.isLoading = false;
        console.log(Object.keys(this.matchs).length);
        //this.router.navigate(["/search/keyword?" + this.value]);
      }
    );

    
  }


  getMatchsWriter() {
    var url ='/api/searchmatchs';
    var writer = "writer";
    this.matchService.search(url+"?"+writer+"="+this.auth.currentUser.username).subscribe(
      data => this.mymatchs = data,
      error => console.log(error),
      () => {
        this.isLoading = false;
        console.log(Object.keys(this.mymatchs).length);
      }
    );
  }

  
  getContest(id) {
    this.contestService.getContest(id).subscribe(
      data => this.contest = data,
      error => console.log(error),
      () => {
        this.isLoading = false;
      }
    );
  }

  getSendMessage() {
    var url ='/api/searchmessages';
    var sender = "sender";
    this.messageService.search(url+"?"+sender+"="+this.auth.currentUser.username).subscribe(
      data => {
        console.log(data);
        for( var i=0; i<data.length; i++) {
          if(data[i].code == "2") { //발신함
            console.log("test" + data.length);
            this.Messages.push(data[i]);
            console.log(this.Messages[0].title);
          }
        }
       // this.messages = data
      },
      error => console.log(error),
      () => {
        this.isLoading = false;
        console.log(Object.keys(this.Messages).length);
        console.log(this.Messages);
      }
    );
  }


  mymatchclick(value){
    this.selectmatch = value;
  }

  messageClick(message){
    //open modal
    message.read_at = new Date();
    console.log(message);
    
    this.messageService.editMessage(message).subscribe(
      error => console.log(error),
      () => console.log("json :: "+ message.json())
    );
    
    this.bsModalRef = this.modalService.show(PopupMatchrequestComponent);
    this.bsModalRef.content.message = message;

  }

  matchComplete() {
    this.matchService.currentMatchId = this.selectmatch._id;
    this.bsModalRef = this.modalService.show(PopupMatchcompleteComponent);
    this.bsModalRef.content.match_id = this.selectmatch._id;
  }
}
