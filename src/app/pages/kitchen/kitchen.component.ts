import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {KitchenService} from '../../services/kitchen.service';
import {fetchGroupId} from '../../../utils/fetchGroupId';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import {routes} from '../../root/app.routes';
import {HttpStatusCode} from '@angular/common/http';
import {Meal} from '../../types/Meal';
import {Ingredient} from '../../types/Ingredient';

@Component({
  selector: 'app-kitchen',
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css'
})
export class KitchenComponent implements OnInit{
  typeFlag = signal<'meal' | 'item'>('meal')

  mealStyle = computed(() => this.typeFlag() == 'meal' ? 'mealStyle' : 'notMealStyle')

  itemStyle = computed(() => this.typeFlag() == 'item' ? 'itemStyle' : 'notItemStyle')

  meals = signal<Meal[] | null>(null)

  ingredients = signal<Ingredient[] | null>(null)

  kitchenService = inject(KitchenService)

  route = inject(ActivatedRoute)


  ngOnInit(): void {
    this.typeFlag.set('meal')
    this.setMeals(fetchGroupId(this.route))
    this.setItems(fetchGroupId(this.route))
  }

  private setMeals(groupId :string) {
    this.kitchenService.allMeals(groupId)
      .then(promise => {
        promise.subscribe(response => {
          if(response.status == HttpStatusCode.Ok){
            this.meals.set(response.body)
          }
        })
      })
  }

  private setItems(groupId :string){
    this.kitchenService.allItems(groupId)
      .then(promise => {
        promise.subscribe(response => {
          if(response.status == HttpStatusCode.Ok){
            this.ingredients.set(response.body)
          }
        })
      })
  }

  //TODO have each ingredient link to a respective page
  //TODO create meal plan page
  //TODO have toggle light based on what everone is picked


  protected readonly encodeURI = encodeURI;
  protected readonly encodeURIComponent = encodeURIComponent;
}
