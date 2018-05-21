import { ContestService } from './../../shared/services/contest.service';
import { UserService } from './../../shared/services/user.service';
import { CategoryService } from './../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatchService } from '../../shared/services/match.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../shared/services';


@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {
  registerForm: FormGroup;

  title = new FormControl('', [Validators.required]);
  contents = new FormControl('', [Validators.required]);
  writer = new FormControl('');
  tags = new FormControl('', [Validators.required]);
  contest_id = new FormControl('');
  search_title= new FormControl('');
  categorys;
  user =  { _id: '', username: '', role: '', email: '', age: '', job: '', location: '', phone: '', education: '', major: '', introduction: '', preference: {department: ''}, pages:[] };
  isLoading = true;

  //contest search
  selected_contest: string;
  contests=[];
  contest_title: string="title";
  isSearching = true;
  temp_id: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private matchService: MatchService,
    private categoryService: CategoryService,
    private userService: UserService,
    private contestService: ContestService,
    public auth: AuthService) { this.categorys = categoryService.Category; }

  ngOnInit() {
    this.getUser();
    this.registerForm = this.formBuilder.group({
      title: this.title,
      contents: this.contents,
      writer: this.writer,
      tags: this.tags,
      contest_id: this.contest_id,
      search_title : this.search_title
    });

  }

  register() {
    this.matchService.addMatch(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully registered!', 'success');
        this.router.navigate(['/match']);
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    ); 
  }
  searchEnter(){
    //this.router.navigate(["/search/keyword?" + this.value]);
    var url ='/api/searchcontests';
    var a = "title";
    console.log('searchContests 들어오는거 맡죠');
    this.contestService.search(url+"?"+a+"="+this.search_title).subscribe(
      data => this.contests = data,
      error => console.log(error),
      () => {
        this.isLoading = false;
        this.isSearching = false;
        
        console.log(Object.keys(this.contests).length);
        //this.router.navigate(["/search/keyword?" + this.value]);
      }
    );
  }
  titleClick(id, title){
    this.isSearching = true;
    this.contest_title = title;
    this.temp_id = id;
    console.log(this.temp_id);
  }

}
