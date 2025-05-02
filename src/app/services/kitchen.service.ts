import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BASE_URL} from '../../utils/server.consts';
import {group} from '@angular/animations';
import {Meal} from '../types/Meal';
import {Ingredient} from '../types/Ingredient';


@Injectable({providedIn : 'root'})
export class KitchenService {
  static MEAL_COUNT_ENDPOINT = '/kitchen/api/member/mealcount?'

  static ALL_MEALS_ENDPOINT = '/kitchen/api/member/allmeals?'

  static ALL_INGREDIENTS_ENDPOINT = '/kitchen/api/member/ingredients?';

  static FULL_MEAL_DETAIL_ENDPOINT = '/kitchen/api/member/meal?'

  static KITCHEN_ITEM_DETAILS = '/kitchen/api/member/item?'

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

  async allMeals(groupId :string) {
    return this.http.get<Meal[]>(
      BASE_URL + KitchenService.ALL_MEALS_ENDPOINT,
      {
        params : new HttpParams().set('groupId',groupId),
        observe : 'response',
        withCredentials : true
      }
    )
  }

  async allItems(groupId :string){
    return this.http.get<Ingredient[]>(
      BASE_URL + KitchenService.ALL_INGREDIENTS_ENDPOINT,{
        params : new HttpParams().set('groupId',groupId),
        observe : 'response',
        withCredentials : true
      }
    )
  }

  async getMeal(groupId :string, mealId :string){
    return this.http.get<Meal>(
      BASE_URL + KitchenService.FULL_MEAL_DETAIL_ENDPOINT,
      {
        withCredentials : true,
        params : new HttpParams().set('groupId',groupId).set('mealId',mealId),
        observe : 'response'
      }
    )
  }

  async getItem(groupId :string, itemName : string){
    return this.http.get<Ingredient>(
      BASE_URL + KitchenService.KITCHEN_ITEM_DETAILS,
      {
        withCredentials : true,
        params : new HttpParams().set('groupId',groupId).set('itemName',itemName),
        observe : 'response'
      }
    )
  }


}
