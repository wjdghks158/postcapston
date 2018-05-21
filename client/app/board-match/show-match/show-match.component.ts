import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';
import { MatchService } from '../../shared/services/match.service';
import { ChatRoomService } from '../../shared/services/chat-room.service';
import { AuthService } from '../../shared/services';

import { BsModalService  } from 'ngx-bootstrap/modal';
import { ModalModule,BsModalRef } from 'ngx-bootstrap';
import {PopupSendComponent} from '../../shared/popup-send/popup-send.component'
import {PopupMatchcompleteComponent} from '../../shared/popup-matchcomplete/popup-matchcomplete.component'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-show-match',
  templateUrl: './show-match.component.html',
  styleUrls: ['./show-match.component.css']
})
export class ShowMatchComponent implements OnInit {

  registerForm: FormGroup;
  contents = new FormControl('', [Validators.required]);



  bsModalRef: BsModalRef;
  id: string;
  currentUser = { _id: '', username: '', role: '' };
  match = {_id: '',
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

  chatroom={
    username : [],
    messagesCount: 0,
    newMessagesCount: 0,
    messages: []
  }

  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }


  goChat() {
    this.chatroom.username =[];
    this.chatroom.username.push(this.auth.currentUser.username);
    this.chatroom.username.push(this.match.writer);
    console.log("ㅎㅇ");
    
    this.chatRoomService.createRoom(this.chatroom).subscribe(
      res => {
        this.router.navigate(['/']);
        let roominfo = res.json();
        console.log(roominfo);
        console.log("chatRoomServicechatRoomServicechatRoomServicechatRoomService");
        this.chatRoomService.setCurrentChatRoomId(roominfo._id);
        this.chatRoomService.joinRoom(roominfo._id,this.auth.currentUser.username);
        this.router.navigate(['/chatbox/'+roominfo._id]);
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );
  }

  onSubmit() {
    console.log(this.match);
    console.log(this.registerForm.value);
    //this.match.comments.push(this.registerForm.value)

    this.matchService.addComments(this.match._id,this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully registered!', 'success');
        this.router.navigate(['/match']);
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );


  }



  constructor(private formBuilder: FormBuilder, private _route: ActivatedRoute, public toast: ToastComponent,
    private matchService: MatchService, public auth: AuthService,
    private chatRoomService: ChatRoomService,
    private router: Router, private modalService: BsModalService) {

  }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this.getMatch(this.id);

    this.registerForm = this.formBuilder.group({
      contents: this.contents,
      writer: this.auth.currentUser.username,

    });


  }

  getMatch(id) {
    this.matchService.getMatch(id).subscribe(
      data => this.match = data,
      error => console.log(error),
      () => {
        console.log(this.match);
        this.isLoading = false;
      }
    );
  }
 // 아이디 값으로 나의 id 값 그리고 매칭 게시판 올린 친구한테 메시지 가야함

//매칭 완료, 매칭 진행중, 매칭 공모 완료

//매칭 완료, 매칭 진행중, 매칭 공모 완료
//1. 로그인 상태 -> 글쓴이 라면 버튼 하나 보임 - 완료
//2. 버튼 누름 -> 팝업창 하나 뜸  - 완료
//3. 라디오 버튼 매칭 신청한 놈들 리스트 나옴 체크 후(최신 순으로) -> 매칭 완료  - 완료


//4. 매칭 상대, 매칭 상태 match db update



//5. 매칭 상대 고른것이라면 매칭 상태의 userid 들어가고 매칭 상태 매칭완료 뜸
//6. 매칭 상태 안고르면 매칭 상태 비어있고 매칭 상태 매칭완료 뜸
//7. html에서 매칭완료된놈 매칭완료 된놈이라고 뜬다.
matchComplete() {
  this.matchService.currentMatchId = this.match._id;
  this.bsModalRef = this.modalService.show(PopupMatchcompleteComponent);
  this.bsModalRef.content.match_id = this.match._id;
}

  matchRequest() {

    this.bsModalRef = this.modalService.show(PopupSendComponent);
    this.bsModalRef.content.sender = this.auth.currentUser.username;
    this.bsModalRef.content.receiver = this.match.writer;
    this.bsModalRef.content.matchid = this.match._id;
    setTimeout(
      () => {
        console.log("기다리기");
      },
      1000);

    //modalRef.componentInstance.setMessage(sender, receiver, match_id);
   
  }

}
