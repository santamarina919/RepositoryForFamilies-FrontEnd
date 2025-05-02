import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Ingredient} from '../../types/Ingredient';
import {KitchenService} from '../../services/kitchen.service';
import {fetchGroupId} from '../../../utils/fetchGroupId';
import {routes} from '../../root/app.routes';
import {HttpStatusCode} from '@angular/common/http';
import {fetchItemName} from '../../../utils/fetchItemName';

@Component({
  selector: 'app-ingredient',
  imports: [],
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.css'
})
export class IngredientComponent implements OnInit{
  route = inject(ActivatedRoute)

  kitchenService = inject(KitchenService)

  ingredient = signal<Ingredient | null>(null)

  ngOnInit(): void {
    const groupId = fetchGroupId(this.route)
    const itemName = fetchItemName(this.route)
    this.kitchenService.getItem(groupId,itemName)
      .then(promise => {
        promise.subscribe(response => {
          if(response.status == HttpStatusCode.Ok){
            this.ingredient.set(response.body)
          }
        })
      })
  }


}
