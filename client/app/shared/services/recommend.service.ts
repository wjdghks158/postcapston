import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class RecommendService extends BaseService {

  constructor(protected http: Http) {
    super(http);
   }

  //유저 정보 넘겨서 가장 대박인놈 조진다.
  recommendMostMatch(matchid): Observable<any> {
    console.log("getMesssages에 id값 잘 갔나? : "+matchid);
    return this.http.get(`/api/message/${matchid}`).map(res => res.json());
  }

  }

