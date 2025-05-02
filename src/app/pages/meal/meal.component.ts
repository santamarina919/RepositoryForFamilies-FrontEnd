import {Component, inject, OnInit, signal} from '@angular/core';
import {KitchenService} from '../../services/kitchen.service';
import {ActivatedRoute} from '@angular/router';
import {Meal} from '../../types/Meal';
import {fetchGroupId} from '../../../utils/fetchGroupId';
import {routes} from '../../root/app.routes';
import {HttpStatusCode} from '@angular/common/http';
import {fetchMealName} from '../../../utils/fetchMealName';

@Component({
  selector: 'app-meal',
  imports: [],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.css'
})
export class MealComponent implements OnInit{

  route = inject(ActivatedRoute)

  kitchenService = inject(KitchenService)

  meal = signal<Meal | null>(null)

  ngOnInit() {
    const groupId = fetchGroupId(this.route)
    const mealId = fetchMealName(this.route)
    this.kitchenService.getMeal(groupId,mealId)
      .then(promise => {
        promise.subscribe(response => {
          if(response.status == HttpStatusCode.Ok){
            this.meal.set(response.body)
          }
        })
      })
  }

}
