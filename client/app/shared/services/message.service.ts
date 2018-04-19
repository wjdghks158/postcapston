import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class MessageService extends BaseService {

  constructor(protected http: Http) {
    super(http);
   }

   sendMessage(message): Observable<any> {
    return this.http.post('/api/message', JSON.stringify(message), this.options);
  }


  getMesssages(matchid): Observable<any> {
    console.log("getMesssages에 id값 잘 갔나? : "+matchid);
    return this.http.get(`/api/message/${matchid}`).map(res => res.json());
  }

  editMessage(message): Observable<any> {
    return this.http.put(`/api/message/${message._id}`, JSON.stringify(message), this.options);
  }

}
