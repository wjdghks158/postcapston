import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class MatchService extends BaseService {

 // private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  //private options = new RequestOptions({ headers: this.headers });
  constructor(protected http: Http) {
    super(http);
   }
  getMatchs(): Observable<any> {
    return this.http.get('/api/matchs').map(res => res.json());
  }
  getMatchsWriter(writer): Observable<any> {
    return this.http.get('/api/matchs',writer).map(res => res.json());
  }
  getMatch(id): Observable<any> {
    return this.http.get(`/api/match/${id}`).map(res => res.json());
  }
  
  getsearch(search): Observable<any> {
    console.log(search);
    console.log("asdadsasd2");
    return this.http.get(`/api/searchmatchs`,JSON.stringify(search)).map(res => res.json());
  }



  addMatch(match): Observable<any> {
    return this.http.post('/api/match', JSON.stringify(match), this.options);
  }

  getUser(match): Observable<any> {
    console.log('client-services-user.services.ts');
    return this.http.get(`/api/user/${match._id}`).map(res => res.json());
  }

      // Update by id
      editByMatchId(id,entity): Observable<any> {
        return this.http.put( `/api/match/${id}`, JSON.stringify(entity), this.options);
        }



  

}
