import { Injectable } from '@angular/core';
import { BaseService } from "app/core/service/baseService";
import { Http } from "@angular/http";
import { ADDRESS } from "app/config/server";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class StatisticsService extends BaseService{

  constructor(http: Http) {
    super(http)
  }

  getStatistics(username){
    return this.http.get(ADDRESS + '/statistics/' + username, this.options)
      .map(this.extractData)
      .catch((error:any) => {
        return Observable.throw(this.extractError(error) || 'Server error')})
  }

}