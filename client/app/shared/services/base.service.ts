import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BaseService {

  protected headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  protected options = new RequestOptions({ headers: this.headers });

  constructor(protected  http: Http) { }

  // Get all
  getAll(url: any): Observable<any> {
    return this.http.get(url).map(res => res.json());
  }

  // Count all
  count(url: any): Observable<any> {
    return this.http.get(url).map(res => res.json());
  }

  // search
  search(url: any): Observable<any> {
    console.log('base에 search 함수 들어옴'+url);
    return this.http.get(url).map(res => res.json());
  }

  // add
  add(url: any, entity: any): Observable<any> {
    return this.http.post('/api/user', JSON.stringify(entity), this.options);
  }

  // Get by id
  getById(url: any, entity: any): Observable<any> {
    return this.http.get(url + `${entity._id}`).map(res => res.json());
  }

  // Update by id
  editById(url: any, entity: any): Observable<any> {
    return this.http.put(url + `${entity._id}`, JSON.stringify(entity), this.options);
  }



  // Delete by id
  deleteById(url: any, entity: any): Observable<any> {
    return this.http.delete(url + `${entity._id}`, this.options);
  }

}
