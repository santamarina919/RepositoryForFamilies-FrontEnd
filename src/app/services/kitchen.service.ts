import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BASE_URL} from '../../utils/server.consts';


@Injectable({providedIn : 'root'})
export class KitchenService {
  static MEAL_COUNT_ENDPOINT = '/kitchen/api/member/mealcount?'

  http = inject(HttpClient)

  async MealCount(groupId :string) {
     return this.http.get<number>(
       BASE_URL + KitchenService.MEAL_COUNT_ENDPOINT,
       {
         params : new HttpParams().set('groupId',groupId),
         observe : 'response',
         withCredentials : true
       }
     )
  }

}
