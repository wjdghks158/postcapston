import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class ContestService extends BaseService  {
  //private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
 // private options = new RequestOptions({ headers: this.headers });
  constructor(protected http: Http) {
    super(http);
   }


   getLimitContests() : Observable<any> {
    return this.http.get('/api/contestslimit').map(res => res.json());
   }


  addContest(contest): Observable<any> {
    return this.http.post('/api/contest', JSON.stringify(contest), this.options);
  }


  getContests() {
    return this.http.get('/api/contests').map(res => res.json());
  }

  getContest(id): Observable<any> {
    return this.http.get(`/api/contest/${id}`).map(res => res.json());
  }


}
