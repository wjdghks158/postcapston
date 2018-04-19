import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
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

import { AuthGuardLogin, AuthGuardAdmin } from './shared/services';


import { BoardMatchComponent } from './board-match/board-match.component';
import { BoardRecommendComponent } from './board-recommend/board-recommend.component';
import { BoardContestComponent } from './board-contest/board-contest.component';
import { MessagesComponent } from './mypage/messages/messages.component';
import { ShowMatchComponent} from './board-match/show-match/show-match.component'
import { ShowContestComponent } from './board-contest/show-contest/show-contest.component';
import { AddMatchComponent } from './board-match/add-match/add-match.component'
import { AddContestComponent } from './board-contest/add-contest/add-contest.component';
import { UpdateMatchComponent } from './board-match/update-match/update-match.component'
import { UpdateContestComponent } from './board-contest/update-contest/update-contest.component';


import { MypageComponent } from './mypage/mypage.component';
import { SearchContestComponent } from './board-contest/search-contest/search-contest.component';
import { PostsComponent } from './mypage/posts/posts.component';
import { ProfileComponent } from './mypage/profile/profile.component';
import { SelectContestsComponent } from './mypage/select-contests/select-contests.component';
import { RegisterOkComponent } from './register-ok/register-ok.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'attendances', component: AttendancesComponent },
  { path: 'attendanceReport', component: AttendanceReportComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'match', component: BoardMatchComponent },
  { path: 'match/:id', component: ShowMatchComponent, data: {inStock: false} },
  { path: 'recommend', component: BoardRecommendComponent },
  { path: 'contest', component: BoardContestComponent },
  { path: 'contest/:id', component: ShowContestComponent, data: {inStock: false} },
  { path: 'search', component: SearchContestComponent },
  { path: 'search/:id', component: SearchContestComponent },
  { path: 'showmatch', component: ShowMatchComponent },
  { path: 'addmatch', component: AddMatchComponent },
  { path: 'updatematch', component: UpdateMatchComponent },
  { path: 'addcontest', component: AddContestComponent },
  { path: 'updatecontest', component: UpdateContestComponent },
  { path: 'mypage', component: MypageComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'selectcontests', component: SelectContestsComponent },
  { path: 'registerok', component: RegisterOkComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
