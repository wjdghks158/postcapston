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


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


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

  test(): Observable<any> {
    console.log("김코코");
    var data = { name : "asd"};
    return ;

  }

  test2() {
    this.test().subscribe(
      () => {
      console.log("박정환");
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );
  }

 a(num) {
   console.log( "a 함수 실행");
 }
 b(num) {
  console.log( "b 함수 실행");
  return new Promise(function( resoleve, reject){
    console.log("promise 실험중");

  });
}



  test3() {
    console.log("콜백 test3 실험중");
    this.b(3);

console.log("숫서파악1");
    var p1 = new Promise(function(resolve, reject) {

      
console.log("숫서파악2");
for(var i=0 ; i<5000000; i++) {
  if(i> 4000000 && i < 4000003) {
    console.log("test");
  }
}
  reject("실패야 병신아!");

console.log("숫서파악3");
      // 또는
      // reject ("Error!");
    });
    
    p1.then(function(value) {

console.log("숫서파악4");
      console.log(value); // 성공!
    }, function(reason) {

console.log("숫서파악5");
      console.log(reason); // 오류!
    });

console.log("숫서파악6");

    return this.b(3).then(
      () =>console.log(" anjduajnduanjdu ")

    );
    
  }


  goChat() {
    this.chatroom.username =[];
    this.chatroom.username.push(this.auth.currentUser.username);
    this.chatroom.username.push(this.match.writer);
    console.log("ㅎㅇ");

    this.chatRoomService.chatRooms = [];
    this.chatRoomService.getChatRooms(this.auth.currentUser.username).subscribe(
      data => this.chatRoomService.chatRooms = data,
      error => console.log(error),
      () => {
        console.log(this.chatRoomService.chatRooms);
        let chatRooms = [];
        let chatRoom  = {   messages : [], messagesCount : '', newMessagesCount : '', username : [], _id : ''}
        let isChatUser = false ;
      
        for( var i = 0; i<this.chatRoomService.chatRooms.length;i++){
          chatRoom = this.chatRoomService.chatRooms[i];
          chatRooms.push(chatRoom);         
        }

        
        
        for( var i =0; i < chatRooms.length; i++) {
          console.log(chatRooms[i].username.length);
    
          for( var j =0; j < chatRooms[i].username.length; j++) {
            if(chatRooms[i].username[j] == this.match.writer){
              console.log("있음");
              // 있으면 기존꺼 쓰고 
              isChatUser = true;
              this.chatRoomService.setCurrentChatRoomId(chatRooms[i]._id);
              this.chatRoomService.joinRoom(chatRooms[i]._id,this.auth.currentUser.username);
              this.router.navigate(['/chatbox/'+chatRooms[i]._id]);
              break;
            }
          }
          if(isChatUser) {
            break;
          }
          else {
              //방 생성할꺼임
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
              break;
          }
        }
console.log("이게 안돌아?");
console.log(chatRooms.length);
        if(chatRooms.length == 0) {
          console.log("이젠 돌겠지...");
              //방 생성할꺼임
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
      });   
  }
/*
  goChatRoom(roomId) {
    this.sidenavToggle();
    this.chatRoomService.setCurrentChatRoomId(roomId);
    //this.router.navigate(['/chatbox/'+roomId]);
    if (!this.openchat) {
      console.log("asdasdasdasasdasdasd 채팅방 열었잖아");
      this.openchat = true;
    }

  }
  */



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
    console.log("matchRequest 박정환 테스트");
    this.bsModalRef = this.modalService.show(PopupSendComponent);
    this.bsModalRef.content.sender = this.auth.currentUser.username;
    this.bsModalRef.content.receiver = this.match.writer;
    this.bsModalRef.content.matchid = this.match._id;
   let mytime =  setTimeout(
      () => {
        console.log("기다리기");
      },
      1000);

      clearTimeout(mytime);

    //modalRef.componentInstance.setMessage(sender, receiver, match_id);
   
  }

}
