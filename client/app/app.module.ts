import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, CarouselModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {MatTooltipModule} from '@angular/material/tooltip';

import { MaterialModule } from './shared/modules';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import {
UserService, AuthService,
  AuthGuardLogin, AuthGuardAdmin,BaseService,
  AppGlobals, RecommendService, ContestService, MatchService,
  UploadService, MessageService, CategoryService, SocketService, ChatRoomService
} from './shared/services';

import { PopupSendComponent } from '../../client/app/shared/popup-send/popup-send.component';
import { PopupMatchcompleteComponent } from '../../client/app/shared/popup-matchcomplete/popup-matchcomplete.component';
import { PopupMatchrequestComponent } from '../../client/app/shared/popup-matchrequest/popup-matchrequest.component';


import { AppComponent } from './app.component';
import { AttendancesComponent } from './attendances/attendances.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmployeeComponent } from './employee/employee.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { BoardMatchComponent } from './board-match/board-match.component';
import { BoardContestComponent } from './board-contest/board-contest.component';
import { BoardRecommendComponent } from './board-recommend/board-recommend.component';
import { UpdateMatchComponent } from './board-match/update-match/update-match.component';
import { ShowMatchComponent } from './board-match/show-match/show-match.component';
import { AddMatchComponent } from './board-match/add-match/add-match.component';
import { AddContestComponent } from './board-contest/add-contest/add-contest.component';
import { ShowContestComponent } from './board-contest/show-contest/show-contest.component';
import { UpdateContestComponent } from './board-contest/update-contest/update-contest.component';
import { RankRecommendComponent} from './board-recommend/rank-recommend/rank-recommend.component'


import { FileUploadModule   } from 'ng2-file-upload/ng2-file-upload';
import {NgxPaginationModule} from 'ngx-pagination';

//0406
import { OrderModule } from 'ngx-order-pipe';
import { MypageComponent } from './mypage/mypage.component';
import { SearchContestComponent } from './board-contest/search-contest/search-contest.component';
import { ProfileComponent } from './mypage/profile/profile.component';
import { SelectContestsComponent } from './mypage/select-contests/select-contests.component';
import { PostsComponent } from './mypage/posts/posts.component';
import { MessagesComponent } from './mypage/messages/messages.component';
import { MatSliderModule, MatExpansionModule, MatListModule, MatTabsModule } from '@angular/material';
import { SidebarComponent } from './mypage/sidebar/sidebar.component';
import { RegisterOkComponent } from './register-ok/register-ok.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { ChatwindowComponent } from './chatwindow/chatwindow.component';



@NgModule({
  declarations: [
    AppComponent,
    AttendancesComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    EmployeeComponent,
    AttendanceReportComponent,
    BoardMatchComponent,
    BoardContestComponent,
    BoardRecommendComponent,
    UpdateMatchComponent,
    ShowMatchComponent,
    AddMatchComponent,
    AddContestComponent,
    ShowContestComponent,
    UpdateContestComponent,
    PopupSendComponent,
    MypageComponent,
    SearchContestComponent,
    ProfileComponent,
    SelectContestsComponent,
    PostsComponent,
    MessagesComponent,
    PopupMatchcompleteComponent,
    SidebarComponent,
    RegisterOkComponent,
    ChatboxComponent,
    PopupMatchrequestComponent,
    ChatwindowComponent,
    RankRecommendComponent
    
  ],
  imports: [
    FileUploadModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    SharedModule,
    JwtModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    OrderModule,
    MatSliderModule,
    MatExpansionModule,
    MatListModule,
    MatTabsModule,
    MatTooltipModule
  ],
  exports: [
    FileUploadModule,
    // Shared Modules
    PopupSendComponent,
    PopupMatchcompleteComponent,
    PopupMatchrequestComponent
  ],
  providers: [// all are singleton
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    UserService,
    AppGlobals,
    RecommendService,
    MatchService,
    ContestService,
    UploadService,
    MessageService,
    PopupSendComponent,
    CategoryService,
    PopupMatchcompleteComponent,
    SocketService,
    ChatRoomService,
    PopupMatchrequestComponent,
    BaseService],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
